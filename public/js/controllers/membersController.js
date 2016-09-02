
angular.module('MyApp')
.controller('MembersController', ['$scope', '$location', '$window', '$stateParams',
    'ContextService', 'MembersService', '$http', '$state',
    function ($scope, $location, $window, $stateParams, ContextService, MembersService, $http, $state) {

      // console.log('MEMBERS CONTROLLER', $stateParams);
      // console.log('MEMBERS LOCATION', $location);
      // console.log('MEMBERS STATE', $stateParams);
      // an alt method with ui-bootstrap https://www.sitepoint.com/creating-stateful-modals-angularjs-angular-ui-router/
      // http://www.dwmkerr.com/the-only-angularjs-modal-service-youll-ever-need/

      $scope.view = {};
      $scope.view.ContextService = ContextService;
      $scope.view.MembersService = MembersService;
  
      $scope.isActive = function(route) {
        return $location.path().indexOf(route) !== -1;
      };
  
      $scope.view.currentConfigId = function(){
        // console.log('PARM',$stateParams.config_id)
        return $stateParams['config_id']
      };
      
      $scope.rowGo = function(config_id){
        // $state.go('members.dashboard');
        // ui-sref="members.dashboard.configs({config_id: config.id})">
        $state.go('members.dashboard.configs', {config_id: config_id});
      };
  
      $scope.refreshDashboard = function(){
        $scope.view.configList = null;
        $scope.populateConfig();
      };
  
      
      // assign config list
      $scope.view.configList = null;
      $scope.populateConfig = function(){
        if(ContextService.currentMember){
          $scope.view.MembersService.getConfigCollection()
          .then(function(data){
            // console.log('FINAL', data)
            $scope.view.configList = data;
          })
        }
      };
      
      $scope.stripeSignin = function(){
        $http.get('/stripe/login').then(function(data){
        });
      };
      
      
      // Logout
      $scope.memberLogout = function(){
        // console.log('Signing out')
        $scope.view.ContextService.memberLogout();
        $scope.view.configList = null;
        $location.path('/members/signin');
      };
      
      // init methods
      $scope.populateConfig();
}]);


angular.module('MyApp')
.controller('MembersConfigController', ['$scope', '$stateParams', '$http',
  'ContextService', '$state',
  function ($scope, $stateParams, $http, ContextService, $state) {
    $scope.view = {};
    
    $scope.view.currentConfig = null;
    $scope.getCurrentConfig = function() {
      if ($stateParams.config_id) {
        return $http.get('/api/configs/' + $stateParams.config_id)
        .then(function (data) {
          // !!! api call returns response data - so get data at data.data
          $scope.view.currentConfig = data.data;
        });
      } else {
        $scope.view.currentConfig = null;
      }
    };
    $scope.getCurrentConfig();
  
    $scope.cancelForm = function(){
      // in case we need to do any cleanup
      $state.go('members.dashboard');
    }
  
    $scope.submitForm = function(form){
      
      if(form.$valid){
        if(form.entity && $scope.view.currentConfig){
          var _entity = angular.copy(form.entity);
          var newVal = _entity.value;
          
          // TODO validation - evaluate datatype and if newVal is valid...
          // console.log('ENTITY',newVal);
          
          // if no member_id...
          console.log('form updating...')
          $scope.$parent.view.MembersService.updateMemberConfig($scope.view.currentConfig.id, newVal)
          .then(function(data){
            
            // clean up the form and return!
            form.entity = {};
            form.$setPristine();
            form.$setUntouched();
  
            // refresh member config collection
            $scope.$parent.view.configList = null;
            $scope.$parent.populateConfig();
            
            $state.go('members.dashboard');
          }).catch(function(err){
            // TODO report any errors
          })
        }
      } // if form valid
    } // submit post
    
  }]);