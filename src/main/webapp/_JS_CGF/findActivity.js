function findActivity() {

    var findDiv = document.createElement("div");
    findDiv.classList.add("find");

    findDiv.innerHTML = `
    <h2>JS Find UI</h2>
    Enter Id of Web User: <input type="password" class="userIdInputC"/>
    <button class="findButtonC">Find</button>
    <div class="msgDivC"></div>
    `;
    

    // Note: for your HW, you'll want to add "type=password" to the input tag: 
    // <input type="password" class="userIdInputC"/>
    
    // Get references to all elements (within findDiv.innerHMTML) that we need to access.  
    var userIdInput = findDiv.getElementsByClassName("userIdInputC")[0];
    var findButton = findDiv.getElementsByClassName("findButtonC")[0];
    var msgDiv = findDiv.getElementsByClassName("msgDivC")[0];

    findButton.onclick = function () {

        // You have to encodeURI user input before putting into a URL for an AJAX call.
        // Otherwise, your URL may be refused (for security reasons) by the web server.
        var url = "webUser/getById?userId=" + encodeURI(userIdInput.value);

        console.log("onclick function will make AJAX call with url: " + url);
        ajax(url, processLogon, msgDiv);

        function processLogon(obj) {
            var msg = "";
            console.log("Successfully called the find API. Next line shows the returned object.");
            console.log(obj);
            if (obj.errorMsg.length > 0) {
                msg += `<strong>Error: ${obj.errorMsg} </strong>`;
            } else {
                msg += `<strong>Welcome Web User ${obj.webUserId} </strong> <br/> 
                Birthday: ${obj.birthday} <br/> 
                MembershipFee: ${obj.membershipFee} <br/> 
                User Role: ${obj.userRoleId} ${obj.userRoleType} <br/> 
                <p> <img src ='${obj.userImage}'></p>`;
            }
            msgDiv.innerHTML = msg;
        }
    };  // onclick function

    return findDiv;
}


// I copy/paste the field names from the JSON file to be 
// sure I have them spelled correctly (and case matters).

/* 
{
  "webUserId": "2",
  "userEmail": "ryan.renolds@action.com",
  "userPassword": "ppp",
  "userImage": "https://....jpg",
  "birthday": "",
  "membershipFee": "$89.84",
  "userRoleId": "2",
  "userRoleType": "View",
  "errorMsg": ""
}                    
 */