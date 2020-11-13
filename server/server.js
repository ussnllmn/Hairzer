const express = require('express')
const admin = require('firebase-admin')
const serviceAccount = require('./path/to/aboutheadproject-firebase-adminsdk-8f6w7-21431f7897.json')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

//Firebase Config
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://aboutheadproject.firebaseio.com"
})
const db = admin.firestore()


//Search//
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

//Appointment when payment suceess
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

app.listen(port, () => {
    console.log(`[Process 1] server running at http://localhost:${port}`)
})