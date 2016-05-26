var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/adsb", function (err, db) {
    
    var col = db.collection('data')
    var stream = col.find({"events.a" : {$gt : 5000}}).stream();

    stream.on('data', function(doc) {
	console.log("Doc: %j", doc);
    });

    stream.on('error', function (doc) {
	console.log("Query failed: %j", doc);
    });

    stream.on('end', function() {
	console.log("All data retrieved.");

	db.close();
    });
});
