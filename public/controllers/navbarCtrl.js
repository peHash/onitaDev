+ function() {
  angular.module('MyApp')
  .controller('navbarCtrl', function($scope, $window, Auth, $routeParams, $route, $location) {
  	$scope.userdown = false;
    $scope.leftNavBtn = urlExtractor($location.path());
    $scope.logout = function() {
	  	Auth.logout();
		$window.location.href = '/';
		$scope.userdown = !($scope.userdown);
    };
    $scope.usertoggle = function() {
    	$scope.userdown = !($scope.userdown);
    };
  });
  function urlExtractor(location) {
    if (location.includes('article')){
      return 'article';
    } else { 
      return 'non-article';
    }
  }
}();