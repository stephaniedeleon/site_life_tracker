import { Link, useNavigate } from 'react-router-dom';
import apiClient from 'services/apiClient';
import React, { useContext } from "react";
import AuthContext from "contexts/auth";
import "./Navbar.css";

export default function Navbar() {

  const { setAppState, setUser, authenticated, setAuthenticated } = useContext(AuthContext);
  
  const navigate = useNavigate();

  //logs out the user
  const handleOnLogout = async () => {
    await apiClient.logoutUser();
    setAppState({});
    setUser({});
    setAuthenticated(false);
    navigate("/");
  }

  return (
    <div className="Navbar">
        <nav>
            <Link to='/' className="logo">
                <img src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" alt="codepath logo" />
                <h2>LifeTracker</h2>
            </Link>
            <div className="nav">
                <Link to='/activity'>Activity</Link>
                <Link to='/exercise'>Exercise</Link>
                <Link to='/nutrition'>Nutrition</Link>
                <Link to='/sleep'>Sleep</Link>
                {/* if user is not authenticated, it will show the log in and register
                  - if yes, it will show log out  */}
                { !authenticated ? (
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