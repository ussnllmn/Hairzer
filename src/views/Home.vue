<!--/src/Home.vue-->

<template>
  <!--Banner-->
  <div class="home">
    <div class="pt-4">
      <Banner></Banner>
    </div>

    <!--Promotion-->
    <div class="py-4">
      <h3><b-icon icon="tag-fill" aria-hidden="true"></b-icon> โปรโมชั่น</h3>
      <div class="row" align="center">
        <div class="col-sm m-1">
          <img src="../assets/promotion2.jpg" width="100%">
        </div>
        <div class="col-sm m-1">
          <img src="../assets/promotion3.jpg" width="100%">
        </div>
        <div class="col-sm m-1">
          <img src="../assets/promotion4.jpg" width="100%">
        </div>
      </div>
    </div>

    <!--Barber-->
    <div class="pb-4">
      <h3><b-icon icon="scissors" aria-hidden="true"></b-icon> ช่างตัดผมที่แนะนำ</h3>
      <div class="row" align="center">
        <div class="col-sm m-1">
          <img src="../assets/Barber/santok.jpg" width="100%">
        </div>
        <div class="col-sm m-1">
          <img src="../assets/hairzer-image/barber.jpg" width="100%">
        </div>
        <div class="col-sm m-1">
          <img src="../assets/hairzer-image/barber.jpg" width="100%">
        </div>
      </div>
    </div>

    <!--Location-->
    <div class="pb-4">
      <h3><b-icon icon="geo-alt-fill" aria-hidden="true"></b-icon> สถานที่ที่แนะนำ</h3>
      <div class="row" align="center">
        <div class="col-sm m-1">
          <img src="../assets/hairzer-image/location.jpg" width="100%">
        </div>
        <div class="col-sm m-1">
          <img src="../assets/hairzer-image/location.jpg" width="100%">
        </div>
        <div class="col-sm m-1">
          <img src="../assets/hairzer-image/location.jpg" width="100%">
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

<style scoped>
  img {
    border: 1px solid #212121;
  }
</style>