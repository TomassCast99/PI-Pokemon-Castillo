import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";

import "./Navbar.css";

export default function Navbar({ setCurrentPage }) {
  return (
    <div className="nav-container" margin="0px">
      <Link to="/">
        <button className="log-out">Log Out</button>
      </Link>
      <div className="tittle2">Pokémry</div>
      <Search setCurrentPage={setCurrentPage} />
      <Link to={"/pokemon"}>
        <button className="create-poke">Create Pokémon</button>
      </Link>
    </div>
  );
}
