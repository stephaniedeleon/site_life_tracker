import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import React, { useContext } from "react";
import AuthContext from "contexts/auth";

import apiClient from "services/apiClient";

import ExCard from "./ExCard/ExCard";
import { Login, PageHeader } from "components";
import "./Exercise.css";

export default function Exercise({ exercises, setExercises }) {

  const { authenticated } = useContext(AuthContext);

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

    if (authenticated) fetchExercises();

  }, [authenticated, setExercises]); 

  
  return (
    <div className="Exercise">
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
    </div>
  );
}