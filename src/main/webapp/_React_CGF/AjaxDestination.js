const AjaxDestination = (url) => { 
    console.log("destinationList running");

    const [items, setItems] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        ajax_alt(
            url,
            function (dbList) {
                if (dbList.dbError.length > 0) {
                    setError(dbList.dbError);
                } else {
                    console.log("in destinationList, here is destination list (on the next line):");
                    console.log(dbList.destinationList);
                    setItems(dbList.destinationList);
                }
                setIsLoading(false);
            },
            function (msg) {
                setError(msg);
                setIsLoading(false);
            }
        );
    }, []);
    function callInsert() {
        window.location.hash = "#/destinationInsert";
    }

    if (isLoading) {
        console.log("Is Loading...");
        return <div>Loading...</div>;
    }

    if (error) {
        console.log("Error...");
        return <div>Error: {error}</div>;
    }

    console.log("items for Destinations on next line");
    console.log(items);
    return (
        <div className="clickSort">
  <h3>
            <img src="icons/insert.png" alt="Insert User" onClick={callInsert} />
                Destination List
            </h3>            <table>
                <thead>
                    <tr>
                        <th>Destination Id</th>
                        <th className="textAlignCenter">Destination Name</th>
                        <th className="textAlignCenter">Image</th>
                        <th className="textAlignCenter">Country</th>
                        <th className="textAlignCenter">Description</th>
                        <th className="textAlignCenter">Visit Date</th>
                        <th className="textAlignCenter">Trip Duration</th>
                        <th className="textAlignRight">Rating</th>
                        <th className="textAlignCenter">Web User Id</th>
                        <th className="textAlignCenter">User Email</th>
                        <th className="textAlignCenter">User Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, index) =>
                            <tr key={item.destination_id}>
                                <td className="textAlignRight">{item.destinationId}</td>
                                <td className="textAlignCenter">{item.destination_name}</td>
                                <td className="shadowImage textAlignCenter"><img src={item.image_url} /></td>
                                <td className="textAlignCenter">{item.country}</td>
                                <td className="textAlignCenter">{item.description}</td>
                                <td className="textAlignCenter">{item.visit_date}</td>
                                <td className="textAlignCenter">{item.trip_duration}</td>
                                <td className="textAlignRight">{item.rating}</td>
                                <td className="textAlignCenter">{item.webUserId}</td>
                                <td className="textAlignCenter">{item.userEmail}</td>
                                <td className="shadowImage textAlignCenter"><img src={item.userImage} alt="User" /></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};
