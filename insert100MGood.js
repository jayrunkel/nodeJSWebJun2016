var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var DOCS_TO_INSERT = 1000;
var numInsertsRunning = 0;
var insertCount = 0;

function insertDocument (db, col, docNum, threadNum, callback) {
    col.insert({x: ++insertCount, y: 2, z: 3},
	       {},
	       function (err, result) {
		   assert.equal(null, err);

		   console.log("Thread: ", threadNum, " inserted doc: ", docNum, ".");
		   
		   if (insertCount < DOCS_TO_INSERT)
		       insertDocument(db, col, ++insertCount, threadNum, callback);
		   else if (numInsertsRunning == 1) {
		       numInsertsRunning--;
		       callback(null, true);
		   }
		   else
		       numInsertsRunning--;
	       });
}


MongoClient.connect('mongodb://localhost:27017/adsb', function (err, db) {
    assert.equal(null, err);
    var col = db.collection('data');


    for (i = 0; i < 5; i++) {
	++numInsertsRunning;
	insertDocument(db, col, ++insertCount, i, function (err, result) {
	    console.log("All ", DOCS_TO_INSERT, " documents inserted.");
	    db.close();
	});
    }
});




