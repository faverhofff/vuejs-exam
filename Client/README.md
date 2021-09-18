# examen-vue-app

## Project setup
```
npm install
npm install -g sequelize-cli
```

### Run tests
```
npm run test:all
npm run test:unit
npm run test:e2e
```

### Compiles and hot-reloads for development
```
npm serve
```

### Compiles and minifies for production
```
npm build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Server
Inside src/server folder, run...

```
sequelize db:migrate
```

### Run server
```
node src/server.js
```