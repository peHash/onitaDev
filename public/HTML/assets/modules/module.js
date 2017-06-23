
var app=angular.module('appLab', [
  'ngRoute',
  'fox.scrollReveal',
  'angular-parallax',
  'slick',
  'ksSwiper',
  'ui.bootstrap',
  'duScroll',
  'angular.backtop', 
  'ngFileUpload',
  'rzModule', 
  'vcRecaptcha',
  'toaster',
  'ngMessages'
  // 'ngAnimate'
  ]);


app.provider('Modernizr', function() {
    this.$get = function () {
        return Modernizr || {};
    };
 });


angular
  .module('appLab')
  .config(config);
  config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider, angularLoad) {
  $locationProvider.html5Mode({
    enabled : true,
    requireBase : false
  });
  $routeProvider
  .when('/', {
    templateUrl: 'view/lp.html',
    controller: 'MyController', 
    resolve: {
      load:    ['ResourceLoaderService', function (resourceLoaderService) {
                        return resourceLoaderService.load(['assets/css/bootstrap.min.css', 'assets/css/font-awesome.min.css']);
                    }]

    }
  })
  .when('/edit', {
    templateUrl: 'view/edit.html',
    controller: 'MyController',
    resolve : {
      load : ['ResourceLoaderService', function(resourceLoaderService){
        return resourceLoaderService.loadCss(['assets/css/bootstrap.min.css']);
      }],
      content: function($window) {
        return window.lpContent = {
          lpHead: 1,
          lpBody: 2
        }
      }
    }
  })
  .otherwise({ redirectTo: '/' });
}

angular
  .module('appLab') 
  .config(interceptorConfig);
  interceptorConfig.$inject = ['$httpProvider'];

  function interceptorConfig($rootScope, $q, $window, $location) {
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
                $rootScope.userLogged = false;
                $location.path('/login');
          } else if (response.status === 404) {
                console.log('fucking ' + response);
                $location.path('/');
          }
          return $q.reject(response);
        }
      }
  }

  

/*Directive for  rest window hight */
app.directive('banner', function ($window) {  

  return {
    link: function () {

     var windowWidth = window.innerWidth;

     var windowHeight= window.innerHeight;

    if (windowWidth >= 320 && windowWidth <= 767) {
      angular.element('#header').css('min-height', windowHeight);
    } 
    else if(windowWidth >= 768 && windowWidth <= 992){     
      angular.element('#header').css('min-height', 0);     
    }
    else if(windowWidth >= 1080 && windowWidth <= 1500){  
       
     angular.element('#header').css('min-height', windowHeight);
      angular.element('.big_screen').css('align-items','center');
    }
    else if(windowWidth >= 1501 && windowWidth <= 1950){     
      angular.element('#header').css('min-height', windowHeight);
      angular.element('.big_screen').css('align-items','center');
     
    }
    else{
     angular.element('#header').css('min-height', windowHeight);
   }
 }       
};  
});  

/*Directive for  counter*/
app.directive("countTo", ["$timeout","$window", function(a) {

  return {
    replace: !1,
    scope: !0,

    link: function(b, c, d) {
     var executed = false;
     $(window).scroll(function() {  
      
      if(!executed)           
      {
        
        var counterS=$('.CounterS');
        var hT = counterS.offset().top,
        hH = counterS.outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();
        if (wS > (hT+hH-wH)){
          
          executed = true;
          var e, f, g, h, i, j, k, l = c[0],num,
          m = function() {
            
            if(d.countTo % 1 == 0 ) 
            {
              
              f = 30, 
              i = 0, 
              b.timoutId = null, 
              j = parseInt(d.countTo) || 0,
              b.value = parseInt(d.value, 10) || 0, 
              g = 1e3 * parseFloat(d.duration) || 0, 
              h = Math.ceil(g / f), 
              k = (j - b.value) / h, 
              e = b.value
            }
            
            else if(d.countTo.match(","))
            {
              
              num=d.countTo.replace(/\,/g,''),
              d.countTo=num,
              f = 30, 
              i = 0, 
              b.timoutId = null, 
              j = parseInt(d.countTo) || 0,
              b.value = parseInt(d.value, 10) || 0, 
              g = 1e3 * parseFloat(d.duration) || 0, 
              h = Math.ceil(g / f), 
              k = (j - b.value) / h, 
              e = b.value
            }
            else if(d.countTo % 1 !== 0)
            {
             
              f = 30, 
              i = 0, 
              b.timoutId = null, 
              j = parseFloat(d.countTo) || 0,
              b.value = parseInt(d.value, 10) || 0, 
              g = 1e3 * parseFloat(d.duration) || 0, 
              h = Math.ceil(g / f), 
              k = (j - b.value) / h, 
              e = b.value
            }
            
          },
          n = function() {
            
            b.timoutId = a(function() {
              
              e += k, 
              i++, 
              i >= h ? (a.cancel(b.timoutId), 
                e = j, 
                l.innerText = j) : (l.innerText = Math.round(e), 
                n())
              }, f)
          },
          
          o = function() {
            b.timoutId && a.cancel(b.timoutId), m(), n()
          };
          return d.$observe("countTo", function(a) {
           
            a && o()
          }), d.$observe("value", function() {
            
            o()
          }), !0
        } 
      }
    });

}
}
}]);

/*Directive for owl carousel*/
app.directive('wrapOwlcarousel', function () {
  return {  
    restrict: 'A',
    link: function (scope, element) {
      var options = scope.$eval($(element).attr('data-options'));  
      $(element).owlCarousel(options);  
    }  
  };  
});  

