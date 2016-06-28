(function(module) {
  var repoView = {};

  var ui = function() {
    var $github = $('#github');
    $github.find('ul').empty();
    console.log('ran ui');
  };

  var render = Handlebars.compile($('#repo-template').text());

  repoView.index = function() {
    console.log('append github projects');
    ui();
    reposHTML = repos.all.map(render);
    reposHTML.forEach(function(repo){
      $('#github ul').append(repo);
      console.log('gonna go append ' + repo);
    });
  };

  module.repoView = repoView;
})(window);
