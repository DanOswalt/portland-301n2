(function(module) {
  var projectsController = {};

  projectsController.index = function() {
    console.log('articles controller');
    Projects.fetchall(projectView.initIndexPage);
    $('.tab-content').hide();
    $('#projects').show();

  };

  module.projectsController = projectsController;
})(window);
