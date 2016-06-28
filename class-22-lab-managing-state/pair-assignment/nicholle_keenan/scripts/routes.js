//At route it loads these two middleware and fires them.
//This will attach Atricle.all to context and also run fetchAll if it hasn't been run. Then remove all the artilces and re-render them if fetchAll has been run when the user returns to root.
page('/',
  articlesController.loadAll,
  articlesController.index);

page('/about', aboutController.index);

//this route will take the paramater on the end fo the url /article/ and will pass it into a function with retrieves the article by the id of the parameter, then attaches that article to context, and then passes it to articlesController.index (on the context object) to render it)
page('/article/:id',
  articlesController.loadById,
  articlesController.index);

// Redirect home if the default filter option is selected:
page('/category', '/');
page('/author', '/');

//This will take the parameter that is an author name and fetch all of the articles written by them from the database, then fetch it, then render it using index.
page('/author/:authorName',
  articlesController.loadByAuthor,
  articlesController.index);
  
//This will take the parameter that is a category and fetch all of the articles in that category from the database, then fetch it, then render it using index.
page('/category/:categoryName',
  articlesController.loadByCategory,
  articlesController.index);

page();
