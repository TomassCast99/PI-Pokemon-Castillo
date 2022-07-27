import React from "react";
import { Link } from "react-router-dom";
//import "./Card.css";
import imagenPoke from "../pokemon.jpg";

export default function Card({ id, type, name, img, strength }) {
  return (
    <div className="card">
      <div className="card-details">
        <div className="img-game">
          <img
            src={img || imagenPoke}
            alt={name}
            height="150px"
            width="150px"
          />
        </div>
        <h3 className="text-title">{name.toUpperCase()}</h3>
        <h3 className="text-body">
          {type[0].name ? (
            <p>{type[0].name}</p>
          ) : type && type.length === 2 ? (
            <p>
              Types: {type[0].toUpperCase() + " - " + type[1].toUpperCase()}
            </p>
          ) : type && type.length > 0 ? (
            <p>Types: {type[0].toUpperCase()}</p>
          ) : null}
        </h3>
        <h3 className="text-title">{strength}</h3>
      </div>
      <Link className="por" to={`/pokemons/${id}`}>
        <button className="card-button">More info</button>
      </Link>
    </div>
  );
}
