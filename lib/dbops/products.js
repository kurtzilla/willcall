/* PRODUCTS.js
    description: database access methods for the products table
 */

'use strict';

var knex = require('../../config/db/knex');


//////////////////////////////////////////////////////////
// PUBLIC methods
//////////////////////////////////////////////////////////


// returns product list by first querying products for:
//    active, all statuses ok
// productskus should be active, disregard status and inventory
//    inventory will be handled on client

// catalog implies that all are active
module.exports.getProductCatalog = function(){
  // get products where active
  return buildProductCatalogFromQuery(
    knex('products').where({active: true})
    .orderByRaw('division ASC, name ASC'));
};


module.exports.createOrUpdate = function(input, current){
  
  // console.log('INPUT', input)
  // console.log('CURRENT', current)
  
  input.deliveryoptions = JSON.stringify([input.deliveryoptions]);
    
  return knex('products').where({member_id: input.member_id, division: input.division, name: input.name}).first()
  .then(function(data) {
    var existing = data;
    // console.log('EXIST', existing)
    // console.log('Current', current)
    // console.log('INPUT', input)
    
    if(!current){
      if(existing){
        throw Error('A product with that division and name already exists for the current member');
      }
      
      return knex('products').insert(input).returning('id');
    } else {
     // if there is an existing with a different id
      if(existing && existing.id !== current.id){
        throw Error('A product with that division and name already exists for the current member');
      }
      
      return knex('products').update(input).where({id:current.id}).returning('id');
    }
  })
  // .catch(function(err){
  //   console.log('CAUGHT HERE', err)
  //   return err;
  // });
};

module.exports.getProductById = function(product_id){
  // console.log('DBOPS', show_id)
  return buildProductFromInitialQuery(
    knex('products').where({id:product_id})
    .orderByRaw('division ASC, name ASC'));
};

module.exports.getMemberProductListing = function(member_id) {
  // console.log('OPS LISTING', member_id)
  return buildProductFromInitialQuery(
    knex('products').where({member_id: member_id})
    .orderByRaw('division ASC, name ASC'));
};
  

//////////////////////////////////////////////////////////
// PRIVATE methods
//////////////////////////////////////////////////////////

// catalog gets active components only
var buildProductCatalogFromQuery = function(query) {
  // console.log("QUERY", query)
  var productListing = {};
  return query
  .then(function (data) {
    // console.log('BUILD PRODUCT', data)
    productListing.products = data;
    return knex('productskus').whereIn('product_id', productListing.products.map(e => e.id))
    .whereRaw('((allotted-sold+refunded) > 0)')
    .andWhere('active', true).andWhere('status','on sale').orderBy('name');
  })
  .then(function(data){
    // console.log('BUILD SKUS', data)
    productListing.productskus = data;
    return productListing;
  });
};


// Given a query(promise) fetch data with the given pattern
var buildProductFromInitialQuery = function(query) {
  // console.log("QUERY", query)
  var productListing = {};
  // TODO implement correct ordering
  return query
  .then(function (data) {
    // console.log('BUILD PRODUCT', data)
    productListing.products = data;
    return knex('productskus').whereIn('product_id', productListing.products.map(e => e.id));
  })
  .then(function(data){
    // console.log('BUILD SKUS', data)
    productListing.productskus = data;
    // console.log('PROD LIST', productListing)
    return productListing;
  });
};
