var api = {},
    statusDb = require('../lib/dbfunctions').StatusDb,
    dbName = "testdb.db",
    tableName = 'schemaTest',
    columns = "id, jiraId, siteName, assigenedDate, taskType, noOfSites, cstatus, history",
    db = new statusDb(dbName);

//Result format : var data = {error : 0,records : [], errorMsg : ""};

api.all = function(req, res){
  var data = {};
  db.serialize(function(){
    db.fetchAll(tableName, "", "", function(err, rows){
      if(err) {
        data.error = 1;
        data.errorMsg = err;
        res.json(data);
      };
      data.error = 0;
      data.records = rows;
      res.json(data);
    });
  });
}
api.insertOne = function(req, res){
  var values = req.body,
      data = {};
      console.log(req.body);
  // db.serialize(function(){
  //   db.insert(tableName, columns, values, function(err){
  //     if(err){
  //       data.error = 1;
  //       data.errorMsg = err;
  //       //TODO logging errors and don't show it users
  //       res.json(data);
  //     }
  //     data.error = 0;
  //     data.errorMsg = "";
  //     data.records = ["Inserted sucessfully"];
  //     res.json(data)
  //   });
  // });
}
api.getOne = function(req, res){
  var data = {}, 
  id = parseInt(req.params.id);
  if(!id){
    data.error = 1
    data.errorMsg = "Not a valid ticket Id " + req.params.id;
    res.json(data);
  }
  db.serialize(function(){
    db.fetchOne(tableName, "", "id="+id, function(err, row){
      if(err) {
        data.error = 1;
        data.errorMsg = err;
        res.json(data);
      };
      data.error = 0;
      data.errorMsg = "";
      data.records = row;
      res.json(data)
    }); 
    // db.close();
  });
}

api.updateOne = function(req, res){
  var updateInfo = req.body.updateInfo,
      condition = parseInt(req.params.id),
      data = {};
  //TODO - check and validate in front end once    
  if(!condition){
    data.error = 1
    data.errorMsg = "Condition is invalid " + req.params.id;
    res.statusCode = 404
    res.json(data);
  }
  db.serialize(function(){
    db.update(tableName, updateInfo, "id="+condition, function(err){
      if(err){
        data.errorMsg = "Update fails " + err;
        res.statusCode = 404
        res.json(data);
      }
      data.error = 0;
      data.records = ["Updated sucessfully"];
      res.statusCode = 200
      res.json(data);
    });
  });
}
exports.api = api;