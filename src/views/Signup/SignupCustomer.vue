<!--/src/SignupCustomer.vue-->

<template>
    <div class="signupCustomer container">
        <div class="m-5">
            <div class="row justify-content-center">
                <div class="col-sm-6 signupBox shadow-sm">
                    <center><h3>สมัครสมาชิกสำหรับลูกค้า</h3></center>
                    <div class="form-group mt-4">
                        <form @submit.prevent="registerWithEmail">
                            <!--Email-->
                            <label for="emailInput">Email</label>
                            <input type="email" class="form-control mb-2" id="emailInput" placeholder="อีเมล" v-model="Email" required/>
                            <small id="emailHelp" class="form-text text-muted mb-4">ตัวอย่าง: name@example.com</small>

                            <!--Password-->
                            <label for="passwordInput">Password</label>
                            <input type="password" class="form-control mb-2" id="passwordInput" placeholder="รหัสผ่าน" v-model="Password" required/>
                            <small id="passwordHelp" class="form-text text-muted mb-4">รหัสผ่าน: ต้องประกอบด้วยตัวเลขและตัวอักษร 6 ตัวขึ้นไป</small>

                            <!--Name-->
                            <label >ชื่อ-นามสกุล</label>
                            <input type="text" class="form-control mb-2" id="FnameInput" placeholder="ชื่อ" v-model="Fname" required />
                            <input type="text" class="form-control mb-2" id="LnameInput" placeholder="นามสกุล" v-model="Lname" required/>
                            <small id="nameHelp" class="form-text text-muted mb-4">ชื่อ: ไม่ต้องใส่คำนำหน้า</small>

                            <!--Sex-->
                            <label >เพศ</label> 
                            <br>
                            <input type="radio" id="male" value="male" v-model="Sex" class="mr-1" required />
                            <label for="male" class="mr-4 font-weight-normal">ชาย</label>

                            <input type="radio" id="female" value="female" v-model="Sex" class="mr-1" required />
                            <label for="female" class="mr-4 font-weight-normal">หญิง</label>

                            <input type="radio" id="other" value="other" v-model="Sex" class="mr-1" checked required />
                            <label for="other" class="mr-4 mb-4 font-weight-normal">อื่นๆ</label>
                            <br>

                            <!--Phone-->
                            <label for="phoneInput">หมายเลขโทรศัพท์</label>
                            <input type="tel" class="form-control mb-4" id="phoneInput" placeholder="หมายเลขโทรศัพท์" v-model="Phone" required/>
                            <hr>
                            
                            <!--Submit-->
                            <button type="submit" value="submit" class="btn btn-outline-success btn-block">ยืนยัน</button>
                        </form>
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
        name: "SignupCustomer",
        beforeCreate() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.$router.replace({name: 'Profile'}).catch(()=>{})
                }
            })
        },
        data() {
            return {
                Email: '',
                Password: '',
                Fname: '',
                Lname: '',
                Phone: '',
                Sex: 'other'
            }
        },
        methods: {
            //สมัครสมาชิกผ่าน firebase auth
            registerWithEmail() {
                firebase.auth().createUserWithEmailAndPassword(this.Email, this.Password)
                .then(() => {
                    //เก็บข้อมูล user ใน firestore
                    firebase.firestore().collection('customer').doc(firebase.auth().currentUser.uid)
                    .set({
                        cus_id: firebase.auth().currentUser.uid,
                        cus_firstName: this.Fname,
                        cus_lastName: this.Lname,
                        cus_email: this.Email,
                        cus_phone: this.Phone,
                        cus_sex: this.Sex,
                        cus_img: '',
                    })
                    .then(() => {
                        this.$router.replace({name: 'Customer'}).catch(()=>{})
                    })
                    .catch(err => {
                        console.log('wrong with add user to firestore',err)
                    })
                })
                .catch(function(error) {
                    console.log('wrong with firebase auth', error)
                    var errorCode = error.code
                    var errorMessage = error.message
                    alert(errorMessage)
                })
            }
        }
    }
</script>

<style scoped>
    .signupBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }
    label {
        font-weight: bold;
    }
</style>