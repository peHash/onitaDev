//angular.module('MyApp', ['ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap', 'ui.bootstrap', 'ui.date', 'ui.bootstrap.persian.datepicker','ui.bootstrap.datepicker', 'angularMoment', 'mdChips', 'ngUpload', 'ngCkeditor', 'ngSanitize'])
angular.module('MyApp', ['ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap', 'ui.bootstrap', 'ui.date','ui.bootstrap.datepicker', 'angularMoment', 'mdChips', 'ngUpload', 'ngCkeditor', 'ngSanitize'])
.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainCtrl'
            })
            .when('/blog', {
                templateUrl: 'views/partial-blog.html',
                controller: 'partialBlogCtrl'
            })
            .when('/job/:id', {
                templateUrl: 'views/detail.html',
                controller: 'JobCtrl'
            })
            .when('/browse', {
                templateUrl: 'views/browse.html', 
                controller: 'BrowseCtrl'
            })
            .when('/browse/tag/:tagname', {
                templateUrl: 'views/browse.html', 
                controller: 'BrowseTagCtrl'
            })
            .when('/browse/tag/:tagname&:tagname2', {
                templateUrl: 'views/browse.html', 
                controller: 'BrowseCtrl'
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
                templateUrl: 'views/add1.html',
                controller: 'AddCtrl'
            })
            .when('/delete', {
                templateUrl: 'views/delete.html',
                controller: 'DelCtrl'
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
            // .when('/question/:id/title/:questionBody', {
            //     templateUrl: 'views/question.html',
            //     controller: 'QuestionCtrl'
            // })
            // .when('/mahan', {
            //     templateUrl: 'viws/test.html', 
            //     controller: 'testCtrl'
            // })
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