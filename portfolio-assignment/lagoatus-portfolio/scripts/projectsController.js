(function(module) {
  var projectsController = {};

  projectsController.index = function() {
    $('.tab-content').hide();
    $('#projects').show();
  };

  module.projectsController = projectsController;
})(window);
