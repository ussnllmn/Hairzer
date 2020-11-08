<!--/src/Home.vue-->

<template>
  <!--Banner-->
  <div class="home container">
    <div class="mt-4 shadow-sm">
      <Banner></Banner>
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
            tag="promotion"
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
            tag="promotion"
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
            tag="promotion"
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
            title="ช่างตัดผมสานตอก"
            :img-src="require('../assets/Barber/santok.jpg')"
            img-alt="barber1"
            img-top
            tag="barber"
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              บริการทุกระดับประทับใจ
            </b-card-text>
          </b-card>
        </div>

        <!--Barber 2-->
        <div class="col-sm m-1">
          <b-card 
            title="ช่างตัดผมเสกสัน"
            :img-src="require('../assets/Barber/sekson.jpg')"
            img-alt="barber2"
            img-top
            tag="barber"
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              ตัด สระ ซอย ย้อม ทำได้หมด
            </b-card-text>
          </b-card>
        </div>

        <!--Barber 3-->
        <div class="col-sm m-1">
          <b-card 
            title="ช่างตัดผมจ้อย"
            :img-src="require('../assets/Barber/joy.jpg')"
            img-alt="barber3"
            img-top
            tag="barber"
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              นิ่งเป็นหลับ ขยับเป็นตัด
            </b-card-text>
          </b-card>
        </div>

        <!--Barber 4-->
        <div class="col-sm m-1">
          <b-card 
            title="ช่างตัดผมชิบะสาน"
            :img-src="require('../assets/Barber/shibasan.jpg')"
            img-alt="barber4"
            img-top
            tag="barber"
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              ตัดได้ทุกอย่างยันคอนกรีต
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
            title="ร้านตัดผม 1"
            :img-src="require('../assets/hairzer-image/location.jpg')"
            img-alt="location1"
            img-top
            tag="location"
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              อุปกรณ์ครบครัน ครบกว่านี้ไม่มีอีกแล้ว
            </b-card-text>
          </b-card>
        </div>

        <!--Location 2-->
        <div class="col-sm m-1">
          <b-card 
            title="ร้านตัดผม 2"
            :img-src="require('../assets/hairzer-image/location.jpg')"
            img-alt="location2"
            img-top
            tag="location"
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              มีแค่เก้าอี้กับกระจก ที่เหลือหามาเอง
            </b-card-text>
          </b-card>
        </div>

        <!--Location 3-->
        <div class="col-sm m-1">
          <b-card 
            title="ร้านตัดผม 3"
            :img-src="require('../assets/hairzer-image/location.jpg')"
            img-alt="location3"
            img-top
            tag="location"
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              มีอุปกรณ์ทุกอย่าง ขาดเหลืออะไรเดี๋ยวไปซื้อให้
            </b-card-text>
          </b-card>
        </div>

        <!--Location 4-->
        <div class="col-sm m-1">
          <b-card 
            title="ร้านตัดผม 4"
            :img-src="require('../assets/hairzer-image/location.jpg')"
            img-alt="location4"
            img-top
            tag="location"
            style="width: 100%;"
            class="shadow-sm"
          >
            <b-card-text>
              อุปกรณ์พร้อม ต้องร้านตัดผม 4 ที่นี่ที่เดียว
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
