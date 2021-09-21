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

Change .env files values (.env.development, .env.production)

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

### Run tests
```
npm testcafe -g 

npm run test:all

note: you must have "Chrome" installed
```