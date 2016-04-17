var api = {},
    statusDb = require('./lib/dbfunctions').StatusDb,
    dbName = "testdb.db",
    tableName = 'schemaTest',
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
    db.close();
  });
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
    db.close();
  });
}

api.updateOne = function(req, res){
  var updateInfo = req.body.updateInfo,
      condition = parseInt(req.params.id),
      data = {};
  if(!condition){
    data.error = 1
    data.errorMsg = "Condition is invalid " + req.params.id;
    res.json(data);
  }
  console.log(req.params.id)
  console.log(updateInfo)
  console.log(condition);
  db.serialize(function(){
    db.update(tableName, updateInfo, condition, function(err){
      if(err){
        data.errorMsg = "Update fails " + err;
        res.json(data);
      }
      data.error = 0;
      data.records = ["Updated sucessfully"];
      res.json(data);
    });
  });
}
exports.api = api;