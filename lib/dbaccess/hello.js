/*
 * A very simple AMD module with no dependencies
 */
// var knex = require('../../../db/knex');

module.exports = {
  guest: function (name) {
    name = name || 'world';

    return 'Hello, ' + name + '!';
  }
}

// define([], function () {
//   return {
//     guest: function (name) {
//       name = name || 'world';
//
//       return 'Hello, ' + name + '!';
//     }
//   };
// });