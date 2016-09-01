
angular.module('MyApp')
  .service('BrochureService', ['$http', '$q', '$stateParams', function($http, $q, $stateParams){
    var _self = this;
    this.listing = null;
    this.addMode = false;

    this.currentEdit = function(){
      if($stateParams.brochure_id){
        return _self.listing.find(function(itm){
          return itm.id === parseInt($stateParams.brochure_id);
        });
      }
      return null;
    };

    this.setAddMode = function(active){
      _self.addMode = active;
    };

    this.addBrochure = function(brochure){
      return $http.post('/api/brochures/', {brochure})
      .then(function(data){
        // console.log('returned data', data.data);
        _self.listing.push(data.data);
      });
    };

    this.updateBrochure = function(brochure){
      return $http.put('/api/brochures/' + _self.currentEdit().id, {brochure})
      .then(function(data){
        // refresh updated data
        _self.getListing();
      });
    };

    this.getListing = function(){
      _self.listing = [];
      $http.get('/api/brochures')
      .then(function(data){
        _self.listing = data.data;
      });
    };
    this.getListing();// init

  }]);