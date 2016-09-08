/* SHOWTICKETS.js
    description: database access methods for the showtickets table
 */

'use strict';

var knex = require('../../config/db/knex');


//////////////////////////////////////////////////////////
// PUBLIC methods
//////////////////////////////////////////////////////////

module.exports.createOrUpdate = function(input, current){
  
  // normalize data
  if(!input.name)
    input.name = '';
  if(!input.price || input.price === '')
    input.price = 0.0;
  input.active = (input.active == 'true');
  input.deliveryoptions = JSON.stringify([input.deliveryoptions]);
  
  if(current){
    return knex('showtickets').update(input).where({id:current.id});
  } else {
    // TODO check for existing showdate with the same date
    return knex('showtickets')
    .where({showdate_id: input.showdate_id, price: input.price, name: input.name, ages: input.ages}).first()
    .then(function(data) {
      var existing = data;
      // console.log('EXIST', existing)
      // console.log('Current', current)
      // console.log('INPUT', input)
      
      if(existing){
        throw Error('A showticket with the specified price and name already exists for the current show date');
      }
      
      return knex('showtickets').insert(input);
    });
  }
};

module.exports.getShowTicketById = function(showticket_id){
  // console.log('DBOPS', show_id)
  return buildShowTicketFromInitialQuery(
    knex('showtickets').where({id:showticket_id})
    .orderBy('price','asc'));
};


//////////////////////////////////////////////////////////
// PRIVATE methods
//////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// THIS DOES NOT RETURN FULL SHOW!!!
/////////////////////////////////////////////////////////////////
// Given a query(promise) fetch data with the given pattern
var buildShowTicketFromInitialQuery = function(query) {
  // console.log("QUERY", query)
  var showListing = {};
  // TODO implement correct ordering
  return query
  .then(function (data) {
    showListing.showtickets = data;
    return knex('showdates').whereIn('id', showListing.showtickets.map(e => e.showdate_id));
  })
  .then(function(data) {
    showListing.showdates = data;
    return knex('shows').whereIn('id', showListing.showdates.map(e => e.show_id));
  })
  .then(function(data){
    showListing.shows = data;
    return showListing;
  });
};

// // Returns a new array of dates where tickets are children
// var addShowTicketsToShowDates = function(dates, tickets) {
//   return dates.map(function (date) {
//     // find matching tickets and sort
//     var matches = tickets.filter(e => e.showdate_id === date.id);
//     if (matches.length > 1) {
//       matches.sort((a, b) => a.price - b.price);
//     }
//     // return ShowDate._ShowDates_FromRows(date, matches);
//     date.showtickets = matches;
//     return date;
//   });
// };



// showdates
// table.integer('show_id').references('id').inTable('shows').notNullable();
// table.timestamp('dateofshow').notNullable().comment('Date and show time');
// table.string('doorsopen').notNullable().defaultsTo('');
// table.string('name').notNullable().defaultsTo('')
// table.string('ages').notNullable().defaultsTo('all ages');
// table.string('billing', 8192).notNullable().defaultsTo('');
// table.string('pricing', 2048).notNullable().defaultsTo('');
// table.string('description', 8192).notNullable().defaultsTo('');
// table.boolean('active').defaultsTo(true);
// table.string('status').notNullable().defaultsTo('On Sale');

// showtickets
// table.increments();
// table.timestamps(true,true);
// table.integer('showdate_id').references('id').inTable('showdates').notNullable();
// table.string('name', 512);
// table.string('ages').notNullable().defaultsTo('all ages');
// table.string('description', 8192).notNullable().defaultsTo('');
// table.decimal('price');
// table.string('pricedetail', 512).notNullable().defaultsTo('');//allow a description on the makeup of ticket price
// table.decimal('pricedos');
// table.string('pricedosdetail', 512).notNullable().defaultsTo('');//allow a description on the makeup of ticket price
// table.json('deliveryoptions').notNullable().defaultsTo(JSON.stringify([]));
// table.boolean('active').defaultsTo(true);
// table.string('status').notNullable().defaultsTo('On Sale');
// table.integer('maxperorder').defaultsTo(6);
// table.integer('allotted').defaultsTo(0);
// table.integer('sold').defaultsTo(0);
// table.integer('refunded').defaultsTo(0);
// table.integer('available').defaultsTo(0)