<!--/src/Home.vue-->

<template>
  <!--Banner-->
  <div class="home container">
    <div class="mt-4 shadow-sm">
      <Banner class="shadow-sm"></Banner>
    </div>

    <!--Promotion-->
    <div class="my-4 p-2 box">
      <h3>โปรโมชั่น <b-icon icon="tag-fill" aria-hidden="true"></b-icon></h3>
      <p>พบกับโปรโมชั่นสุดพิเศษได้ทุกวัน</p>
      <hr>
      <div class="row" align="left">
        <!--Promotion 1-->
        <div class="col-sm m-1">
          <b-card 
            title="ส่วนลด 30%"
            :img-src="require('../assets/promotion/promotion2.jpg')"
            img-alt="promotion1"
            img-top
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              สมัครสมาชิกวันนี้ รับส่วนลด 30% สำหรับลูกค้าใหม่ 
            </b-card-text>
          </b-card>
        </div>

        <!--Promotion 2-->
        <div class="col-sm m-1">
          <b-card 
            title="ส่วนลด 10%"
            :img-src="require('../assets/promotion/promotion3.jpg')"
            img-alt="promotion2"
            img-top
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              ใช้บริการทุกวันพฤหัสบดี รับทันทีส่วนลด 10%
            </b-card-text>
          </b-card>
        </div>

        <!--Promotion 3-->
        <div class="col-sm m-1">
          <b-card 
            title="ส่วนลด 25%"
            :img-src="require('../assets/promotion/promotion4.jpg')"
            img-alt="promotion3"
            img-top
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
                รับส่วนลดทันที 25% เมื่อใช้บริการทำสีผม
            </b-card-text>
          </b-card>
        </div>

        <!--Promotion 4-->
        <div class="col-sm m-1">
          <b-card 
            title="ส่วนลด 25%"
            :img-src="require('../assets/promotion/promotion1.jpg')"
            img-alt="promotion1"
            img-top
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
                ลด 50% ทั้งสถานที่และบริการสำหรับเด็ก
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
    

    <!--Barber-->
    <div class="mb-4 p-2 box">
      <h3>ช่างตัดผมที่แนะนำ <b-icon icon="scissors" aria-hidden="true"></b-icon></h3>
      <p>ช่างตัดผมมืออาชีพที่พร้อมให้บริการคุณ</p>
      <hr>
      <div class="row" align="left">
        <!--Barber 1-->
        <div class="col-sm m-1">
          <b-card 
            title="ซึเนโอ โนบิตะ"
            :img-src="require('../assets/Barber/Tsuneo Nobita.png')"
            img-alt="barber1"
            img-top
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              ช่างตัดผมมืออาชีพชื่อดังจากประเทศญี่ปุ่น 
            </b-card-text>
          </b-card>
        </div>

        <!--Barber 2-->
        <div class="col-sm m-1">
          <b-card 
            title="เจนนิเฟอร์ กิโลเมตร"
            :img-src="require('../assets/Barber/Jennifer Kilometer.jpg')"
            img-alt="barber2"
            img-top
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              ช่างตัดผมสาวสวย กรรไกรคู่ มากประสบการณ์
            </b-card-text>
          </b-card>
        </div>

        <!--Barber 3-->
        <div class="col-sm m-1">
          <b-card 
            title="อลัน วอร์คแมน"
            :img-src="require('../assets/Barber/Alan Walkman.jpg')"
            img-alt="barber3"
            img-top
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              ช่างตัดผมสไตล์วินเทจจากประเทศแคนาดา
            </b-card-text>
          </b-card>
        </div>

        <!--Barber 4-->
        <div class="col-sm m-1">
          <b-card 
            title="ชี่ เฉี่ยว ฮัว"
            :img-src="require('../assets/Barber/ChiSyouHua.jpg')"
            img-alt="barber4"
            img-top
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              ช่างตัดผมมือทองจากแดนมังกรทอง
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>

    <!--Location-->
    <div class="mb-4 p-2 box">
      <h3>สถานที่ที่แนะนำ <b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon></h3>
      <p>สถานที่ตัดผมพร้อมอุปกรณ์ที่ครบครัน</p>
      <hr>
      <div class="row" align="left">
        <!--Location 1-->
        <div class="col-sm m-1">
          <b-card 
            title="Vintage Cut"
            :img-src="require('../assets/Location/location-1.jpg')"
            img-alt="location1"
            img-top
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              ร้านตัดผมสไตล์วินเทจ รองรับลูกค้ามากมาย
            </b-card-text>
          </b-card>
        </div>

        <!--Location 2-->
        <div class="col-sm m-1">
          <b-card 
            title="Modern Combat"
            :img-src="require('../assets/Location/location-2.jpg')"
            img-alt="location2"
            img-top
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              อุปกรณ์ทันสมัย ครบครัน มีพร้อมบริการคุณ
            </b-card-text>
          </b-card>
        </div>

        <!--Location 3-->
        <div class="col-sm m-1">
          <b-card 
            title="See Saw"
            :img-src="require('../assets/Location/location-3.jpg')"
            img-alt="location3"
            img-top
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              ร้านตัดผมตกแต่งสไดล์ Loft ที่เหมาะกับคุณ
            </b-card-text>
          </b-card>
        </div>

        <!--Location 4-->
        <div class="col-sm m-1">
          <b-card 
            title="ร้านตัดผมโชคดี"
            :img-src="require('../assets/Location/location-4.jpg')"
            img-alt="location4"
            img-top
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              ใช้บริการร้านนี้แล้วจะโชคดีมีชัยในต่างแดน
            </b-card-text>
          </b-card>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'

export default {
   components: {
     Banner,
   }
}
</script>
