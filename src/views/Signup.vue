<!--/src/Signup.vue-->

<template>
    <div class="signup">
        <div class="m-5">
            <div class="row justify-content-center">
                <!--Image sign-up-->
                <div class="col-sm-3">
                    <img src="../assets/hairzer-image/signup.jpg" width="100%">
                </div>

                <!--Sign-up box-->
                <div class="col-sm-5 signupBox">
                    <center><h3>สมัครสมาชิก</h3></center>
                    <div class="mt-4">
                        <button type="submit" value="submit" class="btn btn-outline-primary btn-block mb-4" 
                        @click="$router.push({name: 'SignupCustomer'})">
                           <b-icon icon="person" aria-hidden="true"></b-icon> สมัครสมาชิกสำหรับลูกค้า
                        </button>

                        <button type="submit" value="submit" class="btn btn-outline-primary btn-block mb-4" 
                        @click="$router.push({name: 'SignupLocation'})">
                            <b-icon icon="geo-alt" aria-hidden="true"></b-icon> สมัครสมาชิกสำหรับสถานที่
                        </button>


                        <button type="submit" value="submit" class="btn btn-outline-primary btn-block mb-4" 
                        @click="$router.push({name: 'SignupBarber'})">
                            <b-icon icon="scissors" aria-hidden="true"></b-icon> สมัครสมาชิกสำหรับช่างตัดผม
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    img {
        display: block;
        border: 1px solid #212121;
    }
    .signup {
        height: 677px;
    }
    .signupBox {
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }
    @media (max-width:640px){
        img:first-child{
            display:none;
        }
    }
</style>