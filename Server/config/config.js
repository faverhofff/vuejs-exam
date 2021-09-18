const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}` })

const url = new URL(process.env.URL)

const config = { 
    bd: {
        name: process.env.BD_NAME,
        host: process.env.BD_HOST,
        user: process.env.BD_USER,
        password: process.env.BD_PASS,
        dialect: 'mysql'
    },
    cors: process.env.CORS_URLS.split(' '),
    limiter: {
        maxRequests: process.env.LIMITER_MAX_REQUEST,
        time: process.env.LIMITER_TIME
    },    
    host: {
        protocol: url.protocol,
        host: url.hostname,
        port: url.port,
        path: url.pathname,
        fullUrl: url
    }
}

module.exports = { config }