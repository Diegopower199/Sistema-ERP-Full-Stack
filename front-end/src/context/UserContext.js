import React, {useState, useEffect, useContext} from "react";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [permisosUser, setPermisosUser] = useState(null);


    return (
        <AuthContext.Provider value={{authUser, setAuthUser, isLoggedIn, setIsLoggedIn, permisosUser, setPermisosUser}}>
            {children}
        </AuthContext.Provider>
    )
}