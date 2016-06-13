(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/afoldoe/repos',
      type: 'GET',
      headers: {
        'Authorization' : 'token ' + githubToken
      }
    })
    .done(function(data, message, xhr) {
      repos.all = data;
      console.log(data);
    })
    .fail(function(data, message, xhr) {
      console.log(data);
    })
    .then(callback);
  };

  repos.sorted = function() {
    repos.all.map(function(repo) {
      // var date = new Date() - ;
      var projectDate = new Date() - Date.parse(repo.updated_at);
      console.log(projectDate);
      

    });
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
