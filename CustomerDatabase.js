/**
* This object is responsible for the database operations. For now it creates a database 
* and also creates a collection. More methods will be added as needed
*/

var Database = function(){
    var dbo;
   /**
    * Creates a new database
    * @param {string} name the name of the Database
    */
    this.CreateDataBase = function(name){
        return new Promise(function(resolve, reject){
             var MongoClient = require('mongodb').MongoClient;
             var url = "mongodb://localhost:27017/";
             
              MongoClient.connect(url, function(err, db){
                if(err) reject(err);
                else{
                    resolve(dbo = db.db(name));
                    console.log("DB started"); 
                }
            });
        });
    };
 
     /**
      * This property is a function responsible for creating a collection
      * @param {string} name name of the collection to be added into the database
      */
     this.CreateCollection = function(name){
         dbo.createCollection(name, function(err, result){
             if(err) throw err;  
             console.log("Collection created");
         });
     };

     /**
      * Inserts document into the collection.
      * @param {string} collection the collection to add the data
      * @param {object} data data to be added to the database
      * @param {{value: boolean}} multiple an object that contains a value parameter and boolean value signifying if a single or multiple data is to be added
      */

     this.Insert = function(collection, data, multiple){
         if(multiple.value == false){   
             dbo.collection(collection).insertOne(data, function(err, res){
                  if(err) throw new Error("Error finding file");
                
             });
         }
         else{
             dbo.collection(collection).insertMany(data, function(err, result){
                  if(err) throw err;
                  console.log("Number of document added: " + result.insertedCount);
             });
         }
     };
     
     /**
      * Finds a record in the collection
      * @param {string} collection The name of the collecion
      * @param {Number} acctNum The account number of the customer
      */
     this.Find = function(collection, acctNum){
         var query = {accountNumber: acctNum}
         return new Promise(function(resolve, reject){
             dbo.collection(collection).findOne(query, function (error, result){
                 if(error) reject(error);
                resolve(result);
                 
             });     
         });
     };
      
     /**
      * Updates the records in the collection
      * @param {string} collection the name of the collection
      * @param {Number} acctNum the customer account Number 
      * @param {Number} newValue the new value to update with
      * @param {string}  transaction the of update transaction
      */
     this.Update = function(collection, acctNum, newValue, transaction){
            this.Find(collection, acctNum).then(function(result){
                var presentBalance = result.accountBalance;
                var newBalance;
                if(transaction == "deposit"){
                    newBalance = presentBalance + newValue;
                }
                else{
                    newBalance = presentBalance - newValue;
                }
                var query = {accountNumber: acctNum};
                var updateValue = {$set:{accountBalance: newBalance}};
                dbo.collection(collection).updateOne(query, updateValue, function(err, res){
                    if (err) throw err;
                    return newBalance;
                });
           });
     };
};
 
 //exports the module object as Database
 module.exports = Database;