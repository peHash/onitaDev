angular.module('MyApp')
  .factory('User', function($resource) {
    return $resource('/api/v1/user/:_id');
  });