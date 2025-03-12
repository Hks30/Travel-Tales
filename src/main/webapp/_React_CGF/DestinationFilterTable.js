const DestinationFilterTable = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbList, setDbList] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [filterInput, setFilterInput] = React.useState("");
    const [filteredList, setFilteredList] = React.useState([]);
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'ascending' });
    const [showInsertForm, setShowInsertForm] = React.useState(false);
    
    React.useEffect(() => {
      ajax_alt(
        "destination/getAll",
        function (dbList) {
          if (dbList.dbError.length > 0) {
            console.log("Database error: " + dbList.dbError);
            setError(dbList.dbError);
          } else {
            console.log("Data loaded from the DB:");
            console.log(dbList.destinationList);
            setDbList(dbList.destinationList);
            setFilteredList(dbList.destinationList);
          }
          setIsLoading(false);
        },
        function (msg) {
          console.log("AJAX error: " + msg);
          setError(msg);
          setIsLoading(false);
        }
      );
    }, []);
  
    const doFilter = (filterInputVal) => {
      let newList = filterObjList(dbList, filterInputVal);
      console.log("Filtering by: " + filterInputVal);
      console.log(newList);
      setFilteredList(newList);
    };
  
    const clearFilter = () => {
      setFilterInput("");
      doFilter("");
    };
    const handleEmptyValue = (value) => {
        if (value === null || value.trim() === '') {
            return 'null';
        }
        return value;
    };
    
  
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    
        const sortedList = [...filteredList].sort((a, b) => {
            const aValue = handleEmptyValue(a[key]);  
            const bValue = handleEmptyValue(b[key]);
    
            if (aValue === 'null' && bValue === 'null') return 0; 
            if (aValue === 'null') return direction === 'ascending' ? -1 : 1;
            if (bValue === 'null') return direction === 'ascending' ? 1 : -1; 

            if (key === 'destinationId') {
                const numA = Number(aValue);
                const numB = Number(bValue);
                return direction === 'ascending' ? numA - numB : numB - numA;
            } else if (key === 'visit_date') {
                const aDate = new Date(aValue);
                const bDate = new Date(bValue);
                return direction === 'ascending' ? aDate - bDate : bDate - aDate;
            } else if (key === 'rating' || key === 'trip_duration') {
                const numA = parseFloat(aValue); 
                const numB = parseFloat(bValue);
                return direction === 'ascending' ? numA - numB : numB - numA;
            } else {
                return direction === 'ascending'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
        });
    
        setFilteredList(sortedList);
    };
     
    function callInsert() {
        window.location.hash = "#/destinationInsert";
    };

    const deleteDestination = (listObj) => {
        modalFw.confirm(
            `Do you really want to delete ${listObj.destination_name}?`,
            function() {  
                ajax_alt(
                    `destination/delete?destinationId=${listObj.destinationId}`,
                    function(result) {
                        if (result.errorMsg.length === 0) {
                            const newDbList = dbList.filter(dest => dest.destinationId !== listObj.destinationId);
                            const newFilteredList = filteredList.filter(dest => dest.destinationId !== listObj.destinationId);
                            setDbList(newDbList);
                            setFilteredList(newFilteredList);
                            modalFw.snackBar("Destination deleted successfully", 3000);
                        } else {
                            modalFw.alert("Error deleting destination: " + result.errorMsg);
                        }
                    },
                    function(errorMsg) {
                        modalFw.alert("Error making delete request: " + errorMsg);
                    }
                );
            }
        );
    };
 // deleteDestination
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="clickSort">
         <h3>
        <button className="insert-button" >
          <img src="icons/insert.png" alt="Insert" onClick={callInsert} />
          
        </button> &nbsp;
        Filterable Destination List &nbsp;
        <input
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder="Filter destinations..."
        />
        &nbsp;
        <button onClick={() => doFilter(filterInput)}>Search</button>
        &nbsp;
        <button onClick={clearFilter}>Clear</button>
      </h3>
          {showInsertForm && <DestinationInsert onInsertComplete={handleInsertComplete}  />}
            <table>
                <thead>
                    <tr>
                    <th></th>
                    <th></th>
                        <th onClick={() => requestSort('destinationId')} className="textAlignRight">
                            <img src="icons/sortUpDown16.png" alt="Sort" />Destination ID
                        </th>
                        <th onClick={() => requestSort('destination_name')}>
                            <img src="icons/sortUpDown16.png" alt="Sort" />Destination Name
                        </th>
                        <th className="textAlignCenter">Image</th>
                        <th onClick={() => requestSort('country')}>
                            <img src="icons/sortUpDown16.png" alt="Sort" />Country
                        </th>
                        <th className="textAlignRight" onClick={() => requestSort('rating')}>
                            <img src="icons/sortUpDown16.png" alt="Sort" />Rating
                        </th>
                        <th onClick={() => requestSort('visit_date')} className="textAlignRight">
                            <img src="icons/sortUpDown16.png" alt="Sort" />Visit Date
                        </th>
                        <th className="textAlignRight" onClick={() => requestSort('trip_duration')}>
                            <img src="icons/sortUpDown16.png" alt="Sort" />Trip Duration
                        </th>
                        <th onClick={() => requestSort('webUserId')} className="textAlignRight">
                            <img src="icons/sortUpDown16.png" alt="Sort" />Web User ID
                        </th>
                        <th onClick={() => requestSort('userEmail')}>
                            <img src="icons/sortUpDown16.png" alt="Sort" />User Email
                        </th>
                        <th className="textAlignCenter">User Image</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
    {filteredList.map((listObj) => (
        <tr key={listObj.destinationId}>
            <td className="textAlignCenter" onClick={() => deleteDestination(listObj)}>
            <img src="icons/delete.png" /></td>
            <td>
                <a href={'#/destinationUpdate/:'+listObj.destinationId}><img src="icons/update.png" className="clickLink"/></a>
            </td>
            <td className="textAlignRight">{handleEmptyValue(listObj.destinationId)}</td>
            <td>{handleEmptyValue(listObj.destination_name)}</td>
            <td className="shadowImage textAlignCenter">
                <img 
                    src={listObj.image_url.startsWith('http') ? listObj.image_url : `https://your-base-url.com/${listObj.image_url}`} 
                    alt={handleEmptyValue(listObj.destination_name)} 
                    style={{ maxWidth: "100px", height: "auto" }} 
                    loading="lazy" 
                />
            </td>
            <td>{handleEmptyValue(listObj.country)}</td>
            <td className="textAlignRight">{handleEmptyValue(listObj.rating)}</td>
            <td className="textAlignRight">{handleEmptyValue(listObj.visit_date)}</td>
            <td className="textAlignRight">{handleEmptyValue(listObj.trip_duration)}</td>
            <td className="textAlignRight">{handleEmptyValue(listObj.webUserId)}</td>
            <td>{handleEmptyValue(listObj.userEmail)}</td>
            <td className="shadowImage textAlignCenter">
                <img 
                    src={listObj.userImage.startsWith('http') ? listObj.userImage : `https://your-base-url.com/${listObj.userImage}`} 
                    alt={handleEmptyValue(listObj.userEmail)} 
                    style={{ maxWidth: "100px", height: "auto" }} 
                    loading="lazy"
                />
            </td>
            <td>{(listObj.errorMsg)}</td>
        </tr>
    ))}
</tbody>

            </table>
        </div>
    );
    
};
