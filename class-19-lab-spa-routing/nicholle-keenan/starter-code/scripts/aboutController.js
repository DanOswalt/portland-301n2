(function(module) {
  var aboutController = {};

  // done: Define a function that hides all main section elements, and then reveals just the #about section:
  aboutController.index = function() {
    $('#articles').hide();
    $('#about').show();
  };

  module.aboutController = aboutController;
})(window);
