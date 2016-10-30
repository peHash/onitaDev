+ function() {
	angular.module('MyApp').controller('youtubeCtrl', function ($scope, toaster, $modal) {
		$scope.modalDownloaderOpen = function (size) {

	      var modalInstance = $modal.open({
	        animation: $scope.animationsEnabled,
	        templateUrl: 'modalYoutube.html',
	        controller: 'modalYoutubeCtrl',
	        size: size,
	        resolve: {
	        	// url: function() {
	        	// 	return $scope.youtube.url;
	        	// }
				info: function($q, $timeout, $http){
				    var delay = $q.defer();
				    // $timeout(delay.resolve, 4000);
				    $http({
				      url : '/api/youtube',
				      method : 'POST',
				      data : {
				      	'youtubeUrl' : $scope.youtube.url	
				      }
				    })
				    .then(function(response){
				      delay.resolve(response);
				    },
				    function(response) {
				      alert(response);
				    });
				    return delay.promise;
				}
        	}	
      	});

	      modalInstance.result.then(function (result) {
	      	console.log(result);
	        $scope.videoFile = '/youtube/videos/' + result.data.file._filename;
	        // $scope.$apply();
	      });
    };
	}).controller('modalYoutubeCtrl', function($scope, $routeParams, $window, $modal, $modalInstance, info, $http){
		$scope.info = info.data;
		$scope.downloadIt = function() {
			$http({
				  url : '/api/youtubeDownloader',
				  method : 'POST',
				  data : {
				  	'id' : $scope.info.id, 
				  	'format': $scope.youtube.format
				  }
				})	
				.then(function(response){
				  $modalInstance.close(response);
				},
				function(response) {
				  console.log(response);
				});
		};
	    $scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };

  	});
}();