(function(module) {
  var repoView = {};

  var ui = function() {
    var $repos = $('#repo');
    $repos.find('ul').empty();
  };

  var render = Handlebars.compile($('#repo-template').text());

  repoView.index = function() {
    ui();
    $('#repos ul').append(repos.with('name').map(render));
  };
  module.repoView = repoView;
})(window);
