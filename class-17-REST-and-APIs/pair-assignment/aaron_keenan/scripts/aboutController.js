(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    // REVIEW: Look at this method chaning. What is being accomplished here?
    $('#about').show().siblings().hide();
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD

=======
>>>>>>> 4af26130cc94a4b89f8e46e6475fd1945a72f584
<<<<<<< HEAD

=======
>>>>>>> 03e87effd900d8eafbc21e7225b273e2ccbc29c2
<<<<<<< HEAD
=======
>>>>>>> 5b9d4415086f9815a8ab90adcc7061be09d8609a
>>>>>>> 4af26130cc94a4b89f8e46e6475fd1945a72f584
=======
>>>>>>> a163d6acd66dbc494c4b0820e76b0e5404e82201
    // DONE: Call a function to 'request' our repo data.
    // Pass in a view function as a callback, so our repos will render after the data is loaded.
    repos.requestRepos(repoView.index);
  };

  aboutController.followers = function(){
    $('#about').show().siblings().hide();
    followers.requestFollowers(followersView.init);
  };

  module.aboutController = aboutController;
})(window);
