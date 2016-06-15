

(function (module) {
  Projects.all = [];

  function Projects(input) {
    this.title = input.title;
    this.role = input.role;
    this.projectUrl = input.projectUrl;
    this.completionDate = input.completionDate;
    this.DaystoComplete = input.DaystoComplete;
    this.body = input.body;

  }

  Projects.prototype.toHtml = function() {
  // var $newProject = $('article.template').clone();

    var articleTemplate = $('#template').html();
    var compiledTemplate = Handlebars.compile(articleTemplate);

    this.daysAgo = parseInt((new Date() - new Date(this.completionDate)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.completionDate ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

    return compiledTemplate(this);

  };


  Projects.loadAll = function(datas) {
    Projects.all = datas.map(function(i) { // Use map() to push rawData into a new array object
      return new Projects(i);
    });
  };

  Projects.fetchall = function(callBack) {

    if (localStorage.rawData) {
      Projects.loadAll(
         JSON.parse(localStorage.getItem('rawData'))
          );
      callBack();
    }
    else {
      $.getJSON('data/blogobjects.json', function(datas) {
        localStorage.setItem('rawData', JSON.stringify(datas));
        Projects.loadAll(datas);
        callBack();
      });
    }
  };

  Projects.allDays = function() {
    return Projects.all.map(function(project) {
      return project.DaystoComplete;})
      .reduce(function(sum, i) {
        return sum + i;
      });
  };


  module.Projects = Projects;
})(window);
