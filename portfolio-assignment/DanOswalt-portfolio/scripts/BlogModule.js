(function(module){

  /*****
  * BlogModule
  ***/

  var BlogModule = {

    /*******
     * init loads data either from localstorage or from file
     ***/

    init : function(context, next) {
      var self = BlogModule;

      //fetch the xhr header to compare etags
      self.fetchFromFile('data/blogentries.json', 'HEAD')
          .done(function(response, status, xhr){
            var etag = xhr.getResponseHeader('Etag');
            var storedEtag = self.loadFromLocalStorage('blogetag');

            //if what is in local storage is the same, then fetch from local storage
            if(etag === storedEtag){
              self.data = self.loadFromLocalStorage('blogdata');
              next();

            //if they don't match, or nothing stored, load from the data file
            } else {
              self.fetchFromFile('data/blogentries.json', 'GET')
                  .done(function(response, status, xhr){
                    self.data = response.data;
                    // var etag = xhr.getResponseHeader('Etag');
                    self.saveToLocalStorage('blogdata', response.data);
                    self.saveToLocalStorage('blogetag', etag);
                    next();
                  })
                  .fail(function(){
                    self.data = [];
                    next();
                  });
            };
          })
          .fail(function(){
            self.data = [];
            next();
          });
    },

    fetchFromFile : function(file, type) {
      return $.ajax({
        url: file,
        type: type
      });
    },

    saveToLocalStorage : function(key, value) {
      console.log('save data');
      localStorage.setItem(key, JSON.stringify(value));
    },

    clearFromLocalStorage : function(key) {
      console.log('clear data');
      localStorage.removeItem(key);
    },

    loadFromLocalStorage : function(key) {
      console.log('load data');
      return JSON.parse(localStorage.getItem(key));
    }
  };

  module.BlogModule = BlogModule;

})(window);
