+ function() {
angular.module('MyApp')
  .controller('AddCtrl', function($scope, Show) {
    // $scope.addShow = function() {
    //   Show.save({ showName: $scope.showName }).$promise
    //     .then(function() {
    //       $scope.showName = '';
    //       $scope.addForm.$setPristine();
    //       $alert({
    //         content: 'TV show has been added.',
    //         animation: 'fadeZoomFadeDown',
    //         type: 'material',
    //         duration: 3
    //       });
    //     })
    //     .catch(function(response) {
    //       $scope.showName = '';
    //       $scope.addForm.$setPristine();
    //       $alert({
    //         content: response.data.message,
    //         animation: 'fadeZoomFadeDown',
    //         type: 'material',
    //         duration: 3
    //       });
    //     });
    // };


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
    $scope.editorOptions = {
    contentsLangDirection: 'rtl'
};




  });
}();
angular.module('MyApp').controller('bidCtrl', function ($scope, $modalInstance, $http, $window, job) {
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
    alert('پیشنهاد شما با موفقیت ارسال گردید !');
    $window.location.href = '/job/' + job._id;
  },
  function(response) {
    alert('مشکلی پیش آمده است ، لطفا دوباره تلاش کنید !');
    $window.location.href = '/job/' + job._id;
  });
};

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
angular.module('MyApp')
  .controller('BidsCtrl', function($scope, User, $routeParams, $window, $modal, $http, Show, Auth) {
    $scope.bidsCtrlCurrent = true;
    Show.get({ _id: $routeParams.id }, function(info) {
      var user = Auth.user();
      var messages = [{id: 111, content: "وضعیت حساب: غیرفعال", dismissed: true, category: 'messageBox-danger'}, {id: 111, content: "ارسال ایمیل فعال‌سازی", dismissed: true, category: 'messageBox-info'}];
      
      $scope.messages = messages;
      $scope.job = info;
      $scope.userProjectPage = '/myprojects/' + user._id;

      if (user) {
        $scope.userProfilePage = '/my/' + user._id;
      } else {
        $scope.userProfilePage = '/my/' + 111;
      };
    });
  });
angular.module('MyApp')
  .controller('BrowseCtrl', function($scope, User, $window, $routeParams, Show, $location) {
   //  $scope.users = {};
  	// console.log($routeParams);
  	// if ($routeParams.tagname) {
   //    User.get({tag: $routeParams.tagname}, function(users){
   //      $scope.use = users;
   //    });
  	// } else {
  	$scope.users = User.query();	
  	// }

  }).controller('BrowseTagCtrl', function($scope, $routeParams, User){
    User.query({tag: $routeParams.tagname}, function(info){
      $scope.users = info;
    });
  }); 
angular.module('MyApp').controller('DelCtrl', function($scope, $http){

$scope.job = '55b28b4c20e875b7038e068b';
$scope.do = function(){
	$http({
		url : '/api/v1/deljob',
		method : 'POST',
		data : {'job' : $scope.job}
	})
	.then(function(response){
		alert('something');
	},
	function(response) {
		alert('nothing');
	});
};
});
angular.module('MyApp')
  .controller('InboxCtrl', function($scope, $rootScope, $routeParams, User, $modal, $resource, $http) {
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
angular.module('MyApp')
.controller('testCtrl', function($scope){
  $scope.test = true;
})
.controller('JobCtrl', function($scope, $rootScope, $routeParams, Show, $modal, $resource, $http) {
      Show.get({ _id: $routeParams.id }, function(info) {

        $scope.job = info; 
        // $scope.deadline = moment($scope.job.deadlineDate).fromNow();
        if ($scope.job.deadlineDate < Date()) {
        $scope.status = "بسته";
        $scope.statusClass = "closeStatus";
      } else {
        $scope.status = "باز";
        $scope.statusClass = "openStatus";
      }

      });



    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.showip = function() {
      
      // var ip = $resource("http://ipinfo.io/json",
      // { callback: "JSON_CALLBACK"},
      // { get: { method: "JSONP" }}).get();
        var ip = $resource(
                    "http://ipinfo.io/json",
                    {
                        callback: "JSON_CALLBACK"
                    },
                    {
                        getip: {
                            method: "JSONP",
                            isArray: false
                        }
                    }
                ).getip().$promise.then(
                        function( friend ) {
                            $scope.ip = friend.ip;
                        },
                        function( error ) {
                            // If something goes wrong with a JSONP request in AngularJS,
                            // the status code is always reported as a "0". As such, it's
                            // a bit of black-box, programmatically speaking.
                            alert( "Something went wrong!" );
                        }
                    );
    };

    $scope.open = function () {

      var modalInstance = $modal.open({
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
// angular.module('MyApp')
//   .controller('JobCtrl', function($scope, $rootScope, $routeParams, Show, $modal, $resource, $http) {
//   $scope.editorOptions = {
//     contentsLangDirection: 'rtl'
// };

//   $scope.escapeHtml = function(text) {
//             var map = {
//               '&': '&amp;',
//               '<': '&lt;',
//               '>': '&gt;',
//               '"': '&quot;',
//               "'": '&#039;'
//             };
//             return text.replace(/[&<>"']/g, function(m) { return map[m]; });
//         };

//       Show.get({ _id: $routeParams.id }, function(info) {

//         $scope.job = info; 

//         //$scope.job.longDesc = $scope.escapeHtml($scope.job.longDesc);
//         // $scope.deadline = moment($scope.job.deadlineDate).fromNow();
//         if ($scope.job.deadlineDate < Date()) {
//         $scope.status = "بسته";
//         $scope.statusClass = "closeStatus";
//       } else {
//         $scope.status = "باز";
//         $scope.statusClass = "openStatus";
//       }

//       });



//     $scope.items = ['item1', 'item2', 'item3'];

//     $scope.animationsEnabled = true;

//     $scope.showip = function() {
      
//         var ip = $resource(
//                     "http://ipinfo.io/json",
//                     {
//                         callback: "JSON_CALLBACK"
//                     },
//                     {
//                         getip: {
//                             method: "JSONP",
//                             isArray: false
//                         }
//                     }
//                 ).getip().$promise.then(
//                         function( friend ) {
//                             $scope.ip = friend.ip;
//                         },
//                         function( error ) {
//                             // If something goes wrong with a JSONP request in AngularJS,
//                             // the status code is always reported as a "0". As such, it's
//                             // a bit of black-box, programmatically speaking.
//                             alert( "Something went wrong!" );
//                         }
//                     );
//     };

//     $scope.open = function (size) {

//       var modalInstance = $modal.open({
//         animation: $scope.animationsEnabled,
//         templateUrl: 'test.html',
//         controller: 'bidCtrl',
//         size: size,
//         resolve: {
//           job: function () {
//             return $scope.job
//           }
//         }
//       });

//       modalInstance.result.then(function (selectedItem) {
//         $scope.selected = selectedItem;
//       });
//     };

// });

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
angular.module('MyApp')
  .controller('MainCtrl', function($scope, Show, $window) {
/*    $scope.alphabet = ['0-9', 'آ', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z'];*/
    $scope.genres = ['آمار و احتمال مهندسی', 'ریاضی مهندسی', 'مدار های منطقی', 'معادلات دیفرانسیل', 'فیزیک ۱',
      'ریاضی ۱', 'ساختمان داده ها', 'برنامه سازی پیشرفته', 'جبر خطی', 'ریاضی عمومی ۲', 'توابع مختلط',
      'فرآیند تصادفی'];

    $scope.headingTitle = '۱۲ درس اول شما';

    //$scope.shows = Show.query();
 /*       Show.get({}, function(show) {
            $scope.courses = show;
        });*/
    $scope.jobs = Show.query();
    $scope.filterByGenre = function(genre) {
      $scope.shows = Show.query({ genre: genre });
      $scope.headingTitle = genre;
    };
/*    $scope.filterByAlphabet = function(char) {
      $scope.shows = Show.query({ alphabet: char });
      $scope.headingTitle = char;
    };*/
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
angular.module('MyApp')
  .controller('MyCtrl', function($scope, User, $routeParams, $window, $modal, $http) {
    $scope.myCtrlCurrent = true;
    console.log($scope.myCtrlCurrent);
      $scope.fileUploaded = '';
      $scope.selectedFile = [];
      $scope.response = '';
      var messages = [{id: 111, content: "وضعیت حساب: غیرفعال", dismissed: false, category: 'messageBox-danger'}, {id: 111, content: "ارسال ایمیل فعال‌سازی", dismissed: false, category: 'messageBox-info'}];
      $scope.messages = messages;





      $scope.onFileSelect = function ($files) {
          $scope.selectedFile = $files;
          alert('yes'); 
      };
  
       
       User.get({ _id: $routeParams.id }, function(info) {
        
        $scope.user = info;

      

       $scope.trigger_in = function() {
       		this.is_edit_open = true;
       };
       $scope.trigger_out = function() {
       		this.is_edit_open = false;
       };

    $scope.uploadimg = function() {
      console.log($scope.fileUploaded);
    };
    $scope.completed = function() {
      alert('upload completed !');

    };  

    $scope.loading = function() {
        // just testing gulp functionality!
      alert('loading');
    };  

    $scope.resume_add_open = function (size) {

      var modalInstance = $modal.open({
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
    //   var modalInstance = $modal.open({
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

      var modalInstance = $modal.open({
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

      var modalInstance = $modal.open({
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

      var modalInstance = $modal.open({
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

    });       



  }).controller('ResumeCtrl', function($scope, $routeParams, $window, $modal, $modalInstance, $http, user){
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
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('ResumeEditCtrl', function($scope, $routeParams, $window, $modal, $modalInstance, user, id, $http){
    // var resume = user.

  })
  .controller('SkillCtrl', function($scope, $routeParams, $window, $modal, $modalInstance, user, $http) {
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
      $modalInstance.dismiss('cancel');
    };

  }).controller('SummaryCtrl', function($scope, $routeParams, $window, $modal, $modalInstance, user, $http){
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
      $modalInstance.dismiss('cancel');
    };
  }).controller('EduCtrl', function($scope, $routeParams, $window, $modal, $modalInstance, $http, user) {
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
      $modalInstance.dismiss('cancel');
    }
  });
angular.module('MyApp')
  .controller('MyProjCtrl', function($scope, User, $routeParams, $window, $modal, $http, Show) {
        $scope.myProjCtrlCurrent = true;
        var messages = [{id: 111, content: "وضعیت حساب: غیرفعال", dismissed: true, category: 'messageBox-danger'}, {id: 111, content: "ارسال ایمیل فعال‌سازی", dismissed: true, category: 'messageBox-info'}];
        $scope.messages = messages;

       $http({
       	url: '/api/v1/profile/' + $routeParams.id,
       	method: 'GET'
       })
       .then(function(response){
       	$scope.user = response.data;
       }, 
       function(response){
       	alert('something wrong happened :' + response);
       });
       $scope.userProjectPage = '/myprojects/' + $routeParams.id;
       $scope.userProfilePage = '/my/' + $routeParams.id;
       
     });
+ function() {
  angular.module('MyApp')
  .controller('navbarCtrl', function($scope, $window, Auth) {
  	$scope.userdown = false;
    $scope.logout = function() {
	  	Auth.logout();
		$window.location.href = '/';
		$scope.userdown = !($scope.userdown);
    };
    $scope.usertoggle = function() {
    	$scope.userdown = !($scope.userdown);
    };
  })
}();
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
angular.module('MyApp')
  .controller('SignupCtrl', function($scope, Auth) {
    $scope.signup = function() {
      var phoneIntNumber = parseInt($scope.cellPhoneNumber); 
      if (!phoneIntNumber) {
        return;
      }
      Auth.signup({
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        cellPhoneNumber: phoneIntNumber,
        email: $scope.email,
        password: $scope.password
      });
    };
    $scope.pageClass = 'fadeZoom'
  });

  // "insertDocument :: caused by :: 11000 E11000 duplicate key error index: Megakar.users.$cellPhoneNumber_1 dup key: { : 9121488948.0 }"