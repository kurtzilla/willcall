
angular.module('MyApp')
  .service('MembersService', ['$http', '$q', '$stateParams', 'ContextService',
    'Show', 'ShowDate', 'ShowTicket',
    
    function($http, $q, $stateParams, ContextService, Show, ShowDate, ShowTicket){

      var _self = this;
      this.listing = null;
      
      this.getMemberEvents = function(){
        if(ContextService.currentMember) {
          return $http.get('/api/members/' + ContextService.currentMember.id + '/events')
          .then(function(data) {
            // console.log('DATA RETURNED AT SERVICE',data.data)
            //TODO build into event model
            return data.data;
          });
        } else {
          return [];
        }
      }
  
      
      this.getMemberShowListing = function(){
        // console.log('GET CONFIG')
        if(ContextService.currentMember) {
          return $http.get('/api/members/' + ContextService.currentMember.id + '/shows')
          .then(function(data){
            // console.log('DATA RETURNED AT SERVICE',data.data)
            var memberShowData = data.data;
            return Show.buildShowCollection(
              memberShowData.shows,
              ShowDate.buildShowDateCollection(memberShowData.showdates, memberShowData.showtickets));
          });
        } else {
          return [];
        }
      };
    
      
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
      };
      
      
      // update a member config - are we working with an override?
      //  if no row - create
      this.updateMemberConfig = function(configId, newValue){
        // console.log('MEMBER SERVICE', configId, newValue)
        return $http.post('/api/members/' + ContextService.currentMember.id + '/configs/' + configId,
          {newValue: newValue})
        .then(function(data){
          // console.log('DATA RETURNED AT SERVICE',data)
          return data.data;
        });
      };
    
    
      // edit configs
      // delete configs
    
  }]);