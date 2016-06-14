//Root loads blog
page('/', BlogModule.init, BlogView.init);

page('/projects', function() {
  ProjectModule.init();
});
page('/new', function() {
  NewBlogEntryController.init();
});

page();
