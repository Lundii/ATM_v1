var Database = require("./CustomerDatabase");

/*for future update*/
// var Account_Balance = require("./Account_Balance");
// var Cash_Deposit = require("./Cash_Deposit");
// var Withdrawal = require("./Withdrawal");

var database = new Database();
database.CreateDataBase("BANKCUSTOMERS").then(function(){
   database.CreateCollection("Customers");
});

var myobj = [{ accountName: "monday", accountNumber: 1133567890, cardpin: 1234, accountBalance: 50000},
             { accountName: "friday", accountNumber: 1234567890, cardpin: 4321, accountBalance: 45000},
             { accountName: "sunday", accountNumber: 1231237890, cardpin: 6789, accountBalance: 75000}]
setTimeout(function(){
    database.Insert("Customers", myobj, {value: true});
},3000);

var express = require("express");
var app = express();

var handlebars = require('../Projects/node_modules/express3-handlebars')
.create({defaultLayout: "main"});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get("/", function(req, res){
    
    switch(req.query.transaction){
        case "validatepin":
            var pin = parseInt(req.query.pin);
            var acctNumber = parseInt(req.query.accountNumber);
            database.Find("Customers", acctNumber).then(
                function(result){
                    if (result.cardpin == pin){
                        res.send();
                    }
                    else{
                        res.status(404);
                        res.send("InCorrect Pin");
                    }
                }
            );
            break;

        case "accountbalance":
            acctNumber = parseInt(req.query.accountNumber);
            database.Find("Customers", acctNumber).then(
                function(result){
                    var balance = result.accountBalance.toString();
                    res.send(`Balance ${balance}`);
                }
            )
            break;

        case "deposit":
            acctNumber = parseInt(req.query.accountNumber);
            var amount = parseInt(req.query.amount);
            database.Update("Customers", acctNumber, amount, "deposit");
            setTimeout(function(){
                res.send("Account Updated")
            }, 3000);
            break;
        
        case "withdrawal":
            acctNumber = parseInt(req.query.accountNumber);
            amount = parseInt(req.query.amount);
            database.Find("Customers", acctNumber).then(
                function(result){
                    balance = result.accountBalance;
                    if (amount > balance){
                        res.send("Insufficent Balance")
                    }
                    else{
                        database.Update("Customers", acctNumber, amount, "withdrawal");
                        setTimeout(function(){
                            res.send("Take your cash");
                        }, 3000);
                    }
                }
            )
            break;
        
        case "changePin":
            var pin = parseInt(req.query.pin);
            acctNumber = parseInt(req.query.accountNumber);
            database.UpdatePin("Customers", acctNumber, pin).then(
                function(result){
                    res.send("Pin Changed");
                }
            )
            break;
        
        default:
        res.render('atm', {name: "ATM"});
        //  res.sendFile(__dirname + "/ATMGUI.html");
    }
});

app.listen(2000, function(){
    console.log("Server Started");
})