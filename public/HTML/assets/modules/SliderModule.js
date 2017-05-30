
var app=angular.module('appLabSlider', ['fox.scrollReveal','angular-parallax','slick','ksSwiper','ui.bootstrap','duScroll','angular.backtop','ng-backstretch','nate.util']);

app.provider('Modernizr', function() {
    this.$get = function () {
        return Modernizr || {};
    };
 });

/*Directive for  rest window hight */
app.directive('banner', function ($window) {  

  return {
    link: function () {

     var m = angular.element($window);
     var windowHeight=m.innerHeight();

    if (m.innerWidth() >= 320 && m.innerWidth() <= 767) {
      angular.element('#header').css('min-height', windowHeight);
    } 
    else if(m.innerWidth() >= 768 && m.innerWidth() <= 992){     
      angular.element('#header').css('min-height', 0);     
    }
    else if(m.innerWidth() >= 1080 && m.innerWidth() <= 1500){  
       
     angular.element('#header').css('min-height', windowHeight);
      angular.element('.big_screen').css('align-items','center');
    }
    else if(m.innerWidth() >= 1501 && m.innerWidth() <= 1950){     
      angular.element('#header').css('min-height', windowHeight);
      angular.element('.big_screen').css('display', 'flex').css('align-items','center');
      angular.element('.single_snap').css('top', '360px');
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
