angular.module('MyApp').controller('partialBlogCtrl', function ($scope, Article, $routeParams) {
  $scope.defaultTime = "2016-07-06T13:09:04.206Z";
  $scope.tempTitle = "مدیریت لذت بخش دانلودهای وردپرس";
	  Article.get({ _id: $routeParams.id }, function(art){
	  $scope.art = art; 
	  });

});