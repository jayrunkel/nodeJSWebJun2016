
var col = db.getCollection("data");

var doc = col.findOne({"callsign" : "HR9368"});

printjson(doc);
