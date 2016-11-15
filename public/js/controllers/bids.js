+ function() {
  angular.module('MyApp')
  .controller('BidsCtrl', function($scope, User, $routeParams, $window, $uibModal, $http, Show) {
   Show.get({ _id: $routeParams.id }, function(job) {
    angular.forEach(job.bids, function(bid) {
        bid.user.profilePic = bid.user.image ? bid.user.image : '/images/buyer.png';
      });
    console.log(job);
    $scope.job = job;
  });
 });    
}();
