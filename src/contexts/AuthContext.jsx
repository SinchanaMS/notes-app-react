import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFilter } from "./FilterContext"

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const {filterDispatch} = useFilter()
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
        filterDispatch({type: "CLEAR"})
      };

    return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn, logoutHandler}}>{children}</AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth}