import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import mainLogo from "../assets/images/mainLogo.png"
import { useNote } from '../contexts/NoteContext'

export default function Header() {
  const {loggedIn, logoutHandler} = useAuth()
  const {notesData} = useNote()
  const finalTagsList = [...new Set(notesData.tagsList)]

  function handleLogin(e){
    loggedIn  ?  logoutHandler() : navigate("/")
  }

  return (
  <div className='header shadow'>
    <div className='brand-logo'>
      <img src={mainLogo} />
      <p className='p-lg'>Jotter</p>
    </div>
    <nav className="nav-links">
      {loggedIn ? 
      <Link to="/" onClick={handleLogin}>Logout</Link> :
      <div className='auth-opts'>
        <Link to="/login"> Login</Link> 
        <Link to="/signup"> Sign Up</Link> 
      </div>}
    </nav>

    <div className="sidebar shadow">
      <nav className="side-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/labels">Labels
          {finalTagsList.map(tag => (
          tag.length!==0 &&
          <div className="labels">
          <span class="material-icons material-icons-outlined label">label</span>
          <p>{tag}</p>
          </div>
          ))}
        </NavLink>
        <NavLink to="/archive">Archives</NavLink>
        <NavLink to="/trash">Trash</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </div>
  </div>
  )
}
