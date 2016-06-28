(function(module){

  // project constructor function
  function Project(x) {
    this.title = x.title;
    this.category = x.category;
    this.date = x.date;
    this.description = x.description;
    this.link = x.link;
    this.image = x.image;
  }

// Project function method for project to HTML
  Project.prototype.toHtml = function() {
    // use handlebars
    var templateScript = $('#projectTemplate').html();
    var projectTemplate = Handlebars.compile(templateScript);
    var html = projectTemplate(this);
    return(html);
  };

  var PortfolioModule = {

    toggleStickyNav: function(topOfNav) {
      var scrollTop = $(window).scrollTop();

      if (scrollTop >= topOfNav && scrollTop > 0) {
        $('nav').addClass('stickyNav').removeClass('nav');
      } else {
        $('nav').removeClass('stickyNav').addClass('nav');
      }
    },

    stickyNav: function() {
      var topOfNav = $('nav').offset().top;
      this.toggleStickyNav(topOfNav);
    },

    navSelect: function() {
      // change visible tab by click on nav links
      $('nav a').on('click', function() {
        $tabClicked = $(this).data('tab');
        $(this).addClass('selected').siblings().removeClass('selected');
        console.log($tabClicked + ' is clicked');
      });
    },

    navInit: function() {
      currentPath = window.location.pathname;
      if (currentPath != '/') {
        linkName = currentPath.substring(1) + '-link';
        document.getElementById(linkName).classList.add('selected');
      } else {
        document.getElementById('about-link').classList.add('selected');
      }
    },

    getWeather: function() {
      // connect page weather conditions
      var weatherAPI = 'http://api.wunderground.com/api/c57bffbbb79db788/geolookup/conditions/q/OR/Portland.json';
      var successFunction = function(data) {
        $('.weather').append((' where it is ' + Math.round(data.current_observation.temp_f) + '&deg; F') + (' and ' + data.current_observation.weather).toLowerCase());
      };//end of weather callback
      $.getJSON(weatherAPI, successFunction);
    },

    projectJSON: function() {
      // ajax call for project data, map to array and append as HTML to page
      $.getJSON('data/projectData.json', function(projectJSON){
        // put each JSON element into the projects array after making it a Project object
        console.log(projectJSON);
        projectsArray = projectJSON.map(function(project){
          return (new Project(project));
        }).forEach(function(project){
          $('#projects').append(project.toHtml());
        });
      });
    }
  }; // end PortfolioModule

// initialize each page when navigated to via routes.js
  PortfolioModule.initAbout = function() {
    $('section').hide();
    $('#about').show();
  };

  PortfolioModule.initProjects = function() {
    $('section').hide();
    $('#projects').show();
    PortfolioModule.projectJSON();
  };

  PortfolioModule.initConnect = function() {
    $('section').hide();
    $('#connect').show();
    PortfolioModule.getWeather();
  };

  $(window).scroll(function() {
    PortfolioModule.stickyNav();
  });

  PortfolioModule.navSelect();
  PortfolioModule.navInit();

  module.PortfolioModule = PortfolioModule;

})(window);
