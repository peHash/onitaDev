angular.module('MyApp').controller('bidCtrl', function ($scope, $modalInstance, $http, $window, job) {
  $scope.editorOptions = {
    contentsLangDirection: 'rtl'
  };


  $scope.job = job;

  $scope.bid = function () {
    $http({
    url : '/api/v1/bid',
    method : 'POST',
    data : {
      'amount' : $scope.bid.amount,
      'days' : $scope.bid.days,
      'desc' : $scope.bid.desc,
      'projectid' : $scope.job._id
    }
  })
  .then(function(response){
    alert('پیشنهاد شما با موفقیت ارسال گردید !');
    $window.location.href = '/job/' + job._id;
  },
  function(response) {
    alert('مشکلی پیش آمده است ، لطفا دوباره تلاش کنید !');
    $window.location.href = '/job/' + job._id;
  });
};

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});