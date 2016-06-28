var express = require('express');
var request = require('request');


app = express();
port = 3000;

app.use(express.static(__dirname + '/views'));
app.use('/assets', express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/templates-hbs', express.static(__dirname + '/templates-hbs'));

app.get('/', function(req, res){
  res.send('index.html');
});

app.get('/projects', function(req, res) {
  res.sendFile(__dirname + '/scripts/js/projectItems.json');
});

app.get('/about', function(req, res) {
  res.sendFile(__dirname + '/scripts/js/about.json');
});

//this makes a request to my digital ocean node proxy, which is actaully making a call to the github API and sending the data back.
app.get('/following', function(req,res){
  request('http://162.243.116.199/', function (error, response, body) {
  res.send(body);
  });
});


app.listen(port, function(){
  console.log('The magic happens on port ' + port)
});
