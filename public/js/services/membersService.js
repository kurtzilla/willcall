
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
      
      // update a member config - are we working with an override?
      //  if no row - create
      this.updateMemberConfig = function(configId, newValue){
        // console.log('MEMBER SERVICE', configId, newValue)
        return $http.post('/api/members/' + ContextService.currentMember.id + '/configs/' + configId,
          {newValue: newValue})
        .then(function(data){
          console.log('DATA RETURNED AT SERVICE',data)
          return data.data;
        });
      }
  
      // data: {
      //   "user":{
      //     "email":"wahxxx@gmail.com",
      //       "password":"123456"
      //   }
      // },
      
    
    
    
      // edit configs
      // delete configs
    
  }]);