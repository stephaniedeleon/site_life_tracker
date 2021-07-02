import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import React, { useContext } from "react";
import AuthContext from "contexts/auth";

import apiClient from "services/apiClient";

import { PageHeader } from "components";
import SleepCard from "./SleepCard/SleepCard";
import "./Sleep.css";

export default function Sleep({ setSleeps }) {

  const { authenticated, sleeps, appState } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  
  //fetches sleeps
  useEffect(() => {
    const fetchSleeps = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.listSleep();
      if(data) setSleeps(data.sleeps);
      if(error) setError(error);

      setIsFetching(false);
    }

    if (authenticated) fetchSleeps();

  }, [authenticated, setSleeps, appState]); 


  return (
    <div className="Sleep">
        <PageHeader sectionName="Sleep"/>

        <div className="sleep-area">
          <div className="title">
            <h1>Overview</h1>
            <Link to='/sleep/log'>Log Sleep</Link>
          </div>
          <br/>
          <br/>
          <div className="overview">
            {sleeps.map((sleep) => (
              <SleepCard key={sleep.id} sleep={sleep} />
            ))}
          </div>
        </div>
    </div>
  )
}