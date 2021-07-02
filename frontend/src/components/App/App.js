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


  return (
    <AuthContext.Provider value={{ setAppState, appState, user, setUser, authenticated, setAuthenticated, exercises, nutritions, sleeps }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" exact element={<Home />} />

            <Route path='/activity' element={ <ProtectedRoute element={<Activity />} />} />  

            <Route path='/exercise' element={ <ProtectedRoute element={<Exercise setExercises={setExercises} />} />} />
            <Route path='/exercise/create' element={ <CreateExercise addExercise={addExercise} />} /> 
            
            <Route path='/nutrition' element={ <ProtectedRoute element={<Nutrition setNutritions={setNutritions} />} />} />
            <Route path='/nutrition/record' element={ <RecordNutrition addNutrition={addNutrition} />} /> 

            <Route path='/sleep' element={ <ProtectedRoute element={<Sleep setSleeps={setSleeps} />} />} />
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
