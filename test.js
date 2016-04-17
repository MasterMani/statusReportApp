var statusDb = require('./lib/dbfunctions');

var db = new statusDb.StatusDb("testdb.db");

db.serialize(function(){
  db.fetchAll('schemaTest', "", "", function(err, row){
    console.log(row);
  });
  // db.close(); 
})

db.serialize(function(){
  db.insert('schemaTest', "id, jiraId, assigenedDate, taskType, noOfSites, status, history", "null, 'CS-123', '123-23412', 'ingestion', 5, 'progress', 'test'", function(){
    console.log("Inserted..")
  });
  
  db.fetchAll('schemaTest', "", "id=8", function(err, row){
    console.log(row);
  });
  
  db.update('schemaTest', "history='hello da mani'", 'id=4', function(a){
    console.log("updated");
    console.log(a)
  })
  
  db.delete('schemaTest', 'id>5', function(a){
    console.log("deleted..");
    console.log(a)
  })
  
  db.fetchAll('schemaTest', "", "id=4", function(err, row){
    console.log(row);
  });
  db.close(); 
});