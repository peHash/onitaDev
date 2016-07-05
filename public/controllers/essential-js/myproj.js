angular.module('MyApp')
  .controller('MyProjCtrl', function($scope, User, $routeParams, $window, $modal, $http, Show) {
        $scope.myProjCtrlCurrent = true;
        var messages = [{id: 111, content: "وضعیت حساب: غیرفعال", dismissed: true, category: 'messageBox-danger'}, {id: 111, content: "ارسال ایمیل فعال‌سازی", dismissed: true, category: 'messageBox-info'}];
        $scope.messages = messages;

       $http({
       	url: '/api/v1/profile/' + $routeParams.id,
       	method: 'GET'
       })
       .then(function(response){
       	$scope.user = response.data;
       }, 
       function(response){
       	alert('something wrong happened :' + response);
       });
       $scope.userProjectPage = '/myprojects/' + $routeParams.id;
       $scope.userProfilePage = '/my/' + $routeParams.id;
       
     });