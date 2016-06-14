(function(module){

  /***
   * BlogView
   **/

  var BlogView = {

    init : function(context) {
      var self = BlogView;
      var $blogModule = $('#blog-module');

      $('.module-view').hide();
      $('#blog-module').show();

      $blogModule.empty();

      Handlebars.registerHelper('daysAgo', function() {
        return parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago';
      });

      self.getTemplate('blog-entry-template')
          .done(function(template){
            $blogModule.append(template);
            self.loadBlogEntries(context.state.blogdata);
          });

      // // self.initNewProject();
      // self.handleNewProjectSubmit();
      // self.handleJSONSelection();
    },

    getTemplate : function(templateId){
      return $.ajax({
        url: 'templates/' + templateId + '.hbs'
      });
    },

    compileHandlebarsTemplate : function(obj, templateElementId) {
      var appTemplate = $(templateElementId).html();
      var compileTemplate = Handlebars.compile(appTemplate);
      return compileTemplate(obj);
    },

    loadBlogEntries : function(data) {
      var self = this;

      data.sort(function(a,b) {
        return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
      });

      data.forEach(function(data) {
        var blogEntry = new BlogEntry(data);
        var html = self.compileHandlebarsTemplate(blogEntry, '#blog-entry-template');
        self.attachHtmlToParent('#blog-module', html);

      });

      // $('#blog-entry-template').hide();
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

    attachHtmlToParent : function(parentSelector, html) {
      $(parentSelector).append(html);
    },

    createProjectFromForm : function() {
      var project, html;

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

      html = BlogView.compileHandlebarsTemplate(project, '#project-template');
      BlogView.attachHtmlToParent('#project-preview', html);
      $('#project-json').val(JSON.stringify(project));
    },

    handleNewProjectSubmit : function() {
      var self = this;

      $('#new-project-submit').on('click', function(){
        if(self.formIsNotEmpty()) {
          var newProject = JSON.parse($('#project-json').val());
          ProjectModule.data.push(newProject);
          ProjectModule.saveToLocalStorage(ProjectModule.data);
          self.clearInputFields();
          $('#project-preview').empty();
          BlogView.showSaveMessage('Saved!');
        } else {
          // $('.save-msg').show().html('<h2 class="msg">Form is empty!</h2>').fadeOut(800);
          BlogView.showSaveMessage('Form is empty!');
          console.log('form is empty!');
        }
      });
    },

    showSaveMessage : function(msg) {
      $('.save-msg').show().html('<h2 class="msg">' + msg + '</h2>').fadeOut(800);
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

  module.BlogView = BlogView;

})(window);
