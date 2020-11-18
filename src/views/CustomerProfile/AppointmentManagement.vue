<template>
    <div class="appointment">
        <h1>จัดการนัดหมาย</h1>
        <div class="px-2 text-center shadow-sm">
            <!--Title-->
            <b-row class="font-weight-bold h5 py-4 titleAppmt mb-0">
                <b-col sm="2">วันที่</b-col>
                <b-col sm="1">เวลา</b-col>
                <b-col>สถานที่</b-col>
                <b-col>ช่างตัดผม</b-col>
                <b-col>บริการ</b-col>
                <b-col sm="1">สถานะ</b-col>
                <b-col></b-col>
            </b-row>

            <!--Appointment-->
            <b-row v-for="appointment in appointmentList" :key="appointment.apptmt_id" class="appointmentList py-4 align-items-center">
                <b-col sm="2">{{appointment.appmt_date}}</b-col>
                <b-col sm="1">{{appointment.appmt_time}}</b-col>
                <b-col>
                    <b-img :src="appointment.appmt_location.lo_img" rounded="circle" width="80px" height="80px"></b-img>
                    <p> {{appointment.appmt_location.lo_locationName}}</p>
                </b-col>
                <b-col>
                    <b-img :src="appointment.appmt_barber.barb_img" rounded="circle" width="80px" height="80px" style="object-fit: cover;"></b-img>
                    <p> {{appointment.appmt_barber.barb_firstName}} {{appointment.appmt_barber.barb_lastName}}</p>
                </b-col>
                <b-col>
                    <p v-for="(service, index) in appointment.appmt_service" :key="index">{{index+1}}. {{service.service_name}}</p>
                </b-col>
                <b-col sm="1" class="text-warning">{{appointment.appmt_status}}</b-col>
                <b-col >
                    <b-btn v-b-tooltip.hover title="รายละเอียดการนัดหมาย" variant="primary" v-on:click="appointmentInfo(appointment.appmt_id)"><b-icon icon="info"></b-icon></b-btn>
                    <b-btn v-b-tooltip.hover title="ยืนยันการใช้บริการ" variant="success" v-on:click="appointmentSuccess(appointment.appmt_id)" class="m-2"><b-icon icon="check"></b-icon></b-btn>
                    <b-btn v-b-tooltip.hover title="ยกเลิกการใช้บริการ" variant="danger" v-on:click="appointmentCancel(appointment.appmt_id)"><b-icon icon="x"></b-icon></b-btn>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import firebase from 'firebase/app';
    import 'firebase/auth';

  export default {
    name: 'Appointment',
    beforeCreate() {
        //check สถานะการเข้าสู่ระบบ
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                this.$router.replace({name: 'Home'}).catch(()=>{})
            }
        })
    },    
    created() {
        //get customer data from firebase
        this.userData = JSON.parse(localStorage.getItem('userData'))
        
        var data = {
            id: this.userData.cus_id
        }

        //request appointment data
        axios.post('http://localhost:5000/appointment', data)
        .then(
            res => {
                if(res.status === 200) {
                    this.appointmentList = res.data.appointment
                }
            }
        )
    },
    /*updated() {
        var data = {
            id: this.userData.cus_id
        }

        //request appointment data
        axios.post('http://localhost:5000/appointment', data)
        .then(
            res => {
                if(res.status === 200) {
                    this.appointmentList = res.data.appointment
                }
            }
        )
    },*/
    data() {
        return {
            userData: '',
            appointmentList: []
        }
    },
    methods: {
        //ดูรายละเอียดนัดหมาย
        appointmentInfo(appointmentID) {
            this.$router.push({path: `/customer/appointment/${appointmentID}`})
        },

        //ยืนยันการนัดหมาย
        appointmentSuccess(appointmentID) {
            var appointmentSuccess = {
                appmt_id: appointmentID
            }

            axios.post('http://localhost:5000/appointmentSuccess', appointmentSuccess)
            .then(
                res => {
                    if(res.status === 200) {
                        alert('ยืนยันการใช้บริการสำเร็จ')
                    }
                }
            )
        },

        //ยกเลิกหนัดหมาย
        appointmentCancel(appointmentID) {
            var appointmentCancel = {
                appmt_id: appointmentID
            }

            axios.post('http://localhost:5000/appointmentCancel', appointmentCancel)
            .then(
                res => {
                    if(res.status === 200) {
                        alert('ยกเลิกการนัดหมายสำเร็จ')
                    }
                }
            )
        }
    }
  }
</script>

<style scoped>
    .titleAppmt {
        background-color: whitesmoke;
        border-bottom: 1px #EBEBEB solid;
    }
    .appointmentBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }

    .appointmentList {
        border-bottom: 1px #EBEBEB solid;
    }
    .appointmentList:hover {
        background-color: whitesmoke;
        cursor: pointer;
    }
</style>
