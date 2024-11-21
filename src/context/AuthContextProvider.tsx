import { ReactNode, useEffect, useState } from "react"
import Cookies from 'js-cookie';
import { AuthContext } from "./authContext";
type AuthProviderProps = {
    children: ReactNode;
  };
export const AuthProvider: React.FC<AuthProviderProps>= ({children})=>{
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    useEffect(() => {
        // Check for auth cookie presence
        const token = Cookies.get('bearer');
        setIsAuthenticated(!!token);
      }, []);
    return(
        <AuthContext.Provider value={{isAuthenticated , setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}