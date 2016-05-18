console.log(Projects);

// NOTE: MOST OF THE FUNCTIONS AND JQUERY STRUCTURE THAT I USED ARE HEAVILY
// BASED-ON THE PAIR-PROGRAMMING PROJECT TEMPLATE. I REWROTE ALL OF IT BY HAND TO LEARN,
// OMITTED ELEMENTS NOT NECESSARY TO THIS PORTFOLIO, ALTERED MOST NAMING SYSTEMS
// AS WELL AS ADDED NEW ELEMENTS AND PROPERTIES AS NEEDED.

var subsections = [];

function Projects(input) {
  this.title = input.title;
  this.role = input.role;
  this.projectUrl = input.projectUrl;
  this.completionDate = input.completionDate;
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

myProjects.forEach(function(i) {
  subsections.push(new Projects(i));
});

subsections.forEach(function(a) {
  $('#projects').append(a.toHtml());
});
