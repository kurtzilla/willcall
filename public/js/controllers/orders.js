
angular.module('MyApp')
    .controller('OrdersController', OrdersController);

OrdersController.$inject = ['$scope', '$location', 'OrdersService'];

function OrdersController($scope, $location, OrdersService) {

    console.log('ORDERS CONTROLLER');

    $scope.view = [];
    $scope.view.OrdersService = OrdersService;

    $scope.view.stripe_publish_key = '';
    $scope.view.OrdersService.stripe_publish_key()
    .then(function(data){
        $scope.view.stripe_publish_key = data.data;
    });


    // $scope.stripeCallback == function(code, result){
    //     console.log('CALLIN BACK STRIPE')
    //     if (result.error) {
    //         window.alert('it failed! error: ' + result.error.message);
    //     } else {
    //         window.alert('success! token: ' + result.id);
    //     }
    // }
}
