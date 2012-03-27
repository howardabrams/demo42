
/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes')
  , model   = require('./routes/setdata');

var app = module.exports = express.createServer();

// Configuration

var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = Number(process.env.VCAP_APP_PORT || 3000);

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/',        routes.index);
app.get('/levels',  routes.cpm);
app.get('/rlevels', routes.randomCpm);

app.post('/levels',   model.setall);
app.get('/producers/:value', model.producers);
app.get('/consumers/:value', model.consumers);
app.get('/messages/:value',  model.messages);

app.listen(port);
console.log("Express server listening at http://%s:%d in %s mode", 
        host, port, app.settings.env);
