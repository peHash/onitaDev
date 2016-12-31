+ function() {
  angular.module('MyApp')
  .controller('BidsCtrl', function($scope, User, $routeParams, $window, $uibModal, $http, Show) {
   Show.get({ _id: $routeParams.id }, function(job) {
    angular.forEach(job.bids, function(bid) {
        bid.user.profilePic = bid.user.image ? bid.user.image : '/images/buyer.png';
      });
    $scope.job = job;
  });
   $scope.startWorking = function(){

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'notifModal.html',
        resolve: {},
        controller: function($scope, $uibModalInstance){
        	$scope.texts = {
        		header: "همه چی از همین جا شروع میشه",
        		bodyContent: 'آیا مطمئن هستید ؟',
        		confirm: 'بله',
        		ignore: 'دوباره نگاه بیندازید'
        	};
        	$scope.ops = {
        		confirm: function(){
        			console.log('ok');
        			$uibModalInstance.close();
        		}, 
        		ignore: function(){
        			$uibModalInstance.close();
        		}
        	};
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      });
   };
 });    
}();
