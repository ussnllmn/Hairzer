<!--/src/Location.vue-->

<template>
    <div class="location">
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
                <div class="locationList mb-4 row"  v-for="location in locations" :key="location.id" :for="location.id">
                    <label :for="location.id"></label>
                        <!--Radio-->
                        <div class="col-sm-1 my-auto text-center">
                            <input type="radio" :value="location" :id="location.id" v-model="selectedLocation"/>
                             
                        </div>
                        <!--Image-->
                        <div class="col-sm-5"> 
                            <img src="location.image" width="100%" height="275px">
                        </div>
                        <!--Detail-->
                        <div class="col-sm-5 ml-3 my-2">
                            <h4>{{location.name}}</h4>

                            <p>
                                <small><b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon> {{location.address}}</small>
                            </p>

                            <p>
                                <b-icon icon="star-fill" aria-hidden="true" variant="warning"></b-icon> คะแนน {{location.score}} /10
                            </p>

                            <li v-for="equipment in location.equipment" :key="equipment">{{equipment}}</li>
                        
                            <!--Price-->
                            <div class="mr-auto align-self-end text-right">
                                <h2>฿{{location.cost}}</h2>
                            </div>
                        </div>
                        
                        
                </div>
            </div>

            <!--Side bar-->
            <div class="col-sm-4">
                <form action="/barber">
                    <div class="summary my-4 p-2">
                        <h3>ราคารวม {{selectedLocation.cost}}฿</h3> 
                        <div><p><b>วันที่:</b> </p></div>
                        <div><p><b>เวลา:</b> </p></div>
                        <div><p><b>สถานที่:</b> {{selectedLocation.name}}</p></div>
                        <div><p><b>ช่างตัดผม:</b> </p></div>
                        <div><p><b>บริการที่เลือก:</b> </p></div>
                        <button class="btn btn-success btn-block" type="sumbit">ถัดไป</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sortBy:'Date',
                selectedLocation: '',
                totalCost: 0,
                locations: [
                    {image:'', id:'0001', name:'ร้านตัดผม 1', score: 9, equipment: ['อุปกรณ์ 1', 'อุปกรณ์ 2', 'อุปกรณ์ 3',], cost: 150,  address: '77 ซอยเกกี 10 ถนนฉลองกรุง1 เขตลาดกระบัง กรุงเทพมหานคร ประเทศไทย'},
                    {image:'', id:'0002', name:'ร้านตัดผม 2', score: 10, equipment: ['อุปกรณ์ 1', 'อุปกรณ์ 2', 'อุปกรณ์ 3', ], cost: 350, address: '58 ซอยเกกี 1 ถนนฉลองกรุง1 เขตลาดกระบัง กรุงเทพมหานคร ประเทศไทย'},
                    {image:'', id:'0003', name:'ร้านตัดผม 3', score: 7, equipment: ['อุปกรณ์ 1', 'อุปกรณ์ 2', 'อุปกรณ์ 3',], cost: 120, address: '33 ซอยเกกี 0 ถนนฉลองกรุง1 เขตลาดกระบัง กรุงเทพมหานคร ประเทศไทย'},
                    {image:'', id:'0004', name:'ร้านตัดผม 4', score: 6, equipment: ['อุปกรณ์ 1', 'อุปกรณ์ 2'], cost: 200, address: '999/70 ถนนลาดกระบัง 10/3 เขตลาดกระบัง กรุงเทพมหานคร ประเทศไทย'},
                ]
            }
        },
        methods: {
            findBarber() {
                window.location.href = '/barber';

            }
        }    
    }
</script>

<style scoped>
    .locationList {
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