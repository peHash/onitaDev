angular.module('MyApp')
    .controller('QuestionCtrl', function($scope,Show, $routeParams,$rootScope,Answerfactory, $window) {
        /*    $scope.alphabet = ['0-9', 'آ', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'H', 'I', 'J',
         'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
         'Y', 'Z'];*/
        $scope.genres = ['آمار و احتمال مهندسی', 'ریاضی مهندسی', 'مدار های منطقی', 'معادلات دیفرانسیل', 'فیزیک ۱',
            'ریاضی ۱', 'ساختمان داده ها', 'برنامه سازی پیشرفته', 'جبر خطی', 'ریاضی عمومی ۲', 'توابع مختلط',
            'فرآیند تصادفی'];
        $scope.headingTitle = '۱۲ درس اول شما';
        //$scope.shows = Show.query();
        Show.get({_id: $routeParams.id}, function(course) {
            $scope.course = course;

            $scope.record = function (questionid, answertext) {

                 Answerfactory.answer(questionid, answertext).success(function(){

                 $scope.course.question[0].questionBody = answertext;
                 })
                console.log(questionid + '******' + answertext);
            };

            $scope.subscribe = function() {
                Subscription.subscribe(show).success(function() {
                    $scope.show.subscribers.push($rootScope.currentUser._id);
                });
            };
        });

        /*$scope.courses = Show.query();*/
        $scope.filterByGenre = function(genre) {
            $scope.shows = Show.query({ genre: genre });
            $scope.headingTitle = genre;
        };


        /*    $scope.filterByAlphabet = function(char) {
         $scope.shows = Show.query({ alphabet: char });
         $scope.headingTitle = char;
         };*/
    });