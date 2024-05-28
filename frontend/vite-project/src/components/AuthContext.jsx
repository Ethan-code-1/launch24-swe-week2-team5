import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [tokens, setTokens] = useState(null);

	const login = (tokens) => {
		setTokens(tokens);
	};

	const logout = () => {
		setTokens(null);
	};

	return (
        <AuthContext.Provider value={{ tokens, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider };