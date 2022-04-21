import { Link, NavLink } from 'react-router-dom'
import { useAuth, useNote, useFilter } from '../contexts/contexts'
import mainLogo from "../assets/images/mainLogo.png"

export default function Header() {
  const {loggedIn, logoutHandler} = useAuth()
  const {allLabelsList} = useNote()
  const {filterState, filterDispatch} = useFilter()

  function handleLogin(e){
    loggedIn  ?  logoutHandler() : navigate("/")
  }

  return (
  <div className='header shadow'>
    <div className='brand-logo'>
      <img src={mainLogo} />
      <NavLink to="/" className="p-lg"> Jotter </NavLink>
    </div>
    <nav className="nav-links">
      {loggedIn ? 
      <Link to="/" onClick={handleLogin}> Logout </Link> :
      <div className='auth-opts'>
        <Link to="/login"> Login </Link> 
        <Link to="/signup"> Sign Up </Link> 
      </div>}
    </nav>

    {loggedIn &&  
    <div className="sidebar shadow">
      <nav className="side-nav">
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/archive"> Archives </NavLink>
        <NavLink to="/trash"> Trash </NavLink>
        <NavLink to="/" > Labels
          {allLabelsList.map(label => (
            label.length!==0 &&
            <div className="labels" style={{backgroundColor: filterState.labels.includes(label) && "var(--HOVER-BG)"}}>
              <span class="material-icons material-icons-outlined label">label</span>
              <p type="checkbox" data-value = {label} onClick={(e) => filterDispatch({type: "LABEL", payload: e.target.dataset.value})}> {label} </p>
            </div>
          ))}
        </NavLink>
      </nav>
    </div>
    }
  </div>
  )
}
