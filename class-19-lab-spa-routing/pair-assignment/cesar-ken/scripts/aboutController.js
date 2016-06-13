(function(module) {
  var aboutController = {};

  // TODO: Define a function that hides all main section elements, and then reveals just the #about section:
  aboutController.index = function() {
    $('.tab-content').hide();
    $('#articles').fadeIn();

  };

  module.aboutController = aboutController;
})(window);
