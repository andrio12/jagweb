// server.js
// load the things we need
var express = require('express'),
    engine = require('ejs-locals'),
    morgan = require('morgan'),
    routes = require('./routes/index'),
    mongoose = require('mongoose'),
    //http = require('http'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path');
    
// db connect
mongoose.connect("mongodb://andri:a1s2d3@ds031319.mongolab.com:31319/fonstest");

var app = express();

// set the view engine to ejs
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//server status logger
app.use(morgan('dev','server'));

//other dependancies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', routes.index);
app.get('/new', routes.serve_new);
app.post('/new', routes.new_post);
app.get('/articles', routes.articles);

//I am at the bottom of all routes!
app.get('/:slug', routes.show_post); 


app.listen(process.env.PORT);