<!--/src/components/Navbar.vue-->

<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-right navbar-dark bg-success">
            <div class="container">
            <!--Logo-->
            <a class="navbar-brand" href="/">
                <img src="../assets/salon.png" width="24px"> HAIRZER
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <!--Home Search Contact-->
                    <router-link class="nav-link" :to="{ name: 'Home' }">หน้าแรก</router-link>
                    <router-link class="nav-link" :to="{ name: 'Search' }">ค้นหา</router-link>
                    <router-link class="nav-link" :to="{ name: 'Contact' }">ช่องทางการติดต่อ</router-link>
                </ul>

                <ul class="navbar-nav ml-auto" v-if="user.loggedIn">
                    <li class="nav-item dropdown dropdown" >
                        <a class="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        โปรไฟล์
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link class="dropdown-item" :to="{ name: 'EditProfile' }">แก้ไขข้อมูลส่วนตัว</router-link>
                            <router-link class="dropdown-item" :to="{ name: 'appointmentManagement' }">จัดการนัดหมาย</router-link>
                            <router-link class="dropdown-item" :to="{ name: 'History' }">ประวัติการใช้บริการ</router-link>
                            <div class="dropdown-divider"></div>
                            <a style="cursor: pointer;" class="dropdown-item" v-if="user.loggedIn" @click="signOut" >ออกจากระบบ</a>
                        </div>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto" v-else>
                <!--ปุ่ม Sign-in และ Profile-->
                    <router-link class="nav-link" :to="{ name: 'Signin' }">เข้าสู่ระบบ</router-link>

                    <!--ปุ่ม Sign-out และ Sign-up-->
                    <router-link class="nav-link" :to="{ name: 'Signup' }">สมัครสมาชิก</router-link>
                </ul>
            </div>
            </div>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

import { mapGetters } from "vuex";

export default {
    name: 'Navbar',
    computed: {
        ...mapGetters({
            user: "user"
        })
    },
    methods: {
        editProfile() {
            
        },
        signOut() {
            firebase.auth().signOut()
            .then(() => {
                this.$router.replace({name: 'Home'}).catch(()=>{})
            })
            .catch(() => {
                alert(err)
            })
        }
    }
}
</script>

<style scoped>
.bg-hairzer {
    background-color: red;
}
</style>