<template>
    <div class="BarberProfile">
        <div class="profileBox shadow-sm p-4 m-4">
            <p>barber info: {{barberProfile}}</p>
            <p>barber review: {{barberReviewData}}</p>
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
                barberService: ''
            }
        },
        created() {
            //get barber info from firebase
            firebase.firestore().collection('barber').doc(this.$route.params.barb_id).get()
            .then(doc => {
                this.barberProfile = doc.data()
            })
            .catch(err => {console.log(err)})

            //get barber review 
            firebase.firestore().collection('barber_review').where('barb_review_barber.barb_id','==',this.$route.params.barb_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.barberReviewData.push(doc.data())
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