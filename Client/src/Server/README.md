# examen-vue-app (Server)


### Project setup
```
npm install
```

### Configure

In a /src/Client directory, change .env files values

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

### Run
```
node index.js
```

### Run tests
Run server (previous step) 
```
npm run test:unit

note: this command run in /src/Client directory
```