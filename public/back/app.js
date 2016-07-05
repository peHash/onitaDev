
angular.module('MyApp', ['ngResource', 'ngMessages', 'ngRoute', 'ngAnimate', 'mgcrea.ngStrap', 'ui.bootstrap', 'ui.date', 'ui.bootstrap.persian.datepicker','ui.bootstrap.datepicker', 'angularMoment'])
.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainCtrl'
            })
            .when('/job/:id', {
                templateUrl: 'views/detail.html',
                controller: 'JobCtrl'
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
            .when('/question/:id/title/:questionBody', {
                templateUrl: 'views/question.html',
                controller: 'QuestionCtrl'
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
          }
          return $q.reject(response);
        }
      }
    });
  });