//importing dependencies
const express = require("express");
var bodyParser = require('body-parser');
const app = express();
let path = require("path");
let routes = require("./routes/routes");
let session = require('express-session');
let cookieParser = require('cookie-parser');

// app.use(cookieParser());

app.use(cookieParser());
 
app.use(session({
    secret: "amar",
    saveUninitialized: true,
    resave: true
}));
 
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('views'))
app.use('/', routes);
app.set('views', path.join(__dirname, 'views'));

// app.use(express.static('config'))
// app.set('config', path.join(__dirname, 'config'));

//EJS Template
app.set('view engine','ejs');

//Starting the server at port 3000
app.listen(3000, function() { 
  console.log('Server running on port 3000'); 
});

