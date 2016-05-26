var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var db = MongoClient.connect('mongodb://localhost:27017/adsb', function (err, db) {
    assert.equal(null, err);
    var col = db.collection('data');

    col.findOne({"callsign" : "UA7549"}, function (err, doc) {
	assert.equal(null, err);

	console.log("Here is my doc: %j", doc);

	db.close();
    });
});




