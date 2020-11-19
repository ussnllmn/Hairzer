<template>
    <div class="review">
        <h3 class="my-1 backBtn">
            <router-link :to="{name: 'History'}"><b-icon icon="chevron-left"></b-icon>กลับ</router-link>
        </h3>
        <div class="p-4">
            <div class="mb-4">
                <b-row>
                    <!--Location Review-->
                    <b-col md="6" class="reviewBox shadow-sm py-4 mx-auto mb-4 text-center">
                        <h4><b>รีวิวสถานที่</b></h4><hr>

                        <b-img :src="appointment.appmt_location.lo_img" rounded="circle" width="200px" height="200px" style="object-fit: cover;" class="my-3"></b-img>                  
                        
                        <div class="small">
                            <h5>{{appointment.appmt_location.lo_locationName}}</h5>
                            <p><b>หมายเลขการนัดหมาย:</b> {{appointment.appmt_id}}</p>
                            <p><b>วันที่:</b> {{appointment.appmt_date}} | เวลา: {{appointment.appmt_time}}</p>
                        </div>
                        
                        <label for="score-star" class="small mb-0 mt-4">ให้คะแนนการใช้บริการของคุณ</label>
                        <div id="score-star" class="mt-0 mb-4 h5">
                            <div v-if="score == 0">
                                <b-icon class=" score" icon="star" @click="score = 1"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 2"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 3"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 4"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 5"></b-icon> &nbsp;
                            </div>
                            <div v-if="score == 1">
                                <b-icon class=" score" icon="star-fill" @click="score = 1" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 2"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 3"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 4"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 5"></b-icon> &nbsp;
                            </div>
                            <div v-if="score == 2">
                                <b-icon class=" score" icon="star-fill" @click="score = 1" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star-fill" @click="score = 2" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 3"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 4"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 5"></b-icon> &nbsp;
                            </div>
                            <div v-if="score == 3">
                                <b-icon class=" score" icon="star-fill" @click="score = 1" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star-fill" @click="score = 2" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star-fill" @click="score = 3" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 4"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 5"></b-icon> &nbsp;
                            </div>
                            <div v-if="score == 4">
                                <b-icon class=" score" icon="star-fill" @click="score = 1" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star-fill" @click="score = 2" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star-fill" @click="score = 3" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star-fill" @click="score = 4" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star" @click="score = 5"></b-icon> &nbsp;
                            </div>
                            <div v-if="score == 5">
                                <b-icon class=" score" icon="star-fill" @click="score = 1" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star-fill" @click="score = 2" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star-fill" @click="score = 3" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star-fill" @click="score = 4" variant="warning"></b-icon> &nbsp;
                                <b-icon class=" score" icon="star-fill" @click="score = 5" variant="warning"></b-icon> &nbsp;
                            </div>
                        </div>
                        
                        <b-form-textarea
                            required
                            class="my-3"
                            id="locationText"
                            v-model="reviewText"
                            placeholder="เขียนรีวิวให้สถานที่ได้ที่นี่ . . . "
                            rows="5"
                            max-rows="5"
                        ></b-form-textarea>

                        <b-btn variant="info" @click="locationReview">ตกลง</b-btn>
                    </b-col>
                </b-row>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Review',
        data() {
            return {
                userData: '',
                appointment: '',
                reviewText: '. . . ไม่มีความคิดเห็น',
                score: 0
            }
        },
        created() {
            this.userData = JSON.parse(localStorage.getItem('userData'))

            axios.get(`http://localhost:5000/appointment/${this.$route.params.appmt_id}`)
            .then(
                res => {
                    if (res.status === 200) {
                        this.appointment = res.data.appointment
                    }
                }
            )
        },
        methods: {
            locationReview() {

                var locationReview = {
                    customer: this.userData,
                    appointment: this.appointment,
                    reviewText: this.reviewText,
                    score: this.score,
                }

                axios.post('http://localhost:5000/locationReview', locationReview)
                .then(
                    res => {
                        if(res.status === 200) {
                            alert('รีวิวสถานที่สำเร็จ')
                            this.$router.replace({name: 'History'}).catch(()=>{})
                        }
                    }
                )
            }
        }
    }
</script>

<style scoped>
    p {
        margin: 0;
        padding: 0;
    }

    .reviewBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }

    .backBtn a{
        text-decoration: none;
        color: #495057;
    }

    .backBtn a:hover{
        text-decoration: none;
        color: darkgray;
    }
    
    .score {
        cursor: pointer;
    }

    .score:hover {
        color: #FFC107;
    }
</style>