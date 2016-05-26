
var col = db.getCollection("data");
var cursor = col.find({"events.a" : {$gt : 5000}});

while (cursor.hasNext()) {
    printjson(cursor.next());
}

