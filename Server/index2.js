const express = require('express')
var cookieParser = require('cookie-parser')
var app = express();
app.use(cookieParser())

var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true }) 

app.use(csrfProtection);



app.get('/api/getcsrftoken', csrfProtection, function (req, res) {
    return res.json({ csrfToken: req.csrfToken() });
});

app.use((error, req, res, next) => {          
    res.locals._csrf = req.csrfToken();
    //console.log(error.code)
    
    if(error.code != '') { 
        if (error.code === 'EBADCSRFTOKEN') {
            return res.json({ status: 403, data: 'Missing'});
        } else { 
            return res.json({ status: 400, data: 'Fatal'});
            //return res.json(apiResponse(null, 'An general error ocurred, contact with administrators', 500));
        }
    }
    // return next(error);
    
    return next();
});

// Secure POST request by validate CSRF token
app.post('/api/formhandler', csrfProtection, function (req, res) {
    res.json({ a: '99999'})
})

app.use((error, req, res, next) => {  
    console.log(error.code)        
    // res.locals._csrf = req.csrfToken();
    next()
})

app.listen(5001, () => console.log(`Server running in 5001`));
module.exports = app;