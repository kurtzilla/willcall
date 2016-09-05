angular.module('MyApp')
.controller('MembersFormsController',
  ['$scope', '$stateParams', '$http', 'ContextService', '$state', 'Show', 'ShowDate', 'ShowTicket',
  
    function ($scope, $stateParams, $http, ContextService, $state, Show, ShowDate, ShowTicket) {
    
      $scope.view = {};
      $scope.view.ContextService = ContextService;
      
      
      $scope.cancelForm = function(form){
        cleanupFormAndReturn(form);
      };
      
      $scope.resetForm = function(form){
        $state.reload();
      };
      
      var cleanupFormAndReturn = function(form){
        $scope.view.ContextService.currentShow = null;
        $scope.view.ContextService.currentShowDate = null;
        $scope.view.ContextService.currentShowTicket = null;
        
        // clean up the form and return!
        form.entity = {};
        form.$setPristine();
        form.$setUntouched();

        // TODO context will dictate what to refresh??
        // refresh member config collection and return
        // $scope.$parent.view.showList = null;
        // $scope.$parent.populateShowList();
        
        redirectToPreviousState();
      };
  
      var redirectToPreviousState = function(){
        // var parentState = $state.current.name.split('.').slice(0,-1).join('.');
        var currentState = $state.current.name;
        //TODO it may just be showdates, showtickets and productinventories breaking the mold
        var goto = 'members.shows';
        if(currentState.indexOf('members.configs') !== -1){
          var goto = 'members.configs';
        }
        $state.go(goto);
      };
      
      
      // Keep an eye on datetime-picker as it may always report due
      //  to formatting changes from model date to date format
      // Also be aware that boolean values will report as well,
      //  due to the form using strings vs boolean
      $scope.submitForm = function(form, context) {
        $scope.view.errors = null;
        // console.log('FORM',form)
        
        if(form.$valid && form.entity) {
          var _entity = angular.copy(form.entity);
          var formSubmit = null;
          var listToRefresh = null;
          var refreshMethod = null;
  
          // select form submission by model
          if(context === 'show') {
            _entity.member_id = $scope.view.ContextService.currentMember.id;
            formSubmit = Show.processForm(form, _entity,
              $scope.view.ContextService.currentShow);
            listToRefresh = $scope.$parent.view.showList;
            refreshMethod = $scope.$parent.populateShowList;
          } else if (context === 'showdate') {
            formSubmit = ShowDate.processForm(form, _entity,
              $scope.view.ContextService.currentShowDate,
              $scope.view.ContextService.currentShow);
            listToRefresh = $scope.$parent.view.showList;
            refreshMethod = $scope.$parent.populateShowList;
          }  else if (context === 'showticket') {
            formSubmit = ShowTicket.processForm(form, _entity,
              $scope.view.ContextService.currentShowTicket,
              $scope.view.ContextService.currentShowDate);
            listToRefresh = $scope.$parent.view.showList;
            refreshMethod = $scope.$parent.populateShowList;
          }
          
          return formSubmit
          .then(function(data){
  
            listToRefresh = null;
            refreshMethod();
            cleanupFormAndReturn(form);
          })
          .catch(function(err){
            // console.log('ERROR', err)
            $scope.view.errors = err;
          });
        }
      };
      
  }]);
