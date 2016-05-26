var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/adsb', function (err, db) {
    assert.equal(null, err);
    var col = db.collection('data');

    col.findOne({"callsign" : "UA7549"}, function (err, doc) {
	assert.equal(null, err);

	console.log("Here is my doc: %j", doc);

	col.updateOne({"callsign" : "UA7549"}, {$set : {"note" : "Spoke with the pilot"}}, {}, function(err, result) {
	    assert.equal(null, err);

	    console.log("Note updated");
	    
	    db.close();
	});
    });
});




