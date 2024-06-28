import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {TokenService} from './TokenService';
import {useNavigate} from "react-router-dom";

// Create the Auth Context
const AuthContext = createContext();

// Create a custom hook to use the Auth Context
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(TokenService.getToken());
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            TokenService.setToken(token);
        }
    }, [token]);

    const storeToken = (newAccessToken) => {
        setToken(newAccessToken);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const removeToken = useCallback(() => {
        setToken(null);
        TokenService.removeToken();
        navigate('/login');
    }, [navigate]);

    const isAuthenticated = useMemo(() => {
        if (TokenService.isTokenValid(token)) {
            return true;
        } else if (token) {
            removeToken();
            return false;
        }
        return false;
    }, [token, removeToken]);

    const contextValue = useMemo(
        () => ({
            accessToken: token,
            storeToken,
            removeToken,
            isAuthenticated
        }),
        [token, removeToken, isAuthenticated]
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
