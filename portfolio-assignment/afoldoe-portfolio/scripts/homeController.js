(function(module) {
  var homeController = {};


  homeController.index = function() {
    Project.createTable();
    Project.fetchAll(projectView.initIndexPage);
    repos.requestRepos(repoView.index);
  };

  module.homeController = homeController;
})(window);
