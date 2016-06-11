//Root loads blog
page('/', function() {
  BlogView.init();
});
page('/projects', function() {
  ProjectModule.init();
});
page('/new', function() {
  NewBlogEntryController.init();
});

page();
