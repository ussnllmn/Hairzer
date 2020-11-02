<!--/src/components/Navbar.vue-->

<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-success">
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

                <ul class="navbar-nav ml-auto">
                    <!--ปุ่ม Sign-in และ Profile-->
                    <router-link class="nav-link" v-if="user.loggedIn" :to="{ name: 'Profile' }">โปรไฟล์</router-link>
                    <router-link class="nav-link" v-else :to="{ name: 'Signin' }">เข้าสู่ระบบ</router-link>

                    <!--ปุ่ม Sign-out และ Sign-up-->
                    <a style="cursor: pointer;" class="nav-link" v-if="user.loggedIn" @click="signOut" >ออกจากระบบ</a>
                    <router-link class="nav-link" v-else :to="{ name: 'Signup' }">สมัครสมาชิก</router-link>
                    
                </ul>
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
        signOut() {
            firebase.auth().signOut()
            .then(() => {
                this.$router.replace({name: 'Home'})
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