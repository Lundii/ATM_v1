/**
 * Processes the Transaction selected by the customer
 * @param {number} selection 
 */
function processSelection(selection){
    var num = parseInt(selection)
    switch (num){
        case 1:
            document.getElementById("textarea").innerHTML = Display4;
            break;
        case 2:
            processAccountBalance();
            break;
        case 3:
            document.getElementById("textarea").innerHTML = Display8;
            break;
        case 4:
            document.getElementById("textarea").innerHTML = Display9;
    }
}

function cancelRequest(value){
       if (value == 2){
           document.getElementById("textarea").innerHTML = "Take your Card";
           setTimeout(() => {
               document.getElementById("textarea").innerHTML = Display1;
           }, 3000);
       }
       else if(value == 1){
           document.getElementById("textarea").innerHTML = Display2;
       }
}

function processWithdrawal(amount){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("textarea").innerHTML = this.responseText;
            clearTextField();
            setTimeout(()=>{
                document.getElementById("textarea").innerHTML = Display6;
            }, 3000)
        }
    }
    xhttp.open("GET", `/?transaction=withdrawal&accountNumber=${acctNumber}&amount=${amount}`, true);
    xhttp.send();
    document.getElementById("textarea").innerHTML = Display7;

}

function processAccountBalance(){
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function(){
         if (this.readyState == 4 && this.status == 200){
             setTimeout(()=>{
                 document.getElementById("textarea").innerHTML = this.responseText;
             }, 3000)
         }
     }
     xhttp.open("GET", `/?transaction=accountbalance&accountNumber=${acctNumber}`, true);
     xhttp.send();
     document.getElementById("textarea").innerHTML = Display7;
}

function processDeposit(DepAmount){
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setTimeout(()=>{
                    document.getElementById("textarea").innerHTML = this.responseText;
                    clearTextField();
                }, 3000)
            }
        }
    xhttp.open("GET", `/?transaction=deposit&accountNumber=${acctNumber}&amount=${DepAmount}`, true);
    xhttp.send();
    document.getElementById("textarea").innerHTML = Display7;
}

function processChangePin(pin){    
    var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function(){
         if (this.readyState == 4 && this.status == 200){
             setTimeout(()=>{
                 document.getElementById("textarea").innerHTML = this.responseText;
             }, 3000)
         }
     }
     xhttp.open("GET", `/?transaction=changePin&pin=${pin}&accountNumber=${acctNumber}`, true);
     xhttp.send();
     document.getElementById("textarea").innerHTML = Display7;
}
