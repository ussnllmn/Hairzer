<!--/src/Profile.vue-->

<template>
    <div class="profile">
        <b-row>
            <!--Nav-->
            <b-col lg="2">
                <ProfileBar></ProfileBar>
            </b-col>
            <!--Router Views-->
            <b-col lg="7" class="mb-4 mx-auto">
                <router-view></router-view>
                <p>{{userData}}</p>
            </b-col>
            <b-col lg="2" class=""></b-col>
        </b-row>
        
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore'
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
    }
</script>