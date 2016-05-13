/*****
* class Project
***/

function Project (opts) {
  this.title = opts.title;
  this.description = opts.description;
  this.details = opts.details;
  this.publishedOn = opts.publishedOn;
  this.publishedBy = opts.publishedBy;
  this.url = opts.url;
  this.codeUrl = opts.codeUrl;
  this.screenshot = opts.screenshot;
}

Project.prototype.toHtml = function() {
  var $newProject = $('.template').clone();
  var appTemplate = $('#project-template').html();
  var compileTemplate = Handlebars.compile(appTemplate);
  return compileTemplate(this);
};

Handlebars.registerHelper('daysAgo', function(person) {
  return parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago';
});

/*****
* class ProjectModule
***/

function ProjectModule(projectData) {
  //receives array of project data
  this.data = projectData;
};

ProjectModule.prototype.load = function() {

  //sort the data array
  this.data.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  //get JSON

  // var data = $.getJSON('data/projectJSON.json');
  // console.log(data);

  //create new projects from projectData and add to html
  this.data.forEach( function(projectData) {
    var newProject = new Project(projectData);
    $('#projects-module').append(newProject.toHtml());
  });

};

/***
 * class ViewHandler
 **/

function ViewHandler() {

};

ViewHandler.prototype.handleTabClicks = function() {
  $('#nav-links').on('click', 'li.tab', function(e){
    e.preventDefault();
    var $dataContent = $(this).attr('data-content');
    console.log($dataContent);
    $('.tab-view').fadeOut('fast');
    $('#' + $dataContent).fadeIn('fast');
  });
};


/****
 * Code to run on page load
 **/

$(function() {
  var projectModule = new ProjectModule(projectData);
  var viewHandler = new ViewHandler();

  projectModule.load();
  viewHandler.handleTabClicks();
});
