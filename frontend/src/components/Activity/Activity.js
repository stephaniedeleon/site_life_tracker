import Login from "../Login/Login";
import "./Activity.css";

export default function Activity({ user, setAppState }) {
  const isAuthenticated = Boolean(user?.email);

  return (
    <div className="Activity"> 
      { isAuthenticated ? (
          <div> 
            Activity
          </div>
        ) : (
          <div> 
            <p className="warning">You must be logged in to access that page.</p>
            <Login setAppState={setAppState}/>
          </div>
      ) }
    </div>
  )
}