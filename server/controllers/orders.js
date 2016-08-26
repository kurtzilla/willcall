

exports.stripeVerifyCallback = function(req, res) {
  console.log('debug VERIFY CALLBACK STRIPE');

  //TODO verify matching amounts - correct amount

  // Get the credit card details submitted by the form
  var token = req.body.stripeToken;
  var eml = req.body.stripeEmail;
  var stripe = require("stripe")(process.env.STRIPE_SECRET);

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

    console.log('CHARGES', _charge);
    res.redirect('/orders/success');
  })
  .catch(function(err){
    console.log('THE CARD HAS BEEN DECLINED', err)
    // TODO save the error in session? for display in verify page
    // redirect to verify
    res.redirect('/orders/verify');
  })
};



// var charge = stripe.charges.create({
//   amount: 999, // Amount in cents
//   currency: "usd",
//   source: token,
//   receipt_email: req.body.stripeEmail,
//   description: "TODO: list invoice items here"
// }, function(err, charge) {
//   if (err && err.type === 'StripeCardError') {
//     // The card has been declined
//
//     // TODO save the error in session? for display in verify page
//     // redirect to verify
//     res.redirect('/orders/verify');
//   }
// });

// // finalize order - get ready to display
// // save deets to db
// console.log('CHARGE', charge);
//
//
// res.redirect('/orders/success');


// ALT FLOW
// determine if customer has a saved profile on stripe - if customerid is not null
// than include that customerid with the charges.create call

// stripe.customers.create({
//   source: token,
//   description: eml
// })
// .then(function(customer) {
//   return stripe.charges.create({
//     amount: 999, // Amount in cents
//     currency: "usd",
//     customer: customer.id,
//     receipt_email: req.body.stripeEmail,
//     description: "TODO: list invoice items here"
//   });
// }).then(function(charge) {
//   console.log('THE CUST CHARGE', charge);
//   // TODO save stuff to the db
//   res.redirect('/orders/success');
// })
// .catch(function(err){
//   // The card has been declined
//   console.log('THECARD HAS BEEN DECLINED')
//   // TODO save the error in session? for display in verify page
//   // redirect to verify
//   res.redirect('/orders/verify');
// });
