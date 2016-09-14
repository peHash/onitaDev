+ function(){
	angular.module('MyApp').controller('headerProfileController', function ($scope,$rootScope) {
		$rootScope.userProjectPage = '/myprojects/' + $rootScope.currentUser._id;
	  	$rootScope.userProfilePage = '/my/' + $rootScope.currentUser._id;
	});
}();