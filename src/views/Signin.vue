<!--/src/Signin.vue-->

<template>
    <div class="signin container">
        <div class="m-5">
            <!--Alert for wrong password-->
            <b-alert
                variant="danger"
                dismissible
                fade
                :show="showDismissibleAlert"
                @dismissed="showDismissibleAlert=false"
                >
                Email หรือ Password ที่คุณป้อนไม่ถูกต้อง
            </b-alert>

            <!--Box-->
            <div class="row justify-content-center">
                <!--Sign-in Box-->
                <div class="col-sm-5 signinBox shadow-sm">
                        <center><h3>เข้าสู่ระบบ</h3></center>
                        <input class="form-control my-4" type="email" placeholder="Email" v-model="email" required>
                        <input class="form-control my-4" type="password" placeholder="Password" v-model="password" required>
                        <div class="row">
                            <!--ลืมรหัสผ่าน-->
                            <div class="col-xl-12 mb-4">
                                <a href="#">ลืมรหัสผ่าน ? <b-icon icon="key" aria-hidden="true"></b-icon></a>
                            </div>

                            <!--ปุ่มเข้าสู่ระบบ-->
                            <div class="col-xl-12">
                                <button type="submit" value="submit" class="btn btn-success btn-block mb-4" @click="customerSignin">
                                    <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon> เข้าสู่ระบบลูกค้า
                                </button>

                                <button type="submit" value="submit" class="btn btn-info btn-block mb-4" @click="locationSignin">
                                    <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon> เข้าสู่ระบบช่างตัดผม
                                </button>
                                
                                <button type="submit" value="submit" class="btn btn-dark btn-block mb-4" @click="barberSignin">
                                    <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon> เข้าสู่ระบบสถานที่
                                </button>
                            </div>
                        </div>
                        <hr>

                        <!--สมัครสมาชิก-->
                        <div class="mt-5 mb-2">
                            <center>
                                หรือ <router-link :to="{ name: 'Signup' }">สมัครสมาชิก <b-icon icon="person-plus" aria-hidden="true"></b-icon></router-link>
                            </center>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore'

    export default {
        name: "Signin",
        beforeCreate() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.$router.replace({name: 'Home'}).catch(()=>{})
                }
            })  
        },
        data() {
            //เก็บค่า email กับ password
                return {
                    showDismissibleAlert: false,
                    email:'', 
                    password:''
                }
        },
        methods: {
            //Customer Signin
            customerSignin() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(
                    user => { 
                        firebase.firestore().collection('customer').doc(firebase.auth().currentUser.uid).get()
                        .then(doc => {
                            localStorage.clear()
                            localStorage.setItem('userType', 'customer')
                            localStorage.setItem('userData', JSON.stringify(doc.data()))
                        }).catch(err => {
                            console.log(err) 
                        })

                        this.$router.replace({name: 'Home'}).catch(()=>{}) 
                    },
                    error => {
                        this.showDismissibleAlert = true
                    }
                )
            },
            //Location Signin
            locationSignin() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(
                    user => { 
                        firebase.firestore().collection('location').doc(firebase.auth().currentUser.uid).get()
                        .then(doc => {
                            localStorage.clear()
                            localStorage.setItem('userType', 'location')
                            localStorage.setItem('userData', JSON.stringify(doc.data()))
                        }).catch(err => {
                            console.log(err) 
                        })

                        this.$router.replace({name: 'Home'}).catch(()=>{}) 
                    },
                    error => {
                        this.showDismissibleAlert = true
                    }
                )
            },
            //Barber Signin
            barberSignin() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(
                    user => { 
                        firebase.firestore().collection('barber').doc(firebase.auth().currentUser.uid).get()
                        .then(doc => {
                            localStorage.clear()
                            localStorage.setItem('userType', 'barber')
                            localStorage.setItem('userData', JSON.stringify(doc.data()))
                        }).catch(err => {
                            console.log(err) 
                        })

                        this.$router.replace({name: 'Home'}).catch(()=>{}) 
                    },
                    error => {
                        this.showDismissibleAlert = true
                    }
                )
            }
        }
    }
</script>

<style scoped>
    img {
        display: block;
    }
    @media (max-width:640px){
        img:first-child{
            display:none;
        }
    }

    .signin {
        height: 677px;
    }
    .signinBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }
</style>