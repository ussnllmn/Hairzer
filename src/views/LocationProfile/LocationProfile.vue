<template>
    <div class="LocationProfile">
        <h1>โปรไฟล์สถานที่</h1>
        <div class="profileBox shadow-sm p-4">
            <b-row>
                <!--รูปโปรไฟล์-->
                <b-col sm="2" class="align-self-center p-2">
                    <img :src="locationProfile.lo_img" rounded="circle" width="100%" height="150px" style="object-fit: cover; border-radius: 100%;"/>
                </b-col>

                <!--ชื่อและคำอธิบาย-->
                <b-col sm="6" class="pl-5">
                    <h3><b>{{locationProfile.lo_locationName}}</b></h3>
                    <p><b>ที่อยู่:</b> 
                        {{locationAddress.addr_no}}
                        ซอย{{locationAddress.addr_soi}}
                        ถนน{{locationAddress.addr_road}}
                        แขวง{{locationAddress.addr_subDistrict}}
                        เขต{{locationAddress.addr_district}}
                        {{locationAddress.addr_province}}
                    </p>
                    <p class="font-weight-bold m-0 p-0">คำอธิบายเกี่ยวกับสถานที่:</p>
                    <p >" {{locationProfile.lo_description}} "</p>
                    <p><b>คะแนน:</b> {{locationProfile.lo_score}}</p>
                </b-col>

                <!--ราคาและรายการอุปกรณ์-->
                <b-col sm="4">
                    <h3>ราคา: {{locationProfile.lo_cost}}</h3>
                    <li v-for="equipment in locationProfile.lo_equipment" :key="equipment">{{equipment}}</li>
                </b-col>
            </b-row>

            <!--รีวิว-->
            <hr>
            <h3>รีวิวจากลูกค้า</h3>
            <b-row class="reviewBox mx-4 my-3 align-items-top" v-for="review in locationReviewData" :key="review.lo_review_id">
                <b-col md="3" class="m-0 p-0 align-self-center">
                    <img :src="review.lo_review_customer.cus_img" width="100%" style="object-fit: cover;">
                </b-col>

                <b-col class="p-4">
                    <h4>{{review.lo_review_customer.cus_firstName}} {{review.lo_review_customer.cus_lastName}}</h4>
                    <p class="small p-0 m-0 mb-2"><b>รหัสการนัดหมาย: </b>{{review.lo_review_appointment}}</p>
                    <p class="small p-0 m-0 mb-2"><b>วันที่:</b> {{review.lo_review_date}} | <b>เวลา:</b> {{review.lo_review_time}}</p>
                    <p class="my-3">"<i> {{review.lo_review_text}} "</i></p>
                    <p class="my-1"><b>คะแนน:</b> {{review.lo_review_score}}/5</p>
                </b-col>
            </b-row>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    import firebase from 'firebase/app';
    import 'firebase/auth';

    export default {
        name: 'LocationProfile',
        data() {
            return {
                locationReviewData: [],
                locationProfile: '',
                locationAddress: ''
            }
        },
        created() {
            //get location info from firebase
            firebase.firestore().collection('location').doc(this.$route.params.lo_id).get()
            .then(doc => {
                this.locationProfile = doc.data()
                this.locationAddress = doc.data().lo_address
                this.loadingStatus = false
            })
            .catch(err => {console.log(err)})
            
            firebase.firestore().collection('location_review').where('lo_review_location.lo_id','==',this.$route.params.lo_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.locationReviewData.push(doc.data())
                })
            })
            .catch(err => {console.log(err)})
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