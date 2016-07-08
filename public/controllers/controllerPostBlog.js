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
		Article.delete({_id : $routeParams.id}, function(err){
			console.log(err);
		});
};
});