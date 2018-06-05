function Account_Balance(){
    /**
     *Gets the account balance of the customer
     * @param {Database} Database the database containing the customer's records
     * @param {Number} acctNum the account number of the customer
     */
    this.getAccountBalance = function(Database, acctNum){
            Database.Find("Customer").then(function(result){
                console.log(result.accomodation);
                return result.accountBalance;
            });
        
    }
}
