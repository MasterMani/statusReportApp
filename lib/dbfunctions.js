var sqlite = require('sqlite3').verbose();

Status = function(dbName){
  this.db = new sqlite.Database(dbName)
}

Status.prototype.serialize = function(callback) {
  this.db.serialize(callback);
};

Status.prototype.close = function(callback) {
  this.db.close(callback);
};

Status.prototype.fetchOne = function(tableName, columns, conditions, callback){
  var query = "select * from " + tableName;
  if(columns) query = "select "+ columns +" from " + tableName;
  if(conditions) query += " where " + conditions;
  this.db.get(query, callback)
}

Status.prototype.fetchAll = function(tableName, columns, conditions, callback){
  var query = "select * from " + tableName;
  if(columns) query = "select "+ columns +" from " + tableName;
  if(conditions) query += " where " + conditions;
  this.db.all(query, callback)
}

Status.prototype.fetchByRow = function(tableName, columns, conditions, callback, completeCB){
  var query = "select * from " + tableName;
  if(columns) query = "select "+ columns +" from " + tableName;
  if(conditions) query += " where " + conditions;
  this.db.each(query, callback, completeCB)
}

Status.prototype.insert = function(tableName, columns, values, callback){
  var query = "insert into " + tableName + " (" + columns + " ) values (" + values +")";
  this.db.run(query, callback)
}

Status.prototype.update = function(tableName, updateInfo, condition, callback){
  var query = "update " + tableName + " set " + updateInfo + " where " +  condition;
  this.db.run(query, callback)
}

Status.prototype.delete = function(tableName, condition, callback){
  var query = "delete from " + tableName + " where " + condition;
  this.db.run(query, callback);
}


exports.StatusDb = Status;