<template>
    <div class="appointment ">
        <h1>จัดการนัดหมาย</h1>
        <div class="appointmentBox p-2">
            <!--Title-->
            <p v-for="appointment in appointmentList" :key="appointment.appmt_id">{{appointment.appmt_id}}</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import firebase from 'firebase/app';
    import 'firebase/auth';

  export default {
    name: 'Appointment',
    created() {
        //get customer data from firebase
        this.userData = JSON.parse(localStorage.getItem('userData'))
        
        var data = {
            id: this.userData.cus_id
        }

        //request appointment data
        axios.post('http://localhost:5000/appointment', data)
        .then(
            res => {
                if(res.status === 200) {
                    this.appointmentList = res.data.appointment
                }
            }
        )
    },
    data() {
        return {
            userData: '',
            appointmentList: []
        }
    }
  }
</script>

<style scoped>
    .appointment {
        height: 693px;
    }
</style>
