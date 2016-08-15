var dotenv = require('dotenv');
dotenv.load();

var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var favicon = require('serve-favicon');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var sass = require('node-sass-middleware');

var apiController       = require('./server/controllers/api');
var resourceController  = require('./server/controllers/resource');

// Declare app and configure
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(sass({ src: path.join(__dirname, 'public'), dest: path.join(__dirname, 'public') }));
app.use(favicon(path.join(__dirname, './public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO user authentication
// app.use(function(req, res, next) {
//   req.isAuthenticated = function() {
//     var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
//     try {
//       return jwt.verify(token, process.env.TOKEN_SECRET);
//     } catch (err) {
//       return false;
//     }
//   };
//
//   if (req.isAuthenticated()) {
//     var payload = req.isAuthenticated();
//     new User({ id: payload.sub })
//     .fetch()
//     .then(function(user) {
//       req.user = user;
//       next();
//     });
//   } else {
//     next();
//   }
// });


// API
app.get('/api/brochures', apiController.getBrochures);
app.post('/api/brochures', apiController.addBrochure);
app.get('/api/brochures/:id', apiController.getBrochure);
app.put('/api/brochures/:id', apiController.updateBrochure);

// Proxy Resource
app.get('/proxyresource/:resourceurl', resourceController.proxyResource);

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});



// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;