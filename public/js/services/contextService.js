
angular.module('MyApp')
  .service('ContextService', ['$http', '$q', '$stateParams', '$rootScope', '$window', 'jwtHelper', 'Show', 'ShowDate', 'ShowTicket',
    function($http, $q, $stateParams, $rootScope, $window, jwtHelper, Show, ShowDate, ShowTicket){

      var _self = this;
      // console.log('CTX')
   
      ////////////////////////////////////////////////
      // SHOW Funcs
      ////////////////////////////////////////////////
      this.currentShow = null;
      this.setCurrentShow = function(idx) {
        // console.log('IDX',idx)
        if(idx && idx !== '0'){
          return $http.get('/api/shows/' + idx)
          .then(function (data) {
            // console.log('HEY WATCH', data)
            // !!! api call returns response data - so get data at data.data
            var memberShowData = data.data;
            var shows = Show.buildShowCollection(
              memberShowData.shows,
              ShowDate.buildShowDateCollection(memberShowData.showdates, memberShowData.showtickets));
            this.currentShow = (shows.length) ? shows[0] : null;
            // console.log('MY CUR', this.currentShow)
            return this.currentShow;
          });
        } else {
          return this.currentShow = null;
        }
      };
  
      ////////////////////////////////////////////////
      // SHOWDATE Funcs
      ////////////////////////////////////////////////
      this.currentShowDate = null;
      this.setCurrentShowDate = function(idx) {
        // console.log('IDX',idx)
        if(idx && idx !== '0'){
          return $http.get('/api/showdates/' + idx)
          .then(function (data) {
            // !!! api call returns response data - so get data at data.data
            var memberShowData = data.data;
            var showdates = ShowDate.buildShowDateCollection(
              memberShowData.showdates, memberShowData.showtickets);
            this.currentShowDate = (showdates.length) ? showdates[0] : null;
            if(this.currentShowDate){
              this.currentShowDate.parentShow((memberShowData.shows.length) ? memberShowData.shows[0] : null);
            }
            console.log('MY CUR DATE', this.currentShowDate)
            return this.currentShowDate;
          });
        } else {
          return this.currentShowDate = null;
        }
      };
  
      ////////////////////////////////////////////////
      // SHOWTICKET Funcs
      ////////////////////////////////////////////////
      this.currentShowTicket = null;
      this.setCurrentShowTicket = function(idx) {
        // console.log('IDX',idx)
        if(idx && idx !== '0'){
          return $http.get('/api/showtickets/' + idx)
          .then(function (data) {
            // !!! api call returns response data - so get data at data.data
            var memberShowData = data.data;
            var showtickets = ShowTicket.buildShowTicketCollection(
              memberShowData.showtickets);
            this.currentShowTicket = (showtickets.length) ? showtickets[0] : null;
            if(this.currentShowTicket){
              var _showDate = (memberShowData.showdates.length) ? memberShowData.showdates[0] : null;
              if(_showDate){
                _showDate.parentRow = (memberShowData.shows.length) ? memberShowData.shows[0] : null;
                this.currentShowTicket.parentShowDate(_showDate);
              }
            }
            console.log('MY CUR TIX', this.currentShowTicket)
            return this.currentShowTicket;
          });
        } else {
          return this.currentShowTicket = null;
        }
      };
      
      ////////////////////////////////////////////////
      // MEMBER Funcs
      ////////////////////////////////////////////////
      this.__memberCurrent = function() {
        var _token = $window.localStorage.memberToken;
        if (_token && (!jwtHelper.isTokenExpired(_token))) {
          var _decoded = jwtHelper.decodeToken(_token);
          return _decoded.member;
        }
        return false;
      };
      this.currentMember = this.__memberCurrent();
            
      this.memberLogout = function(){
        delete $window.localStorage.memberToken;
        this.currentMember = this.__memberCurrent();
      }
      
  }]);







// The following is Presumed Obsolete

// this.getCurrentShow = function() {
//   console.log('HEY', $stateParams)
//   console.log('HEY', $stateParams['show_id'])
//   if ($stateParams.show_id) {
//     console.log('HEY WE GOTTA STATE')
//     return $http.get('/api/shows/' + $stateParams.show_id)
//     .then(function (data) {
//       console.log('HEY WATCH', $stateParams)
//       // !!! api call returns response data - so get data at data.data
//       var memberShowData = data.data;
//       var shows = Show.buildShowCollection(
//         memberShowData.shows,
//         ShowDate.buildShowDateCollection(memberShowData.showdates, memberShowData.showtickets));
//       this.currentShow = (shows.length) ? shows[0] : null;
//       console.log('MY CUR',this.currentShow)
//       return this.currentShow;
//     });
//   } else {
//     return this.currentShow = null;
//   }
// };
//this.currentShow = this.getCurrentShow();
      