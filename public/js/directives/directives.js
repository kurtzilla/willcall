
angular.module('MyApp')
.directive('wctBrochureDisplay', ['BrochureService', function(BrochureService) {
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    templateUrl: 'partials/brochurePanel.html',
    controller: ['$scope','$sce', function ($scope, $sce) {
      $scope.view = {};
      $scope.view.BrochureService = BrochureService;
      $scope.view.abstract = $sce.trustAsHtml($scope.item.abstract);
      // if($scope.view.BrochureService.listing.length === 0){
      //   console.log('it is zero');
      //   $scope.view.BrochureService.getListing();
      // }
      // console.log('listing', $scope.view.BrochureService.listing);
    }]
  }
}]);


angular.module('MyApp')
.directive('wctAddBrochure', ['BrochureService', function(BrochureService){
  return {
    restrict: 'E',
    scope: {
    },
    templateUrl: 'partials/admin/brochures/add.html',
    controller: function($scope) {
      // console.log('brocco');
      $scope.view = {};
      $scope.view.errors = [];

      $scope.cancel = function(){
        $scope.view.errors = [];
        BrochureService.setAddMode(false);
      };

      $scope.submitBrochure = function(form){
        // console.log('submitting', form);
        $scope.view.errors = [];
        if(form.brochure){
          // console.log('got it');
          var _brochure = angular.copy(form.brochure);
          BrochureService.addBrochure(_brochure)
          .then(function(data){

            form.brochure = {
              title: '',
              abstract: '',
              description: ''
            };

            form.$setPristine();
            form.$setUntouched();
            BrochureService.setAddMode(false);
          })
          .catch(function(err){
            console.log('caught', err);
            $scope.view.errors.push(err);
          });
        }
      }
    }
  }
}]);