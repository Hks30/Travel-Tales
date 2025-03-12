"use strict";

const UserFilterTable = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbList, setDbList] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [filterInput, setFilterInput] = React.useState("");
    const [filteredList, setFilteredList] = React.useState([]);
    
    // State to keep track of sorting configuration
    const [sortConfig, setSortConfig] = React.useState({ key: '', direction: 'ascending' });

    console.log("UserFilterTable running!!");

    React.useEffect(() => {
        ajax_alt(
            "webUser/getAll", 
            function (dbList) {
                if (dbList.dbError.length > 0) {
                    console.log("Database error was " + dbList.dbError);
                    setError(dbList.dbError);
                } else {
                    console.log("Data was read from the DB. See next line,");
                    console.log(dbList.webUserList);
                    setDbList(dbList.webUserList);
                    setFilteredList(dbList.webUserList);
                }
                setIsLoading(false); 
            },
            function (msg) { 
                console.log("Ajax error encountered: " + msg);
                setError(msg);
                setIsLoading(false); 
            }
        );
    }, []);

    const doFilter = (filterInputVal) => {
        let newList = filterObjList(dbList, filterInputVal);
        console.log("function doFilter. filterInputVal is: " + filterInputVal + ". See filtered list on next line:");
        console.log(newList);
        setFilteredList(newList);
    };

    const clearFilter = () => {
        setFilterInput("");
        doFilter("");
    };
    function callInsert() {
        window.location.hash = "#/userInsert";
    };
    const sortByProp = (propName) => {
        let direction = 'ascending';
        if (sortConfig.key === propName && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedList = [...filteredList].sort((a, b) => {
            if (a[propName] < b[propName]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[propName] > b[propName]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setFilteredList(sortedList);
        setSortConfig({ key: propName, direction });
        console.log("Sorted list:", sortedList);
    };


    // invoke a web API passing in userId to say which record you want to delete. 
    // but also remove the row (of the clicked upon icon) from the HTML table -- 
    // if Web API sucessful... 
    const deleteUser = (userObj) => {
        modalFw.confirm(
            `Do you really want to delete ${userObj.userEmail}?`,
            function() {
            ajax_alt(
                `webUser/delete?userId=${userObj.webUserId}`,
                function(result) {
                    if (result.errorMsg.length === 0) {
                        // Delete was successful, update both lists
                        const newDbList = dbList.filter(user => user.webUserId !== userObj.webUserId);
                        const newFilteredList = filteredList.filter(user => user.webUserId !== userObj.webUserId);
                        setDbList(newDbList);
                        setFilteredList(newFilteredList);
                        modalFw.snackBar("User deleted successfully", 3000);

                    } else {
                        alert("Error deleting user: " + result.errorMsg);
                    }
                },
                function(errorMsg) {
                    alert("Error making delete request: " + errorMsg);
                }
            );
        }
    );
};
 // deleteUser

    if (isLoading) {
        console.log("initial rendering, Data not ready yet...");
        return <div> Loading... </div>;
    }

    if (error) {
        console.log(`there must have been an ajax error (e.g., bad URL), or database error (e.g., connection error because not tunnelled in)...`);
        return <div>Error: {error} </div>;
    }

    return (
        <div className="clickSort">
            <h3>
            <button className="insert-button">
          <img src="icons/insert.png" alt="Insert"  onClick={callInsert}/>
          
        </button> &nbsp;
                Filterable User List &nbsp;
                <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                &nbsp; 
                <button onClick={() => doFilter(filterInput)}>Search</button>
                &nbsp; 
                <button onClick={clearFilter}>Clear</button>
            </h3>

            <table>
                <thead>
                    <tr>
                    <th></th>
                    <th></th>
                        <th onClick={() => sortByProp("userEmail")}>
                            <img src="icons/sortUpDown16.png" alt="Sort" />Email
                        </th>
                        <th className="textAlignCenter">Image</th>
                        <th className="textAlignRight" onClick={() => sortByProp("birthday")}>
                            <img src="icons/sortUpDown16.png" alt="Sort" />Birthday
                        </th>
                        <th className="textAlignRight" onClick={() => sortByProp("membershipFee")}>
                            <img src="icons/sortUpDown16.png" alt="Sort" />Membership Fee
                        </th>
                        <th onClick={() => sortByProp("userRoleType")}>
                            <img src="icons/sortUpDown16.png" alt="Sort" />Role
                        </th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((listObj) => (
                        <tr key={listObj.webUserId}>
                            <td className="textAlignCenter" onClick={() => deleteUser(listObj)}>
                            <img src="icons/delete.png" /></td>
                            <td>
                                    <a href={'#/userUpdate/:'+listObj.webUserId}><img src="icons/update.png" className="clickLink"/></a>
                                </td>                                
                                <td>{listObj.userEmail}</td>
                            <td className="shadowImage textAlignCenter"><img src={listObj.userImage} /></td>
                            <td className="textAlignRight">{listObj.birthday}</td>
                            <td className="textAlignRight">{listObj.membershipFee}</td>
                            <td className="nowrap">{listObj.userRoleType}</td>
                            <td>{listObj.errorMsg}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

