angular.module('MyApp')
  .controller('SignupCtrl', function($scope, Auth) {
    $scope.signup = function() {
      var phoneIntNumber = parseInt($scope.cellPhoneNumber); 
      if (!phoneIntNumber) {
        return;
      }
      Auth.signup({
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        cellPhoneNumber: phoneIntNumber,
        email: $scope.email,
        password: $scope.password
      });
    };
    $scope.pageClass = 'fadeZoom'
  });

  // "insertDocument :: caused by :: 11000 E11000 duplicate key error index: Megakar.users.$cellPhoneNumber_1 dup key: { : 9121488948.0 }"