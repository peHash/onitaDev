angular.module('MyApp').controller('bidCtrl', function ($scope, $modalInstance, items, $http) {

  $scope.items = items;
  $scope.fuck = "fuck this document !";
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
      $http({
    url : '/api/v1/deljob',
    method : 'POST',
    data : {'job' : $scope.fuck}
  })
  .then(function(response){
    alert('something');
  },
  function(response) {
    alert('nothing');
  });
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});