angular.module('MyApp')
.controller('testCtrl', function($scope){
  $scope.test = true;
})
.controller('JobCtrl', function($scope, $rootScope, $routeParams, Show, $modal, $resource, $http) {
      Show.get({ _id: $routeParams.id }, function(info) {

        $scope.job = info; 
        // $scope.deadline = moment($scope.job.deadlineDate).fromNow();
        if ($scope.job.deadlineDate < Date()) {
        $scope.status = "بسته";
        $scope.statusClass = "closeStatus";
      } else {
        $scope.status = "باز";
        $scope.statusClass = "openStatus";
      }

      });



    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.showip = function() {
      
      // var ip = $resource("http://ipinfo.io/json",
      // { callback: "JSON_CALLBACK"},
      // { get: { method: "JSONP" }}).get();
        var ip = $resource(
                    "http://ipinfo.io/json",
                    {
                        callback: "JSON_CALLBACK"
                    },
                    {
                        getip: {
                            method: "JSONP",
                            isArray: false
                        }
                    }
                ).getip().$promise.then(
                        function( friend ) {
                            $scope.ip = friend.ip;
                        },
                        function( error ) {
                            // If something goes wrong with a JSONP request in AngularJS,
                            // the status code is always reported as a "0". As such, it's
                            // a bit of black-box, programmatically speaking.
                            alert( "Something went wrong!" );
                        }
                    );
    };

    $scope.open = function () {

      var modalInstance = $modal.open({
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
// angular.module('MyApp')
//   .controller('JobCtrl', function($scope, $rootScope, $routeParams, Show, $modal, $resource, $http) {
//   $scope.editorOptions = {
//     contentsLangDirection: 'rtl'
// };

//   $scope.escapeHtml = function(text) {
//             var map = {
//               '&': '&amp;',
//               '<': '&lt;',
//               '>': '&gt;',
//               '"': '&quot;',
//               "'": '&#039;'
//             };
//             return text.replace(/[&<>"']/g, function(m) { return map[m]; });
//         };

//       Show.get({ _id: $routeParams.id }, function(info) {

//         $scope.job = info; 

//         //$scope.job.longDesc = $scope.escapeHtml($scope.job.longDesc);
//         // $scope.deadline = moment($scope.job.deadlineDate).fromNow();
//         if ($scope.job.deadlineDate < Date()) {
//         $scope.status = "بسته";
//         $scope.statusClass = "closeStatus";
//       } else {
//         $scope.status = "باز";
//         $scope.statusClass = "openStatus";
//       }

//       });



//     $scope.items = ['item1', 'item2', 'item3'];

//     $scope.animationsEnabled = true;

//     $scope.showip = function() {
      
//         var ip = $resource(
//                     "http://ipinfo.io/json",
//                     {
//                         callback: "JSON_CALLBACK"
//                     },
//                     {
//                         getip: {
//                             method: "JSONP",
//                             isArray: false
//                         }
//                     }
//                 ).getip().$promise.then(
//                         function( friend ) {
//                             $scope.ip = friend.ip;
//                         },
//                         function( error ) {
//                             // If something goes wrong with a JSONP request in AngularJS,
//                             // the status code is always reported as a "0". As such, it's
//                             // a bit of black-box, programmatically speaking.
//                             alert( "Something went wrong!" );
//                         }
//                     );
//     };

//     $scope.open = function (size) {

//       var modalInstance = $modal.open({
//         animation: $scope.animationsEnabled,
//         templateUrl: 'test.html',
//         controller: 'bidCtrl',
//         size: size,
//         resolve: {
//           job: function () {
//             return $scope.job
//           }
//         }
//       });

//       modalInstance.result.then(function (selectedItem) {
//         $scope.selected = selectedItem;
//       });
//     };

// });
