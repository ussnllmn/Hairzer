<!--/src/Profile.vue-->

<template>
    <div class="profile">
        <b-row class="justify-content-center">
            <!--Nav-->
            <b-col lg="2">
                <ProfileBar></ProfileBar>
            </b-col>
            <!--Router Views-->
            <b-col lg="10" class="p-2">
                <router-view></router-view>
                <p>{{userData}}</p>
            </b-col>
        </b-row>
        
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore'
    import { mapGetters } from "vuex";
    import ProfileBar from './ProfileBar.vue'

    export default {
        name: 'Profile',
        components: {
            ProfileBar
        },
        beforeCreate() {
            //check สถานะการเข้าสู่ระบบ
            firebase.auth().onAuthStateChanged(user => {
                if (!user) {
                    this.$router.replace({name: 'Home'}).catch(()=>{})
                }
            })
        },
        data() {
            return {
                userData: ''
            }
        },
        computed: {
            ...mapGetters({
            user: "user"
            })
        }
    }
</script>