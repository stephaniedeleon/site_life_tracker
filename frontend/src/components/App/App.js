import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Activity from "../Activity/Activity";
import Exercise from "../Exercise/Exercise";
import CreateExercise from "../CreateExercise/CreateExercise";
import RecordNutrition from "../RecordNutrition/RecordNutrition";
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
  const [nutritions, setNutritions] = useState([]); 


  //adds a new exercise to list of exercises
  const addExercise = (newExercise) => {
    setExercises((oldExercises) => [newExercise, ...oldExercises])
  }


  //adds a new nutrition to list of nutritions
  const addNutrition = (newNutrition) => {
    setNutritions((oldNutrition) => [newNutrition, ...oldNutrition])
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
                        nutritions={nutritions}
              />} 
          />

          <Route path='/exercise' element={ 
              <Exercise setAppState={setAppState} 
                        appState={appState} 
                        user={appState?.user} 
                        exercises={exercises}
                        setExercises={setExercises}
              />} 
          />
          <Route path='/exercise/create' element={ <CreateExercise addExercise={addExercise} />} /> 
          
          <Route path='/nutrition' element={ 
              <Nutrition setAppState={setAppState} 
                         appState={appState} 
                         user={appState?.user} 
                         nutritions={nutritions}
                         setNutritions={setNutritions}
              />} 
          />
          <Route path='/nutrition/record' element={ <RecordNutrition addNutrition={addNutrition} />} /> 

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
