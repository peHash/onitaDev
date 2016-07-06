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