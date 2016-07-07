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
  });
}();