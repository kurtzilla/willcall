
angular.module('MyApp')
  .service('ContextService', ['$http', '$q', '$stateParams', '$rootScope', '$window', 'jwtHelper',
    function($http, $q, $stateParams, $rootScope, $window, jwtHelper){

      var _self = this;
      this.listing = null;
      // console.log('CONTEXT ROOT SCOPE', $rootScope);
      // console.log('STATE PARAMS', $stateParams)
      // console.log('HTTP', $http)
      

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
        // console.log('Signing out AT CONTEXT')
        delete $window.localStorage.memberToken;
        // console.log('DELETED STORAGE TOKEN')
        this.currentMember = this.__memberCurrent();
      }
  
      // console.log('CURRENT MEMBER',this.currentMember);
      
  }]);