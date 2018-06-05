var acctNumber;


function keyboardSelection(value){
    switch(document.getElementById("textarea").innerHTML){
        case Display2:
            getTextField(value);
            break;
        case Display3:
            processSelection(value);
            break;
        case Display4:
            switch (value){
                case 1:
                    processWithdrawal(500);
                    break;
                case 2:
                    processWithdrawal(1000);
                    break;
                case 3:
                    processWithdrawal(2000);
                    break;
                case 4:
                    processWithdrawal(5000);
                    break;
                case 5:
                    processWithdrawal(10000);
                    break;
                case 6:
                    processWithdrawal(20000);
                    break;
                case 7:
                    processWithdrawal(40000);
                    break;
                case 8:
                    document.getElementById("textarea").innerHTML = Display5;
                    break;
            }
            break;
            case Display5:
                getTextField(value);
                break;

            case Display6:
                cancelRequest(value);

            case Display8:
                getTextField(value);
                
    }
    
}

function clearTextField(){
    document.getElementById("textfield").value=" ";
}

function cancelButton(){
    if (document.getElementById("textarea").innerHTML != Display1){
        document.getElementById("textarea").innerHTML = Display6;
    }
}

/**
 * Get the card pin of the user
 * @param {userNumber} userNumber the account number of the card owner
 */
function requestPin(userNumber){
    if(document.getElementById("textarea").innerHTML == Display1){
       document.getElementById("textarea").innerHTML = Display2;
       acctNumber = userNumber;
    }
}

function getTextField(num){
    var text = num.toString();
    var oldValue = document.getElementById("textfield").value;
    var newValue = oldValue.concat(text)
    var val = document.getElementById("textfield").value = newValue; 
      
}

function processEnterKey(){
    
    switch (document.getElementById("textarea").innerHTML){
        case Display2:
            var pinEntered = document.getElementById("textfield").value;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){

                if (this.readyState == 4 && this.status == 200){
                    document.getElementById("textarea").innerHTML = Display3;
                    clearTextField();
                }

                else if(this.status == 404){
                    console.log("i got here")
                    document.getElementById("textarea").innerHTML = this.responseText;
                    setTimeout(()=>{
                        document.getElementById("textarea").innerHTML = Display6;
                    }, 3000)
                }
            }
            xhttp.open("GET", `/?transaction=validatepin&pin=${pinEntered}&accountNumber=${acctNumber}`, true);
            xhttp.send();
            break;

        case Display5:
            var amount = document.getElementById("textfield").value.toString();
            processWithdrawal(amount);    
            break;

        case Display8:
            amount = document.getElementById("textfield").value.toString();
            processDeposit();
            break;
    }
    
}