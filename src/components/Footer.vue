<!--/src/components/Footer.vue-->

<template>
    <div class="footer">
        <!--About us-->
        <div class="container-fluid text-light bg-dark pt-3">
            <div class="container">
                <b-row>
                    <b-col>
                        <h1 class="logo">HAIRZER</h1>
                    </b-col>
                    <b-col sm="6" class="small">
                        <h4><b>เกี่ยวกับเรา</b></h4>
                        Hairzer เป็นระบบจัดการบริการเกี่ยวกับผม Hair Service Management (HSM) เป็นช่องทางการให้บริการแบบใหม่บนเว็บ 
                        เป้าหมายของ project นี้ เพื่ออำนวยความสะดวกและจัดสรรเวลาแก่ผู้ที่ต้องการตัดผม ช่างตัดผม รวมถึงผู้ที่มีพื้นที่ที่ต้องการใช้เป็นร้านตัดผม 
                    </b-col>
                    <b-col sm="3" class="small">
                        <h4><b>ช่องทางการติดต่อ</b></h4>
                        <span>Email: contact@hairzer.com</span><br>
                        <span>เบอร์โทร: 012-3456789</span><br>
                        <span>ที่อยู่: 1 ลาดกระบัง กรุงเทพมหานคร 10520, ประเทศไทย</span><br>
                    </b-col>
                </b-row>
            </div>
        </div>
        
        <!--Copy right-->
        <div class="container-fluid text-light bg-dark text-center p-3">
            <span>copyright © Hair Service Management (HSM)</span>
        </div>
    </div>
</template>

<style>
    .logo {
        transition: color 0.5s ease;
    }
    .logo:hover {
        cursor: pointer;
        color: #28A745;
    }

</style>