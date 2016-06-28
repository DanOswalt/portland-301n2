(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // DONE A-D: What does this method do?  What is it's execution path?
  //First retrieves the article from the databade whose id matches the parameter id from the route.
  //Then runs the callback, articleData, which stores the selected article into the ctx.
  //Then it runs next() callback.
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // DONE A-D: What does this method do?  What is it's execution path?
  //First it retrieves the articles from the databade whose author matches the parameter authorName from the route.
  //It also replaces all +(s) in the parameter to actual whitespace for javascript to read.
  //Then runs the callback, arthorData, which stores the selected articles into the ctx.
  //Then it runs next() callback.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // DONE A-D: What does this method do?  What is it's execution path?
  //First retrieves the articles from the database whose category matches the parameter categoryName from the route.
  //Then runs the callback, categoryData, which stores the selected articles into the ctx.
  //Then it runs next() callback.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // DONE A-D: What does this method do?  What is it's execution path?
  //First, it checks to see if Article.all is empty
  //If there are aticles, we store the aticles in the context {}
  //Then we call the next callback
  //Otherwise, we fetch the aticles
  //Once the articles have loaded, then we execute articleData which we passed as the callback
  //articleData will store the aticles from Article.all into the context {}
  //Then we run the next callback
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
