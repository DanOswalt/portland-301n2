(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized


  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // DONE: What does this method do?  What is it's execution path?
  //This finds the article by the specific id by passing the parameter into the findWhere function, and then attaching the return onto context so it can be rendered by index. 
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      console.log(article);
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // DONE: What does this method do?  What is it's execution path?
  //this passes the parameter into a function (findWhere) that loads the entries from the database by that particular author.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // DONE: What does this method do?  What is it's execution path?
  //this passes the parameter into a function (findWhere) that loads the entries from the database by that particular category.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // DONE: What does this method do?  What is it's execution path?
  //This defines a function that would attach Articles.all to ctx.articles, checks whether fetchall has been executed, and if not will execute fetchall.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      //fires fetchAll
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
