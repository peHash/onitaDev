app.controller('MyController', function ($scope,Modernizr,$window, $timeout, $http, $document,$uibModal, Upload, Auth) {

$(window).load(function(){
     someUIWorking($scope, Modernizr);
});

navbarController($scope, $window);

$scope.SyncOwl = SyncOwl;

$scope.openModal = openModal;

$scope.logout = function() {
  Auth.logout();
}

function openModal (group) {
  switch (group){
    case 'freelancer':   
      modalStarter('view/partials/modal-contactus.html', 'static', contactUsController);
      break;
    case 'customer':
      modalStarter('view/partials/modal-new_project.html', 'static', newProjectController);
      break;
    case 'experts': 
      modalStarter('view/partials/modal-experts_list.html', 'false', expertsListController);
      break;
    case 'login':
      modalStarter('view/partials/modal-login.html', 'false', loginController);
      break;
    case 'signup':
      modalStarter('view/partials/modal-signup.html', 'false', signUpController);
      break;
    case 'payment':
      modalStarter('view/partials/modal-payment.html', 'false', paymentController, 'lg');
  }
}

// Trigger Modal  modalStarter();
function modalStarter(template,static,controller, size) {
    var modalInstance = $uibModal.open({
      templateUrl: template,
      // templateUrl : $templateCache.get('signup-modal.html'),
      size: size ? size : 'lg',
      backdrop: static ? static : true,
      backdropStyle: 'background-color: #333;', 
      controller : controller ? controller : contactUsController
    });
  };

// function logout(Auth) {
//   Auth.logout();
//   // $route.reload();
// }

function paymentController($scope, $http) {
  $scope.pay = function() {
    var config = {
      method: 'POST',
      url: 'https://pay.ir/payment/send',
      data: {
        'api': 'a539036b4734cddd43aa8dd61e593e7c',
        'amount': parseInt($scope.amount),
        'redirect': 'http://onita.ir/api/cbpayment'
        // 'factorNumber': Math.random()*(Math.pow(10,15)).toString()
      }
    }
    $http(config).then(resolve, reject);
    function resolve(r){console.log(r)};
    function reject(e){console.log(e)};
  }
}

function signUpController($scope, Auth, toaster, $uibModalInstance){

  $scope.signup = function() {
      Auth.signup({
        name: $scope.name,
        tel: $scope.tel,
        email: $scope.email,
        password: $scope.password
      })
      .success(function() {
            toaster.pop('success','SIGNUP SUCCESS', 'YUPS');
            $timeout(function() {$uibModalInstance.close();}, 3000);
          })
          .error(function(err) {
            toaster.pop('error','SIGNUP FAILED', err);
          });
    };
}

function loginController($rootScope, $scope, Auth, toaster, $uibModalInstance, $timeout) {

  $scope.login = function() {
    Auth.login({email: $scope.email, password: $scope.password})
    .success(function(data) {
            toaster.pop('success', 'LOGIN SUCCESS', 'YUPS');
            $window.localStorage.token = data.token;
            var payload = JSON.parse($window.atob(data.token.split('.')[1]));
            $rootScope.currentUser = payload.user;
            $rootScope.userLogged = true;
            $timeout(function() {$uibModalInstance.close();}, 3000);
          })
          .error(function(err) {
            toaster.pop('error','lOGIN FAILED', err);
            delete $window.localStorage.token;
          });
  }
}

function expertsListController($scope, $http) {

  getExpertsList();

  function getExpertsList() {
    $http.get('/api/experts').then(resolve, reject);
    function resolve(d){$scope.experts = d.data};
    function reject(e){console.log(e)};
  }

}

function newProjectController($scope, Upload, $http, toaster){

  var succ = {
    header: 'ثبت شد',
    body: 'پروژه شما با موفقیت ثبت گردید'
  },
  failed = {
    header: 'متاسفانه پروژه با موفقیت ثبت نشد، لطفا چند دقیقه دیگر دوباره تلاش کنید',
    body : 'متاسفانه پروژه با موفقیت ثبت نشد، لطفا چند دقیقه دیگر دوباره تلاش کنید'
  }

  $scope.fileNames = [];
  $scope.project = {};
  $scope.categories = [{cat: 1, value: 'عمومی'},{ cat: 2, value: 'جامعه شناسی'},{ cat:3, value: 'صنایع غذایی'},{ cat:4, value: 'فناوری'},{ cat:5, value: 'ریاضیات'},{ cat:6, value: 'فیزیک'},{ cat:7, value: 'آمار'},{ cat:8, value: 'نساجی'},{ cat:9, value: 'میکروبیولوژی'},{ cat:10, value: 'جغرافیا'},{ cat:11, value: 'ادبیات و زبانشناسی'},{ cat:12, value: 'پزشکی'},{ cat:13, value: 'حقوق'},{ cat:14, value: 'زیرنویس فیلم و سریال'},{ cat:15, value: 'فقه و علوم اسلامی'},{ cat:16, value: 'معماری'},{ cat:17, value: 'نفت ، گاز و پتروشیمی'},{ cat:18, value: 'اسناد تجاری'},{ cat:19, value: 'اقتصاد'},{ cat:20, value: 'بازرگانی'},{ cat:21, value: 'برق و الکترونیک'},{ cat:22, value: 'تاریخ'},{ cat:23, value: 'حسابداری'},{ cat:24, value: 'روانشناسی'}, {cat: 25, value: 'شیمی'} ];

  $scope.cancel = function() {
    modalStarter('view/partials/modal-experts_list.html', 'true', expertsList);
  }

  $scope.orderSubmit = function(project) {

    config = {
      method: 'POST',
      url: '/api/orders', 
      data: {
        projectCat: project.cat,
        projectName: project.name,
        projectDesc: project.desc,
        username: 'order.username',
        fileName: $scope.fileNames,
        reCaptcha: project.recaptcha
      }
    }
    $http(config).then(resolve, reject);
    function resolve(r) {toaster.pop('success', succ.header , succ.body)};
    function reject(e) {toaster.pop('error', failed.header, failed.body)};
  }

  $scope.$watch('files', function () {
    if (($scope.fileNames.length || $scope.files && $scope.files.length) > 2 ) return ;
        $scope.upload($scope.files);
    });

  $scope.upload = function(files) {

    if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: '/api/uploadDocs',
                    data: {
                      username: 'mE',
                      file: file  
                    }
                }).then(function (resp) {
                    $timeout(function() {
                        // $scope.log = 'file: ' +
                        // resp.config.data.file.name +
                        // ', Response: ' + JSON.stringify(resp.data) +
                        // '\n' + $scope.log;
                        // console.log(resp);
                        $scope.fileNames.push(resp.data.fileName);
                    });
                }, function(err) {console.log(err)}, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                        evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + 
                      '% ' + evt.config.data.file.name + '\n' + 
                      $scope.log;
                      console.log($scope.log);
                });
              }
            }
        }
  };
}

function contactUsController($scope, toaster, $http) {

  var succ = {
    header: 'ثبت شد',
    body: 'درخواست شما با موفقیت ثبت گردید'
  },
  failed = {
    header: 'متاسفانه ثبت نشد',
    body : 'متاسفانه در خواست شما با موفقیت ثبت نشد! لطفا چند دقیقه دیگر دوباره تلاش کنید'
  }
  $scope.user = {
    callPerm: false,
    minHour: 6,
    maxHour: 12
  };
  $scope.submitForm = submitForm;

  $scope.$watch('user.callPerm', function(n,o){
    if (n) {
      refreshSlider();
    }
  });
  $scope.slider = {
            options : {
              floor: 0,
              ceil: 24,
              showTicksValues: true
            }
  };

  function submitForm(User) {
      config = {
      method: 'POST',
      url: '/api/expert', 
      data: {
        expName: User.name,
        expEmail: User.email,
        expTel: User.tel,
        expResume: User.resume,
        expTelegram: User.telegram,
        expVoiceCall: User.callPerm
      }
    }
    $http(config).then(resolve, reject);
    function resolve(r) {toaster.pop('success', succ.header , succ.body)};
    function reject(e) {toaster.pop('error', failed.header, failed.body)};
  }

  function refreshSlider(){
    $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
    });
  };

}


$scope.sentences  = ["your elegant app", "your creative app", "your modern design"];

$scope.parts = ['header', 'features', 'working', 'plans', 'subscription'];

$scope.part = $scope.parts[0];
   
/*Collapse Start*/

$scope.oneAtATime = true;
$scope.status={
  feature1Open:true,
  feature1close:false,
  feature2close:false,
  feature3close:false
};
/*Collapse End*/

/*Backstretch slider start*/
$scope.images = [
  'assets/images/banner/slide_1.jpg',
  'assets/images/banner/slide_2.jpg',
  'assets/images/banner/slide_3.jpg'
];
/* Backstretch slider End*/
  
}).value('duScrollOffset', 0);

app.controller('expertController', function ($scope) {
  $scope.$watch('expert.expApproved', function(n,o){
    if (n != o) {console.log($scope.expert);}
  });
});

function navbarController($scope, $window) {

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
}


function someUIWorking($scope, Modernizr){
  
  $('#main_loader').fadeOut('slow');

  // $scope.SyncOwl();

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
}


function SyncOwl() {

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