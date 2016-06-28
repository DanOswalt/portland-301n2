(function(module) {

  var projectView = {};

  //hanldebars template
  projectView.getTemplate = function(data, callback){
    getTemplate('portfolio', data, callback);
  };

  // create tab views of content in #projects and #about
  projectView.portfolio = function() {
    $('.jumbotron').fadeTo(5000, 1);
    $('.page-content').hide();
    $('#projects').fadeIn(5000);
    projectView.scroll('#projects');
    projectView.createTeaser();
  };

  projectView.about = function() {
    $('.jumbotron').fadeTo(5000, 1);
    $('.page-content').hide();
    $('#hbAnagram').remove();
    anagram.create();
    $('#about').fadeIn(5000);
    projectView.scroll('#about');
  };

  projectView.about = function() {
    $('.jumbotron').fadeTo(5000, 1);
    $('.page-content').hide();
    $('#hbAnagram').remove();
    anagram.create();
    $('#about').fadeIn(5000);
    projectView.scroll('#about');
  };


  // more and shrink function
  projectView.createTeaser = function() {
    $('.projDescription *:nth-child(n)').hide();
    $('.projDescription *:nth-child(1)').show();
    $('.read-on').show();
    $('.shrink').hide();
    $('.read-on').on('click', function(event) {
      event.preventDefault();
      $(this).prev().find('*:nth-child(n)').slideDown(1500);
      $(this).hide();
      $(this).next().show();
    });
  };


  projectView.scroll = function(tease) {
    $('html, body').animate({
      scrollTop: parseInt($(tease).offset().top)
    }, 2000);
  };

  projectView.renderPortfolio = function(){
    Project.all.forEach(function(project){
      projectView.getTemplate(project, function(a){
        $('#projects').append(a);
      });
    });
    projectView.setPage();
  };

  projectView.setPage = function(){
    projectView.createTeaser();
    $('.page-content').hide();
    $('.jumbotron').fadeTo(5000, 0.5);
  };

  //call the functions
  projectView.initIndexPage = function(){
    projectView.renderPortfolio();
  };

  module.projectView = projectView;

})(window);
