+ function() {
  angular.module('MyApp')
  .controller('BidsCtrl', function($scope, User, $routeParams, $window, $uibModal, $http, Show) {
   
   Show.get({ _id: $routeParams.id }, function(job) {
    angular.forEach(job.bids, function(bid) {
        bid.user.profilePic = bid.user.image ? bid.user.image : '/images/buyer.png';
      });
    console.log($scope.job = job);
  });

   $scope.startWorking = function(user){

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'notifModal.html',
        resolve: {
          id : function() {
            return user;
          }
        },
        controller: function($scope, $uibModalInstance, id){
        	$scope.texts = {
        		header: "همه چی از همین جا شروع میشه",
        		bodyContent: 'آیا مطمئن هستید ؟',
        		confirm: 'بله',
        		ignore: 'دوباره نگاه بیندازید'
        	};
        	$scope.ops = {
        		confirm: function(){
              selectExpert(id);
        			$uibModalInstance.close();
        		}, 
        		ignore: function(){
        			$uibModalInstance.close();
        		}
        	};
        }
      });

      modalInstance.result.then(function () {
        console.log('Expert selection modal closed at' + new Date());
      });
   };
   $scope.resetExpert = function() {

      $http({
      url : '/api/v1/expert/'+ $scope.job._id,
      method : 'DELETE'
    })
    .then(function(r){
      // toaster.pop('success', 'عالی !', 'پیشنهاد شما با موفقیت ارسال گردید !');
      // $window.location.href = '/job/' + $scope.job._id;
      $window.location.reload(false);
    },
    function(r) {
      // toaster.error('درست پیش نرفت', 'مشکلی پیش آمده است ، لطفا دوباره تلاش کنید !')
      // $window.location.href = '/job/' + $scope.job._id;
    });
  };

  var selectExpert = function(id) {
    $http({
      url : '/api/v1/expert',
      method : 'POST',
      data : {
        'projectid' : $scope.job._id,
        'userid' : id
      }
    })
    .then(function(response){
      // toaster.pop('success', 'عالی !', 'پیشنهاد شما با موفقیت ارسال گردید !');
      $window.location.href = '/job/' + $scope.job._id;

    },
    function(response) {
      // toaster.error('درست پیش نرفت', 'مشکلی پیش آمده است ، لطفا دوباره تلاش کنید !')
      // $window.location.href = '/job/' + $scope.job._id;
    });
  };
 });    
}();
