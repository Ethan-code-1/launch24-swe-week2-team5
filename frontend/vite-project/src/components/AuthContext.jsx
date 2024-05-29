import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);

    const login = ({ access_token, refresh_token, id, firebaseId }) => {
        setUserData({ access_token, refresh_token, id });
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("id", id);
    };

	const logout = async ({id}) => {
		setUserData(null);
        localStorage.clear();
        console.log(id);
        const response = await axios.delete(`http://localhost:5001/spotify/logout/${id}`);
        console.log(response);
	};

	return (
        <AuthContext.Provider value={{ userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider };