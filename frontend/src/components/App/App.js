import { Navbar, Home, Activity, Exercise, CreateExercise, Nutrition, RecordNutrition, Sleep, LogSleep, Login, SignUp, ProtectedRoute } from "components"; //in index.js
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import apiClient from "services/apiClient"; //possible with jsconfig.json
import "./App.css";

import AuthContext from "contexts/auth";

function App() {

  const [appState, setAppState] = useState({});
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const [exercises, setExercises] = useState([]);
  const [nutritions, setNutritions] = useState([]); 
  const [sleeps, setSleeps] = useState([]); 

  const [totalExerciseTime, setTotalExerciseTime] = useState(0);
  const [averageCalories, setAverageCalories] = useState(0);
  const [avgSleepHours, setAvgSleepHours] = useState(0);


  //adds a new exercise to list of exercises
  const addExercise = (newExercise) => {
    setExercises((oldExercises) => [newExercise, ...oldExercises])
  }

  //adds a new nutrition to list of nutritions
  const addNutrition = (newNutrition) => {
    setNutritions((oldNutrition) => [newNutrition, ...oldNutrition])
  }

  //adds a new sleep to list of sleeps
  const addSleep = (newSleep) => {
    setSleeps((oldSleep) => [newSleep, ...oldSleep])
  }
  

  //persists logged in user
  useEffect(() => {
    const fetchAuthedUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if(data) setAppState(data);
      if(data?.user) setUser(data.user);
      if(error) setError(error);
      setAuthenticated(true);
    }

    const token = localStorage.getItem("life_tracker_token");
    if (token) {
      apiClient.setToken(token);
      fetchAuthedUser();
    } else {
      setAuthenticated(false);
    }

  }, []);


  /** Fetch total exercise time by user */
  useEffect(() => {

    const fetchExerciseTime = async () => {
      const { data, error } = await apiClient.fetchTotalExerciseTime();
      if (data?.totalTime) setTotalExerciseTime(data.totalTime);
      if(error) setError(error);
    }

    fetchExerciseTime();

  }, [exercises]);


  /** Fetch average calories by user */
  useEffect(() => {

    const fetchAvgCalories = async () => {
      const { data, error } = await apiClient.fetchAvgCalories();
      if (data?.avgCalories) setAverageCalories(parseFloat(data.avgCalories).toFixed(1));
      if(error) setError(error);
    }

    fetchAvgCalories();

  }, [nutritions]);


  /** Fetch average sleep hours by user */
  useEffect(() => {
    
    const fetchAvgSleepHours = async () => {
      const { data, error } = await apiClient.fetchAvgSleepHours();
      if (data?.avgSleepHours) setAvgSleepHours(parseFloat(data.avgSleepHours).toFixed(1));
      if(error) setError(error);
    }

    fetchAvgSleepHours();

  }, [sleeps]);


  return (
    <AuthContext.Provider value={{ setAppState, appState, user, setUser, authenticated, setAuthenticated }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" exact element={<Home />} />

            <Route path='/activity' element={ <ProtectedRoute element={<Activity totalExerciseTime={totalExerciseTime} averageCalories={averageCalories} avgSleepHours={avgSleepHours} />} />} />

            <Route path='/exercise' element={ <ProtectedRoute element={<Exercise exercises={exercises} setExercises={setExercises} />} />} />
            <Route path='/exercise/create' element={ <CreateExercise addExercise={addExercise} />} /> 
            
            <Route path='/nutrition' element={ <ProtectedRoute element={<Nutrition nutritions={nutritions} setNutritions={setNutritions} />} />} />
            <Route path='/nutrition/record' element={ <RecordNutrition addNutrition={addNutrition} />} /> 

            <Route path='/sleep' element={ <ProtectedRoute element={<Sleep sleeps={sleeps} setSleeps={setSleeps} />} />} />
            <Route path='/sleep/log' element={ <LogSleep addSleep={addSleep} />} /> 


            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
