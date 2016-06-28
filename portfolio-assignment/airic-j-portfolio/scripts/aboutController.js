(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    // ProjectsModule.init();
    PortfolioModule.initAbout();
    repos.requestRepos(repoView.index);
  };

  module.aboutController = aboutController;
})(window);
