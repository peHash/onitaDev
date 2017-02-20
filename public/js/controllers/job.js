+ function () {
  angular.module('MyApp')
.controller('testCtrl', function($scope){
  $scope.test = true;
})
.controller('JobCtrl', function($scope, $rootScope, $routeParams, Show, $uibModal, $resource, $http) {
      Show.get({ _id: $routeParams.id }, function(info) {

        console.log($scope.job = info);
        $scope.jobStatus = calcStatus(info.status);
        // $scope.deadline = moment($scope.job.deadlineDate).fromNow();
        if ($scope.job.deadlineDate < Date()) {
        $scope.status = "بسته";
        $scope.statusClass = "closeStatus";
      } else {
        $scope.status = "باز";
        $scope.statusClass = "openStatus";
      }

      });

      var calcStatus = function(s){
        switch (s) {
          case -1: 
            return 'job-blocked';
            break;
          case 0: 
            return 'not-verified';
            break;
          case 1: 
            return 'verified';
            break;
          case 2:
            return 'expert-selected';
            break;
          case 3: 
            return 'expert-accepted';
            break;
          case 4: 
            return 'expert-finalized';
            break;
          case 5:
            return 'owner-finalized';
            break;
          case 6:
            return 'success';
            break;
          case 7:
            return 'failed';
            break;
          case 8:
            return 'expert-reviewed';
            break;
          case 9: 
            return 'owner-reviewed';
            break;
        }
      }



    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    // $scope.showip = function() {
      
    //   // var ip = $resource("http://ipinfo.io/json",
    //   // { callback: "JSON_CALLBACK"},
    //   // { get: { method: "JSONP" }}).get();
    //     var ip = $resource(
    //                 "http://ipinfo.io/json",
    //                 {
    //                     callback: "JSON_CALLBACK"
    //                 },
    //                 {
    //                     getip: {
    //                         method: "JSONP",
    //                         isArray: false
    //                     }
    //                 }
    //             ).getip().$promise.then(
    //                     function( friend ) {
    //                         $scope.ip = friend.ip;
    //                     },
    //                     function( error ) {
    //                         // If something goes wrong with a JSONP request in AngularJS,
    //                         // the status code is always reported as a "0". As such, it's
    //                         // a bit of black-box, programmatically speaking.
    //                         alert( "Something went wrong!" );
    //                     }
    //                 );
    // };

    $scope.open = function () {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'test.html',
        controller: 'bidCtrl',
        resolve: {
          job: function () {
            return $scope.job
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      });
    };
});  

}();
