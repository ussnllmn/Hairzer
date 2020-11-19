<template>
    <div class="appointment container">
        <h3 class="my-1 backBtn">
            <router-link :to="{name: 'appointmentManagement'}"><b-icon icon="chevron-left"></b-icon>กลับ</router-link>
        </h3>
        <div class="appointmentBox shadow-sm p-4">
            <div class="mb-4">
                <h4>หมายเลขการนัดหมาย: <small>{{appointment.appmt_id}}</small> 
                    | สถานะ: 
                    <small v-if="appointment.appmt_status === `success`" style="color: #28A745">{{appointment.appmt_status}}</small>
                    <small v-if="appointment.appmt_status === `waiting`" style="color: #ffc107">{{appointment.appmt_status}}</small>
                    <small v-if="appointment.appmt_status === `cancel`" style="color: #dc3545">{{appointment.appmt_status}}</small>
                    <small v-if="appointment.appmt_status === `reviewed`" style="color: #007bff">{{appointment.appmt_status}}</small>
                </h4>
            </div>
            
            <!--Detail Box-->
            <b-row>
                <b-col sm="3">
                        <p><b><b-icon icon="calendar3" aria-hidden="true"></b-icon> วัน/เดือน/ปี:</b> {{appointment.appmt_date}}</p>
                        <p><b><b-icon icon="clock" aria-hidden="true"></b-icon> เวลา:</b> {{appointment.appmt_time}}</p>
                </b-col>
                <b-col style="border-left: 1px solid  #CED4DA;">
                    <!--สถานที่-->
                    <p><b><b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon> สถานที่: </b> {{appointment.appmt_location.lo_locationName}}
                        (
                            {{appointment.appmt_location.lo_address.addr_no}}
                            ซอย{{appointment.appmt_location.lo_address.addr_soi}}
                            ถนน{{appointment.appmt_location.lo_address.addr_road}}
                            แขวง{{appointment.appmt_location.lo_address.addr_subDistrict}}
                            เขต{{appointment.appmt_location.lo_address.addr_district}}
                            {{appointment.appmt_location.lo_address.addr_province}}
                        )
                    </p>
                    <!--ช่างตัดผม-->
                    <p><b><b-icon icon="scissors" aria-hidden="true"></b-icon> ช่างตัดผม:</b> 
                        {{appointment.appmt_barber.barb_firstName}} 
                        {{appointment.appmt_barber.barb_lastName}}
                    </p>
                </b-col>
            </b-row>
            <hr>

            <!--Title-->
            <b-row class="text-center font-weight-bold">
                <b-col sm="2">ลำดับ</b-col>
                <b-col>รายการ</b-col>
                <b-col sm="3">ราคา</b-col>
            </b-row> 
            <hr>
            
            <!--Selected Location-->
            <b-row>
                <b-col sm="2" class="text-center">1</b-col>
                <b-col>{{appointment.appmt_location.lo_locationName}}</b-col>
                <b-col sm="3" class="text-center">฿{{appointment.appmt_location.lo_cost}}</b-col>
            </b-row>

            <!--Selected Service-->
            <b-row v-for="(service, index) in appointment.appmt_service" :key="index">
                <b-col sm="2" class="text-center">{{index+2}}</b-col>
                <b-col>บริการ{{service.service_name}}</b-col>
                <b-col sm="3" class="text-center">฿{{service.service_cost}}</b-col>
            </b-row>
            <hr>

            <!--Summary-->
            <b-row>
                <b-col class="text-right">ยอดชำระเงินทั้งหมด</b-col>
                <b-col sm="3" class="text-center">฿{{appointment.appmt_cost}}</b-col>
            </b-row>
            <hr>

        </div>

        <!--Confirm-->
        <div>
            <b-btn class="float-right mt-2 ml-2" variant="primary" v-on:click="barberReview(appointment.appmt_id)">รีวิวช่างตัดผม</b-btn>
            <b-btn class="float-right mt-2" variant="info" v-on:click="locationReview(appointment.appmt_id)">รีวิวสถานที่</b-btn>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'AppointmentID',
        created() {
            axios.get(`http://localhost:5000/appointment/${this.$route.params.appmt_id}`)
            .then(
                res => {
                    if (res.status === 200) {
                        this.appointment = res.data.appointment
                    }
                }
            )
        },
        data() {
            return {
                appointment: ''
            }
        },
        methods: {
            //รีวิวสถานที่
            locationReview(appointmentID) {
                this.$router.push({path: `/customer/location_review/${appointmentID}`})
            },

            //รีวิวช่างตัดผม
            barberReview(appointmentID) {
                this.$router.push({path: `/customer/barber_review/${appointmentID}`})
            },
        }
    }
</script>

<style scoped>
    .appointment {
        height: 725px;
    }

    .appointmentBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }

    .backBtn a{
        text-decoration: none;
        color: #495057;
    }

    .backBtn a:hover{
        text-decoration: none;
        color: darkgray;
    }
</style>