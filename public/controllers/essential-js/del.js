angular.module('MyApp').controller('DelCtrl', function($scope, $http){

$scope.job = '55b28b4c20e875b7038e068b';
$scope.do = function(){
	$http({
		url : '/api/v1/deljob',
		method : 'POST',
		data : {'job' : $scope.job}
	})
	.then(function(response){
		alert('something');
	},
	function(response) {
		alert('nothing');
	});
};
});