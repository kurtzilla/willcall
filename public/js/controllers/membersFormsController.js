angular.module('MyApp')
.controller('MembersFormsController',
  ['$scope', '$stateParams', '$http', 'ContextService', '$state', 'Show', 'ShowDate', 'ShowTicket',
  
    function ($scope, $stateParams, $http, ContextService, $state, Show, ShowDate, ShowTicket) {
    
    $scope.view = {};
    $scope.view.ContextService = ContextService;
      
    $scope.cancelForm = function(){
      // in case we need to do any cleanup
      $state.go('members.shows');
    };
      
    
    
    $scope.submitShowForm = function(form){
      
      if(form.$valid){
        if(form.entity && $scope.view.ContextService.currentShow){
          
          var _entity = angular.copy(form.entity);
          // var newVal = _entity.value;
          
          // TODO validation - evaluate datatype and if newVal is valid...
          // console.log('ENTITY',newVal);
          
          // if no member_id...
          console.log('form updating...')
          // $scope.$parent.view.MembersService.updateMemberConfig($scope.view.currentConfig.id, newVal)
          // .then(function(data){
          
          // clean up the form and return!
          form.entity = {};
          form.$setPristine();
          form.$setUntouched();
          
          // refresh member config collection
          $scope.$parent.view.showist = null;
          $scope.$parent.populateShowList();
          
          $state.go('members.shows');
          // })
          // .catch(function(err){
          //   // TODO report any errors
          // })
        }
      } // if form valid
    } // submit post
    
  }]);
