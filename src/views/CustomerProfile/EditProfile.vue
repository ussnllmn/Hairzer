<template>
    <div class="editprofile">
        <h1>แก้ไขข้อมูลส่วนตัว</h1>
        <div class="editBox p-2">
            <h5>ข้อมูลของฉัน</h5> <hr>
            <!--Edit Profile-->
            <b-row class="mb-4 px-4">
                <b-col sm="7" style="border-right: 1px solid #CED4DA;" class="mb-4">
                    <!--First Name-->
                    <div class="mb-2">
                        <label for="firstName">ชื่อ</label>
                        <b-input type="text" value="" id="firstName"></b-input>
                    </div>

                    <!--Last Name-->
                    <div class="mb-2">
                        <label for="lastName">นามสกุล</label>
                        <b-input type="text" value="" id="lastName"></b-input>
                    </div>

                    <!--Sex-->
                    <div class="mb-2">
                        <label >เพศ</label> 
                        <br>
                        <input type="radio" id="male" value="male" v-model="Sex" class="mr-1" required />
                        <label for="male" class="mr-4 font-weight-normal">ชาย</label>

                        <input type="radio" id="female" value="female" v-model="Sex" class="mr-1" required />
                        <label for="female" class="mr-4 font-weight-normal">หญิง</label>

                        <input type="radio" id="other" value="other" v-model="Sex" class="mr-1" checked required />
                        <label for="other" class="mr-4 font-weight-normal">อื่นๆ</label>
                        <br>
                    </div>

                    <!--Phone-->
                    <div class="mb-2">
                        <label for="Phone">เบอร์โทรศัพท์</label>
                        <b-input type="text" value="" id="Phone"></b-input>
                    </div>

                    <div class="mb-2">
                        <b-btn class="float-right">บันทึก</b-btn>
                    </div>
                </b-col>
                
                <!--Change image profile-->
                <b-col sm="5">
                    <center>
                        <img src="" width="150px" height="150px"> <br>

                        <div class="upload">
                            <label>Upload file
                                <input type="file" id="file" ref="uploadFile"/>
                            </label>
                            <b-btn>อัพโหลดรูปภาพ</b-btn>
                        </div>
                    </center>
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
                        <b-btn class="float-right">เปลี่ยนรหัสผ่าน</b-btn>
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
    name: 'EditProfile',
    data() {
        return {
            Sex: 'male',
            uploadFile: ''
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
</style>