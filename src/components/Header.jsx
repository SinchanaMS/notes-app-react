import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const {loggedIn, logoutHandler} = useAuth()

  function handleLogin(e){
    loggedIn  ?  logoutHandler() : navigate("/")
}
  
  return (
    <div className='header'>
        <nav className="nav-links">
          <Link to="/">Home</Link> 
          {loggedIn ? 
          <div className='user-pages'>
            <Link to="/trash">Trash</Link>
            <Link to="/archive">Archives</Link>
            <Link to="/" onClick={handleLogin}>Logout</Link> 
          </div> :  
          <div className='auth-opts'>
            <Link to="/login"> Login</Link> 
            <Link to="/signup"> Sign Up</Link> 
          </div>}
        </nav>
    </div>
  )
}
