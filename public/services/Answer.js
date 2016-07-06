angular.module('MyApp')
    .factory('Answerfactory', function($http) {
        return {
            answer: function(questionid, answertext) {
                return $http.post('/api/answer', { questionId: questionid, answerbody: answertext});
            },
            delanswer: function(course) {
                return $http.post('/api/delanswer', { questionId: course._id });
            }
        };
    });