(function(module) {
  var skillsController = {};

  skillsController.index = function() {
    $('#skills').show().siblings().hide();
  };

  module.skillsController = skillsController;
})(window);
