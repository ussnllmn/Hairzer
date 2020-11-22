<template>
    <div class="BarberProfile">
        <h1>โปรไฟล์ช่างตัดผม</h1>
        <div class="profileBox shadow-sm p-4">
            <b-row>
                <!--รูปโปรไฟล์-->
                <b-col sm="2" class="align-self-start text-center p-2">
                    <img :src="barberProfile.barb_img" rounded="circle" width="130px" height="130px" style="object-fit: cover; border-radius: 100%;"/>
                </b-col>

                <!--ชื่อและคำอธิบาย-->
                <b-col sm="6" class="pl-5">
                    <h4><b>{{barberProfile.barb_firstName}} {{barberProfile.barb_lastName}}</b></h4>
                    <p><b>พื้นที่ให้บริการ:</b> เขต{{barberProfile.barb_addressService}}</p>
                    <p class="font-weight-bold m-0 p-0">คำอธิบายเกี่ยวกับช่างตัดผม:</p>
                    <p >" {{barberProfile.barb_description}} "</p>
                    <p><b>คะแนน:</b> {{barberProfile.barb_score}}</p>
                </b-col>

                <!--รายการให้บริการ-->
                <b-col sm="4">
                    <h5>บริการของช่างตัดผม</h5>
                    <li v-for="service in barberService" :key="service.service_id">{{service.service_name}}: {{service.service_cost}}฿</li>
                </b-col>
            </b-row>

            <!--รีวิว-->
            <hr>
            <h3>รีวิวจากลูกค้า</h3>
            <b-row class="reviewBox mx-4 my-3 align-items-top" v-for="review in barberReviewData" :key="review.barb_review_id">
                <b-col md="3" class="m-0 p-0 align-self-center">
                    <img :src="review.barb_review_customer.cus_img" width="100%" style="object-fit: cover;">
                </b-col>

                <b-col class="p-4">
                    <h4>{{review.barb_review_customer.cus_firstName}} {{review.barb_review_customer.cus_lastName}}</h4>
                    <p class="small p-0 m-0 mb-2"><b>รหัสการนัดหมาย: </b>{{review.barb_review_appointment}}</p>
                    <p class="small p-0 m-0 mb-2"><b>วันที่:</b> {{review.barb_review_date}} | <b>เวลา:</b> {{review.barb_review_time}}</p>
                     <p class="small p-0 m-0"><b>บริการที่ใช้</b></p>
                    <li class="small p-0" v-for="service in review.barb_review_service" :key="service.service_id">{{service.service_name}}</li>
                    <p class="my-3"><i>" {{review.barb_review_text}} "</i></p>
                    <p class="my-1"><b>คะแนน:</b> {{review.barb_review_score}}/5</p>
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
        name: 'BarberProfile',
        data() {
            return {
                barberReviewData: [],
                barberProfile: '',
                barberService: []
            }
        },
        created() {
            //get barber info from firebase
            firebase.firestore().collection('barber').doc(this.$route.params.barb_id).get()
            .then(doc => {
                this.barberProfile = doc.data()
            }).catch(err => {console.log(err)})

            //get service
            firebase.firestore().collection('service').where('service_barber','==',this.$route.params.barb_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.barberService.push(doc.data())
                })
            }).catch(err => {console.log(err)})

            //get barber review 
            firebase.firestore().collection('barber_review').where('barb_review_barber.barb_id','==',this.$route.params.barb_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.barberReviewData.push(doc.data())
                })
            }).catch(err => {console.log(err)})
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