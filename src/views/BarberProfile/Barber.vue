<!--/src/Profile.vue-->

<template>
    <div class="barber">
        <b-row>
            <!--Nav-->
            <b-col lg="2">
                <ProfileBar></ProfileBar>
            </b-col>
            
            <!--Router Views-->
            <b-col log="8" class="mb-4 mx-auto">
                <router-view></router-view>
            </b-col>
            <b-col lg="2"></b-col>
        </b-row>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/auth'
    import 'firebase/firestore'
    import ProfileBar from './ProfileBar'

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
        }
    }
</script>
