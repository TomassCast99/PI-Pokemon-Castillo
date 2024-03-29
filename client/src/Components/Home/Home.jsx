import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import Paginated from "../Paginated/Paginated";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

import { useSelector, useDispatch } from "react-redux";

import {
  getPokes,
  handlerName,
  handleFilter,
  handlerStrength,
  handlerTypes,
} from "../../redux/actions/actions";

export default function Home() {
  const dispatch = useDispatch();
  const usePoke = useSelector((state) => {
    return state.pokemons;
  });
  const [name, setName] = useState("");
  const [strength, setStrength] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokesPerPage] = useState(12);
  const [range, setRange] = useState({ first: 0, last: 12 });

  const [origin, setOrigin] = useState("allPoke");

  const [act, setAct] = useState("");
  const [types, setTypes] = useState("All");

  const [charge, setCharge] = useState(false); //para cuando busca por un pokemon que no tiene tipo entre los 40 traidos

  const [currentPokes, setCurrentPokes] = useState(
    usePoke?.slice(range.first, range.last)
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPokes(usePoke?.slice(range.first, range.last));
  }, [usePoke, range.first, range.last]);

  useEffect(() => {
    setCharge(true);
    setTimeout(() => {
      setCharge(false);
    }, 10000);
    dispatch(getPokes());
  }, []);

  useEffect(() => {
    setRange({
      first: (currentPage - 1) * pokesPerPage,
      last: currentPage * pokesPerPage,
    });
  }, [currentPage, pokesPerPage]);

  function handleClickName(e) {
    e.preventDefault();
    dispatch(handlerName(name));
    setCurrentPage(1);
    setCurrentPokes(usePoke?.slice(range.first, range.last));
    setAct(`${name}`);
  }

  function handleClick(e) {
    setTypes("All Pokes");
    setStrength("asc");
    setOrigin("allPoke");
    setCharge(true);
    setTimeout(() => {
      setCharge(false);
    }, 7000);
    dispatch(getPokes());
  }

  function handleClickFilter(e) {
    e.preventDefault();
    dispatch(handleFilter(origin));
    setCurrentPage(1);
    setAct(`${e.target.value}`);
  }

  function HandleFilterByStrength(e) {
    e.preventDefault();
    dispatch(handlerStrength(strength));
    setCurrentPage(1);
    setCurrentPokes(usePoke?.slice(range.first, range.last));
    setAct(`${e.target.value}`);
  }

  function HandleFilterByType(e) {
    e.preventDefault();
    dispatch(handlerTypes(e.target.value));
    setCurrentPage(1);
    setCurrentPokes(usePoke?.slice(range.first, range.last));
    setTypes(e.target.value);
    setAct(`${e.target.value}`);
  }

  return (
    <div>
      <div className="home-container">
        <Navbar setCurrentPage={setCurrentPage} />
        <div className="div-buttons">
          {" "}
          <button
            className="home-btn"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Reload Pokémons
          </button>
        </div>
        <div className="div-filt">
          <div>
            <select
              className="name-filt"
              onChange={(e) => {
                setName(e.target.value);
              }}
            >
              <option key="asc" className="nav-links" value="asc">
                A-Z
              </option>
              <option key="desc" className="nav-links" value="desc">
                Z-A
              </option>
            </select>
            <button className="btn-final" onClick={(e) => handleClickName(e)}>
              Order
            </button>
          </div>

          <div>
            <select
              className="name-filt"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              <option key="allPoke" className="nav-links" value="allPoke">
                All
              </option>
              <option key="apiPok" className="nav-links" value="apiPoke">
                Pokémons
              </option>
              <option key="dbPok" className="nav-links" value="dbPoke">
                Created Pokémon
              </option>
            </select>
            <button
              onClick={(e) => {
                handleClickFilter(e);
              }}
              className="btn-final"
            >
              Filter
            </button>
          </div>

          <div className="box">
            <select
              value={strength}
              className="name-filt"
              onChange={(e) => {
                setStrength(e.target.value);
              }}
            >
              <option key="asc" value="asc">
                High Strength
              </option>
              <option key="desc" value="desc">
                Low Strength
              </option>
            </select>
            <button
              onClick={(e) => {
                HandleFilterByStrength(e);
              }}
              className="btn-final"
            >
              Order
            </button>
          </div>

          <div className="box">
            <select
              value={types}
              className="name-filt"
              onChange={(e) => {
                HandleFilterByType(e);
              }}
            >
              <option key="all" value="all">
                All Pokémons
              </option>
              <option value="rock">Rock</option>
              <option value="bug">Bug</option>
              <option value="ghost">Ghost</option>
              <option value="steel">Steel</option>
              <option value="normal">Normal</option>
              <option value="fighting">Fighting</option>
              <option value="fire">Fire</option>
              <option value="flying">Flying</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="water">Water</option>
              <option value="grass">Grass</option>
              <option value="electric">Electric</option>
              <option value="shadow">Shadow</option>
              <option value="dragon">Dragon</option>
              <option value="dark">Dark</option>
              <option value="fairy">Fairy</option>
              <option value="unknown">Unknown</option>
              <option value="physic">Psychic</option>
              <option value="ice">Ice</option>
            </select>
          </div>
        </div>
        <Paginated
          pokesPerPage={pokesPerPage}
          usePoke={usePoke?.length}
          paginated={paginado}
          currentPage={currentPage}
        />

        <div className="card-poke">
          {charge ? (
            <div>
              <Loader />
            </div>
          ) : currentPokes.length ? (
            currentPokes.map((d) => {
              return (
                <Card
                  key={d.id}
                  id={d.id}
                  name={d.name}
                  img={d.img}
                  types={d.types}
                />
              );
            })
          ) : (
            <div className="div-not-found">
              <h4>Ups! Pokémon not found</h4>
              <h5>Try creating a new pokémon</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
