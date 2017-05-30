
app.controller('MyController', function ($scope,Modernizr,$window) {

$scope.sentences  = ["your elegant app", "your creative app", "your modern design"];

$(window).load(function(){
        $('#main_loader').fadeOut('slow');

        $scope.SyncOwl();

if (Modernizr.csstransforms3d) {
      window.sr = ScrollReveal();
    
      sr.reveal('.snap_middle', {
       origin: 'bottom',
       distance: '100px',
       duration: 1300,
       delay: 400,
       opacity: 1,
       scale: 0,
       easing: 'ease-in',      
       reset: true
      });  
      sr.reveal('.snap_left_2', {
       origin: 'right',
       distance: '100px',
       duration: 1300,
       delay: 600,
       rotate : { x: 0, y: 0, z: 15 },     
       opacity: 0,
       scale: 0,
       easing: 'ease-in',      
       reset: true
      });  
      sr.reveal('.snap_left_3', {
       origin: 'right',
       distance: '100px',
       duration: 1300,
       delay: 800,
       rotate : { x: 0, y: 0, b: 25 },
       opacity: 0,
       scale: 0,
       easing: 'ease-in',      
       reset: true
      }); 
      sr.reveal('.snap_left_4', {
       origin: 'left',
       distance: '100px',
       duration: 1300,
       delay: 600,
       rotate : { x: 0, y: 0, a: 15 },
       opacity: 0,
       scale: 0,
       easing: 'ease-in',      
       reset: true
      });   
       
      sr.reveal('.snap_left_5', {
       origin: 'left',
       distance: '100px',
       duration: 1300,
       delay: 800,
       rotate : { x: 0, y: 0, c: 25 },
       opacity: 0,
       scale: 0,
       easing: 'ease-in',      
       reset: true
      });
       sr.reveal('.home_slide1', {
       origin: 'right',
       distance: '50px',
       duration: 1300,
       delay: 600,         
       opacity: 0.6,
       scale: 0,
       easing: 'linear',      
       reset: true
      });   
       sr.reveal('.home_slide2', {
       origin: 'right',
       distance: '50px',
       duration: 1300,
       delay: 1800,         
       opacity:0,
       scale: 0,
       easing: 'linear',      
       reset: true
      });  
        sr.reveal('.home_slide3', {
       origin: 'right',
       distance: '50px',
       duration: 1300,
       delay: 3000,         
       opacity: 0,
       scale: 0,
       easing: 'linear',      
       reset: true
      });
       sr.reveal('.animate_left_40', {
       origin: 'left',
       distance: '40px',
       duration: 800,
       delay: 400,       
       opacity: 0, 
       scale: 0,      
       easing: 'linear',      
       reset: true
      }); 
       sr.reveal('.animate_top_60', {
       origin: 'top',
       distance: '60px',
       duration: 800,
       delay: 400,       
       opacity: 0, 
       scale: 0,      
       easing: 'linear',      
       reset: true
      });  
       sr.reveal('.animate_bottom_60', {
       origin: 'bottom',
       distance: '60px',
       duration: 800,
       delay: 400,       
       opacity: 0, 
       scale: 0,      
       easing: 'linear',      
       reset: true
      });  
       sr.reveal('.animate_fade_in', {      
       duration: 800,
       delay: 400,       
       opacity: 0, 
       scale: 0,      
       easing: 'linear',      
       reset: true
      });        
     }

          });

 /* Menu hide/show on scroll */

$scope.ost = 0;
		    $(window).scroll(function() {
		    	
		    	$scope.m=angular.element($window);
		        $scope.cOst = $scope.m.scrollTop();
		        if($scope.cOst == 0)
		        {
		        	
		        	angular.element('.navbar').addClass("top-nav-collapse");
		        	angular.element('.navbar').removeClass('scroll_menu');
		        } else if($scope.cOst > $scope.ost)
		        {
		        	
		        	angular.element('.navbar').addClass("top-nav-collapse").removeClass("default");
		        	angular.element('.navbar').removeClass('scroll_menu');
		        } else 
		        {
		        	
		        	angular.element('.navbar').addClass("default").removeClass("top-nav-collapse");
		        	angular.element('.navbar').addClass('scroll_menu').removeClass('top-nav-collapse');
		        }
		        $scope.ost = $scope.cOst;
		    });

   
/*Collapse Start*/

     $scope.oneAtATime = true;
    $scope.status={
        feature1Open:true,
        feature1close:false,
        feature2close:false,
        feature3close:false
    };
    /*Collapse End*/
      
      // Team js starts
      $scope.SyncOwl=function(){
            var $sync1 = $("#sync1"),
                $sync2 = $("#sync2"),
                $sync3 = $(".sync3"),
                flag = false,
                duration = 300;

        $sync1.owlCarousel({
                    items: 1,
                    autoplay: false,
                    margin: 10,
                    nav: false,
                    dots: false                    
                })
                .on('changed.owl.carousel', function (e) {
                    if (!flag) {
                        
                        flag = true;
                        var a= e.property.value++;
                        $(".team-images").removeClass("current_dot");
                        $('.team-images').eq(a).addClass("current_dot");
                        $sync3.trigger('to.owl.carousel', [e.item.index, duration, true]);
                        $sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
                        flag = false;
                    }
                });

        $sync2
        .owlCarousel({
            margin: 20,
            items: 1,
            nav: false,
            autoplay: false,
            center: false,
            dotsEach: false,
            dots: true,
            dotsContainer: '#carousel-custom-dots',
                
                })
                .on('click', '.owl-item', function () {

                    $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
                    $sync3.trigger('to.owl.carousel', [$(this).index(), duration, true]);
                })
                .on('changed.owl.carousel', function (e) {
                    if (!flag) {
                        flag = true;
                        var a= e.property.value++;
                        $(".team-images").removeClass("current_dot");
                        $('.team-images').eq(a).addClass("current_dot");
                        $sync3.trigger('to.owl.carousel', [e.item.index, duration, true]);
                        $sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
                        flag = false;
                    }
                });


        $(".team-images").eq(0).addClass("current_dot");
        $('.team-images').click(function (e) {
 $(".team-images").removeClass("current_dot");
            $(this).addClass("current_dot");
            $sync2.trigger('to.owl.carousel', [$(this).index(), duration, true]);
            $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
        });
      }
// Team js ends  

/*Backstretch slider start*/
 $scope.images = [
    'assets/images/banner/slide_1.jpg',
                        'assets/images/banner/slide_2.jpg',
                        'assets/images/banner/slide_3.jpg'
  ];
 /* Backstretch slider End*/





  
}).value('duScrollOffset', 50);

