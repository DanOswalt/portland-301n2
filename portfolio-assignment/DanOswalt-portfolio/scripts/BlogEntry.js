(function(module) {

  /*****
  * BlogEntry
  ***/

  function BlogEntry(opts) {
    this.title = opts.title;
    this.blogNumber = 0;
    this.publishedOn = opts.publishedOn;
    this.image = opts.image;
    this.body = opts.body;
  }

  module.BlogEntry = BlogEntry;

})(window);
