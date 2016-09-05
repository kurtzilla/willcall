
angular.module('MyApp')

// http://intown.biz/2015/05/28/angular-bootstrap-date-picker-validation-fix/
// .directive('validDate', function () {
//   return {
//     restrict: 'A',
//     require: 'ngModel',
//     link: function (scope, element, attrs, control) {
//
//       console.log('SCOPE', scope)
//       console.log('ELEMENT', element)
//       console.log('CONTROL', control)
//       // console.log('CONTROL', control.$viewValue)
//       console.log('validatin', element[0].value)
//
//       control.$parsers.push(function (viewValue) {
//         var newDate = model.$viewValue;
//         console.log('HEY', newDate)
//         control.$setValidity("invalidDate", true);
//         if (typeof newDate === "object" || newDate == "") return newDate;  // pass through if we clicked date from popup
//         if (!newDate.match(/^\d{1,2}\/\d{1,2}\/((\d{2})|(\d{4}))$/))
//           control.$setValidity("invalidDate", false);
//         return viewValue;
//       });
//
//
//     }
//   };
// })



.directive('toggle', function(){
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      if (attrs.toggle == "tooltip") {
        $(element).tooltip();
      }
    }
  }
})
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