///////////////////// Node Password Server Begin /////////////////////
var correctUsername = 'user';
var correctPassword = 'qwerty123';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var httpPort = 8081;
var nodePort = 8082;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Ready for login');
});

app.listen(nodePort, function () {
  console.log('node.js password application listening on port '+nodePort);
});

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.post('/login',function(req, res)
{
	var user = req.body.user;
	var pw = req.body.pw;
    var response;

	console.log('Login request received from ' + req.url);
	console.log('Username: ' + user );
	console.log('Password: ' + pw);
	res.setHeader('Content-Type', 'text/plain')

    if (user==correctUsername && pw ==correctPassword)
    {
        console.log('Login successful')
        response = JSON.stringify({ status  : 200, success : 'Login successful.' });
    }
    else
    {
        console.log('Login failed')
        response = JSON.stringify({ status: 99, error : 'Username or login credentials incorrect.' });
    }

    console.log('Responded with ' + response)
    res.end(response);
});
///////////////////// Node Password Server End ///////////////////////


///////////////////// HTTP Server Begin /////////////////////
var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    displayForm(res);
});

function displayForm(res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

server.listen(httpPort, function () {
	console.log("HTTP server listening on port "+httpPort);
});
///////////////////// HTTP Server End ///////////////////////