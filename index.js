'use strict';
//const ObjectId = require("mongodb").ObjectId;
const express = require('express');
const UsersRoutes = require("./users");
const Models = require('./model/models');
const app = express();

var bodyParser = require('body-parser');

const models = Models(process.env.MONGO_DB_URL ||'mongodb://localhost/users');
const usersRoutes = UsersRoutes(models);

app.use(express.static('public'));
// parse application/x-www-form-urlencode

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//RESPONSE HEADERS
//Grant access to the resources to web browers
//specify what they can and can't do
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
  
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH");
      return res.status(200).json({});
    }
    next();
  });

  app.post('/v1/auth/signup,', usersRoutes.newUser);


  // catch 404 and forward to error handler
app.use(function(req, res, next){
	var err = new Error("The page you looking for is Not Found");
	err.status = 404;
	next(err);
});

// Error Handler

app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

var server = app.listen(process.env.PORT || 4500);
