var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/adsb', function (err, db) {
    assert.equal(null, err);
    var col = db.collection('data');

    col.insert({x: 1, y: 2, z: 3},
	       {},
	       function (err, result) {
		   assert.equal(null, err);
		   console.log("Insert Complete");
		   db.close();
	       });
});




