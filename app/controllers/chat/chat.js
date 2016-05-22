var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Category = mongoose.model('Categorys');



var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.sockets.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});



module.exports = function(app) {

	app.use('/', router);
};

router.get('/chat', function(req, res, next) {
	Category.find().sort("createOn").exec(function(err, categorys) {

		if (err) return next(err);
		res.render('chat/index', {
			title: 'my blog',
			categorys: categorys
		});
	});
});