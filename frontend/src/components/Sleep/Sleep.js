import { Login, PageHeader } from "components";
import "./Sleep.css";

export default function Sleep({ user, setAppState }) {
  const isAuthenticated = Boolean(user?.email);

    return (
      <div className="Sleep">
        { isAuthenticated ? (
          <PageHeader sectionName="Sleep"/>
        ) : (
          <div> 
            <p className="warning">You must be logged in to access this page.</p>
            <Login setAppState={setAppState}/>
          </div>
      ) }
      </div>
    )
}