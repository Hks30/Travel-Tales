const UserAuthComponent = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [userProfile, setUserProfile] = React.useState(null);
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            
            if (data.errorMsg) {
                setError(data.errorMsg);
            } else {
                setUserProfile(data);
                await fetchProfile(); // Fetch profile after successful login
            }
        } catch (err) {
            setError('Login error: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await fetch('/api/profile', { method: 'GET' });
            const data = await response.json();
            
            if (data.errorMsg) {
                setError(data.errorMsg);
            } else {
                setUserProfile(data);
            }
        } catch (err) {
            setError('Error fetching profile: ' + err.message);
        }
    };

   const handleLogoff = async () => {
    try {
        const response = await fetch('/api/logoff', { method: 'POST' }); // Updated endpoint
        const data = await response.json();
        
        if (data.errorMsg) {
            setError(data.errorMsg);
        } else {
            setUserProfile(null); // Clear user profile
            setEmail('');
            setPassword('');
            setError('');
        }
    } catch (err) {
        setError('Logoff error: ' + err.message);
    }
};


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            {!userProfile ? (
                <div className="login-form">
                    <h2>Log On</h2>
                    <div className="form-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="form-control"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="form-control"
                        />
                    </div>
                    <button onClick={handleLogin} className="btn btn-primary">
                        Submit
                    </button>
                </div>
            ) : (
                <UserProfile userProfile={userProfile} onLogoff={handleLogoff} />
            )}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
