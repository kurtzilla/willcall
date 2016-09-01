
angular.module('MyApp')
  .service('OrdersService', ['$http', '$q', '$stateParams', 'ContextService',
    function($http, $q, $stateParams, ContextService){

    var _self = this;
    this.listing = null;

  }]);