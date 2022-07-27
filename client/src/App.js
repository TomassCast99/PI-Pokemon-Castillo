import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import "./App.css";
import Landing from "./Components/Landing/Landing";
import Home from "../src/Components/Home/Home";
// import GameCreate from "./Components/Create/GameCreate";
import Details from "./Components/Details/Details";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/videogame" element={<GameCreate />} />*/}
          <Route path="/pokemons/:id" element={<Details />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
