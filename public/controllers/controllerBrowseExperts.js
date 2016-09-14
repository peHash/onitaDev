+ function() {
  angular.module('MyApp')
  .controller('BrowseExpertsCtrl', function($scope, User, $window, $routeParams, Show, $location) {

    User.query(function(users){
      angular.forEach(users, function(user) {
        user.profilePic = user.image ? user.image : '/images/buyer.png';
      });
      $scope.users = users;
    });

  }).controller('BrowseTagCtrl', function($scope, $routeParams, User){
    User.query({tag: $routeParams.tagname}, function(info){
      $scope.users = info;
    });
  });   
}();
