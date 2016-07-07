angular.module('MyApp').controller('postBlogCtrl', function ($scope, Article) {  
  

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
});