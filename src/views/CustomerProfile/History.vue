<template>
    <div class="history">
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
            <b-row v-for="appointment in appointmentHistoryList" :key="appointment.apptmt_id" class="appointmentList py-4 align-items-center">
                <b-col sm="2">{{appointment.appmt_date}}</b-col>
                <b-col sm="1">{{appointment.appmt_time}}</b-col>
                <b-col>
                    <b-img :src="appointment.appmt_location.lo_img" rounded="circle" width="80px" height="80px" style="object-fit: cover;"></b-img>
                    <p> {{appointment.appmt_location.lo_locationName}}</p>
                </b-col>
                <b-col>
                    <b-img :src="appointment.appmt_barber.barb_img" rounded="circle" width="80px" height="80px" style="object-fit: cover;"></b-img>
                    <p> {{appointment.appmt_barber.barb_firstName}} {{appointment.appmt_barber.barb_lastName}}</p>
                </b-col>
                <b-col>
                    <p v-for="(service, index) in appointment.appmt_service" :key="index">{{index+1}}. {{service.service_name}}</p>
                </b-col>
                <b-col sm="1">
                    <p v-if="appointment.appmt_status == 'success'" class="text-success">{{appointment.appmt_status}}</p>
                    <p v-if="appointment.appmt_status == 'cancel'" class="text-danger">{{appointment.appmt_status}}</p>
                </b-col>
                <b-col>
                    <div v-if="appointment.appmt_status == 'success'">
                        <b-btn variant="info" v-on:click="review(appointment.appmt_id)"><b-icon icon="hand-thumbs-up"></b-icon></b-btn>
                    </div>

                    <div v-if="appointment.appmt_status == 'cancel'">
                        <b-btn variant="danger"  v-on:click="deleteAppointment(appointment.appmt_id)"><b-icon icon="trash-fill"></b-icon></b-btn>
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

    export default {
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

            //request appointment history data
            axios.post('http://localhost:5000/appointmentHistory', data)
            .then(
                res => {
                    if(res.status === 200) {
                        this.appointmentHistoryList = res.data.appointmentHistory
                    }
                }
            )
        },
        /*updated() {
            var data = {
                id: this.userData.cus_id
            }

            //request appointment data
            axios.post('http://localhost:5000/appointmentHistory', data)
            .then(
                res => {
                    if(res.status === 200) {
                        this.appointmentHistoryList = res.data.appointmentHistory
                    }
                }
            )
        },*/
        data() {
            return {
                userData: '',
                appointmentHistoryList: ''
            }
        },
        methods: {
            review(appointmentID) {
                this.$router.push({path: `/customer/review/${appointmentID}`})
            },
            
            deleteAppointment(appointmentID) {
                var appointmentDelete = {
                appmt_id: appointmentID
            }

                axios.post('http://localhost:5000/appointmentDelete', appointmentDelete)
                .then(
                    res => {
                        if(res.status === 200) {
                            alert('ลบการนัดหมายสำเร็จ')
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
