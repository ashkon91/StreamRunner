//user must install "ReadLine Sync" with command - npm install readline-sync
//install twillio = npm install -g twilio
var request = require('request');
var interval = 2000; //  10 seconds
var players = {}
var numbers = {}
var matchesPinged = {}
var runnerController = require('../controller/runnerController');

module.exports = function(app){
	app.get('/', runnerController.home);

}