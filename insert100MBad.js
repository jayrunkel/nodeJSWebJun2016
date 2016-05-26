var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/adsb', function (err, db) {
    assert.equal(null, err);
    var col = db.collection('data');

    for (i = 1; i <= 100000000; i++) {
	col.insert({x: i, y: 2, z: 3},
		   {},
		   function (err, result) {
		       assert.equal(null, err);
		       console.log("Insert Complete");
		       db.close();
		   });
    }
});




