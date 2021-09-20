process.env.NODE_ENV = 'test';
const session = require('supertest-session');

const chai = require('chai')
const { expect, assert, should, use } = chai
const { ChaiJsonSchema } = require('chai-json-schema')
const { OkResponse, BaseResponse } = require('./api.json.schema')
const q = require('q')
const { config } = require('../config/config')
var app = require('../index.js');

chai.use(require('chai-json-schema'));


describe('Test API endpoints', () => {

    let server = null;
    let id = 999;
    let csrf = null;

    before( () => {  
        server = session(app);        
    });

    it('Getting csrf token', async () => {
        console.log('1')
        server
            .get('/api/getcsrftoken')    
            .end((er, result) => {                
                const response = result.body;               
                assert.isObject(response, 'Response is not an object')   
                expect(response).to.have.all.keys('data', 'errors', 'status')                     
                assert.equal(response.status, 200, 'HTTP Status code is not 200')
                assert.equal(response.errors, '', 'There is an error in response')                   

                csrf = response.data
                console.log(csrf)
            })              
    }) 

    it('Examine with wrong url', () => {          
        console.log('2')          
        server
            .post('/api/http/get')    
            .set('csrf-token', csrf)
            .send({ url: 'http://www.google.commmm' })
            .end((er, response) => {
                // expect(response.body.data).to.be.jsonSchema(OkResponse);
                assert.equal(response.body.data.url.domain, 'www.google.commmm', 'Wrong url domain') 
                assert.equal(response.body.data.url.scheme, 'http', 'Wrong url scheme') 
                assert.equal(response.body.data.url.path, '/', 'Wrong url path') 
                assert.equal(response.body.data.response[0].location, '/', 'Wrong url path') 
                assert.equal(response.body.data.response[0].statusCode, 400, 'Wrong status code') 
                assert.equal(response.body.data.response[0].http, '', 'Wrong http') 
            })                    
    })

    it('Examine with correct url', () => {
        console.log('3')
        // id = 'XX00XX'
        // console.log(id)
        
        server
            .post('/api/http/get')    
            .set('csrf-token', csrf)
            // .set( 'Connection', 'close' )
            .send({ url: 'http://www.google.com' })
            .end((er, response) => {
                console.log('xxx')    
                id = 'XXXXXX' // response.body.data.request.id
                // expect(response.body.data).to.be.jsonSchema(OkResponse);
                assert.equal(response.body.data.url.domain, 'www.google.com', 'Wrong url domain') 
                assert.equal(response.body.data.url.scheme, 'http', 'Wrong url scheme') 
                assert.equal(response.body.data.url.path, '/', 'Wrong url path') 
                assert.equal(response.body.data.response[0].location, '/', 'Wrong url path') 
                assert.equal(response.body.data.response[0].statusCode, 200, 'Wrong status code') 
                assert.equal(response.body.data.response[0].http, 'HTTP 1.1', 'Wrong http') 
                
                            
                // mierdon = response.body.data.request.id
                // console.log(mierdon)         
                // console.log(csrf)
            })        
            
    })

    it('Examine url without csrf', async () => {   
        console.log('4')    
        console.log(id)
        server
            .post('/api/http/get')                
            .set( 'Connection', 'close' )
            .send({ url: 'http://www.google.com' })
            .end((er, response) => {
                // expect(response.body.data).to.be.jsonSchema(OkResponse);
                const result = response.body;                       
                assert.equal(result.status, 403, 'HTTP Status code is not 403')
                assert.equal(result.errors, 'Missing CSRF-TOKEN', 'There is not error in response')                       
            })            
    })

    it('Get data with correct ID', () => {
        console.log('5')
        console.log(id);

            // await requestService.getSharedQuery(requestId).then( (callResult) => {
            server
                .get('/'+id)     
                .set('csrf-token', csrf)
                .end((er, response) => {
                    const result = response.body;    
                    // expect(response).to.be.jsonSchema(OkResponse);
                    
                    

                    assert.equal(response.data.url.domain, 'www.google.com', 'Wrong url domain') 
                    assert.equal(response.data.url.scheme, 'http', 'Wrong url scheme') 
                    assert.equal(response.data.url.path, '/', 'Wrong url path') 
                    assert.equal(response.data.response[0].location, '/', 'Wrong url path') 
                    assert.equal(response.data.response[0].statusCode, 200, 'Wrong status code') 
                    assert.equal(response.data.response[0].http, 'HTTP 1.1', 'Wrong http') 

                    requestId = response.data.request.id;
                })     
    })

    // it('Get data with incorrect ID', async () => {
    //     await requestService.getToken().then( async (result) => {            
    //         axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = result.data.data;
    //         await requestService.getSharedQuery(requestId+'0000').then( (callResult) => {
    //             const response = callResult.data;    
    //             expect(response).to.be.jsonSchema(BaseResponse);

    //             assert.equal(response.errors, 'Not found') 
    //             assert.equal(response.status, 404) 
    //             assert.equal(response.data, null)                 
    //         })     
    //     })
    // })

    // it('Get data without csrf', async () => {
    //     axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = null;
    //     await requestService.getSharedQuery(requestId).then( (callResult) => {
    //         const response = callResult.data;
    //         expect(response).to.be.jsonSchema(BaseResponse);        
    //         console.log(response);
    //         assert.equal(response.status, 403, 'HTTP Status code is not 403')
    //         assert.equal(response.errors, 'Missing CSRF-TOKEN', 'There is not error in response')        
    //     })  
    // })

    // it('Make 20 concurrent request to examine url', async () => {

    //     const taskArray = Array.apply(0, Array(20)).map(function() { 
    //         return requestService.getToken(); 
    //     })

    //     q.all(taskArray)
    // })

    
});