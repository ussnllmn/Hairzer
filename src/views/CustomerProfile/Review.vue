<template>
    <div class="review">
        <h3 class="my-1 backBtn">
            <router-link :to="{name: 'History'}"><b-icon icon="chevron-left"></b-icon>กลับ</router-link>
        </h3>
        <div class="reviewBox shadow-sm p-4">
            <div class="mb-4">
                <h4>รีวิว | หมายเลขการนัดหมาย: <small>{{appointment.appmt_id}}</small></h4>
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
                appointment: ''
            }
        },
        created() {
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

        }
    }
</script>

<style scoped>
    .review {
        height: 725px;
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
</style>