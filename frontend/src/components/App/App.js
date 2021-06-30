import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Activity from "../Activity/Activity";
import Exercise from "../Exercise/Exercise";
import CreateExercise from "../CreateExercise/CreateExercise";
import Nutrition from "../Nutrition/Nutrition";
import Sleep from "../Sleep/Sleep";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import apiClient from "../../services/apiClient";
import "./App.css";

function App() {

  const [appState, setAppState] = useState({});
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [exercises, setExercises] = useState([]);

  
  //fetches exercises
  useEffect(() => {
    const fetchExercises = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.listExercises();
      if(data) setExercises(data.exercises);
      if(error) setError(error);

      setIsFetching(false);
    }

    if (appState?.user) fetchExercises();

  }, [appState?.user, exercises]); 

  //adds a new exercise to list of exercises
  const addExercise = (newExercise) => {
    setExercises((oldExercises) => [newExercise, ...oldExercises])
  }

  //persists logged in user
  useEffect(() => {
    const fetchAuthedUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if(data) setAppState(data);
      if(error) setError(error);
    }

    const token = localStorage.getItem("life_tracker_token");
    if (token) {
      apiClient.setToken(token);
      fetchAuthedUser();
    }

  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar 
          setAppState={setAppState} 
          appState={appState} 
          user={appState?.user} 
        />

        <Routes>
          <Route path="/" exact element={<Home />} />

          <Route path='/activity' element={ 
              <Activity setAppState={setAppState} 
                        appState={appState} 
                        user={appState?.user} 
                        exercises={exercises}
              />} 
          />

          <Route path='/exercise' element={ 
              <Exercise setAppState={setAppState} 
                        appState={appState} 
                        user={appState?.user} 
                        exercises={exercises}
              />} 
          />
          <Route path='/exercise/create' element={ <CreateExercise addExercise={addExercise} />} /> 
          
          <Route path='/nutrition' element={ 
              <Nutrition setAppState={setAppState} 
                         appState={appState} 
                         user={appState?.user} 
              />} 
          />

          <Route path='/sleep' element={ 
              <Sleep setAppState={setAppState}
                     appState={appState} 
                     user={appState?.user} 
              />} 
          />

          <Route path="/login" element={
              <Login setAppState={setAppState} 
                     appState={appState} 
                     user={appState?.user} 
              />} 
          />
          <Route path="/register" element={
              <SignUp setAppState={setAppState} 
                      appState={appState} 
                      user={appState?.user} 
              />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
