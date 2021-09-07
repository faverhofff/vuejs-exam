const express = require('express')
const app = express()

// for test
app.get('/redirect', (req, res) => {
    //res.redirect(301, 'http://localhost:5000/hello')
    response.set('location', '/hello');
    response.status(301).send()
});

// for test
app.get('/hello', (req, res) => {
    res.send('hello mundo...');
});

// Run the server
app.listen(6000, () => console.log(`Server running in 6000`));