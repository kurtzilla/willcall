
  angular.module('MyApp')
  .filter('removeProtocol', function () {
    return function (input) {
      if (input) {
        return input.replace(/^http:\/\//g, '')
        .replace(/^https:\/\//g, '');
      }
    }
  })
  .filter('proxyResource', function () {
    return function (input) {
      if (input) {
        var encoded = btoa(input);
        return '/proxyresource/' + encoded;
      }
    }
  })
  .filter('trustMe', ['$sce', function($sce){
    return function(input){
      if(input){
        return $sce.trustAsHtml(input);
      }
    }
  }]);


// app.filter('substring', function(){
// ** use limitTo
// {{ lastname : limitTo:125 }}
// works on both arrays and string - numbers are converted to strings
// https://docs.angularjs.org/api/ng/filter/limitTo
