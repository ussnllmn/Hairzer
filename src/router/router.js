//Vue Router
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //====================Home====================//
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  
  //====================Contact====================//
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: {title: 'Hairzer | ช่องทางการติดต่อ'}
  },

  //====================Booking====================//
  //search
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {title: 'Hairzer | ค้นหา'}
  },
  //location search
  {
    path: '/search_location',
    name: 'SearchLocation',
    component: () => import('../views/SearchLocation.vue'),
    meta: {title: 'Hairzer | เลือกสถานที่ที่คุณต้องการ'}
  },
  //barber search
  {
    path: '/search_barber',
    name: 'SearchBarber',
    component: () => import('../views/SearchBarber.vue'),
    meta: {title: 'Hairzer | เลือกช่างตัดผมที่คุณต้องการ'}
  },
  //service search
  {
    path: '/search_service',
    name: 'SearchService',
    component: () => import('../views/SearchService.vue'),
    meta: {title: 'Hairzer | เลือกบริการที่คุณต้องการ'}
  },
  //confirmation
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: () => import('../views/Confirmation.vue'),
    meta: {title: 'Hairzer | ยืนยันการทำรายการ'}
  },
  //payment
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/Payment.vue'),
    meta: {title: 'Hairzer | เลือกวิธีการชำระเงิน'}
  },

  //====================Sign-in====================//
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/Signin.vue'),
    meta: {title: 'Hairzer | เข้าสู่ระบบ'}
  },

  //====================Sign-up====================//
  //customer sign-up
  {
    path: '/signup-customer',
    name: 'SignupCustomer',
    component: () => import('../views/Signup/SignupCustomer.vue'),
    meta: {title: 'Hairzer | สมัครสมาชิกสำหรับลูกค้า'}
  },
  //location sign-up
  {
    path: '/signup-location',
    name: 'SignupLocation',
    component: () => import('../views/Signup/SignupLocation.vue'),
    meta: {title: 'Hairzer | สมัครสมาชิกสำหรับสถานที่'}
  },
  //barber sign-up
  {
    path: '/signup-barber',
    name: 'SignupBarber',
    component: () => import('../views/Signup/SignupBarber.vue'),
    meta: {title: 'Hairzer | สมัครสมาชิกสำหรับช่างตัดผม'}
  },
  //main sign-up
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
    meta: {title: 'Hairzer | สมัครสมาชิก'}
  },

  //====================Customer====================//
  {
    path: '/customer',
    name: 'Customer',
    redirect: '/customer/editprofile',
    component: () => import('../views/CustomerProfile/Profile.vue'),
    children: [
      //edit profile
      {
        path: '/customer/editprofile',
        name: 'EditProfile',
        component: () => import('../views/CustomerProfile/EditProfile.vue'),
        meta: {title: 'Hairzer | แก้ไขข้อมูลส่วนตัว'}
      },
      //appointment management
      {
        path: '/customer/appointment',
        name: 'appointmentManagement',
        component: () => import('../views/CustomerProfile/AppointmentManagement.vue'),
        meta: {title: 'Hairzer | การใช้บริการ'}
      },
      //appoitment detail
      {
        path: '/customer/appointment/:appmt_id',
        name: 'Appointment',
        component: () => import('../views/Appointment.vue'),
        meta: {title: `Hairzer | การนัดหมาย`}
      },
      //appointment history
      {
        path: '/customer/history',
        name: 'History',
        component: () => import('../views/CustomerProfile/History.vue'),
        meta: {title: 'Hairzer | ประวัติการใช้บริการ'}
      },
      //location review
      {
        path: '/customer/location_review/:appmt_id',
        name: 'LocationReview',
        component: () => import('../views/CustomerProfile/LocationReview.vue'),
        meta: {title: `Hairzer | รีวิวการใช้บริการสถานที่`}
      },
      //barber review
      {
        path: '/customer/barber_review/:appmt_id',
        name: 'BarberReview',
        component: () => import('../views/CustomerProfile/BarberReview.vue'),
        meta: {title: `Hairzer | รีวิวการใช้บริการช่างตัดผม`}
      },
    ]
  },

  //====================Location====================//
  {
    path: '/location',
    name: 'Location',
    redirect: '/location/profile',
    component: () => import('../views/LocationProfile/Location.vue'),
    children: [
      //location profile
      {
        path: '/location/profile/:lo_id',
        name: 'LocationProfile',
        component: () => import('../views/LocationProfile/LocationProfile.vue')
      },
      //edit location profile
      {
        path: '/location/editprofile',
        name: 'LocationEditProfile',
        component: () => import('../views/LocationProfile/LocationEditProfile.vue')
      },
      //appointment location management
      {
        path: '/location/appointment',
        name: 'appointmentLocationManagement',
        component: () => import('../views/LocationProfile/LocationAppointmentManagement.vue')
      },
      //appointment detail
      {
        path: '/location/appointment/:appmt_id',
        name: 'LocationAppointment',
        component: () => import('../views/Appointment.vue'),
        meta: {title: `Hairzer | การนัดหมาย`}
      },
    ]
  },

  //====================Barber====================//
  

  //====================Error====================//
  {
    path: '*',
    redirect: '/error'
  },
  {
    path: '/error',
    name: 'PageNotFound',
    component: () => import('../views/404.vue'),
    meta: {title: 'Hairzer | ขออภัยไม่พบหน้าที่คุณต้องการ'}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//Title
const DEFAULT_TITLE = 'Hairzer | ระบบจัดการบริการเกี่ยวกับผม'

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE
  })
})

export default router
