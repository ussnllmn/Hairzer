<template>
    <div class="payment container">
        <h1>ชำระเงิน</h1>
        <div v-if="paymentResult">
            <PaymentSuccess></PaymentSuccess>
        </div>

        <!--Choose payment box-->
        <div v-else class="paymentBox shadow-sm p-5">
            <!--พร้อมเพ-->
            <b-row class="shadow-sm payMenu p-4"  @click="promtPay">
                <b-col class="p-12">
                    <span class="h3">Promt Pay </span>
                    <b-icon icon="chevron-right" class="h3 pt-2 float-right"></b-icon>
                </b-col>
            </b-row>

            <!--บัตรเครดิต-->
            <b-row class="shadow-sm payMenu p-4 mt-5"  @click="creditCard">
                <b-col class="p-12">
                    <span class="h3">Credit Card </span>
                    <b-icon icon="chevron-right" class="h3 pt-2 float-right"></b-icon>
                </b-col>
            </b-row>

            <!--เงินสด-->
            <b-row class="shadow-sm payMenu p-4 mt-5" @click="cash">
                <b-col class="p-12">
                    <span class="h3">เงินสด </span>
                    <b-icon icon="chevron-right" class="h3 pt-2 float-right"></b-icon>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore'
    import axios from 'axios'
    import PaymentSuccess from './PaymentSuccess'

    export default {
        name: 'Payment',
        components: {
            PaymentSuccess
        },
        beforeCreate() {
            //check การเข้าสู่ระบบ
            firebase.auth().onAuthStateChanged(user => {
                if (!user) {
                    this.$router.replace({name: 'Signin'}).catch(()=>{})
                }
            })

            //get value จาก uid
            firebase.firestore().collection('customer').doc(firebase.auth().currentUser.uid).get()
            .then(doc => {
                this.userData = doc.data()
            })
            .catch(err => { console.log(err) })
            
            this.paymentResult = false
        },
        created() {
            this.appointment = JSON.parse(localStorage.getItem('appointment'))

            if(!this.appointment){
                this.$router.replace({name: 'Search'}).catch(()=>{})
            }
        },
        data() {
            return {
                appointment: '',
                paymentResult: false
            }
        },
        methods: {
            promtPay() {
                alert('การชำระเงินด้วย Promt Pay ยังไม่เปิดให้บริการ')
            },
            creditCard() {
                alert('การชำระเงินด้วย Credit Card ยังไม่เปิดให้บริการ')
            },
            cash() {
                let appointment = this.appointment
                
                console.log(appointment)

                axios.post('http://localhost:5000/payment', appointment)
                .then(
                    res => {
                        if(res.status === 200) {
                            this.PaymentSuccess = true
                            this.$route.meta.title = 'Hairzer | ชำระเงินสำเร็จ'
                            
                            //redirect ไปหน้า service
                            this.paymentResult = true
                        }
                    }
                ).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .payment {
        height: 725px;
    }
    .paymentBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }

    .payMenu {
        border: 2px solid #CED4DA;
        border-radius: 5px;
    }
    .payMenu:hover {
        cursor: pointer;
        border: 2px solid #28A745;
    }
</style>