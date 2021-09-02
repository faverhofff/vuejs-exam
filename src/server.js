const express = require('express')
const cors = require('cors')
const csrf = require('csurf')
const RateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const { success, error } = require("./apiResponse")
const axios = require('axios')

var csrfProtection = csrf({ cookie: true })

var limiter = new RateLimit({
    windowMs: 10*60*1000, // 10 minutes 
    max: 100, // limit each IP to 100 requests per windowMs 
    delayMs: 0 
})

let app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(limiter)
app.use(cookieParser())
app.use(csrfProtection)

app.get('/getcsrftoken', csrfProtection, function (req, res) {
    return res.json(success('', req.csrfToken(), 200))
});

app.get('/process', csrfProtection, function (req, res) {
    res.json(success({ a: 100 }));
});

// Run the server
app.listen(5000, () => console.log(`Server running in 5000`));

// in client side

// axios.get('/api/getcsrftoken').then((response) => {
//     axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken
//   }, (err) => {
//     console.log(err)
//   })