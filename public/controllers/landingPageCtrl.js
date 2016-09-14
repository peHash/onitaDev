+ function() {
    angular.module('MyApp')
    .controller('landingPageCtrl', function($scope, Posts) {
      $scope.introH1 = 'دسترسی آسان شما به بهترین برنامه نویس ها';
      $scope.introBtn = 'بزن بریم !';
      $scope.newsletterPlaceHolder = 'ایمیل شما اینجا ...';
      $scope.newsletterSignUpValue = 'همین حالا ثبت کن';
    $scope.posts = Posts.query();
    });  
  }();