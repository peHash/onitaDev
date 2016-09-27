+ function() {
  angular.module('MyApp')
  .controller('MainCtrl', function($scope, Show, $window) {
    
    $scope.genres = ['آمار و احتمال مهندسی', 'ریاضی مهندسی', 'مدار های منطقی', 'معادلات دیفرانسیل', 'فیزیک ۱',
      'ریاضی ۱', 'ساختمان داده ها', 'برنامه سازی پیشرفته', 'جبر خطی', 'ریاضی عمومی ۲', 'توابع مختلط',
      'فرآیند تصادفی'];

    $scope.headingTitle = '۱۲ درس اول شما';

    $scope.jobs = Show.query();
    $scope.filterByGenre = function(genre) {
      $scope.shows = Show.query({ genre: genre });
      $scope.headingTitle = genre;
    };
       $scope.items = [
           'item1',
           'item2',
           'item3'
       ];
       $scope.addItem = function() {
           var newItemNo = $scope.items.length + 1;
           $scope.items.push('item' + newItemNo);
       };

       
  });  
}();
