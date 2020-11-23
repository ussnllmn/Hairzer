<template>
    <div class="BarberEditProfile">
        <h1>แก้ไขข้อมูลส่วนตัว</h1>
        <div class="editBox shadow-sm p-2">
            <h5>ข้อมูลส่วนตัว</h5><hr>
            <b-row class="mb-4 px-4">
                <!--Edit Profile-->
                <b-col sm="8" style="border-right: 1px solid #CED4DA;" class="mb-4">
                    <!--First Name-->
                    <div class="mb-3">
                        <label for="firstName">ชื่อ</label>
                        <b-input type="text" v-model="userData.barb_firstName" id="firstName"></b-input>
                    </div>

                    <!--Last Name-->
                    <div class="mb-3">
                        <label for="lastName">นามสกุล</label>
                        <b-input type="text" v-model="userData.barb_lastName" id="lastName"></b-input>
                    </div>

                    <!--Sex-->
                    <div class="mb-3">
                        <label >เพศ</label> 
                        <br>
                        <input type="radio" id="male" value="male" v-model="userData.barb_sex" class="mr-1" required />
                        <label for="male" class="mr-4 font-weight-normal">ชาย</label>

                        <input type="radio" id="female" value="female" v-model="userData.barb_sex" class="mr-1" required />
                        <label for="female" class="mr-4 font-weight-normal">หญิง</label>

                        <input type="radio" id="other" value="other" v-model="userData.barb_sex" class="mr-1" checked required />
                        <label for="other" class="mr-4 font-weight-normal">อื่นๆ</label>
                        <br>
                    </div>

                    <!--Phone-->
                    <div class="mb-3">
                        <label for="Phone">เบอร์โทรศัพท์</label>
                        <b-input type="text" v-model="userData.barb_phone" id="Phone"></b-input>
                    </div>

                    <!--Description-->
                    <div class="mb-3">
                        <label>คำอธิบาย</label>
                        <b-form-textarea
                            required
                            id="descriptionText"
                            v-model="userData.barb_description"
                            placeholder="เขียนคำอธิบายเกี่ยวกับบริการได้ที่นี่ . . . "
                            rows="5"
                            max-rows="5"
                        >
                        </b-form-textarea>
                    </div>

                    <div class="mb-3">
                        <label for="addr_road">พื้นที่ให้บริการ</label>
                        <b-dropdown id="district" 
                            :text="userData.barb_addressService"
                            block
                            split
                            right
                            variant="outline-secondary"
                        >
                            <b-dropdown-item 
                                v-for="district in districts" 
                                :key="district.id" 
                                v-model="userData.barb_addressService" 
                            >
                                {{district.name}}
                            </b-dropdown-item>
                        </b-dropdown>
                    </div>

                    <!--Button-->
                    <div class="mb-3">
                        <b-btn v-b-tooltip.hover title="บันทึกข้อมูลส่วนตัว" class="float-right" @click="editInfo">บันทึก</b-btn>
                    </div>
                </b-col>

                <!--Change image profile-->
                <b-col sm="4">
                    <center>
                        <img :src="userData.barb_img" width="150px" height="150px" style="object-fit: cover;"> <br>

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


            <!--Edit Barber Service-->
            <h5>ข้อมูลการให้บริการของช่างตัดผม</h5><hr>
            <b-row class="mb-4 px-2">
                <!--Service-->
                <b-col sm="8" style="border-right: 1px solid #CED4DA;" class="mb-4">
                    <div v-for="(service,index) in barb_service" :key="index" class="serviceBox mb-4 p-2">
                        <h6 class="font-weight-bold">บริการที่ {{index+1}}</h6>
                        <b-row>
                            <b-col sm="4">
                                <!--Service Image-->
                                <img :src="service.service_img" width="100%" height="225px" style="object-fit: cover;" class="mb-2">
                                
                                <!--upload service image-->
                                <b-form-file
                                    size="sm"
                                    placeholder="เลือกรูปภาพบริการของคุณ . . ."
                                    drop-placeholder="ลากไฟล์มาวางที่นี่..."
                                    class="mb-2"
                                    @change="chooseFile"
                                ></b-form-file>
                            </b-col>

                            <b-col sm="8">
                                <!--Service name -->
                                <b-input-group prepend="ชื่อบริการ" class="mb-2">
                                    <b-form-input v-model="barb_service[index].service_name" placeholder="ป้อนชื่อบริการ . . ." required></b-form-input>
                                </b-input-group>
                                
                                <b-input-group prepend="ค่าบริการ" class="mb-2">
                                    <b-form-input v-model="barb_service[index].service_cost" placeholder="ป้อนราคาของบริการ . . ." required></b-form-input><br>
                                </b-input-group>
                                
                                <!--Description-->
                                <b-input-group prepend="คำอธิบาย" class="mb-2">
                                    <b-form-textarea
                                            required
                                            id="descriptionText"
                                            v-model="service.service_description"
                                            placeholder="เขียนคำอธิบายเกี่ยวกับบริการได้ที่นี่ . . . "
                                            rows="5"
                                            max-rows="5"
                                    >
                                    </b-form-textarea>
                                </b-input-group>

                                <div class="text-right">
                                    <!--Save Service-->
                                    <b-button class="mx-2" v-b-tooltip.hover title="บันทึกบริการ" variant="success" size="sm" v-on:click="saveService(index)">บันทึก</b-button>

                                    <!--Delete Service-->
                                    <b-button v-b-tooltip.hover title="ลบบริการ" variant="danger" size="sm" v-on:click="deleteService(index)">ลบ</b-button>
                                </div>
                            </b-col>
                        </b-row>

                        
                    </div>

                    <b-button v-b-tooltip.hover title="เพิ่มบริการ" variant="outline-dark" block v-on:click="addService">
                        <b-icon icon="plus"></b-icon>เพิ่มบริการ
                    </b-button>
                </b-col>

                <!--Active Status-->
                <b-col sm="4" class="text-center ">
                    <h5>สถานะการให้บริการ</h5>
                    <b-icon class="buttonStatus" v-if="barberStatus" icon="toggle-on" font-scale="3" variant="success" @click="statusOff"></b-icon>
                    <b-icon class="buttonStatus" v-if="!barberStatus" icon="toggle-off" font-scale="3" variant="dark" @click="statusOn"></b-icon>
                    <p v-if="locationStatus" class="text-success">สถานะ: เปิดการให้บริการ</p>
                    <p v-if="!locationStatus"  class="text-secondary">สถานะ: ปิดการบริการ</p>
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
    import 'firebase/storage';

    export default {
        name: 'BarberEditProfile',
        data() {
            return {
                img: '',
                selectedImage: {},
                
                //Data
                districts: [
                    { id:1, name: 'ลาดกระบัง' }
                ],

                userData: '',
                barberStatus: '',

                //
                barb_firstName: '',
                barb_lastName: '',
                barb_sex: '',
                barb_addressService: [],
                barb_phone: '',
                barb_description: '',

                //
                barb_service: [],
            }
        },
        created() {
            this.userData = JSON.parse(localStorage.getItem('userData'))

            //set userData from firebase
            firebase.firestore().collection('barber').doc(this.userData.barb_id).get()
            .then(doc => {
                localStorage.setItem('userData', JSON.stringify(doc.data()))
            })
            .catch(err => {console.log(err)})

            this.userData = JSON.parse(localStorage.getItem('userData'))
            
            this.barberStatus = this.userData.barb_status
            
            //
            this.barb_firstName = this.userData.barb_firstName
            this.barb_lastName = this.userData.barb_lastName
            this.barb_sex = this.userData.barb_sex
            this.barb_addressService = this.userData.barb_addressService
            this.barb_phone = this.userData.barb_phone
            this.barb_description = this.userData.barb_description

            //
            var service = []

            //get service of barber from firebase
            firebase.firestore().collection('service').where('service_barber','==',this.userData.barb_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.barb_service.push(doc.data())
                })
            })
            .catch(err => {console.log(err)})
        },
        methods: {
            //เลือกรูป
            chooseFile(event){
                this.selectedImage = event.target.files[0]
            },

            //เปลี่ยนรูป 
            uploadImage() {
                firebase.storage().ref('barber/' + this.userData.barb_id + '/profile.jpg').put(this.selectedImage)
                .then(() => {

                    firebase.storage().ref('barber/' + this.userData.barb_id + '/profile.jpg').getDownloadURL()
                    .then(imgURL => {
                        this.img = imgURL

                        firebase.firestore().collection('barber').doc(this.userData.barb_id).update({
                            barb_img: imgURL
                        })
                        .then(() => {alert('เปลี่ยนรูปสำเร็จ')})
                        .catch(err => { console.log(err) })
                    })
                    .catch(err => {console.log(err)})
                })
                .catch(err => {console.log(err)})
            },

            //เปลี่ยนรูป 
            uploadImageService(serviceID) {
            },
            //แก้ไขข้อมูลส่วนตัว
            editInfo() {
                var info = this.userData

                axios.post('http://128.199.236.172:5000/editBarberInfo', info)
                .then(
                    res => {
                        if(res.status === 200) {
                            alert('แก้ไขข้อมูลส่วนตัวสำเร็จ')
                            location.reload()
                        }
                    }
                )
            },

            //บันทึกบริการ
            saveService(index) {
                var service =  this.barb_service[index]
                var serviceID = service.service_id

                axios.post('http://128.199.236.172:5000/saveService', service)
                .then(
                    res => {
                        if(res.status === 200) {
                            //upload service img
                            firebase.storage().ref('service/' + serviceID + '/serviceImg.jpg').put(this.selectedImage)
                            .then(() => {

                                firebase.storage().ref('service/' + serviceID + '/serviceImg.jpg').getDownloadURL()
                                .then(imgURL => {
                                    firebase.firestore().collection('service').doc(serviceID).update({
                                        service_img: imgURL
                                    })
                                    .then(() => {alert('บันทึกข้อมูลบริการสำเร็จ')})
                                    .catch(err => { console.log(err) })
                                })
                                .catch(err => {console.log(err)})
                            })
                            .catch(err => {console.log(err)})
                        }
                    }
                )
            },

            //ลบบริการ
            deleteService(index) {
                var service =  this.barb_service[index]
                axios.post('http://128.199.236.172:5000/deleteService', service)
                .then(
                    res => {
                        if(res.status === 200) {
                            alert('ลบรายการบริการสำเร็จ')
                        }
                    }
                )

                this.barb_service.splice(index, 1)
            },

            //เพิ่มบริการ
            addService() {
                if(this.barb_service.length < 10) {
                    this.barb_service.push({
                        service_name: '',
                        service_cost: '',
                        service_img: 'https://firebasestorage.googleapis.com/v0/b/aboutheadproject.appspot.com/o/service%2Fhaircut.jpg?alt=media&token=7a38e76a-3340-4894-a6d0-9ee9af246348',
                        service_id: 'null',
                        service_barber: this.userData.barb_id,
                        service_description: ''
                    })
                }
                else
                    alert('เพิ่มจำนวนบริการได้ไม่เกิน 10 ชิ้นเท่านั้น')
            },

            //ไม่พร้อมให้บริการ = search ไม่เจอ
            statusOff() {
                var info = {
                    barberStatus: this.barberStatus,
                    barb_id: this.userData.barb_id
                }
                axios.post('http://128.199.236.172:5000/changeBarberStatus', info)
                .then(
                    res => {
                        if(res.status === 200) {
                            this.barberStatus = false
                            alert('เปลี่ยนสถานะการให้บริการสำเร็จ')
                        }
                    }
                )
            },
            //พร้อมให้บริการ = search เจอ
            statusOn() {
                var info = {
                    barberStatus: this.locationStatus,
                    barb_id: this.userData.barb_id
                }
                axios.post('http://128.199.236.172:5000/changeBarberStatus', info)
                .then(
                    res => {
                        if(res.status === 200) {
                            this.barberStatus = true
                            alert('เปลี่ยนสถานะการให้บริการสำเร็จ')
                        }
                    }
                )
            },

        }
    }
</script>


<style scoped>
    .editBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }

    .serviceBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }

    .buttonStatus {
        cursor: pointer;
    }
</style>