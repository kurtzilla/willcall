/* CONFIG.js
    description: database access methods for the config table
    notes:  each user will start with the base config and have their
            own individual settings applied on top of the base
 */


var knex = require('../../config/db/knex');
var firstBy = require('thenby');


  // testing
module.exports.getShowTest = function() {
  return knex('shows').first();
};

  // TODO ensure only one base config
  // seed it?

  // return a collection of configs that do not have a specific user assigned
  // these configs comprise the "baseConfig'
module.exports.getBaseConfigCollection = function(){
  return knex('configs').whereNull('member_id');
};

module.exports.getMemberConfigCollection = function(member_id){
  return knex('configs').where({member_id:member_id});
};

module.exports.getMergedConfigCollection = function(member_id){
  // console.log('GET MERGED COLLECTION')
  var _baseKeys = []; // storage array
  
  return exports.getBaseConfigCollection()
  .then(function(data){
    _baseKeys = data;
    return exports.getMemberConfigCollection(member_id);
  })
  .then(function(data){
    // merge keys/data
    var _userKeys = data;
    var merged = _baseKeys.map(function(item){
      // find a matching element from the users collection
      // if one exists and it is active - then return that one with member_id
      var match = _userKeys.filter(function(itm){
        return (item.allowoverride &&
          itm.context === item.context &&
          itm.key === item.key );
      });
      return (match.length) ? match[0] : item;
    });
    
    // sort by context asc then by key
    // https://github.com/Teun/thenBy.js
    merged.sort(
      // firstBy(function (v1, v2) { return v2.context > v1.context; })//desc
      firstBy("context")
      .thenBy("key")
    );
    return merged;
  });
};

module.exports.getConfigById = function(config_id){
  return knex('configs').where({id:config_id}).first();
};


module.exports.updateMemberConfig = function(member_id, config_id, newValue){
  return knex('configs').where({id:config_id}).first()
  .then(function(data){
    var _config = data;
    if(!_config.member_id){
      // copy current config
      return knex('configs').insert({
        updated_at: knex.fn.now(),
        member_id: member_id,
        context: _config.context,
        description: _config.description,
        key: _config.key,
        value: newValue,
        datatype: _config.datatype,
        required: _config.required,
        active: true,
        allowoverride: false // default value for member configs
    })
    } else {
      // update the current config
      return knex('configs').where({id:config_id}).update({value: newValue});
    }
  });
}














  
  /*
  
  // TODO not sure if this is necessary
  // returns a particular setting - hopefully this will live ina service
  getEffectiveConfigByKey: function(user_id){
    //search for base key row
    // if override-able, see if we have a key for the user and return that row
  },

  createBaseConfigKey: function(context, description, key, value, datatype, active, allowoverride){

  },
  createUserConfigKey: function(key, value, active){

  },
  updateBaseConfigKey: function(context, description, key, value, datatype, active, allowoverride){
    // TODO update updated_at
  },
  updateUserConfigKey: function(user_id, key, value, active) {
    // TODO update updated_at
    // if we figure out that we are setting to base value - then delete row
    // find base key or existing user key and update
    // if not found then create by inheriting values from base and applying overriding value
  },
  deleteConfigKey: function(id){
    // if it is a user's key - delete the row
    // if it is a base key - delete all user rows with the same key
  }
    // getUserPlayer_ByUserId: function(_id){
    // if(!_id || _id === 0)
    //   return {rows:[]};
    //
    // var sql =
    //   'SELECT u.*, ' +
    //   'pl.id AS "player_id", pl.gameid, pl.lastlocation, ' +
    //   'ap.id AS "activeplayer_id


*/

// };