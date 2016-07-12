+ function() {
angular.module('MyApp')
  .controller('SignupCtrl', function($scope, Auth) {
    $scope.signup = function() {
      Auth.signup({
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        cellPhoneNumber: $scope.cellPhoneNumber,
        email: $scope.email,
        password: $scope.password
      });
    };
    $scope.pageClass = 'fadeZoom'
  });  
}();
