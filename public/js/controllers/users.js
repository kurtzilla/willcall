
angular.module('MyApp')
    .controller('UsersController', UsersController);

UsersController.$inject = ['$scope', '$location', 'UsersService'];

function UsersController($scope, $location, UsersService) {

    console.log('USERS CONTROLLER');

    $scope.view = [];
}
