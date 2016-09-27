+ function() {
	angular.module('MyApp').controller('partialBlogCtrl', function ($scope, Article, $routeParams, toaster) {
	  $scope.defaultTime = "2016-07-06T13:09:04.206Z";
	  $scope.tempTitle = "مدیریت لذت بخش دانلودهای وردپرس";
	  var data_recieved = 'اطلاعات کامل دریافت شد', 
	  	data_recieved_title = 'آفرین آفرین';
		Article.get({ _id: $routeParams.id }, function(art){
			art.user.profilePic = art.user.image ? art.user.image : '/images/buyer.png';
			$scope.art = art; 
			// toaster.pop('success', data_recieved, data_recieved_title);
		});
	});
}();