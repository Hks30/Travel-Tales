const LogOff = (props) => {
    const [logoffMessage, setLogoffMessage] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogoff = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/logoff', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();
            
            if (data.errorMsg) {
                setLogoffMessage(data.errorMsg);
                // Redirect to home page after successful logoff
                setTimeout(() => {
                    props.history.push('/home');
                }, 2000);
            } else {
                setError('Unexpected response from server');
            }

        } catch (err) {
            setError(`Logoff failed: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        handleLogoff();
    }, []); 
    return (
        <div className="content">
            {isLoading ? (
                <div style={{textAlign: 'center', padding: '20px'}}>
                    <p>Logging off...</p>
                </div>
            ) : (
                <div>
                    {logoffMessage && (
                        <div style={{
                            padding: '10px',
                            margin: '10px 0',
                            backgroundColor: '#e8f5e9',
                            border: '1px solid #4caf50',
                            color: '#2e7d32',
                            borderRadius: '4px'
                        }}>
                            {logoffMessage}
                        </div>
                    )}
                    
                    {error && (
                        <div style={{
                            padding: '10px',
                            margin: '10px 0',
                            backgroundColor: '#ffebee',
                            border: '1px solid #ef5350',
                            color: '#c62828',
                            borderRadius: '4px'
                        }}>
                            {error}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


const WrappedLogOff = ReactRouterDOM.withRouter(LogOff);