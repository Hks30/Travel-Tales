// This is a version without using JS templating. Kind of tedius. 
// Not used now... 

function findActivity() {

    var findDiv = document.createElement("div");
    findDiv.classList.add("find");

    var userIdSpan = document.createElement('span');
    userIdSpan.innerHTML = "Enter Id of Web User: ";
    findDiv.appendChild(userIdSpan);
    
    var userIdInput = document.createElement("input");
    // userIdInput.setAttribute("type", "password"); // so it shows dots not characters
    // Note: for this lab activity, you may want to comment out setting the input type to password, 
    // but you will certainly want to apply input type=password to the password text box 
    // when you implement your own log on code.
    findDiv.appendChild(userIdInput);

    var findButton = document.createElement("button");
    findButton.innerHTML = "Find";
    findDiv.appendChild(findButton);

    var msgDiv = document.createElement("div");
    findDiv.appendChild(msgDiv);

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
                msg += "<strong>Error: " + obj.errorMsg + "</strong>";
            } else {
                msg += "<strong>Welcome Web User " + obj.webUserId + "</strong>";
                msg += "<br/> Birthday: " + obj.birthday;
                msg += "<br/> MembershipFee: " + obj.membershipFee;
                msg += "<br/> User Role: " + obj.userRoleId + " " + obj.userRoleType;
                msg += "<p> <img src ='" + obj.userImage + "'></p>";
            }
            msgDiv.innerHTML = msg;
        }
    };  // onclick function

    return findDiv;
}


// I copy/paste the field names from the JSON file to be 
// sure I have them spelled correctly (and case matters).

/* "webUserId": "110",
 "userEmail": "bri",
 "userPassword": "no",
 "birthday": "",
 "membershipFee": "",
 "userRoleId": "1",
 "userRoleType": "Admin",
 "errorMsg": ""                    
 */