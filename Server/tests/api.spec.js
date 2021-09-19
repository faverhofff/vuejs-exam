process.env.NODE_ENV = 'test';

const chai = require('chai')
const { expect, assert, should, use } = chai
const { ChaiJsonSchema } = require('chai-json-schema')
const { OkResponse, BaseResponse } = require('./api.json.schema')
const q = require('q')
const { config } = require('../config/config')
const axios = require('axios');
const cookieParser = require('cookie-parser')

chai.use(require('chai-json-schema'));

describe('Test API endpoints', () => {

    const axiosInstance = axios.create({
        baseURL: `${config.host.fullUrl}`,
        withCredentials: false,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
    });

    let requestId = '';

    before( () => {  
        
    });

    // it('Getting csrf token', async () => {
    //     await axiosInstance.get(`${config.host.fullUrl}/getcsrftoken`).then((result) => {
    //         const response = result.data;               
    //         assert.isObject(response, 'Response is not an object')   
    //         expect(response).to.have.all.keys('data', 'errors', 'status')                     
    //         assert.equal(response.status, 200, 'HTTP Status code is not 200')
    //         assert.equal(response.errors, '', 'There is an error in response')                   
    //     })                
    // })

    it('Examine with wrong url', async () => {        
        await axiosInstance.get(`${config.host.fullUrl}/getcsrftoken`).then( async (result) => {                
            axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = result.data.data;
            
            await axiosInstance.post(`${config.host.fullUrl}/http/get`, 
                { url: 'http://www.google.commmm' }).then( (callResult) => {
                

            
                const response = callResult;                    
                console.log(response.data)
                /*expect(response).to.be.jsonSchema(OkResponse);
                
                assert.equal(response.data.url.domain, 'www.google.commmm', 'Wrong url domain') 
                assert.equal(response.data.url.scheme, 'http', 'Wrong url scheme') 
                assert.equal(response.data.url.path, '/', 'Wrong url path') 
                assert.equal(response.data.response[0].location, '/', 'Wrong url path') 
                assert.equal(response.data.response[0].statusCode, 400, 'Wrong status code') 
                assert.equal(response.data.response[0].http, 'HTTP 1.1', 'Wrong http') */
            })        
        })
    })

    // it('Examine with correct url', async () => {
    //     await requestService.getToken().then( async (result) => {            
    //         axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = result.data.data;
    //         await requestService.call('get', 'http://www.google.com').then( (callResult) => {
    //             const response = callResult.data;    
    //             expect(response).to.be.jsonSchema(OkResponse);
                
    //             assert.equal(response.data.url.domain, 'www.google.com', 'Wrong url domain') 
    //             assert.equal(response.data.url.scheme, 'http', 'Wrong url scheme') 
    //             assert.equal(response.data.url.path, '/', 'Wrong url path') 
    //             assert.equal(response.data.response[0].location, '/', 'Wrong url path') 
    //             assert.equal(response.data.response[0].statusCode, 200, 'Wrong status code') 
    //             assert.equal(response.data.response[0].http, 'HTTP 1.1', 'Wrong http') 

    //             requestId = response.data.request.id;
    //         })        
    //     })
    // })

    // it('Examine url without csrf', async () => {       
    //     axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = null;
    //     await requestService.call('get', 'http://www.google.com').then( (callResult) => {
    //         const response = callResult.data;
    //         expect(response).to.be.jsonSchema(BaseResponse);            
    //         assert.equal(response.status, 403, 'HTTP Status code is not 403')
    //         assert.equal(response.errors, 'Missing CSRF-TOKEN', 'There is not error in response')        
    //     })   
    // })

    // it('Get data with correct ID', async () => {
    //     await requestService.getToken().then( async (result) => {            
    //         axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = result.data.data;
    //         await requestService.getSharedQuery(requestId).then( (callResult) => {
    //             const response = callResult.data;    
    //             expect(response).to.be.jsonSchema(OkResponse);
                
    //             assert.equal(response.data.url.domain, 'www.google.com', 'Wrong url domain') 
    //             assert.equal(response.data.url.scheme, 'http', 'Wrong url scheme') 
    //             assert.equal(response.data.url.path, '/', 'Wrong url path') 
    //             assert.equal(response.data.response[0].location, '/', 'Wrong url path') 
    //             assert.equal(response.data.response[0].statusCode, 200, 'Wrong status code') 
    //             assert.equal(response.data.response[0].http, 'HTTP 1.1', 'Wrong http') 

    //             requestId = response.data.request.id;
    //         })     
    //     })
    // })

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