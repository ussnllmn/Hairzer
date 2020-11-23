<template>
    <div class="editprofile">
        <Loading v-if="loadingStatus"></Loading>
        <h1>แก้ไขข้อมูลส่วนตัว</h1>

        <div class="editBox shadow-sm p-2">
            <h5>ข้อมูลของฉัน</h5> <hr>
            <!--Edit Profile-->
            <b-row class="mb-4 px-4">
                <b-col sm="8" style="border-right: 1px solid #CED4DA;" class="mb-4">
                    <!--First Name-->
                    <div class="mb-2">
                        <label for="firstName">ชื่อ</label>
                        <b-input type="text" v-model="fname" id="firstName"></b-input>
                    </div>

                    <!--Last Name-->
                    <div class="mb-2">
                        <label for="lastName">นามสกุล</label>
                        <b-input type="text" v-model="lname" id="lastName"></b-input>
                    </div>

                    <!--Sex-->
                    <div class="mb-2">
                        <label >เพศ</label> 
                        <br>
                        <input type="radio" id="male" value="male" v-model="sex" class="mr-1" required />
                        <label for="male" class="mr-4 font-weight-normal">ชาย</label>

                        <input type="radio" id="female" value="female" v-model="sex" class="mr-1" required />
                        <label for="female" class="mr-4 font-weight-normal">หญิง</label>

                        <input type="radio" id="other" value="other" v-model="sex" class="mr-1" checked required />
                        <label for="other" class="mr-4 font-weight-normal">อื่นๆ</label>
                        <br>
                    </div>

                    <!--Phone-->
                    <div class="mb-2">
                        <label for="Phone">เบอร์โทรศัพท์</label>
                        <b-input type="text" v-model="phone" id="Phone"></b-input>
                    </div>

                    <div class="mb-2">
                        <b-btn v-b-tooltip.hover title="บันทึกข้อมูลส่วนตัว" class="float-right" @click="editInfo">บันทึก</b-btn>
                    </div>
                </b-col>
                
                <!--Change image profile-->
                <b-col sm="4">
                    <center>
                        <img :src="img" width="200px" height="200px" style="object-fit: cover;"> <br>

                        <div class="upload mt-2">
                            <b-form-file
                                size="sm"
                                placeholder="เลือกรูปภาพของคุณ . . ."
                                drop-placeholder="ลากไฟล์มาวางที่นี่..."
                                class="mb-2"
                                accept="image/*"
                                @change="chooseFile"
                            ></b-form-file>
                            <b-btn v-b-tooltip.hover title="เปลี่ยนรูปโปรไฟล์" @click="uploadImage">เปลี่ยนรูปโปรไฟล์</b-btn><br>
                        </div>
                    </center>
                </b-col>
            </b-row>

            <!--Change Password-->
            <h5>เปลี่ยนรหัสผ่าน</h5> <hr>
            <b-row class="mb-4 p-2">
                <b-col sm="8">
                    <!--present password-->
                    <div class="mb-2">
                        <label for="presentPWD">รหัสผ่านปัจจุบัน</label>
                        <b-input type="text" value="" id="presentPWD"></b-input>
                    </div>

                    <!--new password-->
                    <div class="mb-2">
                        <label for="newPWD">รหัสผ่านใหม่</label>
                        <b-input type="text" value="" id="newPWD"></b-input>
                    </div>

                    <!--new password again-->
                    <div class="mb-2">
                        <label for="renewPWD">ยืนยันรหัสผ่านใหม่</label>
                        <b-input type="text" value="" id="remewPWD"></b-input>
                    </div>

                    <!--Button-->
                    <div class="mb-2">
                        <b-btn v-b-tooltip.hover title="เปลี่ยนรหัสผ่าน" class="float-right">เปลี่ยนรหัสผ่าน</b-btn>
                    </div>
                </b-col>
                <b-col style="margin-top: 36px;">
                    <a href="#">ลืมรหัสผ่าน ?</a>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/storage'
    import { mapGetters } from "vuex";
    import Loading from '../../components/Loading'

    export default {
        name: 'EditProfile',
        components: {
            Loading
        },
        created() {
            this.loadingStatus = true
            
            //set data
            this.userData = JSON.parse(localStorage.getItem('userData'))
            this.fname = this.userData.cus_firstName
            this.lname = this.userData.cus_lastName
            this.sex = this.userData.cus_sex
            this.phone = this.userData.cus_phone
            this.img = this.userData.cus_img

            //set userData from firebase
            firebase.firestore().collection('customer').doc(this.userData.cus_id).get()
            .then(doc => {
                localStorage.setItem('userData', JSON.stringify(doc.data()))
                this.loadingStatus = false
            })
            .catch(err => {console.log(err)})
        },
        updated() {
            //get customer data from firebase
            firebase.firestore().collection('customer').doc(this.userData.cus_id).get()
            .then(doc => {
                localStorage.setItem('userData', JSON.stringify(doc.data()))
            }).catch(err => { console.log(err) })
        },
        data() {
            return {
                loadingStatus: '',

                userData: [],

                //data in form
                fname: '',
                lname: '',
                sex: '',
                phone: '',
                img: '',

                //img
                selectedImage: {}
            }
        },
        methods: {
            //แก้ไขข้อมูลส่วนตัว
            editInfo() {
                this.loadingStatus = true

                let info = {
                    id: this.userData.cus_id,
                    fname: this.fname,
                    lname: this.lname,
                    sex: this.sex,
                    phone: this.phone,
                    img: this.img
                }

                axios.post('http://128.199.236.172:5000/editCustomerInfo', info)
                .then(
                    res => {
                        if(res.status === 200) {
                            alert('แก้ไขข้อมูลสำเร็จ')
                            this.loadingStatus = false
                            location.reload()
                        }
                    }
                )

            },

            //เลือกรูป
            chooseFile(event){
                this.selectedImage = event.target.files[0]
            },

            //เปลี่ยนรูป 
            uploadImage() {
                firebase.storage().ref('customer/' + this.userData.cus_id + '/profile.jpg').put(this.selectedImage)
                .then(() => {

                    firebase.storage().ref('customer/' + this.userData.cus_id + '/profile.jpg').getDownloadURL()
                    .then(imgURL => {
                        this.img = imgURL

                        firebase.firestore().collection('customer').doc(this.userData.cus_id).update({
                            cus_img: imgURL
                        })
                        .catch(err => { console.log(err) })
                    })
                    .catch(err => {console.log(err)})

                    alert('เปลี่ยนรูปสำเร็จ')
                })
                .catch(err => {console.log(err)})
            }
        },
        computed: {
            ...mapGetters({
                user: "user"
            }),
            getUserData() {
                
            }
        },
    }
</script>

<style scoped>
    .editBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }
</style>