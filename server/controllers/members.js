require('dotenv').config({silent:true});
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var members = require('../../lib/dbops/members');



function generateToken(member) {
  var payload = {
    iss: process.env.HOST,
    sub: member.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix(),
    sid: member.stripeuserid,
    member: member
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}


/**
 * Login required middleware
 */
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};



//////////////////////////////////////////////////////////////////////
// The member will login (or decline) from Stripe
// Stripe returns a "code" and not a "token" (it's oath v1)
// Use this code to get the member's auth codes
// A third call will be necessary to get member details
// Keep this short and sweet - don't let stripe steal your life cycles
// *** see helper functions below
//////////////////////////////////////////////////////////////////////

exports.stripeLogin = function(req, res) {
  
  // var url = 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=';
  // url += process.env.STRIPE_CLIENT_ID;
  // url += '&scope=read_write';
  console.log('STRIPE LOGIN')
  
  res.redirect('https://connect.stripe.com/oauth/authorize?' + qs.stringify({
    response_type: "code",
    scope: "read_write",
    client_id: process.env.STRIPE_CLIENT_ID
  }));
  
};

exports.stripeAuthCallback = function(req, res) {
// console.log('STRIPE CALLBACK')
  var code = req.query.code;

  if(code) {
    // console.log('STRIPE CODE', code)
    return exports.stripeGetAuthTokens(code)
    .then(function(_data){
      console.log('STRIPE AUTH TOKENS THEN')
      return ensureMembersTableEntry(_data);
    })
    .then(function(_member){
      console.log('STRIPE MEMBERS TABLE ENTRY THEN')
      res.render('memberToken', { memberToken: generateToken(_member) });
    });
  } else {
    console.log('STRIPE AUTH CALLBACK REDIRECT')
    // TODO  indicate user denied access
    // { error: 'access_denied', error_description: 'The user denied your request' }
    res.redirect('/members/signin');
  }
};



//////////////////////////////////////////////////////////////////////
// AuthCallback Helper Funcs
//////////////////////////////////////////////////////////////////////


// ensureMembersTableEntry
// Determine if member row exists the update
//   with new stripe token info
function ensureMembersTableEntry(body){
  console.log('*ensureMembersTableEntry')
  var _stripeid     = body.stripe_user_id;
  var _accessToken  = body.access_token;
  var _refreshToken = body.refresh_token;
  var _publishKey   = body.stripe_publishable_key;
  
  console.log('*ensureMembersTableEntry - BODY?', body)
  
  return members.getMember_ByStripeUserId(_stripeid)
  .then(function (_member) {
    console.log('ENSURE - first return', _member)
    if (_member) {
      console.log('ENSURE - WE HAVE MEMBER')
      // we have an existing member - update stripe token info
      return members.updateMemberStripe_ByStripeUserId(
        _stripeid, _publishKey, _accessToken, _refreshToken);
    } else {
      console.log('ENSURE - NO MEMBER')
      // create a new member - the update with a stripe info call
      return members.createMemberStripe(
        _stripeid, _publishKey, _accessToken, _refreshToken)
      .then(function(__member){
        console.log('ENSURE - JUST CREATED MEMBER')
        return exports.updateMemberStripeDetails(__member);
      });
    }
  });
};


// stripeGetAuthTokens
// Call Stripe API and get applicable auth tokens for
//   member account - granted by code
//   Note: code is only valid for 5 minutes
exports.stripeGetAuthTokens = function(code){
  return new Promise(function(resolve, reject) {
    request.post({
      url: process.env.STRIPE_TOKEN_URL,
      form: {
        grant_type: "authorization_code",
        client_id: process.env.STRIPE_CLIENT_ID,
        code: code,
        client_secret: process.env.STRIPE_SECRET
      }
    }, function (err, response, body) {
      if (err) {
        reject('ERROR: ' + err);
      } else {
        var _body = JSON.parse(body);
        resolve(_body);
      }
    });
  });
};


// updateMemberStripeDetails
// Update the member in db with stripe account details
// get stripe info: https://stripe.com/docs/api#retrieve_account
exports.updateMemberStripeDetails = function(_member){
  return new Promise(function(resolve, reject){
    var stripe = require("stripe")(process.env.STRIPE_SECRET);
    stripe.accounts.retrieve(
      _member.stripeuserid,
      function(err, account) {
        if(err){
          reject(err);
        } else {
          resolve(members.updateMemberAccountInfo_ByStripeAccount(account));
        }
      }
    );
  });
};
