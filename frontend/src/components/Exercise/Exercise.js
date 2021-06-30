import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import apiClient from "services/apiClient";

import ExCard from "./ExCard/ExCard";
import { Login, PageHeader } from "components";
import "./Exercise.css";

export default function Exercise({ user, setAppState, exercises, setExercises }) {

  const isAuthenticated = Boolean(user?.email);  
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

   //fetches exercises
   useEffect(() => {
    const fetchExercises = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.listExercises();
      if(data) setExercises(data.exercises);
      if(error) setError(error);

      setIsFetching(false);
    }

    if (isAuthenticated) fetchExercises();

  }, [isAuthenticated, setExercises]); 

  
  return (
    <div className="Exercise">
      { isAuthenticated ? (
        <>
          <PageHeader className="one" sectionName="Exercise"/>

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
        </>
      ) : (
        <div> 
          <p className="warning">You must be logged in to access this page.</p>
          <Login setAppState={setAppState} />
        </div>  
      ) }
    </div>
  );
}