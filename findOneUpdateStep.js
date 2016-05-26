var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    Step = require('step');

var database;
var collection;

var csQuery = {"callsign" : "R24654"};

Step (
    function connectToMongoDB (err, db) {
	MongoClient.connect('mongodb://localhost:27017/adsb', this);
    },
    function findOneDoc(err, db) {
	if (err) console.log("Connect: %j", err);
	database = db;
	collection = db.collection('data');

	collection.findOne(csQuery, {}, this);
    },
    function updateDoc(err, doc) {
	if (err) console.log("Find One: %j", err);
	console.log("Here is my doc: %j", doc);

	collection.updateOne(csQuery, {$inc : {"timesViewed" : 1}}, {}, this);
    },
    function findOneDoc2 (err, result) {
	if (err) console.log("Update error: %j", err);

	collection.findOne(csQuery, {}, this);
    },
    function closeConnection(err, doc) {
	if (err) console.log("FindOne Doc: %j", err);

	console.log("Note updated: %j", doc);
	database.close();
    }
);
    





