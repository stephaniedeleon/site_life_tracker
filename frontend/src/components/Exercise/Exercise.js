import Login from "../Login/Login";
import { Link } from 'react-router-dom';
import "./Exercise.css";

export default function Exercise({ user, setAppState }) {
  const isAuthenticated = Boolean(user?.email);

    return (
      <div className="Exercise">
        { isAuthenticated ? (
          <div> 
            Exercise
            <br/>
            <Link to='/exercise/create'>Create Exercise</Link>
          </div>
        ) : (
          <div> 
            <p className="warning">You must be logged in to access this page.</p>
            <Login setAppState={setAppState} />
          </div>  
        ) }
      </div>
    );
}