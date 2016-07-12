+ function(){
	angular.module('MyApp').controller('blogsCtrl', function ($scope, Article) {
	  $scope.defaultTime = "2016-07-06T13:09:04.206Z";
	  $scope.tempTitle = "مدیریت لذت بخش دانلودهای وردپرس";

	  Article.query().$promise.then(function(result){
	  	$scope.arts = result;
	  });
	});
}();