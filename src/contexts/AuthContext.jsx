import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const userToken=localStorage.getItem("userToken")
    const navigate=useNavigate()

    useEffect(() => {
        if (userToken) {
          setLoggedIn(true);
        }
      }, [userToken]);
   
      const logoutHandler = () => {
        localStorage.removeItem("userToken");
        setLoggedIn(false);
        navigate("/");
      };

    return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn, logoutHandler}}>{children}</AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth}