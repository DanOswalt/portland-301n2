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
  console.log($('#project-template').length);
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
  this.data = projectData;
};

ProjectModule.prototype.load = function() {

  //sort the data array
  this.data.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

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
    var dataContent = $(this).attr('data-content');
    $('.tab-view').fadeOut('fast');
    $('#' + dataContent).fadeIn('fast');
  });
};

ViewHandler.prototype.initNewProject = function() {
  var self = this;
  $('#new-project').on('keyup', 'input, textarea', self.createProjectFromForm);
};

ViewHandler.prototype.handleJSONSelection = function() {
  $('#project-json').on('focus', function() {
    this.select();
  });
};

ViewHandler.prototype.createProjectFromForm = function() {
  var project;

  $('#project-preview').empty();
  project = new Project({
    title: $('#project-title').val(),
    description: $('#project-description').val(),
    details: $('#project-details').val(),
    publishedBy: $('#project-title').val(),
    publishedOn: new Date(),
    url: $('#project-url').val(),
    codeUrl: $('#project-codeUrl').val(),
    screenshot: ''
  });

  $('#project-preview').append(project.toHtml());

  $('#project-json').val(JSON.stringify(project));
  console.log('Final json\n', JSON.stringify(project, null, 2));
};

ViewHandler.prototype.init = function() {
  this.initNewProject();
  this.handleTabClicks();
  this.handleJSONSelection();
};


/****
 * Code to run on page load
 **/

$(function() {
  var viewHandler = new ViewHandler();

  // $.getJSON('data/projectJSON.json', function(json) {
  //   var projectModule = new ProjectModule(json.data);
  //   projectModule.load();
  // });

  viewHandler.init();
});
