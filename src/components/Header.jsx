import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='header'>
        <span class="material-icons">menu</span>
        <nav className="nav-links">
        <Link to="/">Home</Link> 
        <Link to="/login"> Login</Link> 
        <Link to="/signup"> Sign Up</Link> 
        <Link to="/api"> API</Link> 
        </nav>
        <span class="material-icons dark-mode">nightlight</span>
        {/* Line 16 will be uncommented later */}
        {/* <span class="material-icons light-mode">light_mode</span>  */}
    </div>
  )
}
