angular.module('MyApp')
.controller('MembersFormsController',
  ['$scope', '$stateParams', '$http', 'ContextService', '$state', 'Show', 'ShowDate', 'ShowTicket',
  
    function ($scope, $stateParams, $http, ContextService, $state, Show, ShowDate, ShowTicket) {
    
      $scope.view = {};
      $scope.view.ContextService = ContextService;
      // $scope.view.Ctx = ContextService;
      // console.log('CTX', ContextService)
      // console.log('S PARAMS', $stateParams)
  
  
      // var cShow = ContextService.getCurrentShow();
      //
      // console.log('Show', $scope.view.ContextService.currentShow)
      //
      
      
        
      $scope.cancelForm = function(){
        // in case we need to do any cleanup
        $state.go('members.shows');
      };
    
    
      var cleanupFormAndReturn = function(form){
        // clean up the form and return!
          form.entity = {};
          form.$setPristine();
          form.$setUntouched();

          // refresh member config collection and return
          $scope.$parent.view.showList = null;
          $scope.$parent.populateShowList();
          $state.go('members.shows');
      };
      
      $scope.submitForm = function(form, context) {
  
        if(form.$valid && form.entity) {
          var _entity = angular.copy(form.entity);
          var formSubmit = null;
          
          if(context === 'show'){
            formSubmit = ContextService.getCurrentShow()
            .then(function(data){
              return Show.processForm(form, _entity, data);
            });
          } else {
            // TODO throw an error
          }
          
          
          // submit form based upon context - let model handle
          return formSubmit()
          .then(function(success){
            cleanupFormAndReturn(form);
          })
          .catch(function(err){
  
          })
        }
      };
      
      
  }]);
