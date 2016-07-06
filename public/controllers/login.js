angular.module('MyApp')
  .controller('LoginCtrl', function($scope, Auth) {
    console.log('reached login controller');
    $scope.login = function() {
      Auth.login({ email: $scope.email, password: $scope.password });
    };
    $scope.facebookLogin = function() {
      Auth.facebookLogin();
    };
    $scope.googleLogin = function() {
      Auth.googleLogin();
    };
    $scope.pageClass = 'fadeZoom';
  });