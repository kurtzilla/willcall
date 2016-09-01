// config/passport.js

var knex = require('../config/db/knex')
var StripeStrategy  = require('passport-stripe').Strategy;

// load the auth variables
// var configAuth = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    knex('users').where({id:id}).first()
    .then(function(user){
      done(err, user);
    });
  });

  // app.get('/auth/stripe',
  //   passport.authenticate('stripe'));
  //
  // app.get('/stripe/callback',
  //   passport.authenticate('stripe', { failureRedirect: '/login' }),
  //   function(req, res) {
  //     // Successful authentication, redirect home.
  //     res.redirect('/');
  //   });

  // =========================================================================
  // GOOGLE ==================================================================
  // =========================================================================
  passport.use(new StripeStrategy({
      clientID: process.env.STRIPE_CLIENT_ID,
      clientSecret: process.env.STRIPE_SECRET,
      callbackURL: process.env.HOST + "/stripe/callback"
    },
    function(accessToken, refreshToken, stripe_properties, done) {

      // process.nextTick(function() {

        // try to find the user based on their stripe id
        //create new if not exist otherwise find existing user
        console.log('PROFILE', profile);
        // knex('users')

        return done();//null, user
      // }

      // User.findOrCreate({ stripeId: stripe_properties.stripe_user_id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  ));
};
