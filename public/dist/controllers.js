+ function() {
  angular.module('MyApp')
    .controller('AddCtrl', function($scope, Show, Upload, $timeout) {
      //config : 
      $scope.editorOptions = {
        contentsLangDirection: 'rtl'
      };


      $scope.helper1 = false;
      $scope.itemsCollection = [{
        title: 'PHP',
        subtitle: '1',
      }, {
        title: 'HTML',
        subtitle: '2',
      },{
        title: 'CSS',
        subtitle: '3',
      },{
        title: 'Java',
        subtitle: '4'
      },{ 
        title: 'JavaScript',
        subtitle: '5' 
      },{
        title: 'MySQL',
        subtitle: '6'
      },{
        title: 'NodeJS',
        subtitle: '7'
      }];

      $scope.returnedValues = [];
      $scope.categories = [
      {seoview:'وب سایت، فناوری اطلاعات(IT)، نرم افزار', value: 1},
      {seoview:'تلفن همراه و رایانه', value: 1},
      {seoview:'نوشتن، محتوا و ترجمه', value: 1},
      {seoview:'طراحی، رسانه ها و معماری', value: 1}
      ];
      $scope.category = $scope.categories[0];

      $scope.postProject = function(project) {
        $scope.project = project;
        $scope.project.skills = [];
        // if ($scope.project.skills != "") {
        //   var skills = $scope.project.skills.split(",");
        //   $scope.project.skills = skills;
        // } else {
        //   $scope.project.skills = "-";
        // }
        if ($scope.returnedValues.length > 0) {
          angular.forEach($scope.returnedValues, function(key, value){
            $scope.project.skills.push(key.title);
          });
        } else {
          $scope.skills = [];
        };
        $scope.helper1 = true;
        Show.save(project).$promise
        .then(function() {
          alert('your project posted Successfuly !');
        });
      };

      $scope.$watch('files', function () {
        $scope.upload($scope.files);
      });
      $scope.$watch('file', function () {
          if ($scope.file != null) {
              $scope.files = [$scope.file]; 
          }
      });

      $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: '/api/v1/uploadFiles',
                    data: {
                      file: file  
                    }
                }).then(function (resp) {
                    $timeout(function() {
                        console.log(resp);
                    });
                  });
                // }, null, function (evt) {
                //     var progressPercentage = parseInt(100.0 *
                //         evt.loaded / evt.total);
                //     $scope.log = 'progress: ' + progressPercentage + 
                //       '% ' + evt.config.data.file.name + '\n' + 
                //       $scope.log;
                // });
              }
            }
        }
    };
    });
}();
// reference : \public\controllers\job.js
+ function () {
    angular.module('MyApp').controller('bidCtrl', function ($scope, $uibModalInstance, $http, $window, job, toaster) {
    $scope.editorOptions = {
      contentsLangDirection: 'rtl'
    };


    $scope.job = job;

    $scope.bid = function () {
      $http({
      url : '/api/v1/bid',
      method : 'POST',
      data : {
        'amount' : $scope.bid.amount,
        'days' : $scope.bid.days,
        'desc' : $scope.bid.desc,
        'projectid' : $scope.job._id
      }
    })
    .then(function(response){
      toaster.pop('success', 'عالی !', 'پیشنهاد شما با موفقیت ارسال گردید !');
      $window.location.href = '/job/' + job._id;
    },
    function(response) {
      toaster.error('درست پیش نرفت', 'مشکلی پیش آمده است ، لطفا دوباره تلاش کنید !')
      $window.location.href = '/job/' + job._id;
    });
  };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
}();


+ function() {
  angular.module('MyApp')
  .controller('BidsCtrl', function($scope, User, $routeParams, $window, $uibModal, $http, Show) {
   
   Show.get({ _id: $routeParams.id }, function(job) {
    angular.forEach(job.bids, function(bid) {
        bid.user.profilePic = bid.user.image ? bid.user.image : '/images/buyer.png';
      });
    console.log($scope.job = job);
  });

   $scope.startWorking = function(user){

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'notifModal.html',
        resolve: {
          id : function() {
            return user;
          }
        },
        controller: function($scope, $uibModalInstance, id){
        	$scope.texts = {
        		header: "همه چی از همین جا شروع میشه",
        		bodyContent: 'آیا مطمئن هستید ؟',
        		confirm: 'بله',
        		ignore: 'دوباره نگاه بیندازید'
        	};
        	$scope.ops = {
        		confirm: function(){
              selectExpert(id);
        			$uibModalInstance.close();
        		}, 
        		ignore: function(){
        			$uibModalInstance.close();
        		}
        	};
        }
      });

      modalInstance.result.then(function () {
        console.log('Expert selection modal closed at' + new Date());
      });
   };
   $scope.resetExpert = function() {

      $http({
      url : '/api/v1/expert/'+ $scope.job._id,
      method : 'DELETE'
    })
    .then(function(r){
      // toaster.pop('success', 'عالی !', 'پیشنهاد شما با موفقیت ارسال گردید !');
      // $window.location.href = '/job/' + $scope.job._id;
      $window.location.reload(false);
    },
    function(r) {
      // toaster.error('درست پیش نرفت', 'مشکلی پیش آمده است ، لطفا دوباره تلاش کنید !')
      // $window.location.href = '/job/' + $scope.job._id;
    });
  };

  var selectExpert = function(id) {
    $http({
      url : '/api/v1/expert',
      method : 'POST',
      data : {
        'projectid' : $scope.job._id,
        'userid' : id
      }
    })
    .then(function(response){
      // toaster.pop('success', 'عالی !', 'پیشنهاد شما با موفقیت ارسال گردید !');
      $window.location.href = '/job/' + $scope.job._id;

    },
    function(response) {
      // toaster.error('درست پیش نرفت', 'مشکلی پیش آمده است ، لطفا دوباره تلاش کنید !')
      // $window.location.href = '/job/' + $scope.job._id;
    });
  };
 });    
}();

+ function(){
	angular.module('MyApp').controller('blogsCtrl', function ($scope, Article) {
	  $scope.defaultTime = "2016-07-06T13:09:04.206Z";
	  $scope.tempTitle = "مدیریت لذت بخش دانلودهای وردپرس";

	  Article.query().$promise.then(function(result){
  		angular.forEach(result, function(article) {
        	article.user.profilePic = article.user.image ? article.user.image : '/images/buyer.png';
      	});
	  	$scope.arts = result;
	  });
	});
}();
+ function() {
  angular.module('MyApp')
  .controller('BrowseExpertsCtrl', function($scope, User, $window, $routeParams, Show, $location) {

    User.query(function(users){
      angular.forEach(users, function(user) {
        user.profilePic = user.image ? user.image : '/images/buyer.png';
      });
      $scope.users = users;
    });

  }).controller('BrowseTagCtrl', function($scope, $routeParams, User){
    User.query({tag: $routeParams.tagname}, function(info){
      $scope.users = info;
    });
  });   
}();

+ function(){
	angular.module('MyApp').controller('headerProfileController', function ($scope,$rootScope) {
		$rootScope.userInboxPage = '/inbox/' + $rootScope.currentUser._id;
		$rootScope.userProjectPage = '/myprojects/' + $rootScope.currentUser._id;
	  	$rootScope.userProfilePage = '/my/' + $rootScope.currentUser._id;
	});
}();
+ function() {
    angular.module('MyApp')
    .controller('landingPageCtrl', function($scope, Posts) {
		$scope.introBtn = 'بزن بریم !';
		$scope.newsletterPlaceHolder = 'ایمیل شما اینجا ...';
		$scope.newsletterSignUpValue = 'همین حالا ثبت کن';
		$scope.posts = Posts.query();
    });  
  }();
+ function() {
  angular.module('MyApp')
  .controller('MyProjectCtrl', function($scope, User, $routeParams, $window, $uibModal, $http, Show) {
   $http({
    url: '/api/v1/profile/' + $routeParams.id,
    method: 'GET'
   })
   .then(function(response){
    console.log($scope.user = response.data);
   }, 
   function(response){
    alert('something wrong happened :' + response);
   });
   $scope.userProjectPage = '/myprojects/' + $routeParams.id;
   $scope.userProfilePage = '/my/' + $routeParams.id;
   
 });  
}();
+ function() {
	angular.module('MyApp').controller('partialBlogCtrl', function ($scope, Article, $routeParams, toaster) {
	  $scope.defaultTime = "2016-07-06T13:09:04.206Z";
	  $scope.tempTitle = "مدیریت لذت بخش دانلودهای وردپرس";
	  var data_recieved = 'اطلاعات کامل دریافت شد', 
	  	data_recieved_title = 'آفرین آفرین';
		Article.get({ _id: $routeParams.id }, function(art){
			art.user.profilePic = art.user.image ? art.user.image : '/images/buyer.png';
			$scope.art = art; 
			// toaster.pop('success', data_recieved, data_recieved_title);
		});
	});
}();
+ function() {
	angular.module('MyApp').controller('postBlogCtrl', function ($scope, Article, $routeParams) {  

	$scope.articleRevision = false;
	if ($routeParams.id) {
		$scope.articleRevision = true;
		Article.get({ _id: $routeParams.id }, function(art){
		  if ((undefined != art) && (null != art))
		  {
		  	$scope.article = art;
		  };
	  	});
	};

	$scope.returnedValues = [];	
	$scope.coll = [{
		title: 'Wordpress',
	    subtitle: '1'
	},
	{
		title: 'Angularjs',
	    subtitle: '1'
	},
	{
		title: 'Nodejs',
	    subtitle: '1'
	}];


	$scope.updateArticle = function(article) {
		if ($scope.returnedValues.length > 0) {
	  		angular.forEach($scope.returnedValues, function(key, value){
		    $scope.article.keywords.push(key.title);
	  		});
	  	};
	  	delete article["user"];
		Article.update(article).$promise
		.then(function(){
			alert('the article updated Successfuly !');
		});
	};

	$scope.postArticle = function(article) {
		$scope.article = article;
		$scope.article.keywords = [];
		// if ($scope.project.skills != "") {
		//   var skills = $scope.project.skills.split(",");
		//   $scope.project.skills = skills;
		// } else {
		//   $scope.project.skills = "-";
		// }
		if ($scope.returnedValues.length > 0) {
		  angular.forEach($scope.returnedValues, function(key, value){
		    $scope.article.keywords.push(key.title);
		  });
		} else {
		  $scope.keywords = [];
		};
		// Show.save(project).$promise
		// .then(function() {
		//   alert('your project posted Successfuly !');
		// });
		Article.save(article).$promise
	      .then(function() {
	        alert('your article posted Successfuly !');
	      });
	    };

	$scope.removeArticle = function(){
		if ($scope.articleRevision) 
			Article.delete({_id : $routeParams.id}, function(){
				alert('The article removed Successfuly !');
			});
	};
	});
}();
+ function() {
	angular.module('MyApp').controller('youtubeCtrl', function ($scope, toaster, $uibModal, $sce) {
		$scope.watching = false;
		
	    $scope.watchToggle = function() {
	    	$scope.watching = !($scope.watching);
	    }
		$scope.modalDownloaderOpen = function (size) {

	      var modalInstance = $uibModal.open({
	        animation: $scope.animationsEnabled,
	        templateUrl: 'modalYoutube.html',
	        controller: 'modalYoutubeCtrl',
	        size: size,
	        resolve: {
	        	// url: function() {
	        	// 	return $scope.youtube.url;
	        	// }
				info: function($q, $timeout, $http){
				    var delay = $q.defer();
				    // $timeout(delay.resolve, 4000);
				    $http({
				      url : '/api/youtube',
				      method : 'POST',
				      data : {
				      	'youtubeUrl' : $scope.youtube.url	
				      }
				    })
				    .then(function(response){
				      delay.resolve(response);
				    },
				    function(response) {
				      alert(response);
				    });
				    return delay.promise;
				}
        	}	
      	});

	      modalInstance.result.then(function (result) {
	      	console.log(result);
	        $scope.videoFile = '/youtube/videos/' + result.data.file.id + '.' + result.data.file.ext;
	        // $scope.$apply();
	        $scope.config = {
			    sources: [
			  {src: $scope.videoFile , type: "audio/mpeg"}
			],
			    theme: {
			url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
			    }
			};
	      });





    };
	}).controller('modalYoutubeCtrl', function($scope, $routeParams, $window, $uibModal, $uibModalInstance, info, $http){
		$scope.info = info.data;
		$scope.downloadIt = function() {
			$http({
				  url : '/api/youtubeDownloader',
				  method : 'POST',
				  data : {
				  	'id' : $scope.info.id, 
				  	'format': $scope.youtube.format
				  }
				})	
				.then(function(response){
				  $uibModalInstance.close(response);
				},
				function(response) {
				  console.log(response);
				});
		};
	    $scope.cancel = function () {
	      $uibModalInstance.dismiss('cancel');
	    };

  	});
}();
+ function () {
  angular.module('MyApp')
  .controller('InboxCtrl', function($scope, $rootScope, $routeParams, User, $uibModal, $resource, $http) {
      $http({
        url: '/api/v1/inbox/' + $routeParams.id, 
        method: 'GET'
      })
      .then(function(response){
        $scope.inbox = response.data;        
      }, function(response){
        alert(response);
      });
  });   
}();

+ function () {
  angular.module('MyApp')
.controller('testCtrl', function($scope){
  $scope.test = true;
})
.controller('JobCtrl', function($scope, $rootScope, $routeParams, Show, $uibModal, $resource, $http) {
      Show.get({ _id: $routeParams.id }, function(info) {

        console.log($scope.job = info);
        $scope.jobStatus = calcStatus(info.status);
        // $scope.deadline = moment($scope.job.deadlineDate).fromNow();
        if ($scope.job.deadlineDate < Date()) {
        $scope.status = "بسته";
        $scope.statusClass = "closeStatus";
      } else {
        $scope.status = "باز";
        $scope.statusClass = "openStatus";
      }

      });

      var calcStatus = function(s){
        switch (s) {
          case -1: 
            return 'job-blocked';
            break;
          case 0: 
            return 'not-verified';
            break;
          case 1: 
            return 'verified';
            break;
          case 2:
            return 'expert-selected';
            break;
          case 3: 
            return 'expert-accepted';
            break;
          case 4: 
            return 'expert-finalized';
            break;
          case 5:
            return 'owner-finalized';
            break;
          case 6:
            return 'success';
            break;
          case 7:
            return 'failed';
            break;
          case 8:
            return 'expert-reviewed';
            break;
          case 9: 
            return 'owner-reviewed';
            break;
        }
      }



    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    // $scope.showip = function() {
      
    //   // var ip = $resource("http://ipinfo.io/json",
    //   // { callback: "JSON_CALLBACK"},
    //   // { get: { method: "JSONP" }}).get();
    //     var ip = $resource(
    //                 "http://ipinfo.io/json",
    //                 {
    //                     callback: "JSON_CALLBACK"
    //                 },
    //                 {
    //                     getip: {
    //                         method: "JSONP",
    //                         isArray: false
    //                     }
    //                 }
    //             ).getip().$promise.then(
    //                     function( friend ) {
    //                         $scope.ip = friend.ip;
    //                     },
    //                     function( error ) {
    //                         // If something goes wrong with a JSONP request in AngularJS,
    //                         // the status code is always reported as a "0". As such, it's
    //                         // a bit of black-box, programmatically speaking.
    //                         alert( "Something went wrong!" );
    //                     }
    //                 );
    // };

    $scope.open = function () {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'test.html',
        controller: 'bidCtrl',
        resolve: {
          job: function () {
            return $scope.job
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      });
    };
});  

}();

+ function() {
  angular.module('MyApp')
  .controller('LoginCtrl', function($scope, Auth) {
    $scope.login = function() {
      Auth.login({ email: $scope.email, password: $scope.password });
    };
    $scope.facebookLogin = function() {
      Auth.facebookLogin();
    };
    $scope.googleLogin = function() {
      Auth.googleLogin();
    };
    $scope.pageClass = 'fadeZoom';
  });  
}();

+ function() {
  angular.module('MyApp')
  .controller('MainCtrl', function($scope, Show, $window) {
    
    $scope.genres = ['آمار و احتمال مهندسی', 'ریاضی مهندسی', 'مدار های منطقی', 'معادلات دیفرانسیل', 'فیزیک ۱',
      'ریاضی ۱', 'ساختمان داده ها', 'برنامه سازی پیشرفته', 'جبر خطی', 'ریاضی عمومی ۲', 'توابع مختلط',
      'فرآیند تصادفی'];

    $scope.headingTitle = '۱۲ درس اول شما';

    console.log($scope.jobs = Show.query());

    $scope.filterByGenre = function(genre) {
      $scope.shows = Show.query({ genre: genre });
      $scope.headingTitle = genre;
    };
       $scope.items = [
           'item1',
           'item2',
           'item3'
       ];
       $scope.addItem = function() {
           var newItemNo = $scope.items.length + 1;
           $scope.items.push('item' + newItemNo);
       };

       
  });  
}();

+ function() {
  angular.module('MyApp')
  .controller('MyCtrl', function($scope, User, $routeParams, $window, $uibModal, $http, Upload, $timeout, toaster, $interval) {
     $scope.updateUser = function(timer){
      var timer = timer ? timer : 10;
      $timeout(function(){
        User.get({ _id: $routeParams.id }, function(info) {
          $scope.user = info;
        }); 
      }, timer)
     };
    $scope.destroyCroppedDataUrl = function() {
      $timeout(function(){
        $scope.croppedDataUrl = null;
      }, 100);
    };
    $scope.updateUser();
    $scope.destroyCroppedDataUrl();
    $scope.fileUploaded = '';
    $scope.selectedFile = [];
    $scope.response = '';
    $scope.tab = 'activity';
    $scope.tabSelector = function(tab) {
      $scope.tab = tab;
    }
    $scope.onFileSelect = function ($files) {
        $scope.selectedFile = $files;
        alert('yes'); 
    };
      

    $scope.trigger_in = function() {
        this.is_edit_open = true;
    };
    $scope.trigger_out = function() {
        this.is_edit_open = false;
    };

    $scope.uploadImage = function (dataUrl, name) {
      $scope.destroyCroppedDataUrl();
      $scope.updateUser(2000);
      $scope.tab = 'activity';
      Upload.upload({
          url: '/upload',
          data: {
              file: Upload.dataUrltoBlob(dataUrl, name)
          },
      }).then(function (response) {
          $timeout(function () {
              $scope.result = response.data;
              toaster.pop('success','موفقیت آمیز', 'عکس شما با موفقیت در سرود آپلود شد.');
          });
      }, function (response) {
          if (response.status > 0) $scope.errorMsg = response.status 
              + ': ' + response.data;
      }, function (evt) {
          // $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
      });
    };

  
    $scope.resume_add_open = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'resume-add.html',
        controller: 'ResumeCtrl',
        size: size,
        resolve: {
          user: function() {
            return $scope.user;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      });
    };
    $scope.resume_edit_open = function(size, index) {
    //   var modalInstance = $uibModal.open({
    //   animation: $scope.animationsEnabled,
    //   templateUrl: 'resume-add.html',
    //   controller: 'ResumeEditCtrl',
    //   size: size,
    //   resolve: {
    //     user: function() {
    //       return $scope.user;
    //     },
    //     id: function() {
    //       return id;
    //     }
    //   }
    // });

    // modalInstance.result.then(function (selectedItem) {
    //   $scope.selected = selectedItem;
    // });
    alert(size + '   ' + index);
    }; 
    $scope.resume_remove =  function(id) {
      $http({
        url: 'api/v1/resume/user/' + $scope.user._id + '/resume/' + id,
        method: 'DELETE'
      })
      .then(function(response){
        alert('your selected resume removed successfully');
        $window.location.href = '/my/' + $scope.user._id;
      }, function(response){
        alert('something went wrong in removing your selected resume');
        $window.location.href = '/my/' + $scope.user._id;

      });
    };
    $scope.skills_edit_open = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'skills-edit.html',
        controller: 'SkillCtrl',
        size: size,
        resolve: {
          user: function() {
            return $scope.user;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      });
    };
    $scope.edu_add_open = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'edu-add.html',
        controller: 'EduCtrl',
        size: size,
        resolve: {
          user: function() {
            return $scope.user;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      });
    };
    $scope.edu_edit_open = function(size, id) {
      alert(size + '  ' + id);
    };
    $scope.edu_remove = function(id) {
      $http({
        url: 'api/v1/education/user/' + $scope.user._id + '/edu/' + id,
        method: 'DELETE'
      })
      .then(function(response){
        alert('your selected edu removed successfully');
        $window.location.href = '/my/' + $scope.user._id;
      }, function(response){
        alert('something went wrong in removing education');
        $window.location.href = '/my/' + $scope.user._id;
      });
    };
    $scope.summary_edit_open = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'summary-edit.html',
        controller: 'SummaryCtrl',
        size: size,
        resolve: {
          user: function() {
            return $scope.user;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      });

    };  
    $scope.profile_image_open = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'profile-image.html',
        controller: 'profileImageCtrl',
        size: size,
        resolve: {
          user: function() {
            return $scope.user;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      });
    };
  }).controller('profileImageCtrl', function($scope, $routeParams, $window, $uibModal, $uibModalInstance, user, $http, Upload, $timeout){

    $scope.uploadImg = function (dataUrl, name) {
      Upload.upload({
          url: '/upload',
          data: {
              file: Upload.dataUrltoBlob(dataUrl, name)
          },
      }).then(function (response) {
          $timeout(function () {
              $scope.result = response.data;
              console.log(response.data);
          });
      }, function (response) {
          if (response.status > 0) $scope.errorMsg = response.status 
              + ': ' + response.data;
      }, function (evt) {
          $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
      });
    };

    $scope.reload = function() {
      $window.location.href = '/my/' + user._id;
    }

  }).controller('ResumeCtrl', function($scope, $routeParams, $window, $uibModal, $uibModalInstance, $http, user){
    $scope.default = '';
    $scope.resume = {};
    $scope.add_resume = function() {
      
      $http({
        url: 'api/v1/resume',
        method: 'POST',
        data: {
          user: user,
          resume: $scope.resume
        }

      })
      .then(function(response){
        alert('your resume added successfully !');
        $window.location.href = '/my/' + user._id;
      },
      function(response){
        alert('your resume didn\'t added successfully ! ');
        $window.location.href = '/my/' + user._id;
      });

    };





    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }).controller('ResumeEditCtrl', function($scope, $routeParams, $window, $uibModal, $uibModalInstance, user, id, $http){
    // var resume = user.

  })
  .controller('SkillCtrl', function($scope, $routeParams, $window, $uibModal, $uibModalInstance, user, $http) {
    $scope.itemsCollection = [{
      title: 'PHP',
      subtitle: '1',
    }, {
      title: 'HTML',
      subtitle: '2',
    },{
      title: 'CSS',
      subtitle: '3',
    },{
      title: 'Java',
      subtitle: '4'
    },{ 
      title: 'JavaScript',
      subtitle: '5' 
    },{
      title: 'MySQL',
      subtitle: '6'
    },{
      title: 'NodeJS',
      subtitle: '7'
    }];

    $scope.returnedValues = [];

    $scope.update_skills = function() {
    var tags = [];
    angular.forEach($scope.returnedValues, function(key, value){
      tags.push(key.title);
    });

  $http({
    url: '/api/v1/skills',
    method: 'POST',
    data: {
      user: user,
      tags: tags
    }
  })
  .then(function(response){
    alert('skills updated successfully !');
    $window.location.href = '/my/' + user._id;
  }, 
  function(response) {
    alert('skills didn\'t updated successfully ! Be aware !!');
    $window.location.href = '/my/' + user._id;
  }
  )};
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }).controller('SummaryCtrl', function($scope, $routeParams, $window, $uibModal, $uibModalInstance, user, $http){
    $scope.summary = user.summary ? user.summary : '';

    $scope.update_summary = function() {
    $http({
      url: '/api/v1/summary',
      method: 'POST',
      data: {
        user: user,
        summary: $scope.summary
    }
  })
  .then(function(response){
    alert('summary updated successfully !');
    $window.location.href = '/my/' + user._id;
  }, 
  function(response) {
    alert('summary didn\'t updated successfully ! Be aware !!');
    $window.location.href = '/my/' + user._id;
  }
  )};





    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }).controller('EduCtrl', function($scope, $routeParams, $window, $uibModal, $uibModalInstance, $http, user) {
    $scope.default = '';
    $scope.edu = {};
    $scope.add_edu = function() {
      
      $http({
        url: 'api/v1/education',
        method: 'POST',
        data: {
          user: user,
          education: $scope.edu
        }

      })
      .then(function(response){
        alert('your education added successfully !');
        $window.location.href = '/my/' + user._id;
      },
      function(response){
        alert('your education didn\'t added successfully ! ');
        $window.location.href = '/my/' + user._id;
      })

    };





    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    }

  });  
}();

+ function() {
  angular.module('MyApp')
  .controller('navbarCtrl', function($scope, $window, Auth, $routeParams, $route, $location) {
  	$scope.userdown = false;
    $scope.leftNavBtn = urlExtractor($location.path());
    $scope.logout = function() {
	  	Auth.logout();
		$window.location.href = '/';
		$scope.userdown = !($scope.userdown);
    };
    $scope.usertoggle = function() {
    	$scope.userdown = !($scope.userdown);
    };
  });
  function urlExtractor(location) {
    if (location.includes('article')){
      return 'article';
    } else { 
      return 'non-article';
    }
  }
}();
+ function() {
       angular.module('MyApp')
       .controller('ProfileCtrl', function(User, $routeParams, $window, $http, $scope){
              $http({
                     url: 'api/v1/profile/'+$routeParams.id,
                     method: 'get'
              })
              .then(function(response){
                     if (response.status == "200") {
                            $scope.user = response.data.data;
                     };
              }, function(response){
                     alert('your request couldn\'t be proceed, sorry !');
                     $window.location.href = '/';
              });

       });       
}();

+ function() {
angular.module('MyApp')
  .controller('SignupCtrl', function($scope, Auth) {
    $scope.signup = function() {
      Auth.signup({
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        cellPhoneNumber: $scope.cellPhoneNumber,
        email: $scope.email,
        password: $scope.password
      });
    };
    $scope.pageClass = 'fadeZoom'
  });  
}();
