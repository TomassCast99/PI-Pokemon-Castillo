import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, resState } from "../../redux/actions/actions";
import Loader from "../Loader/Loader";
import "./Details.css";
import imagenPoke from "../pokemon.jpg";

export default function Detail() {
  const { id } = useParams();
  const pokeDetail = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(resState());
    };
  }, [dispatch, id]);

  if (Object.keys(pokeDetail).length === 0) {
    console.log(pokeDetail.types);

    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-10rem",
          marginLeft: "3rem",
        }}
      >
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="paginado2">
        <div>
          <Link to="/home">
            <button className="botonDetails" onClick={resState}>
              Home
            </button>
          </Link>
        </div>
        <div>
          <img
            className="imagdetalle"
            src={pokeDetail.img || imagenPoke}
            alt={pokeDetail.name}
            width="450px"
            height="450px"
          />
        </div>

        <div className="cardDetalle">
          <div>
            <h1>{pokeDetail.name.toUpperCase()}</h1>
          </div>
          <div className="base3">
            <h1>
              Types:{" "}
              {pokeDetail.types.map((e) => {
                return (
                  <p key={e}>{e.charAt(0).toUpperCase() + e.slice(1) + " "}</p>
                );
              })}
            </h1>
          </div>
          <div className="base3">
            <h2>HP: {pokeDetail.hp}</h2>
          </div>
          <div className="base3">
            <h2>Speed: {pokeDetail.speed}</h2>
          </div>
          <div className="base3">
            <h2>Height: {pokeDetail.height}</h2>
          </div>
          <div className="base3">
            <h2>Weight: {pokeDetail.weight} </h2>
          </div>
          <div className="base3">
            <h2>Defense: {pokeDetail.defense}</h2>
          </div>
        </div>
      </div>
    );
  }
}
