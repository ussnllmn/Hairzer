<template>
    <div class="LocationProfile">
        <div class="profileBox shadow-sm p-4 m-4">
            <b-row>
                <!--รูปโปรไฟล์-->
                <b-col sm="3" class="align-self-center">
                    <b-img :src="userData.lo_img" rounded="circle" width="150px" height="150px" style="object-fit: cover;"></b-img>
                </b-col>

                <!--ชื่อและคำอธิบาย-->
                <b-col sm="6">
                    <h4>{{userData.lo_locationName}}</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium eveniet tenetur quia quasi ex dicta nesciunt minima provident omnis perferendis! Ratione nulla expedita explicabo at iusto debitis temporibus fuga exercitationem?</p>
                    <p>คะแนน: {{userData.lo_score}}</p>
                </b-col>

                <!--ราคาและรายการอุปกรณ์-->
                <b-col sm="3">
                    <h3>ราคา: {{userData.lo_cost}}</h3>
                    <li v-for="equipment in userData.lo_equipment" :key="equipment">{{equipment}}</li>
                </b-col>
            </b-row>

            <!--รีวิว-->
            <hr>
            <h3>รีวิว</h3>
            <b-row class="reviewBox mx-4 mb-2">
                <b-col sm="3" class=" m-0 p-0">
                    <img :src="userData.lo_img" width="100%" style="object-fit: cover;">
                </b-col>

                <b-col sm="9" class="">
                    <h4>ลูกค้า 1</h4>
                    <p class="small my-1"><b>วันที่:</b> 10/5/63 | <b>เวลา:</b> 18.00 น.</p>
                    <p class="my-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nisi at nobis architecto esse porro sed. Odit doloremque quo molestias doloribus dolorum placeat neque fugiat commodi? Et rem facere ad!</p>
                    <p class="my-1"><b>คะแนน:</b> 5/5</p>
                </b-col>
            </b-row>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'LocationProfile',
        data() {
            return {
                userData: ''
            }
        },
        created() {
            this.userData = JSON.parse(localStorage.getItem('userData'))
        },
    
    }
</script>

<style scoped>
    .profileBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }

    .reviewBox {
        border: 1px solid #CED4DA;
        color: #495057;
    }

</style>