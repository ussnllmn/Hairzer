<template>
    <div class="LocationEditProfile">
        <h1>แก้ไขข้อมูลส่วนตัว</h1>

        <div class="editBox shadow-sm p-2">
            <h5>ข้อมูลส่วนตัว</h5><hr>
            <b-row class="mb-4 px-4">
                <!--Edit Profile-->
                <b-col sm="8" style="border-right: 1px solid #CED4DA;" class="mb-4">
                    <!--First Name-->
                    <div class="mb-3">
                        <label for="firstName">ชื่อ</label>
                        <b-input type="text" v-model="lo_firstName" id="firstName"></b-input>
                    </div>

                    <!--Last Name-->
                    <div class="mb-3">
                        <label for="lastName">นามสกุล</label>
                        <b-input type="text" v-model="lo_lastName" id="lastName"></b-input>
                    </div>

                    <!--Sex-->
                    <div class="mb-3">
                        <label >เพศ</label> 
                        <br>
                        <input type="radio" id="male" value="male" v-model="lo_sex" class="mr-1" required />
                        <label for="male" class="mr-4 font-weight-normal">ชาย</label>

                        <input type="radio" id="female" value="female" v-model="lo_sex" class="mr-1" required />
                        <label for="female" class="mr-4 font-weight-normal">หญิง</label>

                        <input type="radio" id="other" value="other" v-model="lo_sex" class="mr-1" checked required />
                        <label for="other" class="mr-4 font-weight-normal">อื่นๆ</label>
                        <br>
                    </div>

                    <!--Phone-->
                    <div class="mb-3">
                        <label for="Phone">เบอร์โทรศัพท์</label>
                        <b-input type="text" v-model="lo_phone" id="Phone"></b-input>
                    </div>

                    <!--Address-->
                    <div class="mb-3">
                        <label for="address">ที่อยู่</label>
                        <b-row id="address" class="px-3">
                            <b-col sm="4" class="font-weight">
                                <label for="addr_no"><small>เลขที่</small></label>
                                <input type="text" class="form-control mb-2" id="addr_no" placeholder="เลขที่" v-model="lo_address.addr_no" required> 
                            </b-col>
                            <b-col sm="4">
                                <label for="addr_soi"><small>ซอย</small></label>
                                <input type="text" class="form-control mb-2" id="addr_soi" placeholder="ซอย" v-model="lo_address.addr_soi" required> 
                            </b-col>
                            <b-col sm="4">
                                <label for="addr_road"><small>ถนน</small></label>
                                <input type="text" class="form-control mb-2" id="addr_road" placeholder="ถนน" v-model="lo_address.addr_road" required> 
                            </b-col>
                            <b-col sm="4">
                                <label for="addr_road"><small>แขวง</small></label>
                                <input type="text" class="form-control mb-2" id="addr_subDistrict" placeholder="แขวง" v-model="lo_address.addr_subDistrict" required> 
                            </b-col>
                            <b-col sm="4">
                                <label for="addr_road"><small>เขต</small></label>
                                <b-dropdown id="district" 
                                    :text="lo_address.addr_district"
                                    block
                                    split
                                    variant="outline-secondary"
                                >
                                    <b-dropdown-item 
                                        v-for="district in districts" 
                                        :key="district.id" 
                                        v-model="lo_address.addr_district" 
                                        @click="address.addr_district=district.name"
                                    >
                                        {{district.name}}
                                    </b-dropdown-item>
                                </b-dropdown>
                            </b-col>
                            <b-col sm="4">
                                <label for="addr_road"><small>จังหวัด</small></label>
                                <input type="text" class="form-control mb-2" id="addr_district" placeholder="จังหวัด" v-model="lo_address.addr_province" required disabled> 
                            </b-col>
                        </b-row>
                    </div>

                    <!--Button-->
                    <div class="mb-3">
                        <b-btn v-b-tooltip.hover title="บันทึกข้อมูลส่วนตัว" class="float-right" @click="editInfo">บันทึก</b-btn>
                    </div>
                </b-col>

                <!--Change image profile-->
                <b-col sm="4">
                    <center>
                        <img :src="userData.lo_img" width="150px" height="150px" style="object-fit: cover;"> <br>

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


            <!--Edit Location Service-->
            <h5>ข้อมูลการให้บริการของสถานที่</h5><hr>
            <b-row class="mb-4 px-4">
                <b-col sm="8" style="border-right: 1px solid #CED4DA;" class="mb-4">
                    
                    <!--Location Name-->
                    <div class="mb-3">
                        <label for="locationName">ชื่อสถานที่</label>
                        <b-input type="text" v-model="lo_locationName" id="locationName"></b-input>
                    </div>

                    <!--Location Cost-->
                    <div class="mb-3">
                        <label for="cost">ราคา</label>
                        <b-input type="text" v-model="lo_cost" id="cost"></b-input>
                    </div>

                    <!--Equipment-->
                    <div class="mb-3">
                        <label for="equipment">อุปกรณ์</label>

                        <b-input-group 
                            v-for="(equipment, index) in lo_equipment"  
                            :key="index" 
                            :prepend="'อุปกรณ์ที่ '+ (index+1)" 
                            class="mb-2"
                        >
                            <b-form-input v-model="lo_equipment[index]" placeholder="ป้อนชื่ออุปกรณ์ . . ." required></b-form-input>
                            <b-input-group-append>
                            <b-button v-b-tooltip.hover title="ลบอุปกรณ์" variant="danger" v-on:click="deleteEquipment(index)">ลบ</b-button>
                            </b-input-group-append>
                        </b-input-group>

                        <b-btn v-b-tooltip.hover title="เพิ่มอุปกรณ์" block v-on:click="addEquipment" variant="outline-dark"><b-icon icon="plus"></b-icon>เพิ่มอุปกรณ์</b-btn>
                    </div>

                    <div class="mb-3">
                        <label>คำอธิบายเกี่ยวกับสถานที่</label>
                        <b-form-textarea
                            required
                            id="descriptionText"
                            v-model="lo_description"
                            placeholder="เขียนคำอธิบายเกี่ยวกับสถานที่ได้ที่นี่ . . . "
                            rows="5"
                            max-rows="5"
                        >
                        </b-form-textarea>
                    </div>

                    <!--Button-->
                    <div class="mb-3">
                        <b-btn v-b-tooltip.hover title="บันทึกข้อมูลส่วนตัว" class="float-right" @click="editLocation">บันทึก</b-btn>
                    </div>
                </b-col>

                <!--Active Status-->
                <b-col sm="4" class="text-center ">
                    <h5>สถานะการให้บริการ</h5>
                    <b-icon class="buttonStatus" v-if="locationStatus" icon="toggle-on" font-scale="3" variant="success" @click="statusOff"></b-icon>
                    <b-icon class="buttonStatus" v-if="!locationStatus" icon="toggle-off" font-scale="3" variant="dark" @click="statusOn"></b-icon>
                    <p v-if="locationStatus" class="text-success">สถานะ: เปิดการให้บริการ</p>
                    <p v-if="!locationStatus"  class="text-secondary">สถานะ: ปิดการบริการ</p>
                </b-col>
            </b-row>

            <!--Change Password-->
            <h5>เปลี่ยนรหัสผ่าน</h5> <hr>
            <b-row class="mb-4 p-2">
                <b-col sm="7">
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
        name: 'LocationEditProfile',
        data() {
            return {
                equipment: '',
                img: '',
                selectedImage: {},
                
                //Data
                districts: [
                    {id:1, name: 'ลาดกระบัง'}
                ],

                userData: '',
                locationStatus: '',

                //
                lo_firstName: '',
                lo_lastName: '',
                lo_sex: '',
                lo_address: [],
                lo_phone: '',

                //
                lo_locationName: '',
                lo_cost: '',
                lo_equipment: [],
                lo_description: '',
            }
        },
        created() {
            this.userData = JSON.parse(localStorage.getItem('userData'))
            
            //set userData from firebase
            firebase.firestore().collection('location').doc(this.userData.lo_id).get()
            .then(doc => {
                localStorage.setItem('userData', JSON.stringify(doc.data()))
                this.loadingStatus = false
            })
            .catch(err => {console.log(err)})

            this.locationStatus = this.userData.lo_status
            
            //
            this.lo_firstName = this.userData.lo_firstName
            this.lo_lastName = this.userData.lo_lastName
            this.lo_sex = this.userData.lo_sex
            this.lo_address = this.userData.lo_address
            this.lo_phone = this.userData.lo_phone

            //
            this.lo_locationName = this.userData.lo_locationName
            this.lo_cost = this.userData.lo_cost
            this.lo_equipment = this.userData.lo_equipment
            this.lo_description = this.userData.lo_description


        },
        methods: {
            //เลือกรูป
            chooseFile(event){
                this.selectedImage = event.target.files[0]
            },

            //เปลี่ยนรูป 
            uploadImage() {
                firebase.storage().ref('location/' + this.userData.lo_id + '/profile.jpg').put(this.selectedImage)
                .then(() => {

                    firebase.storage().ref('location/' + this.userData.lo_id + '/profile.jpg').getDownloadURL()
                    .then(imgURL => {
                        this.img = imgURL

                        firebase.firestore().collection('location').doc(this.userData.lo_id).update({
                            lo_img: imgURL
                        })
                        .catch(err => { console.log(err) })
                    })
                    .catch(err => {console.log(err)})

                    alert('เปลี่ยนรูปสำเร็จ')
                })
                .catch(err => {console.log(err)})
            },
            //ไม่พร้อมให้บริการ = search ไม่เจอ
            statusOff() {
                var info = {
                    locationStatus: this.locationStatus,
                    lo_id: this.userData.lo_id
                }
                axios.post('http://128.199.236.172:5000/changeLocationStatus', info)
                .then(
                    res => {
                        if(res.status === 200) {
                            this.locationStatus = false
                            alert('เปลี่ยนสถานะการให้บริการสำเร็จ')
                        }
                    }
                )
            },
            //พร้อมให้บริการ = search เจอ
            statusOn() {
                var info = {
                    locationStatus: this.locationStatus,
                    lo_id: this.userData.lo_id
                }
                axios.post('http://128.199.236.172:5000/changeLocationStatus', info)
                .then(
                    res => {
                        if(res.status === 200) {
                            this.locationStatus = true
                            alert('เปลี่ยนสถานะการให้บริการสำเร็จ')
                        }
                    }
                )
            },
            //แก้ไขข้อมูลส่วนตัวของสถานที่
            editInfo() {
                var info = {
                    lo_id: this.userData.lo_id,
                    lo_firstName: this.lo_firstName,
                    lo_lastName: this.lo_lastName,
                    lo_sex: this.lo_sex,
                    lo_phone: this.lo_phone,
                    lo_address: this.lo_address
                }
                axios.post('http://128.199.236.172:5000/editLocationInfo', info)
                .then(
                    res => {
                        if(res.status === 200) {
                            alert('แก้ไขข้อมูลส่วนตัวสำเร็จ')
                            location.reload()
                        }
                    }
                )
            },
            //แก้ไขข้อมูลการให้บริการของสถานที่
            editLocation() {
                var info = {
                    lo_id: this.userData.lo_id,
                    lo_locationName: this.lo_locationName,
                    lo_cost: this.lo_cost,
                    lo_equipment: this.lo_equipment,
                    lo_description: this.lo_description
                }
                axios.post('http://128.199.236.172:5000/editLocationServiceInfo', info)
                .then(
                    res => {
                        if(res.status === 200) {
                            alert('แก้ไขข้อมูลการให้บริการของสถานที่สำเร็จ')
                            location.reload()
                        }
                    }
                )
                .catch(err => {
                    console.log(err)
                })
            },

            //เพิ่ม-ลบ อุปกรณ์
            addEquipment() {
                if(this.lo_equipment.length < 10)
                    this.lo_equipment.push('')
                else
                    alert('เพิ่มจำนวนอุปกรณ์ได้ไม่เกิน 10 ชิ้นเท่านั้น')
            },
            deleteEquipment(index) {
                this.lo_equipment.splice(index, 1)
            }
        }
    }
</script>

<style scoped>
    .editBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }

    .buttonStatus {
        cursor: pointer;
    }
</style>