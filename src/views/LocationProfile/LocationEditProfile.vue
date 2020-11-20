<template>
    <div class="LocationEditProfile">
        <h1>แก้ไขข้อมูลส่วนตัว</h1>

        <div class="editBox shadow-sm p-2">
            <h5>ข้อมูลของฉัน</h5><hr>
            <b-row class="mb-4 px-4">
                <!--Edit Profile-->
                <b-col sm="7" style="border-right: 1px solid #CED4DA;" class="mb-4">
                    <!--First Name-->
                    <div class="mb-2">
                        <label for="firstName">ชื่อ</label>
                        <b-input type="text" v-model="lo_firstName" id="firstName"></b-input>
                    </div>

                    <!--First Name-->
                    <div class="mb-2">
                        <label for="lastName">นามสกุล</label>
                        <b-input type="text" v-model="lo_lastName" id="lastName"></b-input>
                    </div>

                    <!--Sex-->
                    <div class="mb-2">
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
                    <div class="mb-2">
                        <label for="Phone">เบอร์โทรศัพท์</label>
                        <b-input type="text" v-model="lo_phone" id="Phone"></b-input>
                    </div>

                    <!--Button-->
                    <div class="mb-2">
                        <b-btn v-b-tooltip.hover title="บันทึกข้อมูลส่วนตัว" class="float-right" @click="editInfo">บันทึก</b-btn>
                    </div>
                </b-col>

                <!--Change image profile-->
                <b-col sm="5">
                    <center>
                        <img :src="userData.lo_img" width="150px" height="150px" style="object-fit: cover;"> <br>

                        <div class="upload mt-2">
                            <label>Upload file
                                <input type="file" accept="image/*"/>
                            </label><br>
                            <b-btn v-b-tooltip.hover title="เปลี่ยนรูปโปรไฟล์">เปลี่ยนรูปโปรไฟล์</b-btn><br>
                        </div>
                    </center>
                </b-col>
            </b-row>


            <!--Edit Location Info-->
            <h5>ข้อมูลการให้บริการสถานที่</h5><hr>
            <b-row class="mb-4 px-4">
                <!--Edit Location Service-->
                <b-col sm="7" style="border-right: 1px solid #CED4DA;" class="mb-4">
                    
                    <!--Location Name-->
                    <div class="mb-2">
                        <label for="locationName">ชื่อสถานที่</label>
                        <b-input type="text" v-model="lo_locationName" id="locationName"></b-input>
                    </div>

                    <!--Location Cost-->
                    <div class="mb-2">
                        <label for="cost">ราคา</label>
                        <b-input type="text" v-model="lo_cost" id="cost"></b-input>
                    </div>

                    <!--Equipment-->
                    <div class="mb-2">
                        
                    </div>

                </b-col>

                <!--Active Status-->
                <b-col sm="5" class="text-center buttonStatus">
                    <h5>สถานะการให้บริการ</h5>
                    <b-icon v-if="locationStatus" icon="toggle-on" font-scale="3" variant="success" @click="statusOff"></b-icon>
                    <b-icon v-if="!locationStatus" icon="toggle-off" font-scale="3" variant="dark" @click="statusOn"></b-icon>
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
    export default {
        name: 'LocationEditProfile',
        data() {
            return {
                temp: '',

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
                lo_equiptment: [],
                lo_description: '',

                //
                equipmentList: [
                    'กระจก','เครื่องอบไอน้ำ','เก้าอี้ตัดผมสำหรับเด็ก'
                ]


            }
        },
        created() {
            this.userData = JSON.parse(localStorage.getItem('userData'))
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
            statusOff() {
                this.locationStatus = false
            },
            statusOn() {
                this.locationStatus = true
            },
            editInfo() {
                console.log('แก้ไขแล้ว')
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