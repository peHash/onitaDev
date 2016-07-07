angular.module('MyApp')
  .factory('Article', function($resource) {
    return $resource('/api/article/:_id');
  });