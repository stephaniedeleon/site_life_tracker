import Login from "../Login/Login";
import "./Exercise.css";

export default function Exercise({ user, setAppState }) {
  const isAuthenticated = Boolean(user?.email);

    return (
      <div className="Exercise">
          { isAuthenticated ? (
          <div> 
            Exercise
          </div>
        ) : (
          <div> 
            <p className="warning">You must be logged in to access that page.</p>
            <Login setAppState={setAppState}/>
          </div>
      ) }
      </div>
    );
}