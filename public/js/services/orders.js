
angular.module('MyApp')
  .service('OrdersService', ['$http', '$q', '$stateParams', function($http, $q, $stateParams){

    var _self = this;
    this.listing = null;


    this.stripe_publish_key = function(){
      return $http.get('/api/envkey/STRIPE_PUBLISH');
    };
    this.stripe_secret_key = function(){
      return $http.get('/api/envkey/STRIPE_SECRET');
    };
    this.stripe_client_id = function(){
      return $http.get('/api/envkey/STRIPE_CLIENTID');
    };

  }]);