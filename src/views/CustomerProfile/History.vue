<template>
    <div class="history">
        <Loading v-if="loadingStatus"></Loading>

        <h1>ประวัติการใช้บริการ</h1> 
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
            <b-row v-for="appointment in appointmentHistoryList" :key="appointment.apptmt_id" class="appointmentList py-4 align-items-center">
                <!--วัน/เวลา-->
                <b-col sm="2">{{appointment.appmt_date}}</b-col>
                <b-col sm="1">{{appointment.appmt_time}}</b-col>
                
                <!--สถานที่-->
                <b-col>
                    <b-img :src="appointment.appmt_location.lo_img" rounded="circle" width="80px" height="80px" style="object-fit: cover;"></b-img>
                    <p> {{appointment.appmt_location.lo_locationName}}</p>
                </b-col>

                <!--ช่างตัดผม-->
                <b-col>
                    <b-img :src="appointment.appmt_barber.barb_img" rounded="circle" width="80px" height="80px" style="object-fit: cover;"></b-img>
                    <p> {{appointment.appmt_barber.barb_firstName}} {{appointment.appmt_barber.barb_lastName}}</p>
                </b-col>

                <!--บริการ-->
                <b-col>
                    <p v-for="(service, index) in appointment.appmt_service" :key="index">{{index+1}}. {{service.service_name}}</p>
                </b-col>

                <!--สถานะ-->
                <b-col sm="1">
                    <p v-if="appointment.appmt_status == 'success'" class="text-success">สำเร็จ</p>
                    <p v-if="appointment.appmt_status == 'cancel'" class="text-danger">ยกเลิก</p>
                    <p v-if="appointment.appmt_status == 'reviewed'" class="text-primary">รีวิวสำเร็จ</p>
                    <p v-if="appointment.appmt_status == 'location reviewed'" class="text-primary">รีวิวสถานที่แล้ว</p>
                    <p v-if="appointment.appmt_status == 'barber reviewed'" class="text-primary">รีวิวช่างตัดผมแล้ว</p>
                </b-col>

                <!--ปุ่มถ้าสถานะ == success-->
                <b-col v-if="appointment.appmt_status == 'success'">
                    <div >
                        <b-btn v-b-tooltip.hover title="รายละเอียดการนัดหมาย" variant="primary" v-on:click="appointmentInfo(appointment.appmt_id)"><b-icon icon="info"></b-icon></b-btn>
                        <b-btn v-b-tooltip.hover title="รีวิวสถานที่" class="m-2" variant="info" v-on:click="locationReview(appointment.appmt_id)"><b-icon icon="geo-alt-fill"></b-icon></b-btn>
                        <b-btn v-b-tooltip.hover title="รีวิวช่างตัดผม" variant="dark" v-on:click="barberReview(appointment.appmt_id)"><b-icon icon="scissors"></b-icon></b-btn>
                    </div>
                </b-col>

                <!--ปุ่มถ้าสถานะ == cancel-->
                <b-col v-if="appointment.appmt_status == 'cancel'">
                    <div >
                        <b-btn v-b-tooltip.hover title="รายละเอียดการนัดหมาย" variant="primary" v-on:click="appointmentInfo(appointment.appmt_id)"><b-icon icon="info"></b-icon></b-btn>
                        <b-btn v-b-tooltip.hover title="ลบประวัติการนัดหมาย" class="m-2" variant="danger" v-on:click="deleteAppointment(appointment.appmt_id)"><b-icon icon="trash-fill"></b-icon></b-btn>
                    </div>
                </b-col>

                <!--ปุ่มถ้าสถานะ == reviewed-->
                <b-col v-if="appointment.appmt_status == 'reviewed'">
                    <div >
                        <b-btn v-b-tooltip.hover title="รายละเอียดการนัดหมาย" variant="primary" v-on:click="appointmentInfo(appointment.appmt_id)"><b-icon icon="info"></b-icon></b-btn>
                        <b-btn v-b-tooltip.hover title="ลบการประวัตินัดหมาย" class="m-2" variant="danger" v-on:click="deleteAppointment(appointment.appmt_id)"><b-icon icon="trash-fill"></b-icon></b-btn>
                    </div>
                </b-col>

                <!--ปุ่มถ้าสถานะ == location reviewed-->
                <b-col v-if="appointment.appmt_status == 'location reviewed'">
                    <div >
                        <b-btn v-b-tooltip.hover title="รายละเอียดการนัดหมาย" variant="primary" v-on:click="appointmentInfo(appointment.appmt_id)"><b-icon icon="info"></b-icon></b-btn>
                        <b-btn v-b-tooltip.hover title="รีวิวช่างตัดผม" class="m-2" variant="dark" v-on:click="barberReview(appointment.appmt_id)"><b-icon icon="scissors"></b-icon></b-btn>
                    </div>
                </b-col>

                <!--ปุ่มถ้าสถานะ == barber reviewed-->
                <b-col v-if="appointment.appmt_status == 'barber reviewed'">
                    <div >
                        <b-btn v-b-tooltip.hover title="รายละเอียดการนัดหมาย" variant="primary" v-on:click="appointmentInfo(appointment.appmt_id)"><b-icon icon="info"></b-icon></b-btn>
                        <b-btn v-b-tooltip.hover title="รีวิวสถานที่" class="m-2" variant="info" v-on:click="locationReview(appointment.appmt_id)"><b-icon icon="geo-alt-fill"></b-icon></b-btn>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import Loading from '../../components/Loading'

    export default {
        name: 'History',
        components: {
            Loading
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
            this.loadingStatus = true

            //get customer data from firebase
            this.userData = JSON.parse(localStorage.getItem('userData'))
            
            var data = {
                id: this.userData.cus_id
            }

            //request appointment history data
            axios.post('http://128.199.236.172:5000/appointmentHistory', data)
            .then(
                res => {
                    if(res.status === 200) {
                        this.appointmentHistoryList = res.data.appointmentHistory
                        this.loadingStatus = false
                    }
                }
            )
        },
        data() {
            return {
                userData: '',
                appointmentHistoryList: '',
            }
        },
        methods: {
            //ดูรายละเอียดนัดหมาย
            appointmentInfo(appointmentID) {
                this.$router.push({path: `/customer/appointment/${appointmentID}`})
            },

            //รีวิวสถานที่
            locationReview(appointmentID) {
                this.$router.push({path: `/customer/location_review/${appointmentID}`})
            },

            //รีวิวช่างตัดผม
            barberReview(appointmentID) {
                this.$router.push({path: `/customer/barber_review/${appointmentID}`})
            },
            
            //ลบนัดหมาย (เปลี่ยนสถานะเป็น cancel)
            deleteAppointment(appointmentID) {
                this.loadingStatus = true

                var appointmentDelete = {
                    appmt_id: appointmentID
                }
                axios.post('http://128.199.236.172:5000/appointmentDelete', appointmentDelete)
                .then(
                    res => {
                        if(res.status === 200) {
                            alert('ลบการนัดหมายสำเร็จ')
                            this.loadingStatus = false
                        }
                    }
                ).catch(err => console.log(err))
            }
        },
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
