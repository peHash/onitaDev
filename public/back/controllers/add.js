angular.module('MyApp')
  .controller('AddCtrl', function($scope, $alert, Show) {
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
    $scope.categories = [
    {seoview:'وب سایت، فناوری اطلاعات(IT)، نرم افزار', value: 1},
    {seoview:'تلفن همراه و رایانه', value: 1},
    {seoview:'نوشتن، محتوا و ترجمه', value: 1},
    {seoview:'طراحی، رسانه ها و معماری', value: 1}
    ];
    $scope.category = $scope.categories[0];

    $scope.postProject = function(project) {
      $scope.project = project;
      if ($scope.project.skills != "") {
        var skills = $scope.project.skills.split(",");
        $scope.project.skills = skills;
      } else {
        $scope.project.skills = "-";
      }
      $scope.helper1 = true;
      Show.save(project).$promise
      .then(function() {
        $scope.project = "everything's OK !";
      });
    };




  });