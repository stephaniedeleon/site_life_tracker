import { Link } from 'react-router-dom';
import Login from "../Login/Login";
import ExCard from "./ExCard/ExCard";
import "./Exercise.css";

export default function Exercise({ user, setAppState, exercises }) {

  const isAuthenticated = Boolean(user?.email);  

  return (
    <div className="Exercise">
      { isAuthenticated ? (
        <div className="exercise-area">
          <div className="title">
            <h1>Overview</h1>
            <Link to='/exercise/create'>Add Exercise</Link>
          </div>
          <br/>
          <br/>
          <div className="overview">
            {exercises.map((exercise) => (
              <ExCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
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