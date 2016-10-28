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
				delay: function($q, $timeout, $http){
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

	      modalInstance.result.then(function (selectedItem) {
	        $scope.selected = selectedItem;
	      });
    };
	}).controller('modalYoutubeCtrl', function($scope, $routeParams, $window, $modal, $modalInstance){

		// alert(url);
	    $scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };

  	});
}();