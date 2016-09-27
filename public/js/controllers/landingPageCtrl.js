+ function() {
    angular.module('MyApp')
    .controller('landingPageCtrl', function($scope, Posts) {
      $scope.introBtn = 'بزن بریم !';
      $scope.newsletterPlaceHolder = 'ایمیل شما اینجا ...';
      $scope.newsletterSignUpValue = 'همین حالا ثبت کن';
    $scope.posts = Posts.query();
    });  
  }();