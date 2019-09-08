const assert=require('assert');
// location of where our mongoDB database is located
const url = "mongodb://localhost:27017";
const MongoClient = require('mongodb').MongoClient;
//const client = new MongoClient(url);
const dbName = 'test';
// Options for mongoDB
const mongoOptions = {useNewUrlParser : true ,  useUnifiedTopology: true  };


//this function adds a neu document(what) to a specific collection(where) of the db
const adNeuDocumentToCollection = function(what,where){
    const insertDocuments = function(db, callback) {
      // Get the documents collection
      const collection = db.collection(where);
      // Insert some documents
      collection.insertOne(what, function(err, result) {
        assert.equal(err, null);
        assert.equal(1,result.result.n);
        assert.equal(1,result.ops.length);
        console.log("Inserted 1 documents into the collection");
        callback(result);
      });
   };
   
   // Use connect method to connect to the server
   MongoClient.connect(url,mongoOptions, function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      
      const db = client.db(dbName);
      insertDocuments(db, function() {
      client.close();
      });
   });
};


module.exports={adNeuDocumentToCollection};