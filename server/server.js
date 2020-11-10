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

app.listen(port, () => {
    console.log(`[Process 1] server running at http://localhost:${port}`)
})