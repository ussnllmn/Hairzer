<!--/src/Location.vue-->

<template>
    <div class="barber">
        <h1>Barbers</h1>
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
                <div class="barberList my-4 row"  v-for="barber in barbers" :key="barber.id" :for="barber.id">
                    <label :for="barber.id"></label>
                        <!--Radio-->
                        <div class="col-sm-1 my-auto text-center">
                            <input type="radio" :value="barber" :id="barber.id" v-model="selectedBarber"/>
                             
                        </div>
                        <!--Image-->
                        <div class="col-sm-5"> 
                            <img src="barber.image" width="100%" height="250px">
                        </div>
                        <!--Detail-->
                        <div class="col-sm-3 ml-3 my-2">
                            <h4>{{barber.name}}</h4>
                            <p>คะแนน {{barber.score}}/10</p>
                            <li v-for="(cost, service) in barber.services" :key="(cost, service)">{{service}}: {{cost}}฿</li>
                        </div>
                        <!--Price-->
                        <div class="col-sm-2 mr-auto align-self-end text-right">
                            <small>ราคาเริ่มต้นที่</small>
                            <h2>฿{{Object.values(barber.services)[0]}}</h2>
                        </div>
                </div>
            </div>

            <!--Side bar-->
            <div class="col-sm-4">
                <form action="/service">
                    <div class="summary my-4 p-2">
                        <h3>ราคารวม {{selectedBarber.cost}}฿</h3> 
                        <div><p><b>วันที่:</b> </p></div>
                        <div><p><b>เวลา:</b> </p></div>
                        <div><p><b>สถานที่:</b></p></div>
                        <div><p><b>ช่างตัดผม:</b> {{selectedBarber.name}}</p></div>
                        <div><p><b>บริการที่เลือก:</b> </p></div>
                        <button class="btn btn-success btn-block">ถัดไป</button>
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
                sortBy: 'Date',
                selectedBarber: '',
                totalCost: 0,
                barbers: [
                   {image:'', id:'0001', name:'ช่างตัดผม 1', score: 6, services: {"บริการ 1":140, "บริการ 2":150, "บริการ 3":350}},
                   {image:'', id:'0002', name:'ช่างตัดผม 2', score: 10, services: {"บริการ 1":100, "บริการ 2":150, "บริการ 3":400}},
                   {image:'', id:'0003', name:'ช่างตัดผม 3', score: 9, services: {"บริการ 1":150, "บริการ 2":280}},
                    {image:'', id:'0004', name:'ช่างตัดผม 4', score: 7, services: {"บริการ 1":110, "บริการ 2":320}},
                ]
            }
        },
        methods: {
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
        width: 100%;
        height: 22%;
        z-index: 100;
        cursor: pointer;
    }
</style>