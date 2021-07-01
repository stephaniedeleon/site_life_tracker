import { Link } from 'react-router-dom';
import React, { useContext } from "react";
import { PageHeader } from "components";
import AuthContext from "contexts/auth";

import "./Activity.css";

export default function Activity({ totalExerciseTime, averageCalories, avgSleepHours }) {

  const { appState } = useContext(AuthContext);

  const userName = appState?.user?.firstName;
  const welcome = "Welcome " + userName + "!";

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
                <p className="value">0</p>
            </div>

            <div className="sumCard2 nutrition">
                <h3 className="valueName">Maximum Hourly Calories</h3>
                <p className="value">0</p>
            </div>

            <div className="sumCard2 sleep">
                <h3 className="valueName">Total Hours Slept</h3>
                <p className="value">0</p>
            </div>
        </div>

      </div>
    </div>
  )
}