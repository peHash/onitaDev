+ function(){
	angular.module('MyApp')
	.factory('Posts', function($resource){
		return $resource('/api/posts');
	});
}();