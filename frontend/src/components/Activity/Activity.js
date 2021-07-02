import { Link } from 'react-router-dom';
import React, { useContext, useState, useEffect } from "react";
import { PageHeader } from "components";
import AuthContext from "contexts/auth";
import apiClient from "services/apiClient"; //possible with jsconfig.json

import "./Activity.css";

export default function Activity() {

  const { user, appState, exercises, nutritions, sleeps} = useContext(AuthContext);
  const welcome = "Welcome " + user?.firstName + "!";

  const [error, setError] = useState(null);
  const [totalExerciseTime, setTotalExerciseTime] = useState(0);
  const [avgIntensity, setAvgIntensity] = useState(0);
  const [maxCalories, setMaxCalories] = useState(0);
  const [averageCalories, setAverageCalories] = useState(0);
  const [totalHoursSlept, setTotalHoursSlept] = useState(0);
  const [avgSleepHours, setAvgSleepHours] = useState(0);


  /** Fetch exercise info of user */
  useEffect(() => {

    const fetchExerciseTime = async () => {
      const { data, error } = await apiClient.fetchTotalExerciseTime();
      if (data?.totalTime) setTotalExerciseTime(data.totalTime);
      if(error) setError(error);
    }

    const fetchAvgIntensity = async () => {
      const { data, error } = await apiClient.fetchAvgExerciseIntensity();
      if (data?.avgIntensity) setAvgIntensity(parseFloat(data.avgIntensity).toFixed(1));
      if(error) setError(error);
    }

    fetchExerciseTime();
    fetchAvgIntensity();

  }, [exercises, appState]);


  /** Fetch nutrition info of user */
  useEffect(() => {

    const fetchAvgCalories = async () => {
      const { data, error } = await apiClient.fetchAvgCalories();
      if (data?.avgCalories) setAverageCalories(parseFloat(data.avgCalories).toFixed(1));
      if(error) setError(error);
    }

    const fetchMaxCalories = async () => {
      const { data, error } = await apiClient.fetchMaxHourlyCalories();
      if (data?.maxCalories) setMaxCalories(data.maxCalories);
      if(error) setError(error);
    }

    fetchAvgCalories();
    fetchMaxCalories();

  }, [nutritions, appState]);


  /** Fetch sleep info of user */
  useEffect(() => {

    const fetchAvgSleepHours = async () => {
      const { data, error } = await apiClient.fetchAvgSleepHours();
      if (data?.avgSleepHours) setAvgSleepHours(parseFloat(data.avgSleepHours).toFixed(1));
      if(error) setError(error);
    }

    const fetchSleepHours = async () => {
      const { data, error } = await apiClient.fetchTotalHoursSlept();
      if (data?.totalSleepHours) setTotalHoursSlept(data.totalSleepHours);
      if(error) setError(error);
    }

    fetchAvgSleepHours();
    fetchSleepHours();

  }, [sleeps, appState]);


  return (
    <div className="Activity"> 
      <PageHeader sectionName={welcome}/>
      <div className="activity-area">

        <div className="title">
          <h1>Activity Feed</h1>
          <div className="addLinks">
            <Link className="exercise" to='/exercise/create'>Add Exercise</Link>
            <Link className="nutrition" to='/nutrition/record'>Record Nutrition</Link>
            <Link className="sleep" to='/sleep/log'>Log Sleep</Link>
          </div>
        </div>
        <br/>
        <div className="overview">
            <div className="sumCard exercise">
                <h3 className="valueName">Total Exercise Minutes</h3>
                <p className="value">{totalExerciseTime}</p>
            </div>

            <div className="sumCard nutrition">
                <h3 className="valueName">Avg Calories</h3>
                <p className="value">{averageCalories}</p>
            </div>

            <div className="sumCard sleep">
                <h3 className="valueName">Avg Sleep Hours</h3>
                <p className="value">{avgSleepHours}</p>
            </div>
        </div>

        <br/>
        <br/>

        <div className="title">
          <h3>More Stats</h3>
        </div>
        <div className="overview">
            <div className="sumCard2 exercise">
                <h3 className="valueName">Avg Exercise Intensity</h3>
                <p className="value">{avgIntensity}</p>
            </div>

            <div className="sumCard2 nutrition">
                <h3 className="valueName">Maximum Hourly Calories</h3>
                <p className="value">{maxCalories}</p>
            </div>

            <div className="sumCard2 sleep">
                <h3 className="valueName">Total Hours Slept</h3>
                <p className="value">{totalHoursSlept}</p>
            </div>
        </div>

      </div>
    </div>
  )
}