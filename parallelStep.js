var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    Step = require('step');

var database;

var csQuery = {"callsign" : "R24654"};

Step (
    function connectToMongoDB (err, db) {
	MongoClient.connect('mongodb://localhost:27017/adsb', this);
    },
    function executeParallel (err, db) {
	if (err) console.log("Connect: %j", err);
	var collection = db.collection('data');
	database = db;
	
	collection.findOne(csQuery, {}, this.parallel());
	collection.updateOne(csQuery, {$inc : {"timesViewed" : 1}}, {}, this.parallel());
	collection.findOne(csQuery, {}, this.parallel());
    },
    function closeConnection(err, doc1, upResult, doc2) {
	if (err) console.log("Error: %j", err);
	console.log("Here is doc1: %j", doc1);
	console.log("Incremented: %j", upResult);
	console.log("Here is doc2: %j", doc2);
	database.close();
    }
);
    





