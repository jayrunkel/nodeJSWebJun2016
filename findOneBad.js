
var MongoClient = require('mongodb').MongoClient;

var db = MongoClient.connect('mongodb://localhost:27017/adsb');
var col = db.collection('data');
var doc = col.findOne({"callsign" : "UA7549"});

console.log("Here is my doc: %j", doc);
db.close();
