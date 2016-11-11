+ function() {
    angular.module('MyApp')
    .controller('landingPageCtrl', function($scope, Posts, $modal) {
		$scope.introBtn = 'بزن بریم !';
		$scope.newsletterPlaceHolder = 'ایمیل شما اینجا ...';
		$scope.newsletterSignUpValue = 'همین حالا ثبت کن';
		$scope.posts = Posts.query();
		var mod = $modal({title: 'this is it', content:'what ?', show: true});
    });  
  }();