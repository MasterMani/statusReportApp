var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('./routes/routes').routes,
    api = require('./routes/api').api,
    port = 8080,
    ipAddr = '127.0.0.1';

//TODO -- config reader and node port and ip ENV Variables

//Configer body parser - http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', './ejs');
app.set('view engine', 'ejs')

app.get('/', routes.home)

//Rest full api's
app.get('/api/all', api.all);
app.get('/api/id/:id', api.getOne);
//TODO - write a middleware to handle res.body
app.post('/api/id/:id', api.updateOne);
app.post('/api/add', api.insertOne);

app.listen(port, ipAddr, function(){
  console.log("App is listening on " + ipAddr + ":" + port);
})

//Postman Link - https://www.getpostman.com/collections/a2ab5c733d65e977a558