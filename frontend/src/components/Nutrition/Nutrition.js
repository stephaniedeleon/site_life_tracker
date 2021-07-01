import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import React, { useContext } from "react";
import AuthContext from "contexts/auth";

import apiClient from "services/apiClient";

import { PageHeader } from "components";
import NutritionCard from './NutritionCard/NutritionCard';
import "./Nutrition.css";

export default function Nutrition({ nutritions, setNutritions }) {

  const { authenticated } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  //fetches nutritions
  useEffect(() => {
    const fetchNutritions = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.listNutrition();
      if(data) setNutritions(data.nutritions);
      if(error) setError(error);

      setIsFetching(false);
    }

    if (authenticated) fetchNutritions();
  
  }, [authenticated, setNutritions]);

  
  return (
    <div className="Nutrition">
      <PageHeader sectionName="Nutrition"/>

      <div className="nutrition-area">
        <div className="title">
          <h1>Overview</h1>
          <Link to='/nutrition/record'>Record Nutrition</Link>
        </div>
        <br/>
        <br/>
        <div className="overview">
          {nutritions.map((nutrition) => (
            <NutritionCard key={nutrition.id} nutrition={nutrition} />
          ))}
        </div>
      </div>
    </div>
  )
}