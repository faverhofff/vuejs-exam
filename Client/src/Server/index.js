const express = require('express')
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require('cors')
const csrf = require('csurf')
const RateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const { apiResponse } = require("./apiResponse")
const axios = require('axios')
const { v4 } = require('uuid')
const { Sequelize } = require('sequelize');
const { Requests, Responses } = require('./models')
const Q = require('q')
const helmet = require("helmet")
const { config } = require('./config/config')

new Sequelize(config.bd.name, config.bd.user, config.bd.password, config.bd);

const limiter = new RateLimit({
    windowMs: config.limiter.time,
    max: config.limiter.maxRequests,
    delayMs: 0 
})

const corsOptions = {
    origin: config.cors,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH','OPTIONS'],
    credentials: true,
}

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Server API",
        description: "Server API Information",
        contact: {
            name: "Home Developer"
        },
        license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
        },
        servers: ["http://localhost:5000"]
      }
    },
    apis: ["./*.yaml"]
};

const app = express()
app.use(cors(corsOptions))
app.use(helmet.hidePoweredBy());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.ieNoOpen())
app.use(helmet.xssFilter())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(limiter)
app.use(cookieParser())
const csrfProtection = csrf({ cookie: true })
app.use(csrfProtection)


const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api/getcsrftoken', csrfProtection, function (req, res) {
    const token = req.csrfToken()
    // res.cookie('csrf-token', token)    
    return res.json(apiResponse(token, null, 200))
});


app.post('/api/http/:method/', csrfProtection, async (req, res) => {  
    const url = req.body.url
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    const method = req.params.method;
    if(allowedMethods.indexOf(method.toUpperCase())<0)
        return res.json(apiResponse(null, 'Unknow http method', 400));

    const urlParts = new URL(url);
    
    //try { 
        const requestResponse = await axios[method.toLowerCase()](url).catch( 
            error => console.log(''));
            
        const isRedirect = requestResponse!=null && requestResponse.request != null && requestResponse.request._redirectable._isRedirect;      
        let responses = [];

        const reqId = saveRequest(url);
        if(isRedirect) { 
            const redirectResponse = {
                location: urlParts.pathname, 
                server: '',
                date: null,
                statusCode: 302, 
                http: 'HTTP ' + requestResponse.request.res.httpVersion 
            };
            responses.push(redirectResponse)
            saveResponse(reqId, 1, redirectResponse)
        }

       

        let finalResponse = {
            location: isRedirect ? new URL(requestResponse.request._redirectable._currentUrl).pathname : urlParts.pathname, 
            server: '',
            date: new Date(),                    
            statusCode: requestResponse != null ? requestResponse.status : 400,  
            http: requestResponse == null ? '' : 'HTTP '+ requestResponse.request.res.httpVersion  // arguments[1].req.httpVersion,
        }

        

        saveResponse(reqId, (isRedirect ? 2 : 1), finalResponse)
        responses.push(finalResponse)

        res.json(apiResponse({ 
            url: getUrlInfo(url), 
            request: {
                id: reqId
            },
            response: responses
        }, null, 200));
    // }
    // catch(err) {        
    //     res.json(apiResponse(null, 'An error ocurred while perfom action. Contact with administrators', 400));
    // }    
});


app.get('/api/:id', csrfProtection, async (req, res) => {
    const id = req.params.id;
    try { 
        Q.all([
            Requests.findByPk(id),
            Responses.findAll({ where: { requestId: id } }),
        ]).spread(function (requestObj, responsesObj) {

            if(requestObj == null) { 
                res.status(200).json(apiResponse(null, 'Not found', 404))                
            }
            else { 
                res.json(apiResponse({ 
                    url: getUrlInfo(requestObj.url), 
                    request: {
                        id: requestObj.id
                    },
                    response: responsesObj.map( obj => obj.data),                     
                }, null, 200));
            }
        })
        .done();    
    }
    catch (err) { 
        res.json(apiResponse(null, 'An error ocurred while performing action. Err: '+err.message, 400));
    }
});

app.use((error, req, res, next) => {          
    res.locals._csrf = req.csrfToken();    
    if(error.code != '') { 
        if (error.code === 'EBADCSRFTOKEN') {
            return res.json(apiResponse(null, 'Missing CSRF-TOKEN', 403));
        } else { 
            return res.json(apiResponse(null, 'An general error ocurred, contact with administrators', 500));
        }
    }
    
    return next();
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
        scheme: urlParts.protocol.substr(0, urlParts.protocol.length-1),
        path: urlParts.pathname
    };
}

// Run the server.
app.listen(config.host.port, () => console.log(`Server running in ${config.host.port}`));
module.exports = app;