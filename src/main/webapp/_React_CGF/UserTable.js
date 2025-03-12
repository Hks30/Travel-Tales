const UserTable = () => {

    console.log("UserTable running !!");

    // Tell React that 'items' (an array of objects) is a state variable 
    // that (when changed by the React provided setter function 'setItems')
    // should redisplay this component. Set its initial value to [], an empty array.
    const [items, setItems] = React.useState([]);

    // Tell React that "error" is a state variable that (when changed by the React 
    // provided setter function 'setError') should redisplay this component. 
    // Set its initial value to null.
    const [error, setError] = React.useState(null);

    // Common React pattern. Display some "...Loading..." UI 
    // while the page is loading, then do whatever needs to be done
    // (presumably just once). 
    const [isLoading, setIsLoading] = React.useState(true);

    // useEffect takes two params. First is function to be run, 
    // second is list of state variables that (if they change) will 
    // cause that function to be run again. 
    // Common react pattern: with empty list of state variables, then 
    // that function is only run one time at the start of building the 
    // component. 

    // If you put initialization code before this useEffect, that code
    // would be run any time that a state variable changes (not good). 
    React.useEffect(
        () => {
            //NOTE: this only has the ../ because the code is in a subfolder... 
            //var url = "../webUser/getAll"; // URL for AJAX call to invoke
            var url = "webUser/getAll"; // URL for AJAX call to invoke

            // ajax_alt takes three parameters: the URL to read, Success Fn, Failure Fn.
            ajax_alt(
                url, // URL for AJAX call to invoke

                function (dbList) {   // ajax_alt calls this function if ajax call successful 
                    setIsLoading(false);
                    if (dbList.dbError.length > 0) { // ajax can be successful but still report a db error.
                        setError("Database Error. " + dbList.dbError);
                    } else {
                        console.log("in AjaxUserTable here is web user list (next line):");
                        console.log(dbList.webUserList);
                        setItems(dbList.webUserList);
                    }
                },
                function (errorMsg) { // ajax_alt calls this function if ajax call fails
                    setIsLoading(false);
                    setError("AJAX Error: " + errorMsg);
                }
            );

        },
        [] // list of state variables. empty means run just once
    );

    if (isLoading) {
        return <div> Loading... </div>
    }

    if (error != null) {
        return <div>
            <h3> {error} (error)</h3>
        </div>
    }

    // NOTE: onClick in react has a capital C, unlike regular JS onclick (no capital C).
    return (
        <div className="clickSort">
            <h3>(Plain) Web User List</h3>

            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th className="textAlignCenter">Image</th>
                        <th className="textAlignCenter">Birthday</th>
                        <th className="textAlignRight">Membership Fee</th>
                        <th>Role</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((listObj) =>
                            <tr key={listObj.webUserId}>
                                <td>{listObj.userEmail}</td>
                                <td className="shadowImage textAlignCenter"><img src={listObj.userImage} /></td>
                                <td className="textAlignCenter">{listObj.birthday}</td>
                                <td className="textAlignRight">{listObj.membershipFee}</td>
                                <td className="nowrap">{listObj.userRoleId} {listObj.userRoleType}</td>
                                <td>{listObj.errorMsg}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};