+ function() {
angular.module('MyApp')
  .factory('Auth', function($http, $location, $rootScope, $alert, $window, toaster) {
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
          .error(function(err) {
            toaster.pop('error','lOGIN FAILED', err);
            delete $window.localStorage.token;
          });
      },
      signup: function(user) {
        return $http.post('/auth/signup', user)
          .success(function() {
            $location.path('/login');
          })
          .error(function(err) {
            toaster.pop('error','SIGNUP FAILED', err);
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
