import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Activity from "../Activity/Activity";
import Exercise from "../Exercise/Exercise";
import Nutrition from "../Nutrition/Nutrition";
import Sleep from "../Sleep/Sleep";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path='/activity' element={ <Activity />} />
          <Route path='/exercise' element={ <Exercise />} />
          <Route path='/nutrition' element={ <Nutrition />} />
          <Route path='/sleep' element={ <Sleep />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
