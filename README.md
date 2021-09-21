# examen-vue-app

## Project setup
```
Into Client directory: 

npm install
npm install -g sequelize-cli
cd src/Server
npm install

```

### Configure

Change .env files values, into Client folder (.env.development, .env.production)

|VARIABLE        |DESCRIPTION                    |
|----------------|-------------------------------|
|BD_HOST		 | Database (IP/NAME)            |
|BD_NAME         | Database name            |
|BD_USER         | Database user |
|BD_PASS         | Database password |
|BD_PASS         | Database password |
|LIMITER_MAX_REQUEST | Max amount of request allowed in x time |
|LIMITER_TIME | Time to limit amount of request |
|CORS_URLS | Separated allowed URLS ( by space ) |
|VUE_APP_API_URL | Url endpoint node server (example: http://localhost:5000/api ) |
|VUE_APP_LOCAL_URL | Url app server domain (example: http://localhost ) |

## Configure server
Inside src/Server folder, run...

```
sequelize db:migrate
```

### Run server
```
node index.js
```

### Compiles and hot-reloads for development
```
npm serve
```

### Compiles and minifies for production
```
npm build
```

### Run tests for backend
```
cd Client/src/Server
npm run test
```

### Run tests for frontend
```
cd Client
npm install testcafe -g 
npm run test:all

note: you must have "Chrome" installed
```

### Swagger endpoint
```
http://host:port/api-docs
```

### Used libraries

|LIBRARY        |DESCRIPTION                    |
|----------------|-------------------------------|
|Sequelize | quelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more. |
|express-rate-limit | Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset. |
|swagger-jsdoc | This library reads your JSDoc-annotated source code and generates an OpenAPI (Swagger) specification. |
|swagger-ui-express|This module allows you to serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file. The result is living documentation for your API hosted from your API server via a route.|
|testcafe|End-to-end testing, simplified|
|uuid|For unique identifier (GUID) generation|
|helmet|Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!|
|express|is a back end web application framework for Node. js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.|
|csurf|Node.js CSRF protection middleware.|
|axios|Promise based HTTP client for the browser and node.js|
|chai|Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.|
|mocha|Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun|