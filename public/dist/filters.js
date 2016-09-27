+ function () {
	angular.module('MyApp').
  filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  });	
}();

+ function() {
	angular.module('MyApp')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);	
}();
