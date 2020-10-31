const express = require('express')
const app = express()
const port = 5000
const admin = require('firebase-admin')
const serviceAccount = require('./path/to/aboutheadproject-firebase-adminsdk-8f6w7-21431f7897.json')

//Firebase Config
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://aboutheadproject.firebaseio.com"
})

const db = admin.firestore()

/*
Async Function เขียน async หน้า function แล้วเรียกใช้
ใส่ try, catch ใน function
ใส่ .then() ต่อท้ายตอนเรียก function
*/

//[ADD data] async callback
async function addData() {
    try {
        const docRef = db.collection('users').doc('Sekson');
        await docRef.set({
            first: 'Sekson',
            last: 'Thongon',
            born: 1999
          });
    }
    catch(err) {
        console.log(err)
    }
}

//[READ data] async function
async function readData() {
    try {
        const snapshot = await db.collection('users').get();
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    }
    catch(err) {
        console.log(err)
    }
}

//Callback function
//addData().then(() => {console.log('[Process 2] Add Data success')})
//readData().then(() => {console.log('[Process 3] Read Data success')})

//Home page
app.get('/', (req, res) => {
    res.send('Hairzer')
})

//GET userinfo by /edit/:uid
app.get('/profile/:uid', (req, res) => {
    db.collection('user').doc(req.params.uid).get().then(doc => {
        userData = doc.data()
        if (!userData) {
            res.status(404).send('Not Found')
        }
        else {
            res.status(200).json(userData)
        }
    }).catch(err => {
        console.log(err)
    })
})

//Test POST
app.post('/', function (req, res) {
    res.send('Got a POST request')
})

//Test PUT
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
})

//Test DELETE
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
    console.log(`[Process 1] server running at http://localhost:${port}`)
})