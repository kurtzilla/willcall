
var app = angular.module('MyApp', ['ui.router', 'satellizer'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'partials/home.html',
    controller: 'BrochureController'
  })
  .state('profile', {
    url: '/users/profile',
    templateUrl: 'partials/users/profile.html'
  })
  .state('admin', {
    url: '/admin',
    templateUrl: 'partials/admin/index.html'
  })
  .state('users', {
    url: '/admin/users',
    templateUrl: 'partials/admin/users/listing.html'
  })
  .state('users_edit', {
    url: '/admin/users/:user_id',
    templateUrl: 'partials/admin/users/edit.html'
  })
  .state('brochures', {
    url: '/admin/brochures',
    templateUrl: 'partials/admin/brochures/listing.html',
    controller: 'BrochureController'
  })
  .state('brochures_edit', {
    url: '/admin/brochures/:brochure_id',
    templateUrl: 'partials/admin/brochures/edit.html',
    controller: 'BrochureController'
  })
  .state('orders_verify', {
    url: '/orders/verify',
    templateUrl: 'partials/orders/verify.html',
    controller: 'OrdersController'
  })
  .state('orders_charge', {
    url: '/orders/charge',
    templateUrl: 'partials/orders/charge.html',
    controller: 'OrdersController'
  })
  .state('orders_success', {
    url: '/orders/success',
    templateUrl: 'partials/orders/success.html',
    controller: 'OrdersController'
  })
  .state('users_joinus', {
    url: '/users/joinus',
    templateUrl: 'partials/users/joinus.html',
    controller: 'UsersController'
  })
  .state('users_joinsuccess', {
    url: '/users/joinsuccess',
    templateUrl: 'partials/users/joinsuccess.html',
    controller: 'UsersController'
  })

  // .state('contact', {
  //   url: '/contact',
  //   templateUrl: 'partials/contact.html',
  //   controller: 'ContactCtrl'
  // })
  // .state('login', {
  //   url: '/login',
  //   templateUrl: 'partials/login.html',
  //   controller: 'LoginCtrl',
  //   resolve: { skipIfAuthenticated: skipIfAuthenticated }
  // })
  // .state('signup', {
  //   url: '/signup',
  //   templateUrl: 'partials/signup.html',
  //   controller: 'SignupCtrl',
  //   resolve: { skipIfAuthenticated: skipIfAuthenticated }
  // })
  // .state('account', {
  //   url: '/account',
  //   templateUrl: 'partials/profile.html',
  //   controller: 'ProfileCtrl',
  //   resolve: { loginRequired: loginRequired }
  // })
  // .state('forgot', {
  //   url: '/forgot',
  //   templateUrl: 'partials/forgot.html',
  //   controller: 'ForgotCtrl',
  //   resolve: { skipIfAuthenticated: skipIfAuthenticated }
  // })
  // .state('resetToken', {
  //   url: '/reset/:token',
  //   templateUrl: 'partials/reset.html',
  //   controller: 'ResetCtrl',
  //   resolve: { skipIfAuthenticated: skipIfAuthenticated }
  // })
  // .state('api', {
  //   url: '/api',
  //   templateUrl: 'partials/api.html',
  //   controller: 'ApiCtrl'
  //   // , resolve: { skipIfAuthenticated: skipIfAuthenticated }
  // });
  $locationProvider.html5Mode(true);


  // TODO handle auth
  var origin = window.location.origin;

  // $authProvider.loginUrl = '/login';
  // $authProvider.signupUrl = '/signup';
  // $authProvider.google({
  //   url: '/auth/google',
  //   clientId: '485087755085-79bj9q9chussumg4f5r7c6korhhpkert.apps.googleusercontent.com',
  //   redirectUri: origin + '/auth/google/callback'
  // });
  //
  // function skipIfAuthenticated($location, $auth) {
  //   if ($auth.isAuthenticated()) {
  //     $location.path('/');
  //   }
  // }
  //
  // function loginRequired($location, $auth) {
  //   if (!$auth.isAuthenticated()) {
  //     $location.path('/login');
  //   }
  // }
})
.run(function($rootScope, $window) {
  if ($window.localStorage.user) {
    $rootScope.currentUser = JSON.parse($window.localStorage.user);
  }
});

