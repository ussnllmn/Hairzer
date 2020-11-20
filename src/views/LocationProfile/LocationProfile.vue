<template>
    <div class="LocationProfile">
        <div class="profileBox shadow-sm p-4 m-4">
            <b-row>
                <!--รูปโปรไฟล์-->
                <b-col sm="2" class="align-self-center p-2">
                    <img :src="locationProfile.lo_img" rounded="circle" width="100%" style="object-fit: cover; border-radius: 100%;"/>
                </b-col>

                <!--ชื่อและคำอธิบาย-->
                <b-col sm="7">
                    <h3><b>{{locationProfile.lo_locationName}}</b></h3>
                    <p><b>ที่อยู่:</b> 
                        {{locationAddress.addr_no}}
                        ซอย{{locationAddress.addr_soi}}
                        ถนน{{locationAddress.addr_road}}
                        แขวง{{locationAddress.addr_subDistrict}}
                        เขต{{locationAddress.addr_district}}
                        {{locationAddress.addr_province}}
                    </p>
                    <p class="font-weight-bold m-0 p-0">คำอธิบายเกี่ยวกับร้าน:</p>
                    <p class="">" {{locationProfile.lo_description}} "</p>
                    <p><b>คะแนน:</b> {{locationProfile.lo_score}}</p>
                </b-col>

                <!--ราคาและรายการอุปกรณ์-->
                <b-col sm="3">
                    <h3>ราคา: {{locationProfile.lo_cost}}</h3>
                    <li v-for="equipment in locationProfile.lo_equipment" :key="equipment">{{equipment}}</li>
                </b-col>
            </b-row>

            <!--รีวิว-->
            <hr>
            <h3>รีวิว</h3>
            <b-row class="reviewBox mx-4 my-3 align-items-top" v-for="review in locationReviewData" :key="review.lo_review_id">
                <b-col md="3" class="m-0 p-0" style="border: 1px solid black">
                    <img :src="review.lo_review_customer.cus_img" width="100%" style="object-fit: cover;">
                </b-col>

                <b-col class="p-4">
                    <h4>{{review.lo_review_customer.cus_firstName}} {{review.lo_review_customer.cus_lastName}}</h4>
                    <p class="small p-0 m-0"><b>รหัสการนัดหมาย: </b>{{review.lo_review_appointment}}</p>
                    <p class="small p-0 m-0"><b>วันที่:</b> {{review.lo_review_date}} | <b>เวลา:</b> {{review.lo_review_time}}</p>
                    <p class="my-1">" {{review.lo_review_text}} "</p>
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
                userData: '',
                locationReviewData: [],
                locationProfile: '',
                locationAddress: ''
            }
        },
        created() {
            //set userData from firebase
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