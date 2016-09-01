
angular.module('MyApp')
  .service('MembersService', ['$http', '$q', '$stateParams', 'ContextService',
    function($http, $q, $stateParams, ContextService){

    var _self = this;
    this.listing = null;
  
    // create configs
    // config list
    this.getConfigCollection = function(){
      // console.log('GET CONFIG')
      if(ContextService.currentMember) {
         return $http.get('/api/members/' + ContextService.currentMember.id + '/configs')
        .then(function(data){
          // console.log('DATA RETURNED AT SERVICE',data)
          return data.data;
        });
      } else {
        return [];
      }
    }
    
    
    
    // edit configs
    // delete configs
    
  }]);