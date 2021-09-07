const express = require('express')
const cors = require('cors')
const csrf = require('csurf')
const RateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const { apiResponse } = require("./apiResponse")
const axios = require('axios')
const { v4: uuid, v4 } = require('uuid');
const { Sequelize } = require('sequelize');
const { Requests, Responses } = require('./models');
const Q = require('q');
const { request } = require('express')

// const Requests = require('./models').Requests;
// const Responses = require('./models').Responses;

const sequelize = new Sequelize('vue-test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

var csrfProtection = csrf({ cookie: true })

var limiter = new RateLimit({
    windowMs: 1*60*1000, // 10 minutes 
    max: 100, // limit each IP to 100 requests per windowMs 
    delayMs: 0 
})

let app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(limiter)
app.use(cookieParser())
// app.use(csrfProtection)

app.get('/getcsrftoken', csrfProtection, function (req, res) {
    return res.json(success('', req.csrfToken(), 200))
});

// csrfProtection
app.post('/api/http/:method', async function (req, res) {  
    let allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    const method = req.params.method;
    if(allowedMethods.indexOf(method.toUpperCase())<0)
        return res.json(apiResponse(null, 'Unknow http method', 400));

    // axios.interceptors.request.use( (request, response) => {
    //     // perform a task before the request is sent        
    //     return request;
    // });
    
    const urlParts = new URL(req.body.url);
    try { 
        const requestResponse = await axios[method.toLowerCase()](req.body.url, { validateStatus: false });
        const response = { 
            location: urlParts.pathname, 
            server: '',
            statusCode: requestResponse.status, 
            http: 'HTTP '+requestResponse.request.res.httpVersion,                 
        };

        save(req.body.url, response);

        res.json(apiResponse({ 
            url: getUrlInfo(req.body.url), 
            request: {},
            response: response
        }, null, 200));
    }
    catch(err) {
        
        requestResponse = err.response;
        //console.log(arguments[1]);
        //console.log(arguments[1].req.httpVersion);
        const response = {
            location: urlParts.pathname, 
            server: '',
            statusCode: 400, 
            http: 'HTTP '+ arguments[1].req.httpVersion,    
        }

        save(req.body.url, response);
       
        res.json(apiResponse({ 
            url: getUrlInfo(req.body.url), 
            request: {},
            response: response
        }, err.code, 200));

        // res.json(apiResponse(null, 'An error ocurred while perfom action. Contact with administrators', 400));
    }    
});

// to see request-response details.
app.get('/:id', async (req, res) => {
    // cambiar esto.
    const id = req.params.id;
    Q.all([
        Requests.findByPk(id),
        Responses.findAll({ where: { requestId: id } }),
    ]).spread(function (requestObj, responsesObj) {
        res.json(apiResponse({ 
            url: getUrlInfo(requestObj.url), 
            request: {},
            response: responsesObj, 
            url: requestObj.url 
        }, null, 200));
    })
    .done();    
});

var save = function(req, res) { 
    const requestId = v4()
    req.id = requestId; 
    const requestRecord = Requests.build({ id: requestId, url: req });
    const responseRecord = Responses.build({ id: v4(), requestId: requestId, data: res });

    requestRecord.save();    
    responseRecord.save();
}

var getUrlInfo = function(url) { 
    const urlParts = new URL(url);
    return {
        domain: urlParts.hostname,
        scheme: urlParts.protocol.substr(0,4),
        path: urlParts.pathname
    };
}

// app.use((error, req, res, next) => {    
//     // if (error.code === 'EBADCSRFTOKEN') {
//     //   console.log(error);
//     //   console.log(req.get("csrf-token")); // <- displays the token perfectly 
//     //   return res.status(403).send();
//     // } 
//     return next(error);
//   });

// Run the server
app.listen(5000, () => console.log(`Server running in 5000`));



// in client side
// axios.get('/api/getcsrftoken').then((response) => {
//     axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken
//   }, (err) => {
//     console.log(err)
//   })


