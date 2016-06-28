(function(module){

  // create a controller variable to attach iffe to
  var projectController = {};

  projectController.index = function(){
    PortfolioModule.initProjects();
  };

  module.projectController = projectController;
})(window);
