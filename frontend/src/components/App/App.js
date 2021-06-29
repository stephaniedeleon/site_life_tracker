import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Activity from "../Activity/Activity";
import Exercise from "../Exercise/Exercise";
import CreateExercise from "../CreateExercise/CreateExercise";
import Nutrition from "../Nutrition/Nutrition";
import Sleep from "../Sleep/Sleep";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {

  const [appState, setAppState] = useState({}); //What does this do?

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setAppState={setAppState} appState={appState} user={appState?.user}/>

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path='/activity' element={ <Activity setAppState={setAppState} appState={appState} user={appState?.user} />} />

          <Route path='/exercise' element={ <Exercise setAppState={setAppState} appState={appState} user={appState?.user} />} />
          <Route path='/exercise/create' element={ <CreateExercise />} />
          
          <Route path='/nutrition' element={ <Nutrition setAppState={setAppState} appState={appState} user={appState?.user} />} />
          <Route path='/sleep' element={ <Sleep setAppState={setAppState} appState={appState} user={appState?.user} />} />

          <Route path="/login" element={<Login setAppState={setAppState} appState={appState} user={appState?.user} />} />
          <Route path="/register" element={<SignUp setAppState={setAppState} appState={appState} user={appState?.user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
