function Cash_Deposit(){
    
    this.Deposit = function(Database, acctNum, amount){
             Database.Update("Customer", acctNum, amount);
    }
}