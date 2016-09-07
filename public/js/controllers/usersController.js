
angular.module('MyApp')
.controller('UsersController', ['$scope', '$location', '$stateParams', 'UsersService', '$http',
    function ($scope, $location, $stateParams, UsersService, $http) {
        
    $scope.view = {};
    $scope.view.UsersService = UsersService;
}]);