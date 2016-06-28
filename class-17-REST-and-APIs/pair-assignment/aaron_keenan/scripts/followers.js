(function(module){
<<<<<<< HEAD
=======
<<<<<<< HEAD
  var followers = {};
  followers.all = [];
=======
>>>>>>> 4af26130cc94a4b89f8e46e6475fd1945a72f584
<<<<<<< HEAD
  var followers = {};
  followers.all = [];
=======
  var followers = {}
  followers.all = []
>>>>>>> 03e87effd900d8eafbc21e7225b273e2ccbc29c2
<<<<<<< HEAD
=======
>>>>>>> 5b9d4415086f9815a8ab90adcc7061be09d8609a
>>>>>>> 4af26130cc94a4b89f8e46e6475fd1945a72f584

  followers.requestFollowers = function(callback){
    $.ajax({
      url: 'https://api.github.com/users/pauwlsky/followers',
      type: 'GET',
      headers: {
        'Authorization' : 'token ' + githubToken
      },
      success: function(data, message, xhr){
<<<<<<< HEAD
=======
<<<<<<< HEAD
        console.log('success');
        followers.all = data;
        console.log(repos.followers);
=======
>>>>>>> 4af26130cc94a4b89f8e46e6475fd1945a72f584
<<<<<<< HEAD
        console.log('success');
        followers.all = data;
        console.log(repos.followers);
=======
        console.log('success')
        followers.all = data;
        console.log(repos.followers)
>>>>>>> 03e87effd900d8eafbc21e7225b273e2ccbc29c2
<<<<<<< HEAD
=======
>>>>>>> 5b9d4415086f9815a8ab90adcc7061be09d8609a
>>>>>>> 4af26130cc94a4b89f8e46e6475fd1945a72f584
      },
      error: function(error){
        console.log('error');
      }
    }).then(callback);
<<<<<<< HEAD
=======
<<<<<<< HEAD
  };
=======
>>>>>>> 4af26130cc94a4b89f8e46e6475fd1945a72f584
<<<<<<< HEAD
  };
=======
  }
>>>>>>> 03e87effd900d8eafbc21e7225b273e2ccbc29c2
<<<<<<< HEAD
=======
>>>>>>> 5b9d4415086f9815a8ab90adcc7061be09d8609a
>>>>>>> 4af26130cc94a4b89f8e46e6475fd1945a72f584

  module.followers = followers;

})(window);
