<!--/src/Search.vue-->
<template>
    <div class="search container">
        <Loading v-if="loadingStatus"></Loading>
        <h1>ค้นหา</h1>
            <!--Location Box-->
            <div class="mb-4 p-2 pb-4 locationBox shadow-sm">
                <label><b>เลือกสถานที่ที่คุณต้องการค้นหา</b></label>
                <b-dropdown id="district" 
                    :text="location"
                    block
                    split
                    variant="outline-dark"
                    menu-class="w-100"
                >
                    <b-dropdown-item v-for="district in districts" :key="district.id" v-model="location" @click="location=district.name">{{district.name}}</b-dropdown-item>
                </b-dropdown>
            </div>

            <!--Service Check Box-->
            <div class="mb-4 p-2 serviceBox shadow-sm">
                <label for="serviceBox"><b>คลิกเลือกบริการที่คุณต้องการค้นหา</b></label>
                <form>
                <div class="form-group form-check">
                    <div class="row">
                        <!--Service List-->
                        <div class="col-sm-3" v-for="service in services" :key="service.id">
                            <input type="checkbox" class="form-check-input" :value="service.name" :id="service.id" v-model="serviceChecked">
                            <label class="form-check-label" :for="service.id">{{service.name}}</label>
                        </div>
                    </div>
                </div>
                </form>
            </div>

            <!--Date & Time-->
            <div class="mb-4 p-2 dateBox shadow-sm">
                <label for="serviceBox"><b>วันที่และเวลา</b></label>
                <div class="row mb-2">
                    <!--Date-->
                    <div class="col-sm-4">
                        <b-form-datepicker class="mb-2" id="datepicker" placeholder="เลือกวันที่ต้องการ" 
                        v-model="selectedDate" 
                        :min="minDate"
                        >
                        </b-form-datepicker>
                    </div>

                    <!--Time-->
                    <div class="col-sm-4 mb-2">
                        <b-form-timepicker id="timepicker" placeholder="เลือกเวลาที่ต้องการ" v-model="selectedTime" locale="th"></b-form-timepicker>
                    </div>

                    <!--Button-->
                    <div class="col-sm-4">
                        <button @click="searchLocation" class="btn btn-success btn-block">ค้นหา</button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Loading from '../components/Loading'

    export default {
        name:'Search',
        components: {
            Loading
        },
        created() {
            this.loadingStatus = false

            //cal date
            let date = new Date()
            let year = date.getUTCFullYear()
            let month = date.getMonth()+1
            let day = date.getDate()
            date = year+'-'+month+'-'+day
            this.selectedDate = date
        },
        data() {
            return {
                loadingStatus: false,

                //data ที่ต้องใช้ค้นหา location, service, date, time
                location:'ลาดกระบัง',
                serviceChecked: ['ตัดผม'],
                selectedDate: '',
                selectedTime: new Date().toLocaleTimeString('it-IT'),

                //date picker
                minDate: new Date(),
                
                //Example Data
                districts: [
                    {id:1, name: 'ลาดกระบัง'},
                ],
                services: [
                    {id:1, name: 'ตัดผม'},
                    {id:2, name: 'ทำสีผม'},
                    {id:3, name: 'โกนหนวด'},
                    {id:4, name: 'ดัดผม'},
                    {id:5, name: 'สระผม'},
                    {id:6, name: 'ซอยผม'},
                    {id:7, name: 'ยืดผม'},
                    {id:8, name: 'อบไอน้ำ'},
                    {id:9, name: 'ออกแบบทรงผม'},
                    {id:10, name: 'จัดแต่งทรงผม'}
                ]
            } 
        },
        methods: {
            searchLocation() {
                this.loadingStatus = true

                let searchData = { 
                    location: this.location,
                    service: this.serviceChecked,
                    time: this.selectedTime,
                    date: this.selectedDate
                }

                axios.post('http://localhost:5000/location', searchData)
                .then(
                    res => {
                        if(res.status === 200) {

                            //ได้รับผลการ search location => เก็บผลการ search location => เพื่อแสดงในหน้าถัดไป
                            var location = res.data.location
                            localStorage.removeItem('locationList')
                            localStorage.setItem('locationList', JSON.stringify(location))
                            
                            //เก็บผลการนัดหมาย Date, Time, selectedLocation, selectedBarber, selectedService, totalCost
                            localStorage.setItem('selectedDate', res.data.date)
                            localStorage.setItem('selectedTime', res.data.time)
                            localStorage.setItem('selectedLocation', '')
                            localStorage.setItem('selectedBarber', '')
                            localStorage.setItem('selectedService', '')
                            localStorage.setItem('totalCost', 0)
                            
                            this.loadingStatus = false

                            //redirect ไปหน้า location
                            this.$router.push({name: 'SearchLocation'})
                        }
                        else {
                            this.$router.push('/error')
                        }
                    }
                ).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .search {
        height: 725px;
    }
    .serviceBox, .dateBox, .locationBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        background-color: white;
    }
</style>