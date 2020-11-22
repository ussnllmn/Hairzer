<template>
    <div class="appointment">
        <h1>จัดการนัดหมายของช่างตัดผม</h1>
        <div class="px-2 text-center shadow-sm">
            <!--Title-->
            <b-row class="font-weight-bold h5 py-4 titleAppmt mb-0">
                <b-col sm="2">วันที่</b-col>
                <b-col sm="1">เวลา</b-col>
                <b-col>ลูกค้า</b-col>
                <b-col>สถานที่</b-col>
                <b-col>บริการ</b-col>
                <b-col sm="1">สถานะ</b-col>
                <b-col></b-col>
            </b-row>

            <!--Appointment-->
            <b-row v-for="appointment in appointmentList" :key="appointment.apptmt_id" class="appointmentList py-4 align-items-center">
                <b-col sm="2">{{appointment.appmt_date}}</b-col>
                <b-col sm="1">{{appointment.appmt_time}}</b-col>
                <b-col>
                    <b-img :src="appointment.appmt_location.lo_img" rounded="circle" width="80px" height="80px" style="object-fit: cover;"></b-img>
                    <p> {{appointment.appmt_location.lo_locationName}}</p>
                </b-col>
                <b-col>
                    <b-img :src="appointment.appmt_customer.cus_img" rounded="circle" width="80px" height="80px"></b-img>
                    <p> {{appointment.appmt_customer.cus_firstName}} {{appointment.appmt_customer.cus_lastName}}</p>
                </b-col>
                <b-col>
                    <li v-for="service in appointment.appmt_service" :key="service.service_id">{{service.service_name}}</li>
                </b-col>
                <b-col v-if="appointment.appmt_status == 'waiting'" sm="1" class="text-warning">รอใช้บริการ</b-col>
                <b-col >
                    <b-btn v-b-tooltip.hover title="รายละเอียดการนัดหมาย" variant="primary" class="mr-2" v-on:click="appointmentInfo(appointment.appmt_id)"><b-icon icon="info"></b-icon></b-btn>
                    <b-btn v-b-tooltip.hover title="ยกเลิกนัดหมาย" variant="danger" v-on:click="appointmentCancel(appointment.appmt_id)"><b-icon icon="x"></b-icon></b-btn>
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
        name: 'BarberAppointmentManagement',
        data() {
            return {
                userData: '',
                appointmentList: []
            }
        },
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
                id: this.userData.barb_id
            }

            //request appointment data
            axios.post('http://localhost:5000/appointmentBarber', data)
            .then(
                res => {
                    if(res.status === 200) {
                        this.appointmentList = res.data.appointment
                    }
                }
            )
        },
        methods: {
            appointmentInfo(appointmentID) {
                this.$router.push({path: `/barber/appointment/${appointmentID}`})
            },

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
