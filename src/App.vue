<!--/src/App.vue-->

<template>
  <div id="app" >
    <Navbar v-if="userType == 'customer' | userType == null" :key="userType"></Navbar>
    <NavbarLocation v-if="userType == 'location'" :key="userType"></NavbarLocation>
    <div class="container-fluid p-0">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import NavbarLocation from './components/NavbarLocation'
  import Footer from './components/Footer'
  import Loading from './components/Loading'

  export default {
    components: {
      Navbar,
      NavbarLocation,
      Footer,
      Loading,
    },
    data() {
      return {
        userType: null,
        loadingStatus: false 
      }
    },
    beforeCreate() {
        this.userType = localStorage.getItem('userType')
        this.loadingStatus = true
    },
    mounted() {
      this.loadingStatus = false
    },
    updated() {
      this.userType = localStorage.getItem('userType')
    }
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