angular.module('MyApp')
    .factory('Del', function($http) {
        // return {
        //     // answer: function(questionid, answertext) {
        //     //     return $http.post('/api/answer', { questionId: questionid, answerbody: answertext});
        //     // },
        //     delete: function(job) {
        //         return $http.post('/api/v1/deljob', { jobID: job.id });
        //     }
        // };
            return $http({
                url: '/api/v1/deljob',
                method: 'POST',
                data: {
                    jobID: job.id
                }
            });

    });