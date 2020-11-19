<!--/src/App.vue-->

<template>
  <div id="app" >
    <Loading v-if="this.$loadingStatus"></Loading>
    <Navbar></Navbar>
    <div class="container-fluid p-0">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import Footer from './components/Footer'
  import Loading from './components/Loading'

  export default {
    components: {
      Navbar,
      Footer,
      Loading
    },
    beforeMount() {
      this.$loadingStatus = true
    },
    mounted() {
      this.$loadingStatus = false
    },
  }
</script>

<style>
  #app {
    color: #495057;
  }
  .backBtn a{
    text-decoration: none;
    color: #495057;
  }

  .backBtn a:hover{
    text-decoration: none;
    color: darkgray;
  }
</style>