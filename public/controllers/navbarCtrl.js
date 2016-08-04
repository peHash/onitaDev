+ function() {
  angular.module('MyApp')
  .controller('navbarCtrl', function($scope, $window, Auth) {
  	$scope.userdown = false;
    $scope.logout = function() {
	  	Auth.logout();
		$window.location.href = '/';
		$scope.userdown = !($scope.userdown);
    };
    $scope.usertoggle = function() {
    	$scope.userdown = !($scope.userdown);
    };
  });
}();