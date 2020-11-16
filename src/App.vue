<!--/src/App.vue-->

<template>
  <div id="app" >
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

  export default {
    components: {
      Navbar,
      Footer
    }
  }
</script>

<style>
  #app {
    color: #495057;
  }
</style>