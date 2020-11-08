<!--/src/Profile.vue-->

<template>
    <div class="profile">
        <b-row>
            <!--Nav-->
            <b-col cols="3">
                <ProfileBar></ProfileBar>
            </b-col>
            <!--Router Views-->
            <b-col cols="9" class="p-2">
                <router-view></router-view>
            </b-col>
        </b-row>
        <p>{{userData}}</p>
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

            //get value จาก uid
            firebase.firestore().collection('user').doc(firebase.auth().currentUser.uid).get()
            .then(doc => {
                console.log(doc.data())
                this.userData = doc.data()
            }).catch(err => { console.log(err) })  
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