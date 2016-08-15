

var myApp = angular.module('MyApp')

myApp.service('apiService', ['$http', function($http){



  function apiPost($http) {
    return {
      send: function(data) {
        return $http.post('/api', data);
      }
    };
  }

}]);

// apiService.$inject = ['$http'];


angular.module('MyApp')
    .factory('Api', Api);

Api.$inject = ['$http'];

function Api($http) {
    return {
      send: function(data) {
        return $http.post('/api', data);
      }
    };
}

