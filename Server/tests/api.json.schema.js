const DataPayload = {
    type: 'object',
    required: ['url', 'request', 'response'],
    properties: {
        url: {
            type: 'object',
            required: ['domain', 'scheme', 'path'],
            properties: {
                domain: { type: 'string' },
                scheme: { type: 'string' },
                path: { type: 'string' }
            }
        },
        request: {
            type: 'object',
            required: ['id'],
            properties: {
                id: { type: 'string' }                
            }
        },
        response: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                required: ['location', 'server', 'date', 'statusCode', 'http'],
                properties: {
                    location: { type: 'string' },
                    date: { type: 'string' },
                    statusCode: { type: 'number' },
                    http: { type: 'string' }
                }
            }
        }        
    }
};

const OkResponseScheme = {
    title: 'successfull response schema v1',
    type: 'object',
    // required:['errors', 'status', 'data'],
    required:['errors', 'status'],
    properties: { 
        errors: {
            type: 'string'
        },
        status: {
            type: 'number'
        }
    }
};

const BaseResponseScheme = {
    title: 'successfull response schema v1',
    type: 'object',
    required:['errors', 'status'],
    properties: { 
        errors: {
            type: 'string'
        },
        status: {
            type: 'number'
        }        
    }
};

module.exports = { 
    OkResponseScheme, 
    BaseResponseScheme 
}