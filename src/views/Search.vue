<!--/src/Search.vue-->

<template>
    <div class="search">
        <h1>ค้นหา</h1>
        <form action="/location">
            <!--Location Box-->
            <div class="mb-4 p-2 pb-4 locationBox">
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
            <div class="mb-4 p-2 serviceBox">
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
            <div class="mb-4 p-2 dateBox">
                <label for="serviceBox"><b>วันที่และเวลา</b></label>
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
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //data ที่ต้องใช้ค้นหา location, service, date, time
                location:'แขวงลาดกระบัง',
                serviceChecked: [],
                date: '',
                time: '',
                //date picker
                minDate: new Date(),
                //Example Data
                districts: [
                    {id:1, name: 'แขวงลาดกระบัง	'},
                    {id:2, name: 'แขวงคลองสองต้นนุ่น'},
                    {id:3, name: 'แขวงคลองสามประเวศ	'},
                    {id:4, name: 'แขวงลำปลาทิว'},
                    {id:5, name: 'แขวงทับยาว'},
                    {id:6, name: 'แขวงขุมทอง'},
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
    }
</style>