
require('dotenv').config({silent:true});

var express             = require('express');
var path                = require('path');
var logger              = require('morgan');
var compression         = require('compression');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var expressValidator    = require('express-validator');
var favicon             = require('serve-favicon');
var request             = require('request');
var qs                  = require('querystring');
var sass                = require('node-sass-middleware');
var cookieSession       = require('cookie-session');
var jwt                 = require('jsonwebtoken');
var moment              = require('moment');
// var bearerToken         = require('express-bearer-token');


// Controllers
var apiController       = require('./server/controllers/api');
var showsController     = require('./server/controllers/shows');
var resourceController  = require('./server/controllers/resource');
var membersController   = require('./server/controllers/members');
var ordersController    = require('./server/controllers/orders');


// Declare app and configure
var app = express();

app.use(cookieSession(
  {
    name: 'session',
    keys: [
      process.env.SESSION_KEY1,
      process.env.SESSION_KEY2,
      process.env.SESSION_KEY3
    ]
  }
));


app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(sass({ src: path.join(__dirname, 'public'), dest: path.join(__dirname, 'public') }));
app.use(favicon(path.join(__dirname, './public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

// app.set('views', './server/views');
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));



// app.use(bearerToken());



// app.use(function (req,res,next) {
//
//   req.isMemberAuthenticated = function() {
//
//     var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
//
//     // console.log('TOKEN',token);
//     try {
//       var payload = jwt.verify(token, process.env.TOKEN_SECRET);
//       // console.log(payload);
//       return payload;
//     } catch (err) {
//       return false;
//     }
//   }; // END isAuthenticated
//
//   // call the auth method!
//   if (req.isMemberAuthenticated()) {
//     var payload = req.isMemberAuthenticated();
//     // console.log('PAYLOAD', payload)
//     // req.memberApproved = payload.member.wctapproved;
//     req.member = payload.member;
//     next();
//   } else {
//     next();
//   }
// });



////////////////////////////////////////////////////////////
// ROUTES
////////////////////////////////////////////////////////////

/////////////////////////
// Stripe
app.get('/stripe/login',              membersController.stripeLogin);
app.get('/stripe/callback',           membersController.stripeAuthCallback);
app.post('/stripe/webhook/account/',  membersController.stripeAccountWebhook);
app.post('/stripe/webhook/connect/',  membersController.stripeConnectWebhook);


/////////////////////////
// api routes
app.get('/api/configs/:config_id',                      apiController.getConfigById);
app.get('/api/shows/:show_id',                          showsController.getShowById);
app.post('/api/shows',                                  showsController.createOrUpdateShow);
app.get('/api/showdates/:showdate_id',                  showsController.getShowDateById);
app.post('/api/showdates',                              showsController.createOrUpdateShowDate);
app.get('/api/showtickets/:showticket_id',              showsController.getShowTicketById);
app.post('/api/showtickets',                            showsController.createOrUpdateShowTicket);



/////////////////////////
// member routes
/////////////////////////

// member configs
app.get('/api/members/:member_id/configs',              membersController.getMemberConfigs);
app.post('/api/members/:member_id/configs/:config_id',  membersController.updateMemberConfig);
app.get('/api/members/:member_id/events',               membersController.getMemberEvents);

// member shows
app.get('/api/members/:member_id/shows',                membersController.getMemberShowListing);





// app.get('/members/:member_id/shows/:show_id',  apiController.updateMemberConfig);
// app.get('/members/:member_id/shows/:show_id/showdates/:showdate_id',  apiController.updateMemberConfig);
// app.get('/members/:member_id/shows/:show_id/showdates/:showdate_id/showtickets',  apiController.updateMemberConfig);
// app.get('/members/:member_id/shows/:show_id/showdates/:showdate_id/showtickets/:showticket_id',  apiController.updateMemberConfig);







// orders
app.post('/orders/verify',          ordersController.stripeVerifyCallback);


// Api
app.get('/api/brochures',           apiController.getBrochures);
app.post('/api/brochures',          apiController.addBrochure);
app.get('/api/brochures/:id',       apiController.getBrochure);
app.put('/api/brochures/:id',       apiController.updateBrochure);
app.get('/api/envkey/:keyname',     apiController.getEnvKey);

// Proxy Resource - resolves by correcting https and http for resources
app.get('/proxyresource/:resourceurl',
  resourceController.proxyResource);


///////////////////////////////////////////////////////////
// ANGULAR ROUTING client side
///////////////////////////////////////////////////////////
app.use(function(req, res) {
  res.redirect('/#' + req.originalUrl);
});


///////////////////////////////////////////////////////////
// ERROR HANDLING
///////////////////////////////////////////////////////////

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
