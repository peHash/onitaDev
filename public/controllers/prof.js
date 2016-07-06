angular.module('MyApp')
.controller('ProfileCtrl', function(User, $routeParams, $window, $http, $scope){
       $http({
       	url: 'api/v1/profile/'+$routeParams.id,
       	method: 'get'
       })
       .then(function(response){
       	if (response.status == "200") {
       		$scope.user = response.data.data;
       	};
       }, function(response){
       	alert('your request couldn\'t be proceed, sorry !');
       	$window.location.href = '/';
       });

 });