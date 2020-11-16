<template>
    <div class="appointment container">
        <h1>หมายเลขนัดหมาย: {{}}</h1>
        <div>
            
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'AppointmentID',
        created() {
            axios.get('http://localhost:5000/appointment/', {params: this.$route.params})
            .then(
                res => {
                    if (res.status === 200) {
                        console.log(res.title)
                    }
                }
            )
        },
        data() {
            return {
            }
        }
    }
</script>