<!--/src/Barber.vue-->

<template>
    <div class="barber container">
        <h1>เลือกช่างตัดผม</h1>
        <!--Head-->
        <div class="row m-2">
            <div class="col-sm-4">
                <p>ขั้นตอนที่ 2/3 เลือกช่างตัดผมที่คุณต้องการ</p>
            </div>
            <div class="col-sm-3 ml-5">
                <b-dropdown id="sortBarber" 
                    :text="'Sort by '+sortBy"
                    block
                    split
                    variant="outline-dark"
                    menu-class="w-100"
                    disabled
                >
                    <b-dropdown-item @click="sortBy='Date'">Sort by Date</b-dropdown-item>
                    <b-dropdown-item @click="sortBy='Score'">Sort by Score</b-dropdown-item>
                    <b-dropdown-item @click="sortBy='Price'">Sort by Price</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
        
        <div class="row m-2">
            <!--Barber List-->
            <div class="col-sm-7 mx-4 p-2">
                <div class="barberList mb-4 row shadow-sm" v-for="barber in barbers" :key="barber.barb_id" :for="barber.barb_id">
                    <label :for="barber.barb_id"></label>
                    <!--Radio-->
                    <div class="col-sm-1 my-auto text-center">
                        <input type="radio" :value="barber" :id="barber.barb_id" v-model="selectedBarber" />
                             
                    </div>
                    
                    <!--Image-->
                    <div class="col-sm-5"> 
                        <img :src="barber.barb_img" width="100%" height="100%" style="object-fit: cover;">
                    </div>
                        
                    <!--Detail-->
                    <div class="col-sm-6">        
                        <b-row class="p-2 pt-4 mb-5">
                            <b-col sm="12" >
                                <h4>{{barber.barb_firstName}} {{barber.barb_lastName}}</h4>
                                <p><b-icon icon="star-fill" aria-hidden="true" variant="warning"></b-icon> คะแนน {{barber.barb_score}}/10</p>
                                <li v-for="service in barber.barb_service" :key="service">{{service}}</li>
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </div>

            <!--Side bar-->
            <div class="col-sm-4">
                <div class="summary my-4 p-2 shadow-sm">
                    <h3>ราคารวม {{totalCost}}฿</h3> 
                    <hr>
                    <div><p><b>วันที่:</b> {{selectedDate}}</p></div>
                    <div><p><b>เวลา:</b> {{selectedTime}}</p></div>
                    <div><p><b>สถานที่:</b> {{selectedLocation.lo_locationName}}</p></div>
                    <div><p><b>ช่างตัดผม:</b> {{selectedBarber.barb_firstName}} {{selectedBarber.barb_lastName}}</p></div>
                    <div><p><b>บริการที่เลือก:</b> </p></div>
                    <button class="btn btn-success btn-block" @click="searchService">ถัดไป</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        created() {
            this.barbers = JSON.parse(localStorage.getItem('barberList'))
            this.selectedDate = localStorage.getItem('selectedDate')
            this.selectedTime = localStorage.getItem('selectedTime')
            this.selectedLocation = JSON.parse(localStorage.getItem('selectedLocation'))
        },
        data() {
            return {
                //sort menu
                sortBy:'Date',

                //location from search
                locations: [],

                //barber from search
                barbers: [],

                //selected items
                selectedLocation: '',
                selectedBarber: '',
                selectedDate: '',
                selectedTime: '',

            }
        },
        methods: {
            searchService() {
                if (!this.selectedBarber) 
                    alert('โปรดเลือกช่างตัดผมที่คุณต้องการก่อนคลิกที่ปุ่ม "ถัดไป"')

                else {
                    let searchData = {
                        service: this.selectedBarber.barb_service,
                        barber: this.selectedBarber.barb_id
                    }

                    axios.post('http://localhost:5000/service', searchData)
                    .then(
                        res => {
                            if(res.status === 200) {

                                //ได้รับผลการ search barber => เก็บผลการ search barber => เพื่อแสดงในหน้าถัดไป
                                var service = res.data.service
                                localStorage.removeItem('serviceList')
                                localStorage.setItem('serviceList', JSON.stringify(service))

                                //เก็บผลการนัดหมาย
                                localStorage.setItem('selectedBarber', JSON.stringify(this.selectedBarber))

                                //redirect ไปหน้า service
                                this.$router.push('/service')
                            }
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                }
            }
        },
        computed: {
            totalCost() {
                return localStorage.getItem('totalCost')
            }
        }
    }
</script>

<style scoped>
    .barberList {
        border: solid 1px  #CED4DA;
        border-radius: 5px;
    }
    .summary {
        border: solid 1px  #CED4DA;
        border-radius: 5px;
        position: sticky;
        position: -webkit-sticky;
        top: 30px;
    }
    label {
        position: absolute;
        /*border: 1px solid black;*/
        width: 102%;
        height: 75%;
        z-index: 100;
        cursor: pointer;
    }
</style>