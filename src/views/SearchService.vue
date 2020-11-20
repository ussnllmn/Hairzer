<!--/src/Service.vue-->

<template>
    <div class="service container">
        <Loading v-if="loadingStatus"></Loading>
        <h1>เลือกบริการ</h1>
        <!--Head-->
        <div class="row m-2">
            <div class="col-sm-4">
                <p>ขั้นตอนที่ 3/3 เลือกบริการที่คุณต้องการ</p>
            </div>
            <div class="col-sm-3 ml-5">
                <b-dropdown id="sortService" 
                    :text="'Sort by '+sortBy"
                    block
                    split
                    variant="outline-dark"
                    menu-class="w-100"
                >
                    <b-dropdown-item @click="sortBy='Date'">Sort by Date</b-dropdown-item>
                    <b-dropdown-item @click="sortBy='Score'">Sort by Score</b-dropdown-item>
                    <b-dropdown-item @click="sortBy='Price'">Sort by Price</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
    
        <div class="row m-2">
            <!--Services List-->
            <div class="col-sm-7 mx-4 p-2">
                <div class="serviceList mb-4 row shadow-sm" v-for="service in services" :key="service.service_name" :for="service.service_name">
                    <label :for="service.service_name"></label>
                        <!--Checkbox-->
                        <div class="col-sm-1 my-auto text-center">
                            <input type="checkbox" :value="service" :id="service.service_name" v-model="selectedService"/>
                        </div>

                        <!--Image-->
                        <div class="col-sm-5"> 
                            <img :src="service.service_img" width="100%" height="100%" style="object-fit: cover;">
                        </div>
                        
    
                        <!--Price-->
                        <div class="col-sm-6">
                            <b-row>
                                <h3>{{service.service_name}}</h3>
                            </b-row>
                            <b-row>
                                <p>{{service.service_description}}</p>
                            </b-row>
                            <b-row >
                                <b-col>
                                    <h2>฿{{service.service_cost}}</h2>
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
                    <div><p><b>บริการที่เลือก:</b> {{showSelectedService.join()}}</p></div>
                    <button class="btn btn-success btn-block" @click="confirm">ถัดไป</button>
                    <button class="btn btn-danger btn-block my-2" @click="$router.replace({name: 'Barber'})">กลับ</button>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
    import axios from 'axios'
    import Loading from '../components/Loading.vue'

    export default {
        name: 'ServiceSearch',
        components: {
            Loading
        },
        created() {
            this.loadingStatus = false
            this.selectedDate = localStorage.getItem('selectedDate')
            this.selectedTime = localStorage.getItem('selectedTime')
            this.selectedLocation = JSON.parse(localStorage.getItem('selectedLocation'))
            this.selectedBarber = JSON.parse(localStorage.getItem('selectedBarber'))
            this.services = JSON.parse(localStorage.getItem('serviceList'))
        },
        data() {
            return {
                loadingStatus: '',
                
                //sort menu
                sortBy:'Date',

                //location from search
                locations: [],

                //barber from search
                barbers: [],

                //service from barber selected
                services: '',

                //selected items
                selectedLocation: '',
                selectedBarber: '',
                selectedService: [],
                selectedDate: '',
                selectedTime: '',
            }
        },
        methods: {
            confirm() {
                this.loadingStatus = true

                if (this.selectedService == ''){
                    alert('โปรดเลือกบริการที่คุณต้องการก่อนคลิกที่ปุ่ม "ถัดไป"')
                    this.loadingStatus = false
                }

                else{
                    //เก็บข้อมูลบริการที่เลือก
                    localStorage.setItem('selectedService', JSON.stringify(this.selectedService))

                    //เก็บข้อมูลราคารวม
                    localStorage.setItem('totalCost', this.totalCost)

                    this.loadingStatus = false

                    //redirect
                    this.$router.push('/confirmation')
                }
            }
        },
        computed: {
            showSelectedService() {
                let select = []
                for(var el in this.selectedService){
                    select.push(this.selectedService[el].service_name)
                }
                return select
            },
            totalCost() {
                var sum = 0
                for(var el in this.selectedService){
                    sum += this.selectedService[el].service_cost
                }
                sum += this.selectedLocation.lo_cost
                return sum
            }
        }
    }
</script>

<style scoped>
    .serviceList {
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
        width: 100%;
        height: 22%;
        z-index: 100;
        cursor: pointer;
    }
</style>