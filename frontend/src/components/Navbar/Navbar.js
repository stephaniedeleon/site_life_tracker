import { Link, useNavigate } from 'react-router-dom'
import logo from "../../images/logo.png";
import "./Navbar.css";

export default function Navbar({ user, setAppState }) {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(user?.email);

  const handleOnLogout = () => {
    setAppState({});
    navigate("/");
  }

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
                {/* if user is not authenticated or logged in, it will show the log in and register
                  - if yes, it will show log out  */}
                { !isAuthenticated ? (
                  <div> 
                    <Link to='/login' className='login-link'>Sign In</Link>
                    <Link to='/register' className='register-link'>Sign Up</Link>
                  </div>
                ) : (
                  <button className="logout" onClick={handleOnLogout}>
                    Sign Out
                  </button>
                ) }
            </div>
        </nav>
    </div>
  )
}