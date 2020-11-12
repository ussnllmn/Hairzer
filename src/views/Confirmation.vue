<template>
    <div class="confirmation container">
        <h1>Confirmation</h1>
 
        <!--Summary Box-->
        <div class="confirmBox shadow-sm p-4">
            <!--Detail Box-->
            <div class="detailBox ">
                <b-row>
                    <b-col cols="3">
                        <p><b><b-icon icon="calendar3" aria-hidden="true"></b-icon> วัน/เดือน/ปี:</b> {{selectedDate}}</p>
                        <p><b><b-icon icon="clock" aria-hidden="true"></b-icon> เวลา:</b> {{selectedTime}}</p>
                    </b-col>
                    <b-col style="border-left: 1px solid  #CED4DA;">
                        <p><b><b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon> สถานที่:</b> {{selectedLocation.lo_locationName}} 
                        (
                            {{selectedLocation.lo_address.addr_no}}
                            ซอย{{selectedLocation.lo_address.addr_soi}}
                            ถนน{{selectedLocation.lo_address.addr_road}}
                            แขวง{{selectedLocation.lo_address.addr_subDistrict}}
                            เขต{{selectedLocation.lo_address.addr_district}}
                            {{selectedLocation.lo_address.addr_province}}
                        )
                        </p>
                        <p><b><b-icon icon="scissors" aria-hidden="true"></b-icon> ช่างตัดผม:</b> {{selectedBarber.barb_firstName}} {{selectedBarber.barb_lastName}}</p>
                        <p><b><b-icon icon="person-fill" aria-hidden="true"></b-icon> ลูกค้า:</b> {{userData.cus_firstName}} {{userData.cus_lastName}}</p>
                    </b-col>
                </b-row>
            </div>
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
                <b-col>{{selectedLocation.lo_locationName}}</b-col>
                <b-col sm="3" class="text-center">฿{{selectedLocation.lo_cost}}</b-col>
            </b-row>
            <!--Selected Barber-->
            <b-row>
                <b-col sm="2" class="text-center">2</b-col>
                <b-col>ช่างตัดผม {{selectedBarber.barb_firstName}} {{selectedBarber.barb_lastName}}</b-col>
            </b-row>

             <!--Selected Service-->
            <b-row v-for="(service, index) in selectedService" :key="index">
                <b-col sm="2" class="text-center">{{index+3}}</b-col>
                <b-col>บริการ{{service.service_name}}</b-col>
                <b-col sm="3" class="text-center">฿{{service.service_cost}}</b-col>
            </b-row>
            <hr>
            
            <!--Summary-->
            <b-row>
                <b-col class="text-right">ยอดชำระเงินทั้งหมด</b-col>
                <b-col sm="3" class="text-center">฿{{totalCost}}</b-col>
            </b-row>
            <hr>
        </div>

        <div>
            <b-btn class="float-right mt-2" @click="confirm">ชำระเงิน</b-btn>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore'

    export default {
        name: 'Confirmation',
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
        created() {
            this.selectedDate = localStorage.getItem('selectedDate')
            this.selectedTime = localStorage.getItem('selectedTime')
            this.selectedLocation = JSON.parse(localStorage.getItem('selectedLocation'))
            this.selectedBarber = JSON.parse(localStorage.getItem('selectedBarber'))
            this.selectedService = JSON.parse(localStorage.getItem('selectedService'))
            this.totalCost = localStorage.getItem('totalCost')

            if(!this.selectedLocation){
                this.$router.replace({name: 'Search'}).catch(()=>{})
            }
        },
        data() {
            return {
                //เก็บข้อมูลผู้ใช้
                userData: '',

                //ข้อมูลการเลือกบริการทั้งหมด
                selectedDate: '',
                selectedTime: '',
                selectedLocation: '',
                selectedBarber: '',
                selectedService: '',
                totalCost: 0
            }
        },
        methods: {
            confirm() {
                let confirmation = {
                    appmt_date : this.selectedDate,
                    appmt_time : this.selectedTime,
                    appmt_location : this.selectedLocation,
                    appmt_barber : this.selectedBarber,
                    appmt_service : this.selectedService,
                    appmt_cost : this.totalCost,
                    appmt_status : 'waiting'
                }
                console.log(confirmation)

                localStorage.removeItem('appointment')
                localStorage.setItem('appointment', JSON.stringify(confirmation))
                
            }
        }
    }
</script>

<style scoped>
    .confirmation {
        height: 725px;
    }
    .confirmBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }
</style>