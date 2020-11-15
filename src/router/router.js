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

  //search => select location => select barber => select service => confirm => pay => success
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {title: 'Hairzer | ค้นหา'}
  },
  {
    path: '/location',
    name: 'Location',
    component: () => import('../views/Location.vue'),
    meta: {title: 'Hairzer | เลือกสถานที่ที่คุณต้องการ'}
  },
  {
    path: '/barber',
    name: 'Barber',
    component: () => import('../views/Barber.vue'),
    meta: {title: 'Hairzer | เลือกช่างตัดผมที่คุณต้องการ'}
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('../views/Service.vue'),
    meta: {title: 'Hairzer | เลือกบริการที่คุณต้องการ'}
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: () => import('../views/Confirmation.vue'),
    meta: {title: 'Hairzer | ยืนยันการทำรายการ'}
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/Payment.vue'),
    meta: {title: 'Hairzer | เลือกวิธีการชำระเงิน'}
  },
  
  //Contact
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: {title: 'Hairzer | ช่องทางการติดต่อ'}
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/Signin.vue'),
    meta: {title: 'Hairzer | เข้าสู่ระบบ'}
  },

  //Signup
  {
    path: '/signup-customer',
    name: 'SignupCustomer',
    component: () => import('../views/Signup/SignupCustomer.vue'),
    meta: {title: 'Hairzer | สมัครสมาชิกสำหรับลูกค้า'}
  },
  {
    path: '/signup-location',
    name: 'SignupLocation',
    component: () => import('../views/Signup/SignupLocation.vue'),
    meta: {title: 'Hairzer | สมัครสมาชิกสำหรับสถานที่'}
  },
  {
    path: '/signup-barber',
    name: 'SignupBarber',
    component: () => import('../views/Signup/SignupBarber.vue'),
    meta: {title: 'Hairzer | สมัครสมาชิกสำหรับช่างตัดผม'}
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
    meta: {title: 'Hairzer | สมัครสมาชิก'}
  },

  //Profile
  {
    path: '/customer',
    name: 'Customer',
    redirect: '/customer/editprofile',
    component: () => import('../views/CustomerProfile/Profile.vue'),
    children: [
      {
        path: '/customer/editprofile',
        name: 'EditProfile',
        component: () => import('../views/CustomerProfile/EditProfile.vue'),
        meta: {title: 'Hairzer | แก้ไขข้อมูลส่วนตัว'}
      },
      {
        path: '/customer/appointment',
        name: 'Appointment',
        component: () => import('../views/CustomerProfile/Appointment.vue'),
        meta: {title: 'Hairzer | การใช้บริการ'}
      },
      {
        path: '/customer/history',
        name: 'History',
        component: () => import('../views/CustomerProfile/History.vue'),
        meta: {title: 'Hairzer | ประวัติการใช้บริการ'}
      }
    ]
  },
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
