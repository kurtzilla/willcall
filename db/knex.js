require('dotenv').config({silent:true});

var environment = process.env.NODE_ENV;
var config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);