var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
// var User = require('../models/User');

function generateToken(user) {
  var payload = {
    iss: process.env.HOST,
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

/**
 * POST /auth/google
 * Sign in with Google
 */
exports.authGoogle = function(req, res) {
  // console.log('debug Auth google');

  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params },
    function(err, response, token) {

      var accessToken = token.access_token;
      var headers = { Authorization: 'Bearer ' + accessToken };

      // Step 2. Retrieve user's profile information.
      request.get({ url: peopleApiUrl, headers: headers, json: true },
        function(err, response, profile) {

          if (profile.error) {
            return res.status(500).send({ message: profile.error.message });
          }

          // Step 3a. Link accounts if user is authenticated.
          if (req.isAuthenticated()) {
            new User({ google: profile.sub })
            .fetch()
            .then(function(user) {
              if (user) {
                return res.status(409).send({
                  msg: 'There is already an existing account linked with Google ' +
                  'that belongs to you.' });
              }
              user = req.user;
              user.set('name', user.get('name') || profile.name);
              user.set('gender', user.get('gender') || profile.gender);
              user.set('picture',
                user.get('picture') || profile.picture.replace('sz=50', 'sz=200'));
              user.set('location', user.get('location') || profile.location);
              user.set('google', profile.sub);
              user.save(user.changed, { patch: true }).then(function() {
                res.send({ token: generateToken(user), user: user });
              });
            });
          } else {
            // Step 3b. Create a new user account or return an existing one.
            new User({ google: profile.sub })
            .fetch()
            .then(function(user) {
              // console.log('NOt authd', profile.sub, user);
              if (user) {
                return res.send({ token: generateToken(user), user: user });
              }
              new User({ email: profile.email })
              .fetch()
              .then(function(user) {
                if (user) {
                  return res.status(400).send({
                    msg: user.get('email') +
                    ' is already associated with another account.' })
                }
                user = new User();
                user.set('name', profile.name);
                user.set('email', profile.email);
                user.set('gender', profile.gender);
                user.set('location', profile.location);
                user.set('picture', profile.picture.replace('sz=50', 'sz=200'));
                user.set('google', profile.sub);
                user.save().then(function(user) {
                  res.send({ token: generateToken(user), user: user });
                });
              });
            });
          }
        });
    });
};

exports.authGoogleCallback = function(req, res) {
  // console.log('debug callback google');
  res.send('Loading...');
};

exports.stripeCallback = function(req, res) {
  // console.log('debug callback google');
  res.send('Loading...');
};
