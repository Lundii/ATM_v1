var Display1 = sprintf("%s\n%4s", "WELCOME TO ONLINE ATM", "Please insert your card");
var Display2 = sprintf("%s\n%s", "Enter your pin", "Click Enter");
var Display3 = sprintf("%s\n%s\n%s\n%s\n%s\n%s\n", "Welcome.",
                                               "Select Transaction",
                                               "1. WITHDRAWAL",
                                               "2. ACCOUNT BALANCE",
                                               "3. DEPOSIT",
                                               "4. CHANGE PIN")
var Display4 = sprintf("%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s", "Select Amount",
                                                   "1. 500",
                                                   "2. 1,000",
                                                   "3. 2,000",
                                                   "4. 5,000",
                                                   "5. 10,000",
                                                   "6. 20,000",
                                                   "7. 40,000",
                                                   "8. Others")
var Display5 = sprintf("%s", "Enter amount");
var Display6 = sprintf("%s\n%s\n%s", "Do you want to perform another transaction?",
                                                   "1. Yes",
                                                   "2. No")
var Display7 = sprintf("%s", "Please Wait");
var Display8 = sprintf("%s", "Enter Deposit Amount");
var Display9 = sprintf("%s", "Enter New Pin");
                                                   
document.getElementById("textarea").innerHTML = Display1;