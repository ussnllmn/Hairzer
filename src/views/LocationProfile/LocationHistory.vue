<template>
    <div class="locationHistory">
        <h1>ประวัติการให้บริการ</h1>
        <div class="px-2 text-center shadow-sm">
            <!--Title-->
            <b-row class="font-weight-bold h5 py-4 titleAppmt mb-0">
                <b-col sm="2">วันที่</b-col>
                <b-col sm="1">เวลา</b-col>
                <b-col>ลูกค้า</b-col>
                <b-col>ช่างตัดผม</b-col>
                <b-col sm="1">สถานะ</b-col>
                <b-col></b-col>
            </b-row>
            

            <!--Appointment-->
            <b-row v-for="appointment in appointmentList" :key="appointment.apptmt_id" class="appointmentList py-4 align-items-center">
                <b-col sm="2">{{appointment.appmt_date}}</b-col>
                <b-col sm="1">{{appointment.appmt_time}}</b-col>
                <b-col>
                    <b-img :src="appointment.appmt_customer.cus_img" rounded="circle" width="80px" height="80px"></b-img>
                    <p> {{appointment.appmt_customer.cus_firstName}} {{appointment.appmt_customer.cus_lastName}}</p>
                </b-col>
                <b-col>
                    <b-img :src="appointment.appmt_barber.barb_img" rounded="circle" width="80px" height="80px" style="object-fit: cover;"></b-img>
                    <p> {{appointment.appmt_barber.barb_firstName}} {{appointment.appmt_barber.barb_lastName}}</p>
                </b-col>
                <b-col sm="1">
                    <p v-if="appointment.appmt_status == 'success'" class="text-success">สำเร็จ</p>
                    <p v-if="appointment.appmt_status == 'cancel'" class="text-danger">ยกเลิก</p>
                    <p v-if="appointment.appmt_status == 'reviewed'" class="text-primary">ได้รับการรีวิวแล้ว</p>
                    <p v-if="appointment.appmt_status == 'location reviewed'" class="text-primary">ได้รับการรีวิวแล้ว</p>
                    <p v-if="appointment.appmt_status == 'barber reviewed'" class="text-primary">ยังไม่ได้รับการรีวิว</p>
                    <p v-if="appointment.appmt_status == 'delete'" class="text-primary">ได้รับการรีวิวแล้ว</p>
                </b-col>
                <b-col >
                    <b-btn v-b-tooltip.hover title="รายละเอียดการนัดหมาย" variant="primary" class="mr-2" v-on:click="appointmentInfo(appointment.appmt_id)"><b-icon icon="info"></b-icon></b-btn>
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
        name: 'LocationAppointmentManagement',
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
                id: this.userData.lo_id
            }

            //request appointment data
            axios.post('http://128.199.236.172:5000/appointmentLocationHistory', data)
            .then(
                res => {
                    if(res.status === 200) {
                        this.appointmentList = res.data.appointmentHistory
                    }
                }
            )
        },
        data() {
            return {
                userData: '',
                appointmentList: []
            }
        },
        methods: {
            appointmentInfo(appointmentID) {
                this.$router.push({path: `/location/appointment/${appointmentID}`})
            },
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
