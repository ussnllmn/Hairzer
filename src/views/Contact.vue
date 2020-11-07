<!--/src/Contact.vue-->

<template>
    <div class="contact">
        <div class="m-5">
            <div class="row justify-content-center">
                <!--Image contact-->
                <div class="col-sm-3">
                    <img src="../assets/hairzer-image/contact.jpg" width="100%">
                </div>

                <!--Contact box-->
                <div class="col-sm-5 contactBox">
                    <center><h3>ช่องทางการติดต่อ</h3></center>
                    <div class="mt-4">
                        <p><b>Email:</b> contact@hairzer.com</p>
                        <p><b>เบอร์โทร:</b> 012-3456789</p>
                        <p><b>ที่อยู่:</b> 1 ลาดกระบัง กรุงเทพมหานคร 10520, ประเทศไทย</p>
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
  .contact {
    height: 677px;
  }
  .contactBox {
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