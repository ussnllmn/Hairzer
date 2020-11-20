<template>
    <div class="LocationEditProfile">
        <h1>แก้ไขข้อมูลส่วนตัว</h1>

        <div class="editBox shadow-sm p-2">
            <h5>ข้อมูลของฉัน</h5><hr>
            <b-row class="mb-4 px-4">
                <!--Edit Profile-->
                <b-col sm="7" style="border-right: 1px solid #CED4DA;" class="mb-4">
                    {{userData}}
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

            <h5>ข้อมูลการให้บริการสถานที่</h5><hr>
            <b-row class="mb-4 px-4">
                <!--Edit Location Service-->
                <b-col sm="7" style="border-right: 1px solid #CED4DA;" class="mb-4">

                </b-col>

                <!--Active Status-->
                <b-col sm="5" class="text-center">
                    <p>สถานะการให้บริการ</p>
                    <b-icon v-if="userData.lo_status" icon="toggle-on" font-scale="3" variant="success"></b-icon>
                    <b-icon v-if="!userData.lo_status" icon="toggle-off" font-scale="3" variant="danger"></b-icon>
                    
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
                userData: ''
            }
        },
        created() {
            this.userData = JSON.parse(localStorage.getItem('userData'))
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