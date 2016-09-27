+ function() {
	angular.module('MyApp')
  .factory('Show', function($resource) {
    return $resource('/api/jobs/:_id');
  });	
}();
