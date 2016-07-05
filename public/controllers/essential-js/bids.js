angular.module('MyApp')
  .controller('BidsCtrl', function($scope, User, $routeParams, $window, $modal, $http, Show, Auth) {
    $scope.bidsCtrlCurrent = true;
    Show.get({ _id: $routeParams.id }, function(info) {
      var user = Auth.user();
      var messages = [{id: 111, content: "وضعیت حساب: غیرفعال", dismissed: true, category: 'messageBox-danger'}, {id: 111, content: "ارسال ایمیل فعال‌سازی", dismissed: true, category: 'messageBox-info'}];
      
      $scope.messages = messages;
      $scope.job = info;
      $scope.userProjectPage = '/myprojects/' + user._id;

      if (user) {
        $scope.userProfilePage = '/my/' + user._id;
      } else {
        $scope.userProfilePage = '/my/' + 111;
      };
    });
  });