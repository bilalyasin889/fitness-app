import React, {createContext, useState, useEffect, useContext, useMemo} from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Create a custom hook to use the Auth Context
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
        } else {
            localStorage.removeItem('accessToken')
        }
    }, [accessToken]);

    useEffect(() => {
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        } else {
            localStorage.removeItem('refreshToken')
        }
    }, [refreshToken]);

    const storeTokens = (newAccessToken, newRefreshToken) => {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
    };

    const removeTokens = () => {
        setAccessToken(null);
        setRefreshToken(null);
    };

    const contextValue = useMemo(
        () => ({
            accessToken,
            refreshToken,
            storeTokens,
            removeTokens,
            isAuthenticated: () => accessToken !== null && refreshToken !== null,
        }),
        [accessToken, refreshToken]
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
