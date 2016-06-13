(function(module) {
  var projectController = {};

  Project.createTable();
  projectController.index = function() {
    Project.fetchAll(projectView.initIndexPage);
    $('#projects').show().siblings().hide();
  };

  module.projectController = projectController;
})(window);
