

const DestinationInsert = (props) => {
    var action = "insert";
    var id = "";
    var url = props.location.pathname;
    
    if (url.search(":") > -1) {
        const url_list = url.split(":");
        id = url_list[url_list.length - 1];
        action = "update";
    }
    
    const [destinationData, setDestinationData] = React.useState({
        destinationId: "",
        destination_name: "",
        country: "",
        description: "",
        image_url: "",
        visit_date: "",
        trip_duration: "",
        rating: "",
        webUserId: ""
    });

    const [userList, setUserList] = React.useState([]);
    const [errorObj, setErrorObj] = React.useState({
        destinationId: "",
        destination_name: "",
        country: "",
        description: "",
        image_url: "",
        visit_date: "",
        trip_duration: "",
        rating: "",
        webUserId: "",
        errorMsg: ""
    });

    const [isLoading, setIsLoading] = React.useState(true);
    const [isSaving, setIsSaving] = React.useState(false);

    const encodeDestinationInput = () => {
        const processedDestinationData = {
            ...destinationData,
            rating: destinationData.rating === "null" ? "" : destinationData.rating
        };
        
        return encodeURI(JSON.stringify({
            "destinationId": processedDestinationData.destinationId,
            "destination_name": processedDestinationData.destination_name,
            "country": processedDestinationData.country,
            "description": processedDestinationData.description,
            "image_url": processedDestinationData.image_url,
            "visit_date": processedDestinationData.visit_date,
            "trip_duration": processedDestinationData.trip_duration,
            "rating": processedDestinationData.rating,
            "webUserId": processedDestinationData.webUserId
        }));
    };
    
    const setProp = (obj, propName, propValue) => {
        var o = Object.assign({}, obj); 
        o[propName] = propValue;
        return o;
    };

    React.useEffect(() => {
        console.log("AJAX call for user list");
        ajax_alt("webUser/getAll",
            function (obj) {
                if (obj.dbError.length > 0) {
                    setErrorObj(setProp(errorObj, "webUserId", obj.dbError));
                } else {
                    setUserList(obj.webUserList);
                }
            },
            (ajaxErrorMsg) => setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg))
        );
    }, []);
    
    React.useEffect(() => {
        console.log("AJAX call for destination list");
        ajax_alt("destination/getAll",
            function (obj) {
                if (obj.dbError.length > 0) {
                    setErrorObj(setProp(errorObj, "destinationId", obj.dbError));
                } else {
                    if (action === "update" && id) {
                        ajax_alt(`destination/getById?destinationId=${id}`,
                            function (obj) {
                                if (obj.errorMsg.length > 0) {
                                    setErrorObj(setProp(errorObj, "errorMsg", obj.errorMsg));
                                } else {
                                    setDestinationData(obj);
                                }
                                setIsLoading(false);
                            },
                            (ajaxErrorMsg) => {
                                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                                setIsLoading(false);
                            }
                        );
                    } else {
                        setIsLoading(false);
                    }
                }
            },
            (ajaxErrorMsg) => {
                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                setIsLoading(false);
            }
        );
    }, []);
    


// Refactored validate function
const validate = () => {
    setIsSaving(true);
    setErrorObj(setProp(errorObj, "errorMsg", ""));
    
    // Use the helper function to encode the input object
    ajax_alt(`destination/${action}?jsonData=${encodeDestinationInput()}`,
        function (obj) {
            if (obj.errorMsg.length === 0) {
                obj.errorMsg = "Record Saved!";
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
        return <div> ... Loading ... </div>;
    }
    return (
        <table className="insertArea">
            <tbody>
                <tr>
                    <td>Id</td>
                    <td><input value={destinationData.destinationId} disabled /></td>
                    <td className="error">{errorObj.destinationId}</td>
                </tr>
                <tr>
                    <td>Destination Name</td>
                    <td>
                        <input value={destinationData.destination_name} 
                               onChange={e => setDestinationData(setProp(destinationData, "destination_name", e.target.value))} 
                        />
                    </td>
                    <td className="error">{errorObj.destination_name}</td>
                </tr>
                <tr>
                    <td>Country</td>
                    <td>
                        <input value={destinationData.country} 
                               onChange={e => setDestinationData(setProp(destinationData, "country", e.target.value))} 
                        />
                    </td>
                    <td className="error">{errorObj.country}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>
                        <input value={destinationData.description} 
                               onChange={e => setDestinationData(setProp(destinationData, "description", e.target.value))} 
                        />
                    </td>
                    <td className="error">{errorObj.description}</td>
                </tr>
                <tr>
                    <td>Image URL</td>
                    <td>
                        <input value={destinationData.image_url} 
                               onChange={e => setDestinationData(setProp(destinationData, "image_url", e.target.value))} 
                        />
                    </td>
                    <td className="error">{errorObj.image_url}</td>
                </tr>
                <tr>
                    <td>Visit Date</td>
                    <td>
                        <input value={destinationData.visit_date} 
                               onChange={e => setDestinationData(setProp(destinationData, "visit_date", e.target.value))}placeholder="MM/DD/YYYY" 
                        />
                    </td>
                    <td className="error">{errorObj.visit_date}</td>
                </tr>
                <tr>
                    <td>Trip Duration</td>
                    <td>
                        <input value={destinationData.trip_duration} 
                               onChange={e => setDestinationData(setProp(destinationData, "trip_duration", e.target.value))} 
                        />
                    </td>
                    <td className="error">{errorObj.trip_duration}</td>
                </tr>
                <tr>
                    <td>Rating</td>
                    <td>
                        <input value={destinationData.rating} 
                               onChange={e => setDestinationData(setProp(destinationData, "rating", e.target.value))} 
                        />
                    </td>
                    <td className="error">{errorObj.rating}</td>
                </tr>
                <tr>
                    <td>Web User</td>
                    <td>
                        <select
                            value={destinationData.webUserId}
                            onChange={e => setDestinationData(setProp(destinationData, "webUserId", e.target.value))}
                        >
                            <option value="">Select a User</option>
                            {userList.map(user => (
                                <option key={user.webUserId} value={user.webUserId}>
                                    {user.userEmail}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className="error">{errorObj.webUserId}</td>
                </tr>
                <tr></tr>
                <tr>
                <td>
                        <button 
                            type="button" 
                            onClick={validate} 
                            disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </td>
                    <td className="error" colSpan="2">{errorObj.errorMsg}</td>
                </tr>
            </tbody>
        </table>
    );
}    