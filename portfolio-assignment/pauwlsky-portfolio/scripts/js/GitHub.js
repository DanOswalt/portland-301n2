
var gitHubModule = (function(){


  var GitHub = function(props){
    this.login = props.login,
    this.avatar = props.avatar,
    this.html = props.html
  };

  GitHub.all = [];

  GitHub.prototype.toHtml = function(){
    console.log('inside of toHtml');
    var html = GitHub.compiledTemplate(this);
    $('#githubfollowing').append(html);
  };


  GitHub.fetchAll = function(callback) {
        $.ajax({
          type: 'GET',
          url: '/following',
        }).then(function(data){
          JSON.parse(data).forEach(function(item){
            var github = new GitHub(item);
            GitHub.all.push(github);
            github.toHtml();
          });
        }).then(function(){
          callback();
        });
    };

  GitHub.initAndFetchAll = function(callback){
    return getCompiledTemplate('githubfollowing')
    .then(function(f){
      GitHub.compiledTemplate = f;
      GitHub.fetchAll(callback)
    });
  }



return {
  initAndFetchAll : GitHub.initAndFetchAll
}

})();
