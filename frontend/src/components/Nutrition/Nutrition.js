import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";

import Login from "../Login/Login";
import PageHeader from '../PageHeader/PageHeader';
import NutritionCard from './NutritionCard/NutritionCard';
import "./Nutrition.css";

export default function Nutrition({ user, setAppState, nutritions, setNutritions }) {
  
  const isAuthenticated = Boolean(user?.email);
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

    if (isAuthenticated) fetchNutritions();
  
  }, [isAuthenticated, setNutritions]);

  
  return (
    <div className="Nutrition">
        { isAuthenticated ? (
          <> 
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
          </>
      ) : (
        <div> 
          <p className="warning">You must be logged in to access this page.</p>
          <Login setAppState={setAppState}/>
        </div>
    ) }
    </div>
  )
}