
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
  
      
      // Navigation helper
      $scope.isRouteActive = function(route) {
        return $location.path().indexOf(route) !== -1;
      };
  
      
      // Member Signin & Logout
      $scope.stripeSignin = function(){
        $http.get('/stripe/login').then(function(data){
          // console.log('logged in?')
        });
      };
      $scope.memberLogout = function(){
        // console.log('Signing out')
        $scope.view.ContextService.memberLogout();
        $scope.view.configList = null;
        $location.path('/members/signin');
      };
      
      
  
      $scope.view.currentConfigId = function(){
        return $stateParams['config_id']
      };
      $scope.view.currentShowId = function(){
        return $stateParams['show_id']
      };
      
      
      
      // Mode methods
      $scope.rowEdit = function(entityType, id){
        if(entityType === 'config'){
          $state.go('members.configs.edit', {config_id: id});
        } else if(entityType === 'show'){
          $state.go('members.shows.edit', {show_id: id});
        } else if(entityType === 'showdate'){
          $state.go('members.showdates.edit', {showdate_id: id});
        } else if(entityType === 'showticket'){
          $state.go('members.showtickets.edit', {showticket_id: id});
        } else if(entityType === 'showimage'){
          $state.go('members.showimages.edit', {showimage_id: id});
          
          
        } else if(entityType === 'newshow'){
          $state.go('members.shows.edit', {show_id: id});
        } else if(entityType === 'newshowdate'){
          $state.go('members.showdates.edit', {showdate_id: id});
        } else if(entityType === 'newshowticket'){
          $state.go('members.showtickets.edit', {showticket_id: id});
        } else if(entityType === 'newshowimage'){
          $state.go('members.showimages.edit', {showimage_id: id});
        }
      };
  
      
      
      // list assigns - be sure to init below
      $scope.view.configList = null;
      $scope.populateConfig = function(){
        $scope.view.MembersService.getConfigCollection()
        .then(function(data){
          $scope.view.configList = data;
        })
      };
  
      $scope.view.eventQs = null;
      $scope.populateEventQs = function(){
        $scope.view.MembersService.getMemberEvents()
        .then(function(data){
          // console.log('FINAL', data)
          $scope.view.eventQs = data;
        })
      };
  
      $scope.view.showList = null;
      $scope.populateShowList = function(){
      
        $scope.view.MembersService.getMemberShowListing()
        .then(function(data){
          $scope.view.showList = data;
        })
      };
      
      
      // init methods
      $scope.populateConfig();
      $scope.populateShowList();
      $scope.populateEventQs();
      
      // console.log('SHOWS', $scope.view.showList)
}]);
    

angular.module('MyApp')
.controller('MembersConfigController', ['$scope', '$stateParams', '$http', 'ContextService', '$state',
  function ($scope, $stateParams, $http, ContextService, $state) {
    $scope.view = {};
    
    $scope.view.currentConfig = null;
    $scope.getCurrentConfig = function() {
      if ($stateParams.config_id) {
        // console.log('CONFIG_ID',config_id)
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
      $state.go('members.configs');
    }
  
    $scope.submitForm = function(form){
      
      if(form.$valid){
        if(form.entity && $scope.view.currentConfig){
          var _entity = angular.copy(form.entity);
          var newVal = _entity.value;
          
          // TODO validation - evaluate datatype and if newVal is valid...
          // console.log('ENTITY',newVal);
          
          // if no member_id...
          // console.log('form updating...')
          $scope.$parent.view.MembersService.updateMemberConfig($scope.view.currentConfig.id, newVal)
          .then(function(data){
            // console.log('updated')
            // clean up the form and return!
            form.entity = {};
            form.$setPristine();
            form.$setUntouched();
  
            // refresh member config collection
            $scope.$parent.view.configList = null;
            $scope.$parent.populateConfig();
            
            $state.go('members.configs');
          }).catch(function(err){
            // TODO report any errors
          })
        }
      } // if form valid
    } // submit post
    
  }]);

// angular.module('MyApp')
// .controller('MembersShowsController', ['$scope', '$stateParams', '$http', 'ContextService', '$state', 'Show', 'ShowDate',
//   function ($scope, $stateParams, $http, ContextService, $state, Show, ShowDate) {
//   // console.log('MEMBERS SHOWS CONTROLLER', $stateParams)
//     $scope.view = {};
//
//     $scope.view.currentShow = null;
//     $scope.getCurrentShow = function() {
//       if ($stateParams.show_id) {
//         return $http.get('/api/shows/' + $stateParams.show_id)
//         .then(function (data) {
//           // !!! api call returns response data - so get data at data.data
//           var memberShowData = data.data;
//           var shows = Show.buildShowCollection(
//             memberShowData.shows,
//             ShowDate.buildShowDateCollection(memberShowData.showdates, memberShowData.showtickets));
//
//           // console.log('GOT SHOW', shw[0])
//
//           if(shows.length) {
//             $scope.view.currentShow = shows[0];
//           }
//         });
//       } else {
//         $scope.view.currentShow = null;
//       }
//     };
//     $scope.getCurrentShow();
//
//     $scope.cancelForm = function(){
//       // in case we need to do any cleanup
//       $state.go('members.shows');
//     }
//
//     $scope.submitForm = function(form){
//
//       if(form.$valid){
//         if(form.entity && $scope.view.currentShow){
//           var _entity = angular.copy(form.entity);
//           // var newVal = _entity.value;
//
//           // TODO validation - evaluate datatype and if newVal is valid...
//           // console.log('ENTITY',newVal);
//
//           // if no member_id...
//           console.log('form updating...')
//           // $scope.$parent.view.MembersService.updateMemberConfig($scope.view.currentConfig.id, newVal)
//           // .then(function(data){
//
//             // clean up the form and return!
//             form.entity = {};
//             form.$setPristine();
//             form.$setUntouched();
//
//             // refresh member config collection
//             $scope.$parent.view.showist = null;
//             $scope.$parent.populateShowList();
//
//             $state.go('members.shows');
//           // })
//           // .catch(function(err){
//           //   // TODO report any errors
//           // })
//         }
//       } // if form valid
//     } // submit post
//
//   }]);


angular.module('MyApp')
.controller('MembersShowDatesController', ['$scope', '$stateParams', '$http', 'ContextService', '$state', 'Show', 'ShowDate',
  function ($scope, $stateParams, $http, ContextService, $state, Show, ShowDate) {
    // console.log('MEMBERS SHOWS CONTROLLER', $stateParams)
    $scope.view = {};
    
    
    
    //TODO
    // build a showdate based on a single showdateid
    
    
    
    
    
    
    $scope.view.currentShowDate = null;
    $scope.getCurrentShowDate = function() {
      // if ($stateParams.showdate_id) {
      //   return $http.get('/api/showdates/' + $stateParams.showdate_id)
      //   .then(function (data) {
      //     // !!! api call returns response data - so get data at data.data
      //     var memberShowDateData = data.data;
      //     var showdates = Show.buildShowCollection(
      //       memberShowDateData.shows,
      //       ShowDate.buildShowDateCollection(memberShowData.showdates, memberShowData.showtickets));
      //
      //     // console.log('GOT SHOW', shw[0])
      //
      //     if(showdates.length) {
      //       $scope.view.currentShowDate = showdates[0];
      //     }
      //   });
      // } else {
        $scope.view.currentShowDate = null;
      // }
    };
    $scope.getCurrentShowDate();
    
    $scope.cancelForm = function(){
      // in case we need to do any cleanup
      $state.go('members.shows');
    }
    
    $scope.submitForm = function(form){
      
      if(form.$valid){
        if(form.entity && $scope.view.currentShowDate){
          var _entity = angular.copy(form.entity);
          // var newVal = _entity.value;
          
          // TODO validation - evaluate datatype and if newVal is valid...
          // console.log('ENTITY',newVal);
          
          // if no member_id...
          console.log('form updating...')
          // $scope.$parent.view.MembersService.updateMemberConfig($scope.view.currentConfig.id, newVal)
          // .then(function(data){
          
          // clean up the form and return!
          form.entity = {};
          form.$setPristine();
          form.$setUntouched();
          
          // refresh member config collection
          $scope.$parent.view.showist = null;
          $scope.$parent.populateShowList();
          
          $state.go('members.shows');
          // })
          // .catch(function(err){
          //   // TODO report any errors
          // })
        }
      } // if form valid
    } // submit post
    
  }]);

angular.module('MyApp')
.controller('MembersShowTicketsController', ['$scope', '$stateParams', '$http', 'ContextService', '$state', 'Show', 'ShowDate', 'ShowTicket',
  function ($scope, $stateParams, $http, ContextService, $state, Show, ShowDate, ShowTicket) {
    $scope.view = {};
    //TODO
    // build a showticket based on a single showticketid
        
    $scope.view.currentShowTicket = null;
    $scope.getCurrentShowTicket = function() {
      // if ($stateParams.showdate_id) {
      //   return $http.get('/api/showdates/' + $stateParams.showdate_id)
      //   .then(function (data) {
      //     // !!! api call returns response data - so get data at data.data
      //     var memberShowDateData = data.data;
      //     var showdates = Show.buildShowCollection(
      //       memberShowDateData.shows,
      //       ShowDate.buildShowDateCollection(memberShowData.showdates, memberShowData.showtickets));
      //
      //     // console.log('GOT SHOW', shw[0])
      //
      //     if(showdates.length) {
      //       $scope.view.currentShowDate = showdates[0];
      //     }
      //   });
      // } else {
      $scope.view.currentShowTicket = null;
      // }
    };
    $scope.getCurrentShowTicket();
    
    $scope.cancelForm = function(){
      // in case we need to do any cleanup
      $state.go('members.shows');
    }
    
    $scope.submitForm = function(form){
      
      if(form.$valid){
        if(form.entity && $scope.view.currentShowTicket){
          var _entity = angular.copy(form.entity);
          // var newVal = _entity.value;
          
          // TODO validation - evaluate datatype and if newVal is valid...
          // console.log('ENTITY',newVal);
          
          // if no member_id...
          console.log('form updating...')
          // $scope.$parent.view.MembersService.updateMemberConfig($scope.view.currentConfig.id, newVal)
          // .then(function(data){
          
          // clean up the form and return!
          form.entity = {};
          form.$setPristine();
          form.$setUntouched();
          
          // refresh member config collection
          $scope.$parent.view.showist = null;
          $scope.$parent.populateShowList();
          
          $state.go('members.shows');
          // })
          // .catch(function(err){
          //   // TODO report any errors
          // })
        }
      } // if form valid
    } // submit post
    
  }]);


angular.module('MyApp')
.controller('MembersShowImagesController', ['$scope', '$stateParams', '$http', 'ContextService', '$state', 'Show', 'ShowDate', 'ShowTicket',
  function ($scope, $stateParams, $http, ContextService, $state, Show, ShowDate, ShowTicket) {
    $scope.view = {};
    //TODO
    // build a showimage based on a single showimageid
    
    $scope.view.currentShowImage = null;
    $scope.getCurrentShowImage = function() {
      // if ($stateParams.showdate_id) {
      //   return $http.get('/api/showdates/' + $stateParams.showdate_id)
      //   .then(function (data) {
      //     // !!! api call returns response data - so get data at data.data
      //     var memberShowDateData = data.data;
      //     var showdates = Show.buildShowCollection(
      //       memberShowDateData.shows,
      //       ShowDate.buildShowDateCollection(memberShowData.showdates, memberShowData.showtickets));
      //
      //     // console.log('GOT SHOW', shw[0])
      //
      //     if(showdates.length) {
      //       $scope.view.currentShowDate = showdates[0];
      //     }
      //   });
      // } else {
      $scope.view.currentShowImage = null;
      // }
    };
    $scope.getCurrentShowImage();
    
    $scope.cancelForm = function(){
      // in case we need to do any cleanup
      $state.go('members.shows');
    }
    
    $scope.submitForm = function(form){
      
      if(form.$valid){
        if(form.entity && $scope.view.currentShowImage){
          var _entity = angular.copy(form.entity);
          // var newVal = _entity.value;
          
          // TODO validation - evaluate datatype and if newVal is valid...
          // console.log('ENTITY',newVal);
          
          // if no member_id...
          console.log('form updating...')
          // $scope.$parent.view.MembersService.updateMemberConfig($scope.view.currentConfig.id, newVal)
          // .then(function(data){
          
          // clean up the form and return!
          form.entity = {};
          form.$setPristine();
          form.$setUntouched();
          
          // refresh member config collection
          $scope.$parent.view.showist = null;
          $scope.$parent.populateShowList();
          
          $state.go('members.shows');
          // })
          // .catch(function(err){
          //   // TODO report any errors
          // })
        }
      } // if form valid
    } // submit post
    
  }]);
