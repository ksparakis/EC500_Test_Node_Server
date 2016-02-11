var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var LOGIN_FILE = path.join(__dirname, 'login.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '')));
//app.use('/node_modules/bootstrap', express.static(path.join(__dirname, 'dist') ));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

/* // We are no longer getting the information & sending it to the client side
app.get('/login', function(req, res) {
  fs.readFile(LOGIN_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });

});*/

app.post('/login', function(req, res) {
  fs.readFile(LOGIN_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    // load the password saved in the file
    var valid_login_info = JSON.parse(data);

    // user input
    var inputted_login = req.body;
    var resp;
    for(var ii = 0; ii < valid_login_info.account.length; ii++){
          if(inputted_login.usrnm == valid_login_info.account[ii].username &&
             inputted_login.pswrd == valid_login_info.account[ii].password){
            resp = "true";
            break;
          }
          else{
            resp = "false";
          }
    } console.log("user login: " + resp);
    res.json(resp);
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
