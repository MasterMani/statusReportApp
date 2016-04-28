var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    routes = require('./routes/routes').routes,
    api = require('./routes/api').api,
    port = 8080,
    ipAddr = '127.0.0.1';

//TODO -- config reader and node port and ip ENV Variables

//Configer body parser - http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Creating a html view engine - http://expressjs.com/en/advanced/developing-template-engines.html
app.engine('html', function(filePath, options, callback){
  fs.readFile(filePath, function(err, content){
    if(err) return callback(new Error(err));
    return callback(null, content.toString());
  });
});

app.set('views', './html');
app.set('view engine', 'html')

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