
angular.module('MyApp')
  .service('ContextService', ['$http', '$q', '$stateParams', '$rootScope', '$window', 'jwtHelper',
    function($http, $q, $stateParams, $rootScope, $window, jwtHelper){

      var _self = this;
   
      ////////////////////////////////////////////////
      // SHOW Funcs
      ////////////////////////////////////////////////
      this.currentShow = null;
      this.getCurrentShow = function() {
        if ($stateParams.show_id) {
          return $http.get('/api/shows/' + $stateParams.show_id)
          .then(function (data) {
            // !!! api call returns response data - so get data at data.data
            var memberShowData = data.data;
            var shows = Show.buildShowCollection(
              memberShowData.shows,
              ShowDate.buildShowDateCollection(memberShowData.showdates, memberShowData.showtickets));
            this.currentShow = (shows.length) ? shows[0] : null;
          });
        } else {
          this.currentShow = null;
        }
      };
      this.getCurrentShow();
      
      
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