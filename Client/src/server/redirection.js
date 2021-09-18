const express = require('express')
const app = express()

// for test
app.get('/', (req, res) => {
    //res.redirect(301, 'http://localhost:5000/hello')
    //response.set('location', '/hello');
    //response.status(301).send()
    console.log(res.statusCode);
    res.redirect(301, '/hello');  
});

// for test
app.get('/hello', (req, res) => {
    res.send('hello mundo...');
});

app.get('/normal', (req, res) => {
    res.send('BBB');
});

// Run the server
app.listen(5001, () => console.log(`Server running in 5001`));