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
const helmet = require("helmet");

const sequelize = new Sequelize('vue-test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const csrfProtection = csrf({ cookie: true })

const limiter = new RateLimit({
    windowMs: 1*60*1000, // 10 minutes 
    max: 100, // limit each IP to 100 requests per windowMs 
    delayMs: 0 
})

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(limiter)
app.use(cookieParser())
app.use(csrfProtection)
app.use(helmet.hidePoweredBy());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.ieNoOpen())
app.use(helmet.xssFilter());

app.get('/api/getcsrftoken', csrfProtection, function (req, res) {
    const token = req.csrfToken()
    res.cookie('csrf-token', token)
    // res.cookie('XSRF-TOKEN', token)
    return res.json(apiResponse(token, null, 200))
});

// csrfProtection
app.post('/api/http/:method', async function (req, res) {  
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    const method = req.params.method;
    if(allowedMethods.indexOf(method.toUpperCase())<0)
        return res.json(apiResponse(null, 'Unknow http method', 400));

    const urlParts = new URL(req.body.url);
        
    try { 
        const requestResponse = await axios[method.toLowerCase()](req.body.url, { validateStatus: false })
            .catch(onRequestError);

        const isRedirect = requestResponse.request._redirectable._isRedirect;
        const response = { 
            location: urlParts.pathname, 
            server: '',
            statusCode: requestResponse.status, 
            http: 'HTTP '+requestResponse.request.res.httpVersion,                 
        };

        const reqId = saveRequest(req.body.url);
        if(isRedirect)
            saveResponse(reqId, 1, {
                location: urlParts.pathname, 
                server: '',
                statusCode: 302, 
                http: 'HTTP '+ arguments[1].req.httpVersion,
            })
        
        saveResponse(reqId, (isRedirect ? 2 : 1), {
            location: isRedirect ? new URL(requestResponse.request._redirectable._currentUrl).pathname : urlParts.pathname, 
            server: '',
            statusCode: res.statusCode, 
            http: 'HTTP '+ arguments[1].req.httpVersion,
        })

        res.json(apiResponse({ 
            url: getUrlInfo(req.body.url), 
            request: {
                id: reqId
            },
            response: response
        }, null, 200));
    }
    catch(err) {
        console.log(err);
        res.json(apiResponse(null, 'An error ocurred while perfom action. Contact with administrators', 400));
    }    
});

var onRequestError = function(err) {   
    if(err.response) {
        const urlParts = new URL(err.config.url);
        requestResponse = err.response;        
        const response = {
            location: urlParts.pathname, 
            server: '',
            statusCode: 400, 
            http: null 
        }

        const reqId = saveRequest(req.body.url);
        saveResponse(reqId, 1, response);
        
        res.json(apiResponse({ 
            url: getUrlInfo(req.body.url), 
            request: {
                id: reqId
            },
            response: response
        }, null, 200));
    }
    else { 
        res.json(apiResponse(null, 'An error ocurred while perfom action. Contact with administrators', 400));
    }
}

// to see request-response details.
app.get('/api/:id', csrfProtection, async (req, res) => {
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

app.use((error, req, res, next) => {    
    if(error.code != '') { 
        if (error.code === 'EBADCSRFTOKEN') {
            return res.json(apiResponse(null, 'Missing CSRF-TOKEN', 403));
        } else { 
            return res.json(apiResponse(null, 'An general error ocurred, contact with administrators', 500));
        }
    }
    return next(error);
});

var saveRequest = function (req) {
    const requestId = v4()
    req.id = requestId; 
    const requestRecord = Requests.build({ id: requestId, url: req });
    
    requestRecord.save();
    return requestId;  
}

var saveResponse = function (reqId, order, res) {
    const responseRecord = Responses.build({ id: v4(), requestId: reqId, data: res, order: order });
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

// Run the server.
app.listen(5000, () => console.log(`Server running in 5000`));