<template>
    <div class="signupLocation">
        <div class="m-5">
            <b-alert
                variant="danger"
                dismissible
                fade
                :show="showDismissibleAlert"
                @dismissed="showDismissibleAlert=false"
                >
                Email หรือ Password ที่คุณป้อนไม่ถูกต้อง
            </b-alert>

            <div class="row justify-content-center">
                <div class="col-sm-6 signupBox">
                    <center><h3>สมัครสมาชิกสำหรับสถานที่</h3></center>
                    <div class="form-group mt-4">
                        <form @submit.prevent="registerWithEmail">
                            <label for="emailInput">Email address</label>
                            <input type="email" class="form-control" id="emailInput" placeholder="Email" v-model="Email" required>
                            <small id="emailHelp" class="form-text text-muted mb-4">Example: name@example.com</small>

                            <label for="passwordInput">Password</label>
                            <input type="password" class="form-control mb-2" id="passwordInput" placeholder="Password" v-model="Password" required>
                            <small id="emailHelp" class="form-text text-muted mb-4">Password: ต้องประกอบด้วยตัวเลขและตัวอักษร 6 ตัวขึ้นไป</small>

                            <label for="locationNameInput">Location Name</label>
                            <input type="text" class="form-control mb-2" id="locationNameInput" placeholder="Location name" v-model="LocationName" required>
                            <small id="emailHelp" class="form-text text-muted mb-4">Location name: ชื่อสถานที่ของคุณ</small>

                            <label >Name</label>
                            <input type="text" class="form-control mb-2" id="FnameInput" placeholder="First name" v-model="Fname" required>
                            <input type="text" class="form-control mb-4" id="LnameInput" placeholder="Last name" v-model="Lname" required>

                            <label for="addressInput">Address</label>
                            <input type="text" class="form-control mb-4" id="addressInput" placeholder="Address" v-model="Address" required> 

                            <label for="phoneInput">Phone number</label>
                            <input type="tel" class="form-control mb-4" id="phoneInput" placeholder="Phone number" v-model="Phone" required>

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
    name: "SignupLocation",
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
            Address: '',
            Phone: '',
            LocationName: '',
            showDismissibleAlert: false
        }
    },
    methods: {
        //สมัครสมาชิกผ่าน firebase auth
        registerWithEmail() {
            firebase.auth().createUserWithEmailAndPassword(this.Email, this.Password)
            .then(() => {
                //เก็บข้อมูล user ใน firestore
                firebase.firestore().collection('user').doc(firebase.auth().currentUser.uid)
                .set({
                    lo_id: firebase.auth().currentUser.uid,
                    lo_firstName: this.Fname,
                    lo_lastName: this.Lname,
                    lo_email: this.Email,
                    lo_address: this.Address,
                    lo_phone: this.Phone,
                    lo_locationName: this.LocationName,
                    status: 'location'
                })
                .then(() => {
                    this.$router.replace({name: 'Profile'}).catch(()=>{})
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