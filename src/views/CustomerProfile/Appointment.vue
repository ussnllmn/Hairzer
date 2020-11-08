<template>
    <div class="appointment">
        <h1>จัดการนัดหมาย</h1>
        <div class="appointmentBox p-2">
            <!--Title-->
            <b-table striped hover :items="items" :fields="fields">
                <template #cell(การจัดการ)>
                    <b-button variant="outline-primary" size="sm" class="mb-2" style="width: 100%;">รายละเอียด</b-button> <br>
                    <b-button variant="outline-success" size="sm" class="mb-2" style="width: 100%;">ยืนยัน</b-button> <br>
                    <b-button variant="outline-danger" size="sm" style="width: 100%;">รายละเอียด</b-button> <br>
                </template>
            </b-table>
            
        </div>
    </div>
</template>

<script>
  export default {
    data() {
        return {
            fields: [
                { key:'appointmentID', sortable: true },
                { key:'Date', sortable: true },
                { key:'Time', sortable: true },
                { key:'location', sortable: true },
                { key:'barber', sortable: true },
                { key:'status', sortable: true },
                { key:'การจัดการ' }
            ],
            items: [
                { 
                    appointmentID: '000021', 
                    Date: '2020-11-19', 
                    Time: '20:00:00', 
                    location: 'ร้านตัดผม 1', 
                    barber: 'ช่างตัดผม 1', 
                    service: ['บริการ 1', 'บริการ 2'], 
                    status: 'waiting' 
                },
                { 
                    appointmentID: '000521', 
                    Date: '2020-12-11', 
                    Time: '10:50:00', 
                    location: 'ร้านตัดผม 2', 
                    barber: 'ช่างตัดผม 4', 
                    service: ['บริการ 2', 'บริการ 3', 'บริการ 4'], 
                    status: 'waiting' 
                },
                { 
                    appointmentID: '000651', 
                    Date: '2020-12-22', 
                    Time: '15:40:00', 
                    location: 'ร้านตัดผม 3', 
                    barber: 'ช่างตัดผม 2', 
                    service: ['บริการ 1', 'บริการ 3', 'บริการ 4'], 
                    status: 'waiting' 
                },
            ]
        }
    }
  }
</script>
