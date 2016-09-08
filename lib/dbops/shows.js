/* SHOWS.js
    description: database access methods for the shows table
 */

'use strict';

var knex = require('../../config/db/knex');


//////////////////////////////////////////////////////////
// PUBLIC methods
//////////////////////////////////////////////////////////

// returns show list by first querying showdates for:
//    active, dateinfuture, all statuses ok
//    corresponding show should be active - disregard status
// showtickets should be active, disregard status and inventory
//    inventory will be handled on client

// catalog implies that all are active
module.exports.getShowCatalog = function(){
  
  // get show dates where active and in future
  var now = knex.fn.now();
  
  var sql = 'SELECT sd.* ';
  sql += 'FROM showdates sd LEFT OUTER JOIN shows s ON s.id = sd.show_id ';
  sql += 'WHERE sd.dateofshow > ? AND sd.active = true AND ';
  sql += 's.active = true ';
  sql += 'ORDER BY sd.dateofshow ASC ';
  
  return buildShowCatalogFromQuery( knex.raw(sql, [now]) );
};


module.exports.createOrUpdate = function(input, current){
  
  // auto update the url
  input.url = '/store/shows/' + convertNameForUrl(input.name);
  
  return knex('shows').where({member_id: input.member_id, name: input.name}).first()
  .then(function(data) {
    var existing = data;
    // console.log('EXIST', existing)
    // console.log('Current', current)
    // console.log('INPUT', input)
    
    if(!current){
      if(existing){
        throw Error('A show with that name already exists for the current member');
      }
      
      return knex('shows').insert(input).returning('id');
    } else {
     // if there is an existing with a different id
      if(existing && existing.id !== current.id){
        throw Error('A show with that name already exists for the current member');
      }
      
      return knex('shows').update(input).where({id:current.id}).returning('id');
    }
  })
  // .catch(function(err){
  //   console.log('CAUGHT HERE', err)
  //   return err;
  // });
};

module.exports.getShowById = function(show_id){
  // console.log('DBOPS', show_id)
  return buildShowFromInitialQuery(
    knex('shows').where({id:show_id})
    .orderBy('name','asc'));
};

module.exports.getMemberShowListing = function(member_id) {
  return buildShowFromInitialQuery(
    knex('shows').where({member_id: member_id})
    .orderBy('name', 'asc'));
};
  


//////////////////////////////////////////////////////////
// PRIVATE methods
//////////////////////////////////////////////////////////


// Given a query(promise) fetch data with the given pattern
var buildShowCatalogFromQuery = function(query) {
  // console.log("QUERY", query)
  var showListing = {};
  // TODO implement correct ordering
  return query
  .then(function (data) {
    showListing.showdates = data.rows;
    return knex('shows').whereIn('id', showListing.showdates.map(e => e.show_id))
    .andWhere('active', true);
  })
  .then(function(data) {
    showListing.shows = data;
    // var ids = showListing.showdates.map(e => e.id);
    // console.log('IDS', ids)
    return knex('showtickets').whereIn('showdate_id', showListing.showdates.map(e => e.id))
    .whereRaw('((allotted-sold+refunded) > 0)')
    .andWhere('active', true).andWhere('status','on sale');
  })
  .then(function(data){
    showListing.showtickets = data;
    return showListing;
  });
};



// TODO contrived - make this more robust
var convertNameForUrl = function(name){
  return name.toLowerCase().replace(/\W/g,'-').replace(/\-+/g,'-');
};


// Given a query(promise) fetch data with the given pattern
var buildShowFromInitialQuery = function(query) {
  // console.log("QUERY", query)
  var showListing = {};
  // TODO implement correct ordering
  return query
  .then(function (data) {
    showListing.shows = data;
    return knex('showdates').whereIn('show_id', showListing.shows.map(e => e.id));
  })
  .then(function(data) {
    showListing.showdates = data;
    return knex('showtickets').whereIn('showdate_id', showListing.showdates.map(e => e.id));
  })
  .then(function(data){
    showListing.showtickets = data;
    return showListing;
  });
};

//
//   var now = moment();
//   console.log('NOW',now);
//
//   var sql = 'SELECT sd.show_id, s.member_id, s.url, s.venue, ';
//   sql += 'sd.dateofshow, sd.doorsopen, s.name as "showname", sd.name as "showdatename", ';
//   sql += 'sd.ages, sd.billing, sd.pricing, ';
//   sql += 's.active as "showactive", sd.active as "showdateactive", ';
//   sql += 'sd.status, s.images, s.announcedate, s.enddate, ';
//   sql += 's.description as "showdescription", sd.description as "showdatedescription" ';
//   sql += 'FROM showdates sd LEFT OUTER JOIN shows s ON s.id = sd.show_id ';
//   sql += 'WHERE s.member_id = ? ';
//   // TODO limit dates
//   sql += 'ORDER BY sd.dateofshow ASC';
//
//   return knex.raw(sql, [member_id]);
// };

// shows
// table.integer('member_id').references('id').inTable('members').notNullable();
// table.string('venue').notNullable();
// table.string('url').unique().notNullable().comment('url to show details');
// table.string('name').notNullable().defaultsTo('');
// table.string('description', 8192).notNullable().defaultsTo('')
// table.json('images').notNullable().defaultsTo(JSON.stringify([]))
// table.boolean('active').defaultsTo(true);
// table.timestamp('announcedate').defaultsTo(knex.fn.now())
// table.timestamp('enddate')

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