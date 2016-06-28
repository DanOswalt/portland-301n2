var aboutControllerModule = (function(){

  aboutController = {};

  aboutController.showSection = function(){
    $('#about-li').on('click', function(e){
      e.preventDefault();
      $('#project-container').hide();
      $('#githubfollowing').hide();
      $('#about').fadeIn();
    });
  };

  aboutController.controllerInit = function(){
    aboutController.showSection();
    console.log('ABOUT CONTROLLER INIT!!!');
  }

  return {
    controllerInit: aboutController.controllerInit
  }

})();
