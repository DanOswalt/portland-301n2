(function(module) {
  function Person (opts) {
    // DONE: Convert property assignment to Functional Programming style. Now, ALL properties
    // of `opts` will be assigned as properies of the newly created article object.
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Person.all = [];

  Person.prototype.toHtml = function() {
    var template = Handlebars.compile($('#person-template').text());
    return template(this);
  };

  // DONE: Set up a DB table for articles.
  Person.createTable = function(callback) {
    webDB.execute(
      // what SQL command do we run here inside these quotes?
      'CREATE TABLE IF NOT EXISTS person (' +
          'id INTEGER PRIMARY KEY, ' +
          'first VARCHAR(255) NOT NULL, ' +
          'last VARCHAR(255) NOT NULL, ' +
          'dob DATETIME, ' +
          'bio TEXT NOT NULL);',
      function(result) {
        console.log('Successfully set up the person table.', result);
        if (callback) callback();
      }
    );
  };

  // DONE: Use correct SQL syntax to delete all records from the articles table.
  Person.truncateTable = function(callback) {
    webDB.execute(
      // <----finish the command here, inside the quotes.
      callback
    );
  };


  // DONE: Insert an article instance into the database:
  Person.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
        }
      ],
      callback
    );
  };

  // DONE: Refactor to expect the raw data from the database, rather than localStorage.
  Person.loadAll = function(rows) {
    Person.all = rows.map(function(ele) {
      return new Person(ele);
    });
  };

  Person.fetchAll = function(callback) {

    // load from sql file
  };


  module.Person = Person;
})(window);
