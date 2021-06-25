import { Link } from 'react-router-dom'

import logo from "../../images/logo.png";
import "./Navbar.css";

export default function Navbar() {

  return (
    <div className="Navbar">
        <nav>
            <Link to='/' className="logo">
                <img src={logo} alt="codepath logo" />
                <h2>Life Tracker</h2>
            </Link>
            <div className="nav">
                <Link to='/activity'>Activity</Link>
                <Link to='/exercise'>Exercise</Link>
                <Link to='/nutrition'>Nutrition</Link>
                <Link to='/sleep'>Sleep</Link>
                <Link to='/login' className='login-link'>Login</Link>
                <Link to='/register' className='register-link'>Signup</Link>
            </div>
        </nav>
    </div>
  )
}