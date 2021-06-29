import { Link } from 'react-router-dom';
import Login from "../Login/Login";
import "./Activity.css";

export default function Activity({ user, setAppState, exercises }) {
  const isAuthenticated = Boolean(user?.email);

  let exerciseMin = 0;

  if (isAuthenticated) {
    exercises.map((exercise) => (
      exerciseMin += exercise.duration
    ));
  }

  return (
    <div className="Activity"> 
      { isAuthenticated ? (
          <div> 
            Activity
            <br/>
            <Link to='/exercise/create'>Add Exercise</Link>
            <p>Exercise Minutes: {exerciseMin}</p>
          </div>
        ) : (
          <div> 
            <p className="warning">You must be logged in to access this page.</p>
            <Login setAppState={setAppState}/>
          </div>
      ) }
    </div>
  )
}