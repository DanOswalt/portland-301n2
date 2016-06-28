(function (module) {

  var anagram = {};

  anagram.create = function() {

    var name = 'JAMESSMITH';  //scramble my name
    name = name.split(''); // split name into letters
    console.log(name);
    anagram.fisherYates(name); //run the ranomd shuffle function
    console.log(name);
    // use reduce to join the random letters
    var myAnagram = name.reduce(function(prev, next, index) {
      return prev + next;
    });

    //put myAnagram in object for Handlebars
    var context = {
      hbAnagram: myAnagram
    };
  // //get anagram template
    anagram.getTemplate(context, function(template){
      $('#anagram').append(template);
    });
  };

  anagram.getTemplate = function(data, callback){
    getTemplate('anagram', data, callback);
  };

  //scrambled name function with reduce

  anagram.fisherYates = function(name) {
    var i = name.length, j, tempi, tempj;
    if ( i === 0 ) return false;
    while ( --i ) {
      j = Math.floor( Math.random() * ( i + 1 ) );
      tempi = name[i];
      tempj = name[j];
      name[i] = tempj;
      name[j] = tempi;
      console.log('fisheryates:' + name);
      return name;
    }
  };

  module.anagram = anagram;
})(window);
