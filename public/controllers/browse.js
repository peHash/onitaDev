+ function() {
  angular.module('MyApp')
  .controller('BrowseCtrl', function($scope, User, $window, $routeParams, Show, $location) {
   //  $scope.users = {};
    // console.log($routeParams);
    // if ($routeParams.tagname) {
   //    User.get({tag: $routeParams.tagname}, function(users){
   //      $scope.use = users;
   //    });
    // } else {
    $scope.users = User.query();  
    // }

  }).controller('BrowseTagCtrl', function($scope, $routeParams, User){
    User.query({tag: $routeParams.tagname}, function(info){
      $scope.users = info;
    });
  });   
}();
