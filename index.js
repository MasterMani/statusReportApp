var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('./routes').routes,
    api = require('./api').api,
    port = 8080,
    ipAddr = '127.0.0.1';

//TODO -- config reader and node port and ip ENV Variables
app.use(bodyParser());
app.set('views', './ejs');
app.set('view engine', 'ejs')

app.get('/', routes.home)

//Rest full api's
app.get('/api/all', api.all);
app.get('/api/id/:id', api.getOne);
app.post('/api/id/:id', api.updateOne);

app.listen(port, ipAddr, function(){
  console.log("App is listening on " + ipAddr + ":" + port);
})