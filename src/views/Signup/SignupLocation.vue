<!--/src/SignupLocation.vue-->

<template>
    <div class="signupLocation container">
        <div class="m-5">
            <div class="row justify-content-center">
                <div class="col-sm-6 signupBox shadow-sm">
                    <center><h3>สมัครสมาชิกสำหรับสถานที่</h3></center>
                    <div class="form-group mt-4">
                        <form @submit.prevent="registerWithEmail">
                            <!--Email-->
                            <label for="emailInput">Email</label>
                            <input type="email" class="form-control mb-2" id="emailInput" placeholder="อีเมล" v-model="Email" required>
                            <small id="emailHelp" class="form-text text-muted mb-4">ตัวอย่าง: name@example.com</small>

                            <!--Password-->
                            <label for="passwordInput">Password</label>
                            <input type="password" class="form-control mb-2" id="passwordInput" placeholder="รหัสผ่าน" v-model="Password" required>
                            <small id="passwordHelp" class="form-text text-muted mb-4">รหัสผ่าน: ต้องประกอบด้วยตัวเลขและตัวอักษร 6 ตัวขึ้นไป</small>
                            <hr>

                            <!--Location Name-->
                            <label for="locationNameInput">ชื่อสถานที่</label>
                            <input type="text" class="form-control mb-4" id="locationNameInput" placeholder="ชื่อสถานที่" v-model="LocationName" required>

                            <!--Name-->
                            <label >ชื่อ-นามสกุล</label>
                            <input type="text" class="form-control mb-2" id="FnameInput" placeholder="ชื่อ" v-model="Fname" required>
                            <input type="text" class="form-control mb-2" id="LnameInput" placeholder="นามสกุล" v-model="Lname" required>
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
                            <input type="tel" class="form-control mb-4" id="phoneInput" placeholder="หมายเลขโทรศัพท์" v-model="Phone" required>
                            <hr>

                            <!--Address-->
                            <label for="addressInput">ที่อยู่</label>
                            <b-row>
                                <b-col sm="4" class="font-weight">
                                    <label for="addr_no"><small>เลขที่</small></label>
                                    <input type="text" class="form-control mb-4" id="addr_no" placeholder="เลขที่" v-model="address.addr_no" required> 
                                </b-col>
                                <b-col sm="4">
                                    <label for="addr_soi"><small>ซอย</small></label>
                                    <input type="text" class="form-control mb-4" id="addr_soi" placeholder="ซอย" v-model="address.addr_soi" required> 
                                </b-col>
                                <b-col sm="4">
                                    <label for="addr_road"><small>ถนน</small></label>
                                    <input type="text" class="form-control mb-4" id="addr_road" placeholder="ถนน" v-model="address.addr_road" required> 
                                </b-col>
                                <b-col sm="4">
                                    <label for="addr_road"><small>แขวง</small></label>
                                    <input type="text" class="form-control mb-4" id="addr_subDistrict" placeholder="แขวง" v-model="address.addr_subDistrict" required> 
                                </b-col>
                                <b-col sm="4">
                                    <label for="addr_road"><small>เขต</small></label>
                                    <b-dropdown id="district" 
                                        :text="address.addr_district"
                                        block
                                        split
                                        variant="outline-secondary"
                                    >
                                        <b-dropdown-item 
                                            v-for="district in districts" 
                                            :key="district.id" 
                                            v-model="address.addr_district" 
                                            @click="address.addr_district=district.name"
                                        >
                                            {{district.name}}
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </b-col>
                                <b-col sm="4">
                                    <label for="addr_road"><small>จังหวัด</small></label>
                                    <input type="text" class="form-control mb-4" id="addr_district" placeholder="จังหวัด" v-model="address.addr_province" required disabled> 
                                </b-col>
                            </b-row>
                            <small id="nameHelp" class="form-text text-muted mb-4">หมายเหตุ: ขณะนี้เปิดให้บริการเฉพาะในเขตพื้นที่กรุงเทพมหานครเท่านั้น</small>
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
        name: "SignupLocation",
        beforeCreate() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.$router.replace({name: 'Location'}).catch(()=>{})
                }
            })
        },
        data() {
            return {
                Email: '',
                Password: '',
                Fname: '',
                Lname: '',
                address: {
                    addr_no: '',
                    addr_soi: '',
                    addr_road: '',
                    addr_subDistrict: '',
                    addr_district: 'เลือกเขต',
                    addr_province: 'กรุงเทพมหานคร'
                },
                Phone: '',
                LocationName: '',
                Sex: 'other',

                //Data
                districts: [
                    {id:1, name: 'ลาดกระบัง'}
                ],
            }
        },
        methods: {
            //สมัครสมาชิกผ่าน firebase auth
            registerWithEmail() {
                firebase.auth().createUserWithEmailAndPassword(this.Email, this.Password)
                .then(() => {
                    //เก็บข้อมูล user ใน firestore
                    firebase.firestore().collection('location').doc(firebase.auth().currentUser.uid)
                    .set({
                        lo_id: firebase.auth().currentUser.uid,
                        lo_firstName: this.Fname,
                        lo_lastName: this.Lname,
                        lo_email: this.Email,
                        lo_address: this.address,
                        lo_phone: this.Phone,
                        lo_locationName: this.LocationName,
                        lo_sex: this.Sex,
                        lo_cost: 0,
                        lo_equipment: [],
                        lo_img: 'https://firebasestorage.googleapis.com/v0/b/aboutheadproject.appspot.com/o/user.jpg?alt=media&token=c715984d-a2c1-4807-b525-804b895b7f71',
                        lo_score: 0,
                        lo_description: '',
                        lo_status: false

                    })
                    .then(() => {
                        localStorage.removeItem('userData')

                        firebase.firestore().collection('location').doc(firebase.auth().currentUser.uid).get()
                        .then(doc => {        
                            if(doc.data()) {
                                localStorage.clear()
                                localStorage.setItem('userType', 'location')
                                localStorage.setItem('userData', JSON.stringify(doc.data()))
                                location.reload()
                            }
                        }).catch(err => { console.log(err) }) 

                        this.$router.replace({name: 'LocationProfile'}).catch(()=>{})
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