aboutModule = (function(){


var About = function(props){
  this.about = props.about
};

About.all = [];

About.prototype.toHtml = function(){
  var html = About.compiledTemplate(this);
  $('#about').append(html);
};

About.fetchAll = function(callback){
  $.ajax({
    type: 'get',
    url: '/about',
  }).then(function(data, message, xhr){
    data.forEach(function(item){
      var about = new About(item);
      console.log(about);
      About.all.push(about);
      about.toHtml();
      console.log(About.all)
    });
  }).then(function(){
    callback();
  });
  }

  About.initAndFetchAll = function(callback){
    return getCompiledTemplate('about')
    .then(function(f){
      About.compiledTemplate = f;
      About.fetchAll(callback)
    });
  }



return{
  initAndFetchAll : About.initAndFetchAll
}

})();
