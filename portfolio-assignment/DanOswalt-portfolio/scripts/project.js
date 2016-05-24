$(function() {

  /*****
  * Project
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
  * ProjectModule
  ***/

  var ProjectModule = {

    /*******
     * init loads data either from localstorage or from file
     ***/

    init : function() {

      var self = this;

      if(localStorage.data){
        self.loadFromLocalStorage('data');
        self.loadProjects();
      } else {
        $.getJSON('data/projectJSON.json')
          .done(function(json){
            self.data = json.data;
            self.loadProjects();
            self.saveToLocalStorage(self.data);
          }).fail(function(){
            self.data = [];
          });
      }
    },

    /*******
     * loadProjects sorts and appends to the projects module
     ***/

    loadProjects : function() {

      this.data.sort(function(a,b) {
        return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
      });

      this.data.forEach(function(projectData) {
        var newProject = new Project(projectData);
        $('#projects-module').append(newProject.toHtml());
      });

    },

    saveToLocalStorage : function(data) {
      console.log('save data');
      localStorage.setItem('data', JSON.stringify(data));
    },

    clearFromLocalStorage : function(data) {
      console.log('clear data');
      localStorage.removeItem(data);
    },

    loadFromLocalStorage : function(data) {
      console.log('load data');
      this.data = JSON.parse(localStorage.getItem(data));
    }
  };

  /***
   * ViewHandler
   **/

  var ViewHandler = {

    init : function() {
      this.initNewProject();
      this.handleTabClicks();
      this.handleNewProjectSubmit();
      this.handleJSONSelection();
    },

    handleTabClicks : function() {
      $('#nav-links').on('click', 'li.tab', function(e){
        e.preventDefault();
        var dataContent = $(this).attr('data-content');
        $('.tab-view').fadeOut('fast');
        $('#' + dataContent).fadeIn('fast');
      });
    },

    initNewProject : function() {
      var self = this;
      $('#new-project').on('keyup', 'input, textarea', self.createProjectFromForm);
    },

    handleJSONSelection : function() {
      $('#project-json').on('focus', function() {
        this.select();
      });
    },

    createProjectFromForm : function() {
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
    },

    handleNewProjectSubmit : function() {
      var self = this;
      $('project-preview').empty();

      $('#new-project-submit').on('click', function(){
        if(self.formIsNotEmpty()) {
          var newProject = JSON.parse($('#project-json').val());
          ProjectModule.data.push(newProject);
          ProjectModule.saveToLocalStorage(ProjectModule.data);
          console.log(newProject);
          console.log(ProjectModule.data);
          self.clearInputFields();
        } else {
          // $('#project-export')
          //   .after()
          //   .html('<h2 class="msg">Form is empty!</h2>')
          //   .fadeOut(500);

          console.log('form is empty!');
        }
      });
    },

    clearInputFields : function() {
      $('#project-json').val('');
      $('#new-project :input').val('');
    },

    formIsNotEmpty : function() {
      var isNotEmpty = false;
      $('#new-project :input').each(function(){
        if($.trim($(this).val()) !== '') {
          isNotEmpty = true;
          return;
        };
      });
      return isNotEmpty;
    }
  };

/****
 * Code to run on page load
 **/

  ProjectModule.init();
  ViewHandler.init();

});
