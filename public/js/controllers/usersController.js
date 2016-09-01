
angular.module('MyApp')
.controller('UsersController', ['$scope', '$location', '$stateParams', 'UsersService', '$http',
    function ($scope, $location, $stateParams, UsersService, $http) {

    console.log('USERS CONTROLLER');

    $scope.view = {};
    $scope.view.UsersService = UsersService;

}]);
