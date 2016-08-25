define(['require','intern!object','intern/chai!assert','intern/dojo/node!../../db/knex','../../lib/dbaccess/config'],
  function (require, registerSuite, assert, knex, config) {
  // var registerSuite = require('intern!object');
  // var assert = require('intern/chai!assert');
  // var knex = require('intern/dojo/node!../../db/knex');

  // require('../../node_modules/dotenv').config();
  // var dotenv = require('dotenv');
  // var knex = require('../../db/knex');
  // const config = require('../../lib/dbaccess/config');
  // var config = require('../../lib/dbaccess/config');

  registerSuite(function(){


    // Do put this here! This variable is unique for each environment!
    var counter = 0;
    return {
      name: 'configs',
      // put vars here
      setup: function () {
        app = {
          id: counter++
        };
      },
      'testing': function() {
        return config.getShowTest()
        .then(function (data) {
          console.log('SHOW TEST', data);
          // assert.strictEqual(data, 'Hello world!');
        })
        .catch(function (err) {
          console.log('ERR', err);
          // assert.strictEqual(data, 'Hello world!');
        });
      }
    }
  });
});




// var hello = require('lib/dbaccess/config');
// var hello = require('intern/order!lib/dbaccess/hello');
/*
 var hello = require('use!lib/dbaccess/hello');


 registerSuite({
 name: 'hello',

 greet: function () {
 assert.strictEqual(hello.guest('Murray'), 'Hello, Murray!',
 'hello.greet should return a greeting for the person named in the first argument');
 assert.strictEqual(hello.guest(), 'Hello, world!',
 'hello.greet with no arguments should return a greeting to "world"');
 }
 });
 */