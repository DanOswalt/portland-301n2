(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/nicholleromero/repos',
      type: 'GET',
      headers: {
        'Authorization': 'token ' + githubToken
      },
      success: function(data, message, xhr) {
        repos.all = data;
      }
    }).then(callback)
  };

  module.repos = repos;
})(window);
