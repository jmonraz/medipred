import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    const updateUser = userData => {
        setUser(userData);
    };

    const updateAuthenticated = value => {
        setAuthenticated(value);
    };

    return (
        <UserContext.Provider value={{ user, updateUser, authenticated, updateAuthenticated }}>
            {children}
        </UserContext.Provider>
    )
}