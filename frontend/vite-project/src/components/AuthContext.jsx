import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);

    const login = ({ access_token, refresh_token, id }) => {
        setUserData({ access_token, refresh_token, id });
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("id", id);
    };

	const logout = () => {
		setUserData(null);
        localStorage.clear();
	};

	return (
        <AuthContext.Provider value={{ userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider };