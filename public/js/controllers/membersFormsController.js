angular.module('MyApp')
.controller('MembersFormsController',
  ['$scope', '$stateParams', '$http', 'ContextService', '$state',
    'Config', 'Show', 'ShowDate', 'ShowTicket',
    'Product', 'ProductSku',
  
    function ($scope, $stateParams, $http, ContextService, $state,
              Config, Show, ShowDate, ShowTicket, Product, ProductSku) {
    
      $scope.view = {};
      $scope.view.ContextService = ContextService;
            
      $scope.cancelForm = function(form){
        cleanupFormAndReturn(form);
      };
      
      $scope.resetForm = function(form){
        $state.reload();
      };
      
      var cleanupFormAndReturn = function(form){
        $scope.view.ContextService.currentConfig = null;
        $scope.view.ContextService.currentShow = null;
        $scope.view.ContextService.currentShowDate = null;
        $scope.view.ContextService.currentShowTicket = null;
        $scope.view.ContextService.currentProduct = null;
        $scope.view.ContextService.currentProductSku = null;
       
        // clean up the form and return!
        form.entity = {};
        form.$setPristine();
        form.$setUntouched();
        
        redirectToPreviousState();
      };
  
      var redirectToPreviousState = function(){
        // var parentState = $state.current.name.split('.').slice(0,-1).join('.');
        var currentState = $state.current.name;
        //TODO it may just be showdates, showtickets and productskus breaking the mold
        var goto = 'members.shows';
        if(currentState.indexOf('members.products') !== -1) {
          goto = 'members.products';
        } else if (currentState.indexOf('members.configs') !== -1) {
          goto = 'members.configs';
        }
        $state.go(goto);
      };
      
      
      // Keep an eye on datetime-picker as it may always report due
      //  to formatting changes from model date to date format
      // Also be aware that boolean values will report as well,
      //  due to the form using strings vs boolean
      $scope.submitForm = function(form, context) {
        $scope.view.errors = null;
        // console.log('FORM',context, form)
        
        if(form.$valid && form.entity) {
          var _entity = angular.copy(form.entity);
          var formSubmit = null;
          var listToRefresh = null;
          var refreshMethod = null;
  
          // select form submission by model
          if(context === 'config') {
            _entity.member_id = $scope.view.ContextService.currentMember.id;
            formSubmit = Config.processForm(form, _entity,
              $scope.view.ContextService.currentConfig);
            listToRefresh = $scope.$parent.view.configList;
            refreshMethod = $scope.$parent.populateConfig;
          } else if(context === 'show') {
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
          } else if (context === 'product') {
            _entity.member_id = $scope.view.ContextService.currentMember.id;
            formSubmit = Product.processForm(form, _entity,
              $scope.view.ContextService.currentProduct);
            listToRefresh = $scope.$parent.view.productList;
            refreshMethod = $scope.$parent.populateProductList;
          } else if (context === 'productsku') {
            formSubmit = ProductSku.processForm(form, _entity,
              $scope.view.ContextService.currentProductSku,
              $scope.view.ContextService.currentProduct);
            listToRefresh = $scope.$parent.view.productList;
            refreshMethod = $scope.$parent.populateProductList;
          }
          
          return formSubmit
          .then(function(data){
            // console.log('TO REFRESH', listToRefresh)
            listToRefresh = null;
            refreshMethod();
            // console.log('TO REFRESH', listToRefresh)
            cleanupFormAndReturn(form);
          })
          .catch(function(err){
            // console.log('ERROR', err)
            $scope.view.errors = err;
          });
        }
      };
      
  }]);
