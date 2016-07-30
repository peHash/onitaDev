+ function() {
angular.module('MyApp')
  .factory('Auth', function($http, $location, $rootScope, $alert, $window) {
    var token = $window.localStorage.token;
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      $rootScope.currentUser = payload.user;
    }
    
    // // Asynchronously load Google+ SDK
    // (function() {
    //   var po = document.createElement('script');
    //   po.type = 'text/javascript';
    //   po.async = true;
    //   po.src = 'https://apis.google.com/js/client:plusone.js';
    //   var s = document.getElementsByTagName('script')[0];
    //   s.parentNode.insertBefore(po, s);
    // })();

    return {
      // facebookLogin: function() {
      //   FB.login(function(response) {
      //     FB.api('/me', function(profile) {
      //       var data = {
      //         signedRequest: response.authResponse.signedRequest,
      //         profile: profile
      //       };
      //       $http.post('/auth/facebook', data).success(function(token) {
      //         var payload = JSON.parse($window.atob(token.split('.')[1]));
      //         $window.localStorage.token = token;
      //         $rootScope.currentUser = payload.user;
      //         $location.path('/');
      //         $alert({
      //           title: 'Cheers!',
      //           content: 'شما با موفقیت با اکانت فیس بوک خود وارد شدید !',
      //           animation: 'fadeZoomFadeDown',
      //           type: 'material',
      //           duration: 3
      //         });
      //       });
      //     });
      //   }, { scope: 'email, public_profile' });
      // },
      // // googleLogin: function() {
      //   gapi.auth.authorize({
      //     client_id: '55262601920-5jhf3qth89okujq6a7lh8bqc9epr8475.apps.googleusercontent.com',
      //     scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read',
      //     immediate: false
      //   }, function(token) {
      //     gapi.client.load('plus', 'v1', function() {
      //       var request = gapi.client.plus.people.get({
      //         userId: 'me'
      //       });
      //       request.execute(function(authData) {
      //         $http.post('/auth/google', { profile: authData }).success(function(token) {
      //           var payload = JSON.parse($window.atob(token.split('.')[1]));
      //           $window.localStorage.token = token;
      //           $rootScope.currentUser = payload.user;
      //           $location.path('/');
      //           $alert({
      //             title: 'Cheers!',
      //             content: 'شما با موفقیت با اکانت گوگل خود وارد شدید !',
      //             animation: 'fadeZoomFadeDown',
      //             type: 'material',
      //             duration: 3
      //           });
      //         });
      //       });
      //     });
      //   });
      // },
      user: function() {
        if ($rootScope.currentUser) {
          return $rootScope.currentUser;
        } else 
        return;
      },
      login: function(user) {
        return $http.post('/auth/login', user)
          .success(function(data) {
            $window.localStorage.token = data.token;
            var payload = JSON.parse($window.atob(data.token.split('.')[1]));
            $rootScope.currentUser = payload.user;
            $rootScope.signedin = true;
            $location.path('/');
          })
          .error(function() {
            delete $window.localStorage.token;
          });
      },
      signup: function(user) {
        return $http.post('/auth/signup', user)
          .success(function() {
            $location.path('/login');
          })
          .error(function(response) {

          });
      },
      logout: function() {
        delete $window.localStorage.token;
        $rootScope.currentUser = null;
        $rootScope.signedin = false;
      }
    };
  });  
}();
