(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // DONE: What does this method do?  What is its execution path?
// When this function begins to run the Article.findWhere function starts by matching the database
//'id' that is provided with the url parameter. Then articleData function is called and it stores the article to the context
// object. Next() is then called back which is referring to our articlesController.index method . This
// function displays the content.
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // DONE: What does this method do?  What is it's execution path?
  // The Article.findWhere function begins by matching the database author provided with the url parameter.
  // This function also replaces the '+' in the url with a space.
  // Then our variable authorData function starts and it stores the articles matching author property to the context object.  Then the next() function
  // calls back our articlesController.index function in order to display our content.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // DONE: What does this method do?  What is it's execution path?
  // The Article.findWhere function begins by matching the database categorys relevant to this article provided with the url parameter.
  // Then our variable categoryData function starts and it stores the relevant categorys to the context object.  Then the next() function
  // calls back our articlesController.index function in order to display our content.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // DONE: What does this method do?  What is it's execution path?
  // articlesController.loadAll starts by checking 'if' there is an Article.all has length.
  // If it has length then it defined as TRUE and it stores all the articles in the context object.
  // Now the Next() function is called which displays the content.
  // It doesn't have length it is defined as false and Article.fetchall is called with articleData at a paratmeter
  //  The articleData function retieves the data and it stores all the articles in the context object.
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
