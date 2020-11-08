<template>
    <div class="confirmation">
        <h1>Confirmation</h1>
 
        <!--Summary Box-->
        <div class="confirmBox p-4">
            <!--Detail Box-->
            <div class="detailBox">
                <b-row>
                    <b-col cols="3">
                        <p><b><b-icon icon="calendar3" aria-hidden="true"></b-icon> วัน/เดือน/ปี:</b> {{selectedDate}}</p>
                        <p><b><b-icon icon="clock" aria-hidden="true"></b-icon> เวลา:</b> {{selectedTime}}</p>
                    </b-col>
                    <b-col style="border-left: 1px solid  #CED4DA;">
                        <p><b><b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon> สถานที่:</b> {{selectedLocation.name}} ({{selectedLocation.address}})</p>
                        <p><b><b-icon icon="scissors" aria-hidden="true"></b-icon> ช่างตัดผม:</b> {{selectedBarber.name}}</p>
                        <p><b><b-icon icon="person-fill" aria-hidden="true"></b-icon> ลูกค้า:</b> นายทรงวุฒิ นักร้อง</p>
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
                <b-col>{{selectedLocation.name}}</b-col>
                <b-col sm="3" class="text-center">฿{{selectedLocation.cost}}</b-col>
            </b-row>
            <!--Selected Barber-->
            <b-row>
                <b-col sm="2" class="text-center">2</b-col>
                <b-col>{{selectedBarber.name}}</b-col>
            </b-row>

             <!--Selected Service-->
            <b-row v-for="(service, index) in selectedService" :key="index">
                <b-col sm="2" class="text-center">{{index+3}}</b-col>
                <b-col>{{service.name}}</b-col>
                <b-col sm="3" class="text-center">฿{{service.cost}}</b-col>
            </b-row>
            <hr>
            
            <!--Summary-->
            <b-row>
                <b-col class="text-right">ยอดชำระเงินทั้งหมด</b-col>
                <b-col sm="3" class="text-center">฿{{totalCost}}</b-col>
            </b-row>
        </div>

        <div>
            <form action="/payment">
                <b-btn class="float-right mt-2" type="submit">ชำระเงิน</b-btn>
            </form>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore'

    export default {
        /*beforeCreate() {
            firebase.auth().onAuthStateChanged(user => {
                if (!user) {
                    this.$router.replace({name: 'Signin'}).catch(()=>{})
                }
            })
        },*/
        data() {
            return {
                //totalCost cal by computed
                selectedDate: '2020-11-09',
                selectedTime: '20:00:00',
                selectedLocation: { image: "", id: "0001", name: "ร้านตัดผม 1", score: 9, equipment: [ "อุปกรณ์ 1", "อุปกรณ์ 2", "อุปกรณ์ 3" ], cost: 150, address: '77 ซอยเกกี 10 ถนนฉลองกรุง1 เขตลาดกระบัง กรุงเทพมหานคร ประเทศไทย'},
                selectedBarber: { image: "", id: "0004", name: "ช่างตัดผม 4", score: 7, services: { "บริการ 1": 110, "บริการ 2": 320 } },
                selectedService: [ { name: "บริการ 1", cost: 150 }, { name: "บริการ 2", cost: 260 }, { name: "บริการ 3", cost: 350 } ],
            }
        },
        computed: {
            totalCost() {
                var sum = 0
                for(var el in this.selectedService){
                    sum += this.selectedService[el].cost
                }
                sum += this.selectedLocation.cost
                return sum
            },
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