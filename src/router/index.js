//Vue Router
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  
  //Search
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/location',
    name: 'Location',
    component: () => import('../views/Location.vue')
  },

  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/Signin.vue')
  },

  //Signup
  {
    path: '/signup-customer',
    name: 'SignupCustomer',
    component: () => import('../views/Signup/SignupCustomer.vue')
  },
  {
    path: '/signup-location',
    name: 'SignupLocation',
    component: () => import('../views/Signup/SignupLocation.vue')
  },
  {
    path: '/signup-barber',
    name: 'SignupBarber',
    component: () => import('../views/Signup/SignupBarber.vue')
  },

  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '*',
    redirect: '/error'
  },
  {
    path: '/error',
    name: 'PageNotFound',
    component: () => import('../views/404.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
