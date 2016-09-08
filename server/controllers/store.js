require('dotenv').config({silent:true});

var products = require('../../lib/dbops/products');
var shows = require('../../lib/dbops/shows');


// https://stripe.com/docs/recipes/variable-amount-checkout
// http://code.tutsplus.com/tutorials/how-to-accept-payments-with-stripe--pre-80957
// some sort of hack for price info??? https://www.masteringmodernpayments.com/blog/using-stripe-checkout-for-subscriptions

exports.stripeVerifyCallback = function(req, res) {
  console.log('debug VERIFY CALLBACK STRIPE', req.params, req.body);
  
  //TODO verify matching amounts - correct amount
  
  // Get the credit card details submitted by the form
  var token = req.body.stripeToken;
  var eml = req.body.stripeEmail;
  var stripe = require("stripe")(process.env.STRIPE_SECRET);
  // console.log('STRIPE', stripe)
  
  // Create a charge: this will charge the user's card
  var _charge = null;
  stripe.charges.create({
    amount: 999, // Amount in cents
    currency: "usd",
    source: token,
    receipt_email: eml,
    description: "TODO: list invoice items here"
  })
  .then(function(charge){
    _charge = charge;
    
    // _charge.id,.amount,.created,.failure_code, .failure_message
    // .livemode:true, paid:true, receipt_email
    // status:'succeeded'
    
    // console.log('CHARGES', _charge);
    res.redirect('/store/checkout/success');
  })
  .catch(function(err){
    console.log('THE CARD HAS BEEN DECLINED', err)
    // TODO save the error in session? for display in verify page
    // redirect to verify
    res.redirect('/store/checkout/success');
  })
};



//////////////////////////////////////////////////////////////////////
// SHOW CATALOGS
//////////////////////////////////////////////////////////////////////

// retrieve active shows/dates/etc to be built by client
exports.getShowCatalog = function(req,res){
  shows.getShowCatalog()
  .then(function(data){
    res.json(data);
  });
};


//////////////////////////////////////////////////////////////////////
// PRODUCT CATALOGS
//////////////////////////////////////////////////////////////////////

// retrieve active product/skus to be built by client
exports.getProductCatalog = function(req,res){
  products.getProductCatalog()
  .then(function(data){
    res.json(data);
  });
};