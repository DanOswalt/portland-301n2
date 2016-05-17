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

function ProjectModule() {
  var self = this;
  this.data = this.loadFromLocalStorage();

  if(!this.data){
    $.getJSON('data/projectJSON.json')
      .done(function(json){
        self.data = json.data;
      }).fail(function(){
        self.data = [];
      }).always(function() {
        self.loadProjects();
        self.saveToLocalStorage();
      });
  };
};

ProjectModule.prototype.loadProjects = function() {
  //sort the data array
  this.data.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  //create new projects from projectData and add to html
  this.data.forEach(function(projectData) {
    var newProject = new Project(projectData);
    $('#projects-module').append(newProject.toHtml());
  });
};

ProjectModule.prototype.saveToLocalStorage = function() {
  console.log('save data');
  localStorage.setItem('data', JSON.stringify(this.data));
};

ProjectModule.prototype.clearFromLocalStorage = function() {
  console.log('clear data');
  localStorage.removeItem('data');
};

ProjectModule.prototype.loadFromLocalStorage = function() {
  console.log('load data');
  this.data = JSON.parse(localStorage.getItem('data'));
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
    publishedBy: $('#project-publishedBy').val(),
    publishedOn: new Date(),
    url: $('#project-url').val(),
    codeUrl: $('#project-codeUrl').val(),
    screenshot: ''
  });

  $('#project-preview').append(project.toHtml());
  $('#project-json').val(JSON.stringify(project));
};

ViewHandler.prototype.handleNewProjectSubmit = function() {
  var self = this;

  $('#new-project-submit').on('click', function(){

    //if form is not empty
    if(!self.formIsEmpty()) {
      //TODO: append json to data
      //save to local storage
      //clear the field
    } else {
      //don't do anything
      //error msg?
    }
  });
};

//TODO: run this on change also, so json field and preview are cleared if empty
ViewHandler.prototype.formIsEmpty = function() {

  //check if any inputs have characters
  var isEmpty = true;
  $('#new-project :input').each(function(){

    //if the trimmed input is a character, immediately break out and set to false
    if($.trim($(this).val()) !== '') {
      isEmpty = false;
      return;
    };
  });

  //else, there's nothing in the form
  return isEmpty;
};

ViewHandler.prototype.init = function() {
  this.initNewProject();
  this.handleTabClicks();
  this.handleNewProjectSubmit();
  this.handleJSONSelection();
};

/****
 * Code to run on page load
 **/

$(function() {
  var projectModule = new ProjectModule();
  var viewHandler = new ViewHandler();
  viewHandler.init();
  // projectModule.clearFromLocalStorage();
});
