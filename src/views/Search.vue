<!--/src/Search.vue-->

<template>
    <div class="search">
        <h1>Search</h1>
        <form action="/location">
            <!--Search Box-->
            <div class="pb-4 searchBox">
                <input type="text" class="form-control form-control-lg" id="searchBox" placeholder="ค้นหาชื่อ, สถานที่, เขต, จังหวัด, ประเทศ ที่คุณต้องการ" v-model="location">
            </div>

            <!--Service Check Box-->
            <div class="mb-4 p-2 serviceBox">
                <label for="serviceBox">คลิกเลือกบริการที่คุณต้องการ</label>
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
            <div class="mb-4 p-2 dateBox">
                <label for="serviceBox">วันที่และเวลา</label>
                <div class="row mb-2">
                    <!--Date-->
                    <div class="col-sm-4">
                        <b-form-datepicker class="mb-2" id="datepicker" placeholder="เลือกวันที่ต้องการ" 
                        v-model="date" 
                        :min="minDate"
                        >
                        </b-form-datepicker>
                    </div>

                    <!--Time-->
                    <div class="col-sm-4 mb-2">
                        <b-form-timepicker id="timepicker" placeholder="เลือกเวลาที่ต้องการ" v-model="time" locale="th"></b-form-timepicker>
                    </div>

                    <!--Button-->
                    <div class="col-sm-4">
                        <button value="submit" type="submit" class="btn btn-success btn-block">ตกลง</button>
                    </div>
                </div>

                <!--Summary-->
                <div class="row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4">
                        <p>สถานที่ที่ค้นหา: {{location}}</p>
                        <p>รายการที่เลือก: {{serviceChecked}} </p>
                        <p>วันที่: {{date}}</p>
                        <p>เวลา: {{time}}</p>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //data ที่ต้องใช้ค้นหา location, service, date, time
                location:'',
                serviceChecked: [],
                date: '',
                time: '',
                //date picker
                minDate: new Date(),
                //Example Data
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
        }
    }
</script>

<style scoped>
    .serviceBox, .dateBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
    }
</style>