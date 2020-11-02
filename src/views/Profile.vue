<!--/src/Profile.vue-->

<template>
    <div class="profile">
        <h1>Profile</h1>
        <div class="my-4">
            <p>{{userData}}:</p>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore'

    import { mapGetters } from "vuex";

    export default {
        name: 'Profile',
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