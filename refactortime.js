//user must install "ReadLine Sync" with command - npm install readline-sync
//install twillio = npm install -g twilio
//var twilio = require('twilio');
//var client = require('twilio')('', '');
var request = require('request');
var interval = 2000; //  10 seconds
var players = {}
var sets = {};
var numbers = {}
var matchesPinged = {}
var readlineSync = require('readline-sync');
var tournamentID;
var streamName = "SDMeleeTV";
var streamSetupID = 1; 
var queueInfo;
var streamMatchID;
var MatchData;
var player1;
var player2;
//Get Tournament ID
request.get({url: 'https://api.smash.gg/tournament/ashkon-testerino-please-no-copypastarino'},
function(err, response, body){
	var data = JSON.parse(body);
	tournamentID = data.entities.tournament.id;
	//console.log(tournamentID);
    getStreamInfo();
});

function getStreamInfo(){
var urlTest = 'https://api.smash.gg/station_queue/'+tournamentID;
request.get({url: urlTest},
function (err, response, body){
    queueInfo = JSON.parse(body);
    var streams = queueInfo.data.entities.stream;
    streams.forEach(function(key){
        if(key.streamName == streamName)
            streamSetupID = key.id;
    })
    getFirstMatch();
})
}

function getFirstMatch(){
    //console.log(streamSetupID);
    var streamQueue = queueInfo.queues[streamSetupID];
    //console.log("STREAM ID " + streamSetupID);
    //console.log("STREAM QUEUE \n" + streamQueue);
    if(streamMatchID != streamQueue[0])
    {
        streamMatchID = streamQueue[0];
        //console.log("STREAM MATCH ID " + streamMatchID + " GETTING MATCH");
        getMatch();
    }
}
function getMatch()
{
    var sets = queueInfo.data.entities.sets;
    sets.forEach(function(key){
        if(key.id = streamMatchID)
            MatchData = key;
    })
    //console.log("FOUND MATCH INFO " + MatchData.id);
    //console.log("WTF " + MatchData.entrant2Id);
    getPlayerIDs();
}

function getPlayerIDs()
{
var urlTest = 'https://api.smash.gg/set/' + MatchData.id + '?expand%5B%5D=setTask';
request.get({url: urlTest},
function (err, response, body){
    matchInfo = JSON.parse(body);
    getPlayerData(matchInfo.entities.sets.entrant1Id, matchInfo.entities.sets.entrant2Id);
})
}

function getPlayerData(player1ID, player2ID){
    //console.log("LOOKING FOR PLAYERS WITH MATCH INFO " + MatchData.id);
    //console.log("PLAYER 1 ENTRANT ID " + MatchData.entrant1Id);

    var players = queueInfo.data.entities.entrants;
    players.forEach(function(key){
        //console.log(key.id);
        if(player1ID == key.id)
            player1 = key;
        if(player2ID == key.id)
            player2 = key;
    })
    console.log(player1.name);
    console.log(player2.name);
    continueStuff();
}

function continueStuff()
{
    var testerere = setInterval(getStreamInfo, 30000);
}