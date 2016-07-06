angular.module('MyApp')
  .controller('InboxCtrl', function($scope, $rootScope, $routeParams, User, $modal, $resource, $http) {
      $http({
        url: '/api/v1/inbox/' + $routeParams.id, 
        method: 'GET'
      })
      .then(function(response){
        $scope.inbox = response.data;        
      }, function(response){
        alert(response);
      });
});