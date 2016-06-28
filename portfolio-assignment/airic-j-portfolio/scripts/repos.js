(function(module) {
  var repos = {};

  repos.all = [];

  // done? : Refactor and simplify this ajax call into a get request
  // to the proxy end point provided by server.js.

  // not sure if I'm doing the .env github token properly, it seems to work without it
  repos.requestRepos = function(callback) {
    $.ajax({
      url: '/github/users/airic-j/repos' +
            '?per_page=100' +
            '&sort=updated',
      type: 'GET',
      success: function(data, message, xhr) {
        repos.all = data;
      }
    }).done(callback);
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      console.log('repos with running');
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
