const express = require('express')
const admin = require('firebase-admin')
const serviceAccount = require('./path/to/aboutheadproject-firebase-adminsdk-8f6w7-21431f7897.json')
const cors = require('cors')
const bodyParser = require('body-parser')
const base64Img = require('base64-img')

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
    next()
  })

//Firebase Config
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://aboutheadproject.firebaseio.com"
})
const db = admin.firestore()


//====================Search====================//
//Location Search
app.post('/location', (req, res) => {
    var locationList = []

    db.collection('location').where("lo_address.addr_district", "==", req.body.location).where("lo_status", "==", true).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            locationList.push(doc.data())
        })
        
        return res.status(200).json({
            title: 'location search result',
            location: locationList,
            barber: '',
            service: req.body.service,
            date: req.body.date,
            time: req.body.time
        })
    })
    .catch(error => {
        console.log(error)
    })
})

//Barber Search
app.post('/barber', (req, res) => {
    var barberList = []

    db.collection('barber').where("barb_addressService", "==", req.body.location).where("barb_status", "==", true).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            barberList.push(doc.data())
        })

        return res.status(200).json({
            title: 'barber search result',
            barber: barberList
        })
    })
    .catch(error => {
        console.log(error)
    })
})

//Service Search
app.post('/service', (req, res) => {
    var serviceList = []

    db.collection('service').where("service_barber", "==", req.body.barber).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            serviceList.push(doc.data())
        })

        return res.status(200).json({
            title: 'service search result',
            service: serviceList
        })
    })
    .catch(error => {
        console.log(error)
    })
})

//create appointment when payment suceess
app.post('/payment',(req, res) => {
    //check conflict appointment

    //create doc and save appointment to this doc
    var ref = db.collection('appointment').doc()
    ref.set({
        appmt_id: ref.id,
        appmt_customer: req.body.appmt_customer,
        appmt_location: req.body.appmt_location,
        appmt_barber: req.body.appmt_barber,
        appmt_service: req.body.appmt_service,
        appmt_date: req.body.appmt_date,
        appmt_time: req.body.appmt_time,
        appmt_status: req.body.appmt_status,
        appmt_cost: req.body.appmt_cost
    })
    .then(() => {
        console.log(`[SUCCESS] appointment: ${ref.id}`)
        return res.status(200).json({
            title: 'appointment success',
            appointment: ref.id
        })
    })
    .catch(error => {
        console.log(`[FAIL] ${error}`)
    })
})


//====================Customer Edit Profile====================//
//edit customer infomation
app.post('/editCustomerInfo', (req, res) => {
    var ref = db.collection('customer').doc(req.body.id)

    ref.update({
        cus_firstName: req.body.fname,
        cus_lastName: req.body.lname,
        cus_sex: req.body.sex,
        cus_phone: req.body.phone,
        cus_img: req.body.img
    })
    .then(() => {
        console.log(`[SUCCESS] update ${req.body.id}`)
        return res.status(200).json({
            title: 'update success'
        })
    })
    .catch(error => {
        console.log(`[FAIL] ${error}`)
    })
})

//upload image ******
app.post('/uploadImgProfile', (req, res) => {
    const { image } = req.body

    console.log(`[SUCCESS] upload image ${req.body.id} to success`)
    return res.status(200).json({
        title: 'upload sucess'
    })
})


//====================Customer Appointment Management====================//
//Show ppointment list
app.post('/appointment', (req, res, next) => {
    var appointmentList = []

    db.collection('appointment').where("appmt_customer.cus_id", "==", req.body.id).where("appmt_status","==","waiting").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            appointmentList.push(doc.data())
        })

        return res.status(200).json({
            title: 'show appointment',
            appointment: appointmentList
        })
    })
    .catch(err => {
        console.log(err)
    })
})

//Show detail ppointment by id
app.get('/appointment/:appmt_id', (req, res) => {
    var appointmentData = ''
    var appointmentID = req.params.appmt_id

    db.collection('appointment').where('appmt_id', "==", appointmentID).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            appointmentData = doc.data()
        })

        return res.status(200).json({
            title: 'get appointment by id',
            appointment: appointmentData
        })
    })
    .catch(err => {
        console.log(err)
    })
})

//appointment Success
app.post('/appointmentSuccess', (req, res) => {
    var ref = db.collection('appointment').doc(req.body.appmt_id)

    ref.update({
        appmt_status: 'success'
    })
    .then(() => {
        console.log(`[SUCCESS] change status ${req.body.id} to success`)
        return res.status(200).json({
            title: 'appointment success'
        })
    })
    .catch(error => {
        console.log(`[FAIL] ${error}`)
    })
})

//appointment cancel
app.post('/appointmentCancel', (req, res) => {
    var ref = db.collection('appointment').doc(req.body.appmt_id)

    ref.update({
        appmt_status: 'cancel'
    })
    .then(() => {
        console.log(`[SUCCESS] change status ${req.body.id} to cancel`)
        return res.status(200).json({
            title: 'appointment cancel'
        })
    })
    .catch(error => {
        console.log(`[FAIL] ${error}`)
    })
})

//Appointment History
app.post('/appointmentHistory', (req, res, next) => {
    var appointmentListHistory = []

    db.collection('appointment').where("appmt_customer.cus_id", "==", req.body.id).where("appmt_status","in", ['success', 'cancel', 'location reviewed', 'barber reviewed', 'reviewed']).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            appointmentListHistory.push(doc.data())
        })

        return res.status(200).json({
            title: 'show appointment',
            appointmentHistory: appointmentListHistory
        })
    })
    .catch(err => {
        console.log(err)
    })
})

//appointment delete
app.post('/appointmentDelete', (req, res) => {
    var ref = db.collection('appointment').doc(req.body.appmt_id)

    ref.update({
        appmt_status: 'delete'
    })
    .then(() => {
        console.log(`[SUCCESS] change status ${req.body.id} to delete` )
        return res.status(200).json({
            title: 'appointment delete'
        })
    })
})

//====================Review====================//
//Location Review
app.post('/locationReview', (req, res) => {
    //เพิ่มข้อมูล review
    var ref = db.collection('location_review').doc()
    ref.set({
        lo_review_id: ref.id,
        lo_review_customer: req.body.customer,
        lo_review_location: req.body.appointment.appmt_location,
        lo_review_appointment: req.body.appointment.appmt_id,
        lo_review_text: req.body.reviewText,
        lo_review_score: req.body.score,
        lo_review_date: req.body.appointment.appmt_date,
        lo_review_time: req.body.appointment.appmt_time
    })
    .then(() => {
        var status = ''
        var appointmentID = req.body.appointment.appmt_id

        //get ค่า status appointment มาเช็ค
        db.collection('appointment').doc(appointmentID).get()
        .then(function(doc) {
            status = doc.data().appmt_status

            //เปลี่ยน status success => location reviewed | ถ้ายังไม่เคยรีวิว แล้วมารีวิวสถานที่
            if(status == 'success') {
                db.collection('appointment').doc(req.body.appointment.appmt_id)
                .update({
                    appmt_status: 'location reviewed'
                })
                .then(() => {
                    console.log('[SUCCESS] create review and change status')
                    return res.status(200).json({
                        title: 'location review success'
                    })
                }).catch(err => { console.log(`[FAIL] ${err}`) })
            }
            
            //เปลี่ยน status barber reviewed => reviewed | ถ้าเคยรีวิวช่างตัดผม แล้วมารีวิวสถานที่
            if(status == 'barber reviewed') {
                db.collection('appointment').doc(req.body.appointment.appmt_id)
                .update({
                    appmt_status: 'reviewed'
                })
                .then(() => {
                    console.log('[SUCCESS] create review and change status')
                    return res.status(200).json({
                        title: 'location review success'
                    })
                }).catch(err => { console.log(`[FAIL] ${err}`) })
            }
                
        }).catch(err => {console.log(err)})
    })
    .catch(error => {
        console.log(`[FAIL] ${error}`)
    })
})

//Location Review
app.post('/barberReview', (req, res) => {
    //เพิ่มข้อมูล review
    var ref = db.collection('barber_review').doc()
    ref.set({
        barb_review_id: ref.id,
        barb_review_customer: req.body.customer,
        barb_review_barber: req.body.appointment.appmt_barber,
        barb_review_service: req.body.appointment.appmt_service,
        barb_review_appointment: req.body.appointment.appmt_id,
        barb_review_text: req.body.reviewText,
        barb_review_score: req.body.score,
        barb_review_date: req.body.appointment.appmt_date,
        barb_review_time: req.body.appointment.appmt_time
    })
    .then(() => {
        var status = ''
        var appointmentID = req.body.appointment.appmt_id

        //get ค่า status appointment มาเช็ค
        db.collection('appointment').doc(appointmentID).get()
        .then(function(doc) {
            status = doc.data().appmt_status

            //เปลี่ยน status status success => barber reviewed | ถ้ายังไม่เคยรีวิว แล้วมารีวิว
            if(status == 'success') {
                db.collection('appointment').doc(req.body.appointment.appmt_id)
                .update({
                    appmt_status: 'barber reviewed'
                })
                .then(() => {
                    console.log('[SUCCESS] create review and change status')
                    return res.status(200).json({
                        title: 'barber review success'
                    })
                }).catch(err => { console.log(`[FAIL] ${err}`) })
            }
            
            //เปลี่ยน status status barber reviewed => reviewed | ถ้าเคยรีวิวสถานที่ แล้วมารีวิวช่างตัดผม
            if(status == 'location reviewed') {
                db.collection('appointment').doc(req.body.appointment.appmt_id)
                .update({
                    appmt_status: 'reviewed'
                })
                .then(() => {
                    console.log('[SUCCESS] create review and change status')
                    return res.status(200).json({
                        title: 'barber review success'
                    })
                }).catch(err => { console.log(`[FAIL] ${err}`) })
            }
                
        }).catch(err => {console.log(err)})
    })
    .catch(error => {
        console.log(`[FAIL] ${error}`)
    })
})


//====================Location====================/
app.post('/changeLocationStatus', (req, res) => {
    ref = db.collection('location').doc(req.body.lo_id)

    ref.update({
        lo_status: !req.body.locationStatus
    })
    .then(() => {
        console.log(`[SUCCESS] change status location id: ${req.body.lo_id} to ${req.body.locationStatus}`)
        return res.status(200).json({
            title: 'change status location success'
        })
    })
    .catch(error => {
        console.log(`[FAIL] ${error}`)
    })
})

app.post('/editLocationInfo', (req, res) => {
    console.log(req.body)
    var ref = db.collection('location').doc(req.body.lo_id)

    ref.update({
        lo_firstName: req.body.lo_firstName,
        lo_lastName: req.body.lo_lastName,
        lo_sex: req.body.lo_sex,
        lo_phone: req.body.lo_phone,
        lo_address: req.body.lo_address
    })
    .then(() => {
        console.log(`[SUCCESS] edited location info id: ${req.body.lo_id}`)
        return res.status(200).json({
            title: 'edit location info success'
        })
    })
    .catch(error => {
        console.log(`[FAIL] ${error}`)
    })
})

app.post('/editLocationServiceInfo', (req, res) => {
    var ref = db.collection('location').doc(req.body.lo_id)

    ref.update({
        lo_locationName: req.body.lo_locationName,
        lo_cost: req.body.lo_cost,
        lo_equipment: req.body.lo_equipment,
        lo_description: req.body.lo_description
    })
    .then(() => {
        console.log(`[SUCCESS] edited location service info id: ${req.body.lo_id}`)
        return res.status(200).json({
            title: 'edit location service info success'
        })
    })
    .catch(error => {
        console.log(`[FAIL] ${error}`)
    })
})

//Show ppointment list
app.post('/appointmentLocation', (req, res, next) => {
    var appointmentList = []

    db.collection('appointment').where("appmt_location.lo_id", "==", req.body.id).where("appmt_status","==","waiting").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data())
            appointmentList.push(doc.data())
        })

        return res.status(200).json({
            title: 'show location appointment',
            appointment: appointmentList
        })
    })
    .catch(err => {
        console.log(err)
    })
})

app.post('/appointmentLocationHistory', (req, res, next) => {
    var appointmentListHistory = []

    db.collection('appointment').where("appmt_location.lo_id", "==", req.body.id).where("appmt_status","in", ['success', 'cancel', 'location reviewed', 'barber reviewed', 'reviewed' ,'delete']).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            appointmentListHistory.push(doc.data())
        })

        return res.status(200).json({
            title: 'show appointment',
            appointmentHistory: appointmentListHistory
        })
    })
    .catch(err => {
        console.log(err)
    })
})



//====================Barber====================/
app.post('/changeBarberStatus', (req, res) => {
    ref = db.collection('barber').doc(req.body.barb_id)

    ref.update({
        barb_status: !req.body.barberStatus
    })
    .then(() => {
        console.log(`[SUCCESS] change status location id: ${req.body.barb_id} to ${req.body.barberStatus}`)
        return res.status(200).json({
            title: 'change status barber success'
        })
    })
    .catch(error => {
        console.log(`[FAIL] ${error}`)
    })
})









app.listen(port, () => {
    console.log(`[Process 1] server running at http://localhost:${port}`)
})