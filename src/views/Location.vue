<!--/src/Location.vue-->

<template>
    <div class="location container">
        <h1>Locations</h1>
        <!--Head-->
        <div class="row m-2">
            <div class="col-sm-4">
                <p>ขั้นตอนที่ 1/3 เลือกสถานที่ที่คุณต้องการ</p>
            </div>
            <div class="col-sm-3 ml-5">
                <b-dropdown id="sortLocation" 
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
            <!--Location List-->
            <div class="col-sm-7 mx-4 p-2">
                <div class="locationList mb-4 row shadow-sm" v-for="location in locations" :key="location.lo_id" :for="location.lo_id">
                    <label :for="location.lo_id"></label>
                        <!--Radio-->
                        <div class="col-sm-1 my-auto text-center">
                            <input type="radio" :value="location" :id="location.lo_id" v-model="selectedLocation" @click="slectedLocation = location"/>
                        </div>

                        <!--Image-->
                        <div class="col-sm-5"> 
                            <img :src="location.lo_img" class="locationImg" width="100%" height="100%" style="object-fit: cover;">
                        </div>
                        <!--Detail-->
                        <div class="col-sm-5 ml-3 my-2">
                            <h4>{{location.lo_locationName}}</h4>

                            <p>
                                <small><b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon> 
                                {{location.lo_address.addr_no}} 
                                ซอย{{location.lo_address.addr_soi}} 
                                ถนน{{location.lo_address.addr_road}} 
                                แขวง{{location.lo_address.addr_subDistrict}} 
                                เขต{{location.lo_address.addr_district}}
                                {{location.lo_address.addr_province}}
                                </small>
                            </p>

                            <p>
                                <b-icon icon="star-fill" aria-hidden="true" variant="warning"></b-icon> คะแนน {{location.lo_score}} /10
                            </p>

                            <li v-for="equipment in location.lo_equipment" :key="equipment">{{equipment}}</li>
                        
                            <!--Price-->
                            <div class="mr-auto align-self-end text-right">
                                <h2>฿{{location.lo_cost}}</h2>
                            </div>
                        </div>
                </div>
            </div>

            <!--Side bar-->
            <div class="col-sm-4 ">
                <div class="summary my-4 p-2 shadow-sm">
                    <h3>ราคารวม {{totalCost}}฿</h3>
                    <hr>
                    <div><p><b>วันที่:</b> {{selectedDate}}</p></div>
                    <div><p><b>เวลา:</b> {{selectedTime}}</p></div>
                    <div><p><b>สถานที่:</b> {{selectedLocation.lo_locationName}}</p></div>
                    <div><p><b>ช่างตัดผม:</b> </p></div>
                    <div><p><b>บริการที่เลือก:</b> </p></div>
                    <button @click="searchBarber" class="btn btn-success btn-block">ถัดไป</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        created() {
            this.locations = JSON.parse(localStorage.getItem('locationList'))
            this.selectedDate = localStorage.getItem('selectedDate')
            this.selectedTime = localStorage.getItem('selectedTime')
        },
        data() {
            return {
                //sort menu
                sortBy:'Date',

                //location from search
                locations: [],

                //selected items
                selectedLocation: '',
                selectedDate: '',
                selectedTime: '',
            }
        },
        computed: {
            totalCost() {
                return this.selectedLocation.lo_cost
            }
        },
        methods: {
            searchBarber() {
                let searchData = { 
                    location: this.selectedLocation.lo_address.addr_district
                }

                axios.post('http://localhost:5000/barber', searchData)
                .then(
                    res => {
                        if(res.status === 200) {
                            //ได้รับผลการ search barber => เก็บผลการ search barber => เพื่อแสดงในหน้าถัดไป
                            var barber = res.data.barber
                            localStorage.removeItem('barberList')
                            localStorage.setItem('barberList', JSON.stringify(barber))

                            //เก็บผลการนัดหมาย
                            localStorage.setItem('selectedLocation', JSON.stringify(this.selectedLocation))
                            localStorage.setItem('totalCost', this.totalCost)

                            //redirect ไปหน้า location
                            this.$router.push('/barber')
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
    .locationList {
        border: solid 1px  #CED4DA;
        border-radius: 5px;
        background-color: white;
    }
    .summary {
        background-color: white;
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
        height: 44%;
        z-index: 100;
        cursor: pointer;
    }
</style>