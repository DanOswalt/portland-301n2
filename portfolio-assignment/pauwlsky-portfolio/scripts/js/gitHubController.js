
var gitHubControllerModule = (function(){

  gitHubController = {};

  gitHubController.showFollowing = function(){
    $('#githubfollowing').hide();
    $('#following-li').on('click', function(e){
      console.log('click!')
      e.preventDefault();
      $('#project-container').hide();
      $('#about').hide();
      $('#githubfollowing').fadeIn();
  });
};

  gitHubController.controllerInit = function(){
    gitHubController.showFollowing();
  }


return {
  controllerInit: gitHubController.controllerInit
}
})();
