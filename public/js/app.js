+ function() {
    //angular.module('MyApp', ['ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap', 'ui.bootstrap', 'ui.date', 'ui.bootstrap.persian.datepicker','ui.bootstrap.datepicker', 'angularMoment', 'mdChips', 'ngUpload', 'ngCkeditor', 'ngSanitize'])
angular.module('MyApp', ['ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap', 'ui.bootstrap', 'ui.date','ui.bootstrap.datepicker', 'angularMoment', 'mdChips', 'ngUpload', 'ngCkeditor', 'ngSanitize', 'ngFileUpload', 'ngImgCrop', 'toaster', 'ngAnimate', 'ADM-dateTimePicker'])
.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/landing.html',
                controller: 'landingPageCtrl', 
                resolve: {
                    // delay: function($q, $timeout){
                    //     var delay = $q.defer();
                    //     $timeout(delay.resolve, 4000);
                    //     return delay.promise;
                    // }
                }
            })
            .when('/youtube', {
                templateUrl: 'views/youtube.html', 
                controller: 'youtubeCtrl'
            })
            .when('/jobs', {
                templateUrl: 'views/jobs.html',
                controller: 'MainCtrl'
            })
            .when('/article/:id', {
                templateUrl: 'views/partial-blog.html',
                controller: 'partialBlogCtrl'
            })
            .when('/articles', {
                templateUrl: 'views/blog.html',
                controller: 'blogsCtrl'
            })
            .when('/post-article', {
                templateUrl: '/views/post-article.html',
                controller: 'postBlogCtrl'
            })
            .when('/post-article/:id', {
                templateUrl: 'views/post-article.html', 
                controller: 'postBlogCtrl'
            })
            .when('/job/:id', {
                templateUrl: 'views/job-detail.html',
                controller: 'JobCtrl'
            })
            .when('/browse', {
                templateUrl: 'views/browse.html', 
                controller: 'BrowseExpertsCtrl'
            })
            .when('/browse/tag/:tagname', {
                templateUrl: 'views/browse.html', 
                controller: 'BrowseTagCtrl'
            })
            .when('/browse/tag/:tagname&:tagname2', {
                templateUrl: 'views/browse.html', 
                controller: 'BrowseExpertsCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/add'    , {
                templateUrl: 'views/add.html',
                controller: 'AddCtrl'
            })
            .when('/presignup', {
                templateUrl: 'views/presignup.html',
                controller: 'userSetting'
            })
            .when('/my/:id', {
                templateUrl: 'views/my.html',
                controller: 'MyCtrl'
            })
            .when('/bids/:id', {
                templateUrl: 'views/bids.html', 
                controller: 'BidsCtrl'
            })
            .when('/inbox/:id', {
                templateUrl: 'views/texts.html', 
                controller: 'InboxCtrl'
            })
            .when('/myprojects/:id', {
                templateUrl: 'views/myprojects.html', 
                controller: 'MyProjCtrl'
            })
            .when('/profile/:id', {
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    $locationProvider.html5Mode(true);
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q, $window, $location) {
      return {
        request: function(config) {
          if ($window.localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
          }
          return config;
        },
        responseError: function(response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/login');
          } else if (response.status === 400) {
            // User Access token has expired 
            delete $window.localStorage.token;
            $rootScope.currentUser = null;
            $rootScope.signedin = false;
            $location.path('/login');
          }
          return $q.reject(response);
        }
      }
    });
  });    
}();
