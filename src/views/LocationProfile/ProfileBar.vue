<template>
    <div class="profileBar shadow-sm p-4">
        <!--Image-->
        <center><img :src="userData.lo_img" width="90%" rounded="circle" style="object-fit: cover;" class="p-3"></center>
        <center><h4>{{userData.lo_locationName}}</h4></center>
        
        <!--Menu-->
        <div class="mt-4 menu">
            <router-link :to="{name: 'LocationProfile'}">โปรไฟล์</router-link> <hr>
            <router-link :to="{name: 'LocationEditProfile'}">แก้ไขข้อมูลส่วนตัว</router-link> <hr>
            <router-link :to="{name: 'LocationProfile'}">จัดการนัดหมาย</router-link> <hr>
            <router-link :to="{name: 'LocationProfile'}">ประวัติการให้บริการ</router-link> <hr>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore'

    export default {
        name: 'ProfileBar',
        created() {
            this.userData = JSON.parse(localStorage.getItem('userData'))
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
        background-color: #343A40;
        left: 0;
        color: whitesmoke;
    }
    @media (max-width:768px){
        .profileBar{
            display:none;
        }
    }
    .menu a {
        color: lightgray;
        text-decoration: none;
    }
    .menu a:hover {
        color:gray;
    }

</style>