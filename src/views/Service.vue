<!--/src/Service.vue-->

<template>
    <div class="service">
        <h1>Services</h1>
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
                <div class="serviceList mb-4 row"  v-for="service in services" :key="service.name" :for="service.name">
                    <label :for="service.name"></label>
                        <!--Checkbox-->
                        <div class="col-sm-1 my-auto text-center">
                            <input type="checkbox" :value="service" :id="service.name" v-model="selectedService"/>
                        </div>

                        <!--Image-->
                        <div class="col-sm-5"> 
                            <img src="location.image" width="100%" height="250px">
                        </div>
                        

                        <!--Price-->
                        <div class="col-sm-6">
                            <b-row>
                                <h3>{{service.name}}</h3>
                            </b-row>
                            <b-row>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa quasi, iusto quod cupiditate hic dolorem sunt ipsam ex laboriosam.</p>
                            </b-row>
                            <b-row >
                                <b-col>
                                    <h2>฿{{service.cost}}</h2>
                                </b-col>
                            </b-row>
                        </div>
                </div>
            </div>

            <!--Side bar-->
            <div class="col-sm-4">
                <form action="/confirmation">
                    <div class="summary my-4 p-2">
                        <h3>ราคารวม {{totalCost}}฿</h3> 
                        <div><p><b>วันที่:</b> </p></div>
                        <div><p><b>เวลา:</b> </p></div>
                        <div><p><b>สถานที่:</b> </p></div> 
                        <div><p><b>ช่างตัดผม:</b> </p></div>
                        <div><p><b>บริการที่เลือก:</b> {{totalService.join()}}</p></div>
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
                selectedService: [],
                services: [
                    { name:'บริการ 1', cost:150 },
                    { name:'บริการ 2', cost:260 },
                    { name:'บริการ 3', cost:350 },
                    { name:'บริการ 4', cost:420 }
                ]
            }
        },
        computed: {
            totalCost() {
                var sum = 0
                for(var el in this.selectedService){
                    sum += this.selectedService[el].cost
                }
                return sum
            },
            totalService() {
                var service = []
                for(let e in this.selectedService){
                    service.push(this.selectedService[e].name)
                }
                return service
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