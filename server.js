var app = require('express')();
var config = require('./server/config');
var mongoose = require('mongoose');
app = config.initialize(app);

mongoose.connect('mongodb://localhost/streamRunner');
mongoose.connection.on('open', function(){
	console.log("Mongoose connected");
})


var listener = app.listen(3000, function(){
    console.log("Server listening at port " + listener.address().port);
});




