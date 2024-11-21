import { createContext } from "react";

export const AuthContext = createContext({
    isAuthenticated : false,
    setIsAuthenticated : (auth : boolean)=>{
        isAuthenticated : auth
    }
});