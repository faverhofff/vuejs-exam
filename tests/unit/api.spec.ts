import { expect, assert, should } from 'chai'
import { requestService } from '@/core/services/request.service'

describe('API', () => {

    it('Getting csrf token', async () => {
        
        console.log(process.env.VUE_APP_API_URL)
        
        await requestService.getToken().then((result: any) => {

            //console.log(result);
            // console.log(result);
            //assert.typeOf(result, 'string')
            
            //should().exist(result)                        
            expect(result).to.be.an('object');            
        })                
    })

    it('Examine with wrong url', () => {

    })

    it('Examine with correct url', () => {
        
    })

    it('Examine url without csrf', () => {
        
    })

    it('Get data with correct ID', () => {
        
    })

    it('Get data with incorrect ID', () => {
        
    })

    it('Get data with correct ID', () => {
        
    })

    it('Get data without csrf', () => {
        
    })

    it('Make 20 concurrent request to examine url', () => {
        
    })
});