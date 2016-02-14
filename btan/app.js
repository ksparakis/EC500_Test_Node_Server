var express = require('express');
var routes = require('./routes/index');
var menu = require('./routes/menu');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');        //required the body-parser
var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
var stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//enable app(express) to use the body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/menu', menu.show);
app.post('/menu', function (req, res) {
    // req: request (info getting from the client)    res: response - info to send back to client (info to send back)
    var client_inputs = req.body;
    var inn_usrn = client_inputs.username;
    var inn_psw = client_inputs.password;
    var correct; 
    
    //test credentials of login
    if (inn_usrn == "eggs" && inn_psw == "benedict") {
        console.log("Your order is coming right up!");
        correct = "true";
    }
    else {
        console.log("NO SANDWICH FOR YOU!");
        correct = "false";
    }
    
    //return if the login was successful, this returns as data parameter for ajax's success method
    res.end(correct); 

    
})

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
