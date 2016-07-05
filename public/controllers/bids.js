angular.module('MyApp')
  .controller('BidsCtrl', function($scope, User, $routeParams, $window, $modal, $http, Show) {
       Show.get({ _id: $routeParams.id }, function(info) {
        
        $scope.job = info;
        if ($scope.job.user) {
        	$scope.userProjectPage = '/myprojects/' + $scope.job.user;
        	$scope.userProfilePage = '/my/' + $scope.job.user;
        } else {
        	$scope.userProjectPage = '/myprojects/' + 111;
        	$scope.userProfilePage = '/my/' + 111;
        };

      
      });
     });