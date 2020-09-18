const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({

    client: 'pg',
    connection: {
      host : 'postgresql-polished-87305',
      user : 'russelldyer',
      password : '',
      database : 'smart-brain'
    }
  });

 db.select('*').from('users').then(data => {
     console.log(data);
 
 });

const app = express();

app.use(bodyParser.json());
app.use(cors());

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             password: 'cookies',
//             email: 'john@gmail.com',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Russell',
//             email: 'russell@gmail.com',
//             password: 'anime',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }

// come back to the below code! We're removing the old database code

app.get('/', (req, res) => {
    // res.send(db.users)
    res.send(`it's working`)
})

// app.post('/signin', (req, res) => {
//     if (req.body.email === database.users[0].email && 
//         req.body.password === database.users[0].password) {
//             res.json("Success");
//         } else {
//             res.status(400).json('error logging in');
//         }
//     res.json('Sign In')
// })

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})


// app.get('/profile/:id', (req, res) => {
//     const {id} = req.params;
//     let found = false;
//     database.users.forEach(user => {
//         if (user.id === id) {
//         found = true;
//         return res.json(user)
//         }
//     })
//     if (!found) {
//         res.status(400).json('not found')
//     }
// })

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})


// app.get('/profile/:id', (req, res) => {
//     const {id} = req.params;
//     let found = false;
//     database.users.forEach(user => {
//         if (user.id === id) {
//             found = true
//             return res.json(user);
//         }
//     })
//     if (!found) {
//         res.status(404).json('not found')
//     }
// })


// app.post('/image', (req, res) => {
//     const {id} = req.body;
//     let found = false;
//     database.users.forEach(user => {
//         if (user.id === id) {
//         found = true;
//         user.entries++
//         return res.json(user.entries);
//         }
//     })
//     if (!found) {
//         res.status(400).json('not found')
//     }
// })

app.put('/image', (req, res) => {image.handleImagePut(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });



app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})



// 
//  --> res = this is working
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/ :userId --> GET = user
// /image --> PUT --> user