import Login from "../Login/Login";
import "./Nutrition.css";

export default function Nutrition({ user, setAppState }) {
  const isAuthenticated = Boolean(user?.email);

    return (
      <div className="Nutrition">
          { isAuthenticated ? (
          <div> 
            Nutrition
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