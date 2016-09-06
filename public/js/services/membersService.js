
angular.module('MyApp')
  .service('MembersService', ['$http', '$q', '$stateParams', 'ContextService',
    'Show', 'ShowDate', 'ShowTicket',
    
    function($http, $q, $stateParams, ContextService, Show, ShowDate, ShowTicket){

      var _self = this;
      this.listing = null;
      
      this.getMemberEvents = function(){
        // return new Promise(function(resolve, reject) {
          if (ContextService.currentMember) {
            return $http.get('/api/members/' + ContextService.currentMember.id + '/events')
            .then(function (data) {
              // console.log('DATA RETURNED AT SERVICE',data.data)
              //TODO build into event model
              // return resolve(data.data);
              return data.data;
            });
          } else {
            // return resolve([]);
            return [];
          }
        // });
      };
  
      
      this.getMemberShowListing = function(){
        // console.log('GET CONFIG')
        // return new Promise(function(resolve, reject) {
          if (ContextService.currentMember) {
            return $http.get('/api/members/' + ContextService.currentMember.id + '/shows')
            .then(function (data) {
              // console.log('DATA RETURNED AT SERVICE',data.data)
              var memberShowData = data.data;
              // return resolve( Show.buildShowCollection(
              //   memberShowData.shows,
              //   ShowDate.buildShowDateCollection(memberShowData.showdates, memberShowData.showtickets)));
              return Show.buildShowCollection(
                memberShowData.shows,
                ShowDate.buildShowDateCollection(memberShowData.showdates, memberShowData.showtickets));
            });
          } else {
            // return resolve([]);
            return [];
          }
        // });
      };
    
      
      this.getConfigCollection = function(){
        // return new Promise(function(resolve, reject) {
          if(ContextService.currentMember) {
            return $http.get('/api/members/' + ContextService.currentMember.id + '/configs')
            .then(function(data){
              // console.log('DATA RETURNED AT SERVICE',data)
              // return resolve(data.data);
              return data.data;
            });
          } else {
            // return resolve([]);
            return [];
          }
        // });
      };
         
    
  }]);