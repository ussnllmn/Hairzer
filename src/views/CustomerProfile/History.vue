<template>
    <div class="history">
        <h1>ประวัติการใช้บริการ</h1>
        <div class="historyBox p-2">
            <!--Title-->
            <b-table striped hover :items="items" :fields="fields">
                <template #cell(การจัดการ)>
                    <b-button variant="outline-primary" size="sm" class="mb-2" style="width: 100%;">รายละเอียด</b-button> <br>
                    <b-button variant="outline-primary" size="sm" class="mb-2" style="width: 100%;">รีวิวสถานที่</b-button> <br>
                    <b-button variant="outline-primary" size="sm" style="width: 100%;">รีวิวช่างตัดผม</b-button> <br>
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
                    appointmentID: '000333', 
                    Date: '2020-10-22', 
                    Time: '16:00:00', 
                    location: 'ร้านตัดผม 2', 
                    barber: 'ช่างตัดผม 2', 
                    service: ['บริการ 1', 'บริการ 2'], 
                    status: 'success' 
                },
                { 
                    appointmentID: '000091', 
                    Date: '2020-10-10', 
                    Time: '10:00:00', 
                    location: 'ร้านตัดผม 10', 
                    barber: 'ช่างตัดผม 11', 
                    service: ['บริการ 1', 'บริการ 3', 'บริการ 4'], 
                    status: 'success' 
                },
                { 
                    appointmentID: '000012', 
                    Date: '2020-09-11', 
                    Time: '15:00:00', 
                    location: 'ร้านตัดผม 3', 
                    barber: 'ช่างตัดผม 4', 
                    service: ['บริการ 1'], 
                    status: 'success' 
                },
                { 
                    appointmentID: '000034', 
                    Date: '2020-10-29', 
                    Time: '18:00:00', 
                    location: 'ร้านตัดผม 1', 
                    barber: 'ช่างตัดผม 3', 
                    service: ['บริการ 1','บริการ 5'], 
                    status: 'success' 
                },
            ]
        }
    }
  }
</script>
