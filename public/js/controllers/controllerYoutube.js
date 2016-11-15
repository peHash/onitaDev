+ function() {
	angular.module('MyApp').controller('youtubeCtrl', function ($scope, toaster, $uibModal, $sce) {
		$scope.watching = false;
		
	    $scope.watchToggle = function() {
	    	$scope.watching = !($scope.watching);
	    }
		$scope.modalDownloaderOpen = function (size) {

	      var modalInstance = $uibModal.open({
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
	        $scope.videoFile = '/youtube/videos/' + result.data.file.id + '.' + result.data.file.ext;
	        // $scope.$apply();
	        $scope.config = {
			    sources: [
			  {src: $scope.videoFile , type: "audio/mpeg"}
			],
			    theme: {
			url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
			    }
			};
	      });





    };
	}).controller('modalYoutubeCtrl', function($scope, $routeParams, $window, $uibModal, $uibModalInstance, info, $http){
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
				  $uibModalInstance.close(response);
				},
				function(response) {
				  console.log(response);
				});
		};
	    $scope.cancel = function () {
	      $uibModalInstance.dismiss('cancel');
	    };

  	});
}();