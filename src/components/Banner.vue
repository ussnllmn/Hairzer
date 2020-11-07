<template>
  <div>
    <b-carousel
      id="banner"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333; border: 1px solid black;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
        <!-- first image -->
        <b-carousel-slide :img-src="require('../assets/hairzer-image/banner.jpg')"></b-carousel-slide>

        <!-- second image -->
        <b-carousel-slide :img-src="require('../assets/hairzer-image/banner.jpg')"></b-carousel-slide>

        <!-- third image -->
        <b-carousel-slide :img-src="require('../assets/hairzer-image/banner.jpg')"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>