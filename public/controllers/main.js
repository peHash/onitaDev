angular.module('MyApp')
  .controller('MainCtrl', function($scope, Show, $window) {
/*    $scope.alphabet = ['0-9', 'آ', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z'];*/
    $scope.genres = ['آمار و احتمال مهندسی', 'ریاضی مهندسی', 'مدار های منطقی', 'معادلات دیفرانسیل', 'فیزیک ۱',
      'ریاضی ۱', 'ساختمان داده ها', 'برنامه سازی پیشرفته', 'جبر خطی', 'ریاضی عمومی ۲', 'توابع مختلط',
      'فرآیند تصادفی'];

    $scope.headingTitle = '۱۲ درس اول شما';

    //$scope.shows = Show.query();
 /*       Show.get({}, function(show) {
            $scope.courses = show;
        });*/
    $scope.jobs = Show.query();
    $scope.filterByGenre = function(genre) {
      $scope.shows = Show.query({ genre: genre });
      $scope.headingTitle = genre;
    };
/*    $scope.filterByAlphabet = function(char) {
      $scope.shows = Show.query({ alphabet: char });
      $scope.headingTitle = char;
    };*/
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