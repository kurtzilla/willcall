
var app = angular.module('MyApp', ['ui.router', 'satellizer','angular-jwt',
  'angularMoment', 'ui.bootstrap.datetimepicker', 'ui.dateTimeInput'])
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
  .state('users_edit', {
    url: '/admin/users/:user_id',
    templateUrl: 'partials/admin/users/edit.html'
  })
    
  /*
    Modals
   */
  
  
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
      }
    }
  })
  .state('members.signin', {
    url: '/signin',
    templateUrl: 'partials/members/signin.html',
  })
  .state('members.profile', {
    url: '/profile',
    templateUrl: 'partials/members/profile.html',
  })
  .state('members.eventqs', {
    url: '/eventqs',
    templateUrl: 'partials/members/eventqs.html',
  })
  ///////////////////////////////
  // Member Configs
  ///////////////////////////////
  .state('members.configs', {
    url: '/configs',
    templateUrl: 'partials/members/configs.html',
  })
  .state("members.configs.edit", {
    url: '/:config_id',
    views:{
      "modal@members": {
        templateUrl: "partials/members/configs.edit.html",
        controller: 'MembersConfigController'
      }
    },
    onEnter: ["$state", function($state) {
      // $(document).on("keyup", function(e) {
      //   if(e.keyCode == 27) {
      //     $(document).off("keyup");
      //     $state.go("members.dashboard");
      //   }
      // });
      // $(document).on("click", ".Modal-backdrop, .Modal-holder", function() {
      //   $state.go("members.dashboard");
      // });
      $(document).on("click", ".Modal-box, .Modal-box *", function(e) {
        e.stopPropagation();
      });
    }],
  })
  ///////////////////////////////
  // Member Shows
  ///////////////////////////////
  .state('members.shows', {
    url: '/shows',
    templateUrl: 'partials/members/shows.html',
  })
  .state("members.shows.edit", {
    url: '/:show_id',
    views:{
      "modal@members": {
        templateUrl: "partials/members/shows.edit.html",
        controller: 'MembersFormsController',
        resolve: { setCurrentShow: setCurrentShow }
      }
    },
    onEnter: ["$state", function($state) {
      $(document).on("click", ".Modal-box, .Modal-box *", function(e) {
        e.stopPropagation();
      });
    }],
  })

  // WIP
    
  ///////////////////////////////
  // Member ShowDates
  ///////////////////////////////
  
  .state("members.showdates", {
    abstract: true
  })
  .state("members.showdates.edit", {
    url: '/showdates/:showdate_id',
    views:{
      "modal@members": {
        templateUrl: "partials/members/showdates.edit.html",
        controller: 'MembersFormsController',
        resolve: { setCurrentShowDate: setCurrentShowDate }
      }
    },
    onEnter: ["$state", function($state) {
      $(document).on("click", ".Modal-box, .Modal-box *", function(e) {
        e.stopPropagation();
      });
    }],
  })
  ///////////////////////////////
  // Member ShowTickets
  ///////////////////////////////
  .state("members.showtickets", {
    abstract: true
  })
  .state("members.showtickets.edit", {
    url: '/showtickets/:showticket_id',
    views:{
      "modal@members": {
        templateUrl: "partials/members/showtickets.edit.html",
        controller: 'MembersFormsController',
        resolve: { setCurrentShowTicket: setCurrentShowTicket }
      }
    },
    onEnter: ["$state", function($state) {
      $(document).on("click", ".Modal-box, .Modal-box *", function(e) {
        e.stopPropagation();
      });
    }],
  })





















  .state("members.showimages", {
    abstract: true
  })
  .state("members.showimages.edit", {
    url: '/:showimage_id',
    views:{
      "modal@members": {
        templateUrl: "partials/members/showimages.edit.html",
        controller: 'MembersFormsController'
      }
    },
    onEnter: ["$state", function($state) {
      $(document).on("click", ".Modal-box, .Modal-box *", function(e) {
        e.stopPropagation();
      });
    }],
  })


  

  .state('members.products', {
    url: '/products',
    templateUrl: 'partials/members/products.html',
  })
  .state('members.dashboard', {
    url: '/dashboard',
    templateUrl: 'partials/members/dashboard.html',
  })
  .state('members.error', {
    url: '/error',
    templateUrl: 'partials/members/error.html',
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
  
  // set the current show based on state params
  function setCurrentShow($stateParams, ContextService){
    if(!$stateParams || (!$stateParams.show_id) || $stateParams.show_id === '0') {
      return null;
    }
    return ContextService.setCurrentShow($stateParams.show_id)
    .then(function(data){
      return ContextService.currentShow = data;
    });
  };
  
  // set the current showdate based on state params
  function setCurrentShowDate($stateParams, ContextService){
    if(!$stateParams || (!$stateParams.showdate_id) || $stateParams.showdate_id === '0') {
      return null;
    }
    return ContextService.setCurrentShowDate($stateParams.showdate_id)
    .then(function(data){
      return ContextService.currentShowDate = data;
    });
  };
  
  // set the current showticket based on state params
  function setCurrentShowTicket($stateParams, ContextService){
    if(!$stateParams || (!$stateParams.showticket_id) || $stateParams.showticket_id === '0') {
      return null;
    }
    return ContextService.setCurrentShowTicket($stateParams.showticket_id)
    .then(function(data){
      return ContextService.currentShowTicket = data;
    });
  };
  
  
  
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
      }
      return config;
    }
  }
}]);
