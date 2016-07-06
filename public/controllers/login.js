angular.module('MyApp')
  .controller('LoginCtrl', function($scope, Auth) {
<<<<<<< HEAD
    console.log('reached login controller');
=======
>>>>>>> dc4086ff87bbe8b0509fa5d5cadbf530cfd7858e
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