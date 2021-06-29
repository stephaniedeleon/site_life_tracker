import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import apiClient from "../../services/apiClient";
import Login from "../Login/Login";
import ExCard from "./ExCard/ExCard";
import "./Exercise.css";

export default function Exercise({ user, setAppState }) {

  const isAuthenticated = Boolean(user?.email);  
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [exercises, setExercises] = useState([]);

  //fetches exercises
  useEffect(() => {
    const fetchExercises = async () => {
      setIsFetching(true)

      const { data, error } = await apiClient.listExercises();
      if(data) setExercises(data.exercises);
      if(error) setError(error);

      setIsFetching(false)
    }

    if (isAuthenticated) fetchExercises()

  }, [isAuthenticated]); 


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