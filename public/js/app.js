
var app = angular.module('MyApp', ['ui.router', 'satellizer','angular-jwt'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider,
                 $httpProvider, $authProvider) {

  $httpProvider.interceptors.push('jwtMemberInterceptor');

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'partials/home.html',
    controller: 'BrochureController'
  })
  .state('users', {
    abstract: true,
    url: '/users',
    templateUrl: 'partials/users/index.html'
  })
  // .state('users', {
  //   url: '/admin/users',
  //   templateUrl: 'partials/admin/users/listing.html'
  // })
  .state('users_edit', {
    url: '/admin/users/:user_id',
    templateUrl: 'partials/admin/users/edit.html'
  })



  /*
    MEMBERS AREA
   */
  .state('members', {
    abstract: true,
    url: '/members',
    
    views: {
      '@': {
        templateUrl: 'partials/members/index.html',
        controller: 'MembersController',
      },
      'navigation@members': {
        templateUrl: 'partials/members/navigation.html',
        controller: 'MembersController',
      }
    }
  })
  .state('members.signin', {
    url: '/signin',
    templateUrl: 'partials/members/signin.html',
    controller: 'MembersController',
    // resolve: { memberAuth: memberAuth }
  })
  .state('members.profile', {
    url: '/profile',
    templateUrl: 'partials/members/profile.html',
    controller: 'MembersController'
  })
  .state('members.dashboard', {
    url: '/dashboard',
    templateUrl: 'partials/members/dashboard.html',
    controller: 'MembersController'
  })
  .state('members.shows', {
    url: '/shows',
    templateUrl: 'partials/members/shows.html',
    controller: 'MembersController'
  })
  .state('members.products', {
    url: '/products',
    templateUrl: 'partials/members/products.html',
    controller: 'MembersController'
  })
  
  .state('members.error', {
    url: '/error',
    templateUrl: 'partials/members/error.html',
    controller: 'MembersController'
  })
/*
  END MEMBERS AREA
 */












  .state('admin', {
    url: '/admin',
    templateUrl: 'partials/admin/index.html'
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

  // console.log('AUTHHD', $authProvider);

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

  // function verifyJWT(token){
  //
  //   var base64Url = token.split('.')[1];
  //   var base64 = base64Url.replace('-', '+').replace('_', '/');
  //   return JSON.parse($window.atob(base64));
  //
  // };

  function memberAuth($location, $auth, $http, ContextService) {
    // console.log('AUTHHD', $http(config));
    // if ($auth.isAuthenticated()) {
    //   $location.path('/');
    // }
  };
})
.run(function($rootScope, $window, jwtHelper) {
  // console.log('HELPER',jwtHelper.decodeToken(localStorage.memberToken))
  // $rootScope.memberCurrent = null;
  //
  // if(localStorage.memberToken) {
  //   $rootScope.memberCurrent = jwtHelper.decodeToken($window.localStorage.memberToken);
  // }

})
.service('jwtMemberInterceptor', ['$rootScope', 'jwtHelper',
  function jwtMemberInterceptor($rootScope, jwtHelper){
  // Attach the token to every request.
  return {
    request: function(config){
      $rootScope.memberToken = null;
      if(localStorage && localStorage.memberToken) {
        config.headers.authorization = 'Bearer ' + localStorage.memberToken;
        //$rootScope.memberToken = localStorage.memberToken;
      }
      return config;
    }
  }
}]);
