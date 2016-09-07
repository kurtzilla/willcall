
var knex = require('../config/db/knex')
var StripeStrategy  = require('passport-stripe').Strategy;

// load the auth variables

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

  // =========================================================================
  // GOOGLE ==================================================================
  // =========================================================================
  passport.use(new StripeStrategy({
      clientID: process.env.STRIPE_CLIENT_ID,
      clientSecret: process.env.STRIPE_SECRET,
      callbackURL: process.env.HOST + "/stripe/callback"
    },
    function(accessToken, refreshToken, stripe_properties, done) {
        return done();
    }
  ));
};
