<template>
    <div class="LocationProfile">
        <div class="profileBox shadow-sm p-4 m-4">
            <b-row>
                <!--รูปโปรไฟล์-->
                <b-col sm="2" class="align-self-center">
                    <img :src="userData.lo_img" rounded="circle" width="100%" style="object-fit: cover; border-radius: 100%;"/>
                </b-col>

                <!--ชื่อและคำอธิบาย-->
                <b-col sm="7">
                    <h3><b>{{userData.lo_locationName}}</b></h3>
                    <p><b>ที่อยู่:</b> 
                        {{userData.lo_address.addr_no}}
                        ซอย{{userData.lo_address.addr_soi}}
                        ถนน{{userData.lo_address.addr_road}}
                        แขวง{{userData.lo_address.addr_subDistrict}}
                        เขต{{userData.lo_address.addr_district}}
                        {{userData.lo_address.addr_province}}
                    </p>
                    <p class="font-weight-bold m-0 p-0">คำอธิบายเกี่ยวกับร้าน:</p>
                    <p class="">" {{userData.lo_description}} "</p>
                    <p><b>คะแนน:</b> {{userData.lo_score}}</p>
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
            <b-row class="reviewBox mx-4 my-3 align-items-center" v-for="review in locationReviewData" :key="review.lo_review_id">
                <b-col sm="2" class=" m-0 p-0">
                    <img :src="review.lo_review_customer.cus_img" width="100%" style="object-fit: cover;">
                </b-col>

                <b-col sm="">
                    <h4>{{review.lo_review_customer.cus_firstName}} {{review.lo_review_customer.cus_lastName}}</h4>
                    <p class="small"><b>รหัสการนัดหมาย: </b>{{review.lo_review_appointment}}</p>
                    <p class="small mb-2"><b>วันที่:</b> {{review.lo_review_date}} | <b>เวลา:</b> {{review.lo_review_time}}</p>
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
                locationReviewData: []
            }
        },
        created() {
            this.userData = JSON.parse(localStorage.getItem('userData'))

            //set userData from firebase
            firebase.firestore().collection('location').doc(this.userData.lo_id).get()
            .then(doc => {
                localStorage.setItem('userData', JSON.stringify(doc.data()))
                this.loadingStatus = false
            })
            .catch(err => {console.log(err)})
            
            firebase.firestore().collection('location_review').where('lo_review_location.lo_id','==',this.userData.lo_id).get()
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