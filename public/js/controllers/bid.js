// reference : \public\controllers\job.js
+ function () {
    angular.module('MyApp').controller('bidCtrl', function ($scope, $uibModalInstance, $http, $window, job, toaster) {
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
      toaster.pop('success', 'عالی !', 'پیشنهاد شما با موفقیت ارسال گردید !');
      $window.location.href = '/job/' + job._id;
    },
    function(response) {
      toaster.error('درست پیش نرفت', 'مشکلی پیش آمده است ، لطفا دوباره تلاش کنید !')
      $window.location.href = '/job/' + job._id;
    });
  };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
}();

