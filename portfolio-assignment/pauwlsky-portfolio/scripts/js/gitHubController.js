(function(module){
  gitHubController = {};

  gitHubController.showFollowing = function(){
    $('#githubfollowing').hide();
    $('#following-li').on('click', function(e){
      console.log('click!')
      e.preventDefault();
      $('#project-container').fadeOut();
      $('#about').fadeOut();
      $('#githubfollowing').fadeIn();
  });
};

  gitHubController.controllerInit = function(){
    gitHubController.showFollowing();
  }

  module.gitHubController = gitHubController;

})(window);
