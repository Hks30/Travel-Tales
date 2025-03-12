const UserInsertOrUpdate = (props) => {
    var action = "insertSimple";
    var id = "";
    var url = props.location.pathname;
    
    if (url.search(":") > -1) {
        const url_list = url.split(":");
        id = url_list[url_list.length - 1];
        action = "update";
    }

    const [userData, setUserData] = React.useState({
        webUserId: "",
        userEmail: "",
        userPassword: "",
        userPassword2: "",
        userImage: "",
        birthday: "",
        membershipFee: "",
        userRoleId: ""
    });

    const [roleList, setRoleList] = React.useState([]);
    const [errorObj, setErrorObj] = React.useState({
        webUserId: "",
        userEmail: "",
        userPassword: "",
        userPassword2: "",
        userImage: "",
        birthday: "",
        membershipFee: "",
        userRoleId: "",
        errorMsg: ""
    });

    const [isLoading, setIsLoading] = React.useState(true);
    const [isSaving, setIsSaving] = React.useState(false);

    const encodeUserInput = () => {
        var userInputObj = {
            "webUserId": userData.webUserId,
            "userEmail": userData.userEmail,
            "userPassword": userData.userPassword,
            "userPassword2": userData.userPassword2,
            "userImage": userData.userImage, 
            "birthday": userData.birthday,
            "membershipFee": userData.membershipFee,
            "userRoleId": userData.userRoleId
        };
        return encodeURIComponent(JSON.stringify(userInputObj));
    };

    const setProp = (obj, propName, propValue) => {
        var o = Object.assign({}, obj);
        o[propName] = propValue;
        return o;
    };

    React.useEffect(() => {
        const loadInitialData = async () => {
            try {
                ajax_alt("role/getAll",
                    function (obj) {
                        if (obj.dbError.length > 0) {
                            setErrorObj(setProp(errorObj, "userRoleId", obj.dbError));
                        } else {
                            obj.roleList.sort((a, b) => 
                                a.userRoleType > b.userRoleType ? 1 : -1
                            );
                            
                            setRoleList(obj.roleList);
                            
                            if (obj.roleList.length > 0) {
                                setUserData(prev => ({
                                    ...prev,
                                    userRoleId: obj.roleList[0].userRoleId
                                }));
                            }

                            if (action === "update" && id) {
                                ajax_alt("webUser/getById?userId=" + id,
                                    function (userObj) {
                                        if (userObj.errorMsg.length > 0) {
                                            setErrorObj(setProp(errorObj, "errorMsg", userObj.errorMsg));
                                        } else {
                                            const updatedUserData = {
                                                ...userObj,
                                                userPassword2: userObj.userPassword // Explicitly prepopluating userPassword2
                                            };
                                            setUserData(userObj);
                                            
                                        }
                                        setIsLoading(false);
                                    },
                                    function (ajaxErrorMsg) {
                                        setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                                        setIsLoading(false);
                                    }
                                );
                            } else {
                                setIsLoading(false);
                            }
                        }
                    },
                    function (ajaxErrorMsg) {
                        setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                        setIsLoading(false);
                    }
                );
            } catch (error) {
                setIsLoading(false);
            }
        };

        loadInitialData();
    }, []);

    const validate = () => {
        setIsSaving(true);
        setErrorObj(prev => ({ ...prev, errorMsg: "" }));

        ajax_alt(`webUser/${action}?jsonData=${encodeUserInput()}`,
            function (obj) {
                if (obj.errorMsg.length === 0) {
                    obj.errorMsg = "Record Saved Successfully!";
                }
                setErrorObj(obj);
                setIsSaving(false);
            },
            function (ajaxErrorMsg) {
                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                setIsSaving(false);
            }
        );
    };

    if (isLoading) {
        return <div>... Loading ...</div>;
    }

    return (
        <table className="insertArea">
            <tbody>
                <tr>
                    <td>Id</td>
                    <td>
                        <input value={userData.webUserId} disabled />
                    </td>
                    <td className="error">{errorObj.webUserId}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>
                        <input 
                            value={userData.userEmail} 
                            onChange={(e) => setUserData(setProp(userData, "userEmail", e.target.value))} 
                        />
                    </td>
                    <td className="error">{errorObj.userEmail}</td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>
                        <input 
                            type="password" 
                            value={userData.userPassword} 
                            onChange={(e) => setUserData(setProp(userData, "userPassword", e.target.value))} 
                        />
                    </td>
                    <td className="error">{errorObj.userPassword}</td>
                </tr>
                <tr>
                    <td>Re-enter Password</td>
                    <td>
                        <input 
                            type="password" 
                            value={userData.userPassword2} 
                            onChange={(e) => setUserData(setProp(userData, "userPassword2", e.target.value))} 
                        />
                    </td>
                    <td className="error">{errorObj.userPassword2}</td>
                </tr>
                <tr>
                    <td>Image URL</td>
                    <td>
                        <input 
                            value={userData.userImage} 
                            onChange={(e) => setUserData(setProp(userData, "userImage", e.target.value))} 
                        />
                    </td>
                    <td className="error">{errorObj.userImage}</td>
                </tr>
                <tr>
                    <td>Birthday</td>
                    <td>
                        <input 
                            value={userData.birthday} 
                            placeholder="MM/DD/YYYY" 
                            onChange={(e) => setUserData(setProp(userData, "birthday", e.target.value))} 
                        />
                    </td>
                    <td className="error">{errorObj.birthday}</td>
                </tr>
                <tr>
                    <td>Membership Fee</td>
                    <td>
                        <input 
                            value={userData.membershipFee} 
                            onChange={(e) => setUserData(setProp(userData, "membershipFee", e.target.value))} 
                        />
                    </td>
                    <td className="error">{errorObj.membershipFee}</td>
                </tr>
                <tr>
                    <td>Role</td>
                    <td>
                        <select 
                            value={userData.userRoleId} 
                            onChange={(e) => setUserData(setProp(userData, "userRoleId", e.target.value))}
                        >
                            {roleList.map((role) => (
                                <option key={role.userRoleId} value={role.userRoleId}>
                                    {role.userRoleType}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className="error">{errorObj.userRoleId}</td>
                </tr>
                <tr>
                    <td>
                        <button 
                            type="button" 
                            onClick={validate}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </td>
                    <td className="error" colSpan="2">
                        {errorObj.errorMsg}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};