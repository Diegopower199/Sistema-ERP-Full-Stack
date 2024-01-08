import React, {useState, useEffect, useContext} from "react";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tipoUser, setTipoUser] = useState(null);
    const [permisosUser, setPermisosUser] = useState(null);


    return (
        <AuthContext.Provider value={{authUser, setAuthUser, isLoggedIn, setIsLoggedIn, tipoUser, setTipoUser, permisosUser, setPermisosUser}}>
            {children}
        </AuthContext.Provider>
    )
}