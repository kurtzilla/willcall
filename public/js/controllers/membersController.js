
angular.module('MyApp')
.controller('MembersController', ['$scope', '$location', '$window', '$stateParams',
    'ContextService', 'MembersService', '$http',
    function ($scope, $location, $window, $stateParams, ContextService, MembersService, $http) {

      // console.log('MEMBERS CONTROLLER');
      // console.log('MEMBERS LOCATION', $location);
      // console.log('MEMBERS STATE', $stateParams);

      $scope.view = {};
      $scope.view.ContextService = ContextService;
      $scope.view.MembersService = MembersService;
  
      $scope.refreshDashboard = function(){
        $scope.view.configList = null;
        populateConfig();
      };
  
  
      // http://www.dwmkerr.com/the-only-angularjs-modal-service-youll-ever-need/
      // $scope.editModal = function(){
      //   ModalService.showModal({
      //     templateUrl: 'partials/members/dashboard.configs.html',
      //     controller: function(){
      //
      //     }
      //   }).then(function(modal) {
      //     modal.element.modal();
      //     modal.close.then(function(result) {
      //       $scope.view.message = "You said " + result;
      //     });
      //   });
      // };
      
      
      // assign config list
      $scope.view.configList = null;
      function populateConfig(){
        if(ContextService.currentMember){
          $scope.view.MembersService.getConfigCollection()
          .then(function(data){
            console.log('FINAL', data)
            $scope.view.configList = data;
          })
        }
      };
      
      
      
      // init methods
      populateConfig();
  
  
  
      
      
      
      //
      // try{
      //
      //
      // } catch(err){
      //   $scope.view.configList = null;
      // }
        
        
      
      
      
      
      // console.log('CONFIGLIST', $scope.view.configList)
      // .then(function(data){
      //   $scope.view.configList = data;
      // })
        // .then(function(data){
        //   console.log('CONTROLLER CONFIGS', data)
        //   return data;
        // })
      
      
      $scope.stripeSignin = function(){
        $http.get('/stripe/login').then(function(data){
        });
      };
      
      // Logout
      $scope.memberLogout = function(){
        // console.log('Signing out')
        $scope.view.ContextService.memberLogout();
        $location.path('/members/signin');
      };

    }]);
