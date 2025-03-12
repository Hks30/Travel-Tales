function FindActivityReact() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [userIdInput, setUserIdInput] = React.useState("");
    const [msg, setMsg] = React.useState("startMsg");

    function findClick() {
        setIsLoading(true);

        // You have to encodeURI user input before putting it into a URL for an AJAX call.
        // Otherwise, the web server may reject your AJAX call (for security reasons).
        var url = "../webUser/getById?userId=" + encodeURI(userIdInput);

        console.log("onclick function will call ajax_alt with url: " + url);

        // for testing, this shows findClick was called, but if everything works, 
        // this test message will be overwritten by the success or failure fn below.
        setMsg("findClick was called (testing)"); 

        // ajax_alt takes three parameters:
        //   1. url to call
        //   2. success function (input param is object converted from json page)
        //   3. failure function (input param is error message string)
        ajax_alt(
            url,
            function (obj) {
                console.log("Ajax Success - got object (see next line).");
                console.log(obj);
                if (obj.errorMsg.length > 0) {
                    setMsg(<strong>{obj.errorMsg}</strong>);
                } else {
                    setMsg(
                        <div>
                            <h2>Welcome Web User {obj.webUserId} </h2>

                            Birthday: {obj.birthday} <br />
                            MembershipFee: {obj.membershipFee} <br />
                            User Role: {obj.userRoleId} {obj.userRoleType} <br />
                            <p> <img src={obj.userImage} /> </p>
                        </div>
                    );
                }
                setIsLoading(false);
            },
            function (errorMsg) {
                console.log("AJAX error. Here's the message: " + errMsg);
                setMsg("ajax failure: " + errorMsg);
                setIsLoading(false);
            }
        );

    }  // function findClick

    if (isLoading) {
        return (
            <div>
                <h1>... Loading ....</h1>
            </div>
        );
    }

    return (
        <div className="find">
            <h2>React Find UI</h2>
            Enter Id of Web User: &nbsp;
            <input value={userIdInput} onChange={(e) => setUserIdInput(e.target.value)} />
            <button onClick={findClick}>Find</button>
            <div>{msg}</div>
        </div>
    );
}


// I copy/paste the field names from the JSON file to be 
// sure I spell them spelled correctly (and case matters).

/* 
  "webUserId": "2",
  "userEmail": "ryan.renolds@action.com",
  "userPassword": "ppp",
  "userImage": "https://....jpg",
  "birthday": "",
  "membershipFee": "$89.84",
  "userRoleId": "2",
  "userRoleType": "View",
  "errorMsg": ""                 
 */