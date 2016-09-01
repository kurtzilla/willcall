
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
      
      // $scope.view.configList = null;
  
      $scope.view.MembersService.getConfigCollection()
      .then(function(data){
        console.log('FINAL', data)
        $scope.view.configList = data;
      })
        
      
      
      
      // $scope.view.configList = $scope.view.MembersService.getConfigCollection();
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
