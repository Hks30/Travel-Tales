
const UserProfile = () => {
    // Use React.useState instead of importing useState
    const [profileData, setProfileData] = React.useState(null);
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);

    // Use React.useEffect instead of importing useEffect
    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile', { 
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    credentials: 'include' // Important for session cookies
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                
                if (data.errorMsg) {
                    setError(data.errorMsg);
                    setProfileData(null);
                } else {
                    setProfileData(data);
                    setError('');
                }
            } catch (err) {
                setError('Error fetching profile: ' + err.message);
                setProfileData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (isLoading) {
        return (
            React.createElement("div", { className: "profile-container" },
                React.createElement("div", { className: "loading" }, "Loading profile...")
            )
        );
    }

    if (error) {
        return (
            React.createElement("div", { className: "profile-container" },
                React.createElement("div", { className: "error-message" }, error)
            )
        );
    }

    if (!profileData || !profileData.userEmail) {
        return (
            React.createElement("div", { className: "profile-container" },
                React.createElement("div", { className: "error-message" }, 
                    "Cannot show profile -- no user logged in"
                )
            )
        );
    }

    return (
        React.createElement("div", { className: "profile-container" },
            React.createElement("h2", null, "User Profile"),
            
                React.createElement("div", { className: "profile-details" },
                    React.createElement("div", { className: "profile-row" },
                        React.createElement("label", null, "Welcome User ID : "),
                        React.createElement("span", null, profileData. webUserId)
                    ),
                    React.createElement("div", { className: "profile-row" },
                        React.createElement("label", null, "Email: "),
                        React.createElement("span", null, profileData.userEmail)
                    ),
                    profileData.birthday && 
                        React.createElement("div", { className: "profile-row" },
                            React.createElement("label", null, "Birthday: "),
                            React.createElement("span", null, profileData.birthday)
                        ),
                    profileData.membershipFee && 
                        React.createElement("div", { className: "profile-row" },
                            React.createElement("label", null, "Membership Fee: "),
                            React.createElement("span", null, profileData.membershipFee)
                        ),
                    profileData.userRoleType && 
                        React.createElement("div", { className: "profile-row" },
                            React.createElement("label", null, "Role: "),
                            React.createElement("span", null, profileData.userRoleType)
                        ),
                        React.createElement("div", { className: "profile-content" },
                            profileData.userImage && 
                                React.createElement("div", { className: "profile-image" },
                                    React.createElement("img", {
                                        src: profileData.userImage,
                                        alt: "Profile",
                                        className: "user-avatar"
                                    })
                                ),
                )
            )
        )
    
    );
};

