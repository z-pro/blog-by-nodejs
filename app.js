var express = require('express'),
	config = require('./config/config'),
	glob = require('glob'),
	moment = require("moment"),
	truncate = require('truncate'),
	messages=require('express-messages'),
	mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function() {
	throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function(model) {
	require(model);
});
var app = express();

//注册全局入口


var Category = mongoose.model('Categorys');


app.use(function(req, res, next) {

	app.locals.pageName = req.path;
	app.locals.moment = moment;
	app.locals.truncate = truncate;

	Category.find().exec(function(err, categorys) {

		err && next(err);
		app.locals.categorys = categorys;

	})
	next();
})



// app.use(session({
// 	secret: 'myblog',
// 	resave: false,
// 	saveUninitialized: true,
// 	cookie: {
// 		secure: false
// 	}
// }))
// app.use(flash())

// app.use(function(req, res, next) {
// 	res.locals.messages = messages(req, res)

// })



require('./config/express')(app, config);

app.listen(config.port, function() {
	console.log('Express server listening on port ' + config.port);
});