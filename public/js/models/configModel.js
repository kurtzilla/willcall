angular.module('MyApp').factory('Config',
  ['$http', '$q', 'moment', function($http, $q, moment){
  
    function Config(row, dateModels = null){
      this.id = row.id;
      this.created_at = row.created_at;
      this.updated_at = row.updated_at;
      this.member_id = row.member_id;
      this.context = row.context;
      this.description = row.description;
      this.key = row.key;
      this.value = row.value;
      this.datatype = row.datatype;
      this.required = row.required;
      this.active = row.active;
      this.allowoverride = row.allowoverride;
    };
    
    // Config.prototype = {
      // firstDate: function(){
      //   return moment(this.showDates.map(e => e)
      //     .sort((a,b) => a.dateofshow - b.dateofshow)[0].dateofshow)
      //     .format('YYYY/MM/DD hh:mm a');
      // }
    // };
  
    ////////////////////////////////////////////
    // STATIC methods
    ////////////////////////////////////////////
    
    Config.processForm = function(form, input, currentConfig){
    
      var deferred = $q.defer();
    
      // console.log('FORM', form)
      // console.log('INPUT', input)
      // console.log('CURRENT', currentConfig)
    
      var errors = [];
      
      $http.post('/api/configs', {
        input: input,
        current: currentConfig
      })
      .then(function(data){
        var returnData = data.data;
        deferred.resolve(returnData);
      })
      .catch(function(err){
        //convert err to array and return
        // console.log('I CAUGHT it', err)
        errors.push(err.data);
        deferred.reject(errors);
      })
      
      return deferred.promise;
    };
  
    // Convert to Config Objects
    Config.buildConfigFromRow = function(configRows) {
      return configRows.map(function (config) {
        return new Config(config);
      });
    };
  
  return Config;
}]);
