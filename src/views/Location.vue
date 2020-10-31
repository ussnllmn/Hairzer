<template>
    <div class="location">
        <h1>Location</h1>
        <div class="row m-2">
            <!--Location List-->
            <div class="col-sm-7 mx-4 p-2">
                <div class="locationList my-4 row"  v-for="location in locations" :key="location.id" :for="location.id">
                    <label :for="location.id"></label>
                        <!--Radio-->
                        <div class="col-sm-1 my-auto text-center">
                            <input type="radio" :value="location" :id="location.id" v-model="selectedLocation"/>
                             
                        </div>
                        <!--Image-->
                        <div class="col-sm-4 "> 
                            <img src="location.image" width="100%" height="250px">
                        </div>
                        <!--Detail-->
                        <div class="col-sm-3 ml-3 my-2">
                            <h4>{{location.name}}</h4>
                            <p>คะแนน {{location.score}}/10</p>
                            <li v-for="equipment in location.equipment" :key="equipment">{{equipment}}</li>
                        </div>
                        <!--Price-->
                        <div class="col-sm-3 mr-3 align-self-end text-right">
                            <h2>฿{{location.cost}}</h2>
                        </div>
                </div>
            </div>

            <!--Side bar-->
            <div class="col-sm-4">
                <div class="summary my-4 p-2">
                    <h3>ราคารวม {{selectedLocation.cost}}฿</h3> 
                    <div><p><b>วันที่:</b> </p></div>
                    <div><p><b>เวลา:</b> </p></div>
                    <div><p><b>สถานที่:</b> {{selectedLocation.name}}</p></div>
                    <div><p><b>ช่างตัดผม:</b> </p></div>
                    <div><p><b>บริการที่เลือก:</b> </p></div>
                    <button class="btn btn-success btn-block">ถัดไป</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedLocation: '',
            totalCost: 0,
            locations: [
                {image:'', id:'0001', name:'ร้านตัดผม 1', score: 9, equipment: ['อุปกรณ์ 1', 'อุปกรณ์ 2', 'อุปกรณ์ 3',], cost: 150},
                {image:'', id:'0002', name:'ร้านตัดผม 2', score: 10, equipment: ['อุปกรณ์ 1', 'อุปกรณ์ 2', 'อุปกรณ์ 3', ], cost: 350},
                {image:'', id:'0003', name:'ร้านตัดผม 3', score: 7, equipment: ['อุปกรณ์ 1', 'อุปกรณ์ 2', 'อุปกรณ์ 3',], cost: 120},
                {image:'', id:'0004', name:'ร้านตัดผม 4', score: 6, equipment: ['อุปกรณ์ 1', 'อุปกรณ์ 2'], cost: 200},
            ]
        }
    },
    methods: {
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