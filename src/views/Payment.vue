<template>
    <div class="payment">
        
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Payment',
        beforeCreate() {
            //check การเข้าสู่ระบบ
            firebase.auth().onAuthStateChanged(user => {
                if (!user) {
                    this.$router.replace({name: 'Signin'}).catch(()=>{})
                }
            })

            //get value จาก uid
            firebase.firestore().collection('customer').doc(firebase.auth().currentUser.uid).get()
            .then(doc => {
                this.userData = doc.data()
            })
            .catch(err => { console.log(err) })  
        },
        data() {
            return {
                
            }
        },
        methods: {
            confirm() {

            }
        }
    }
</script>