
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
        console.log('IDX',idx)
        if(idx && idx !== '0'){
          return $http.get('/api/shows/' + idx)
          .then(function (data) {
            console.log('HEY WATCH', data)
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
      }
      
      
      
      
      
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