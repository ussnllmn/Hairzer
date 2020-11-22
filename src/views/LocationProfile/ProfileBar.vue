<template>
    <div class="profileBar shadow-sm p-2">
        <!--Image-->
        <center><img :src="userData.lo_img" width="120px" height="120px" rounded="circle" style="object-fit: cover; border-radius: 100%;" class="p-3"></center>
        <center><h5>{{userData.lo_locationName}}</h5></center>
        
        <!--Menu-->
        <div class="mt-4 menu small">
            <hr>
            <router-link :to="{path:`/location/profile/${userData.lo_id}`}">โปรไฟล์</router-link> <hr>
            <router-link :to="{name: 'LocationEditProfile'}">แก้ไขข้อมูลส่วนตัว</router-link> <hr>
            <router-link :to="{name: 'appointmentLocationManagement'}">จัดการนัดหมาย</router-link> <hr>
            <router-link :to="{name: 'LocationHistory'}">ประวัติการให้บริการ</router-link> <hr>
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