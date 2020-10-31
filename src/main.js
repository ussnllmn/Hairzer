//Main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Boostrap Vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Firebase config
import firebase from 'firebase/app'
const firebaseConfig = {
  apiKey: "AIzaSyD_K-7RJmt--agWGzTXB5oUZRperx1VymE",
  authDomain: "aboutheadproject.firebaseapp.com",
  databaseURL: "https://aboutheadproject.firebaseio.com",
  projectId: "aboutheadproject",
  storageBucket: "aboutheadproject.appspot.com",
  messagingSenderId: "964288607362",
  appId: "1:964288607362:web:0c1b21d2ece2add484709b",
  measurementId: "G-ZDP315JF2G"
}
firebase.initializeApp(firebaseConfig);

//Firebase Auth
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
