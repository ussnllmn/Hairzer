<template>
    <div class="profileBar p-4">
        <!--Image-->
        <center><img src="" width="120px" height="120px"></center>
        <center><p>{{userData.cus_firstName}} {{userData.cus_lastName}}</p></center>
        
        <!--Menu-->
        <div class="mt-4">
            <router-link :to="{name: 'EditProfile'}">แก้ไขข้อมูลส่วนตัว</router-link> <hr>
            <router-link :to="{name: 'Appointment'}">จัดการนัดหมาย</router-link> <hr>
            <router-link :to="{name: 'History'}">ประวัติการใช้บริการ</router-link> <hr>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';

    export default {
        name: 'ProfileBar',
        beforeCreate() {
            firebase.firestore().collection('user').doc(firebase.auth().currentUser.uid).get()
            .then(doc => {
                console.log(doc.data())
                this.userData = doc.data()
            }).catch(err => { console.log(err) })  
        },
        data() {
            return {
                userData: []
            }
        }
    }
</script>

<style scoped>
    .profileBar { 
        width: 100%;
        height: 100%;
        position: relative;
        background-color: whitesmoke;
        left: 0;
    }
    @media (max-width:640px){
        .profileBar{
            display:none;
        }
    }


</style>