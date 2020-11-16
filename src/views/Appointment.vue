<template>
    <div class="appointment container">
        <h3>หมายเลขนัดหมาย: {{appointment.appmt_id}} | {{appointment.appmt_status}}</h3>
        <div>
            <p>{{appointment}}</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'AppointmentID',
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
        data() {
            return {
                appointment: []
            }
        }
    }
</script>