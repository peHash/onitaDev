+ function() {
  angular.module('MyApp')
  .controller('MyProjectCtrl', function($scope, User, $routeParams, $window, $uibModal, $http, Show) {
   $http({
    url: '/api/v1/profile/' + $routeParams.id,
    method: 'GET'
   })
   .then(function(response){
    console.log($scope.user = response.data);
   }, 
   function(response){
    alert('something wrong happened :' + response);
   });
   $scope.userProjectPage = '/myprojects/' + $routeParams.id;
   $scope.userProfilePage = '/my/' + $routeParams.id;
   
 });  
}();