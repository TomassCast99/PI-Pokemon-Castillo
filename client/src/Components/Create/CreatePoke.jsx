import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  resState,
  postPoke,
  getPokes,
} from "../../redux/actions/actions";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { validation } from "../Validations/Validations";

import "./CreatePoke.css";

export default function CreatePoke() {
  const dispatch = useDispatch();
  const allTypes = useSelector((e) => e.types);
  const allPokes = useSelector((e) => e.pokemons);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    strength: "",
    defense: "",
    height: "",
    speed: "",
    weight: "",
    types: [],
    img: "",
    createdDB: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTypes());
    dispatch(resState(resState));
    dispatch(getPokes());
  }, [dispatch]);

  function handleSubmit(e) {
    const a = allPokes.filter((b) => b.name === input.name);
    if (a.length > 0) {
      return alert("There is a pokémon with that name, try another");
    }

    if (
      input.name.length &&
      input.hp.length &&
      input.strength.length &&
      input.defense.length &&
      input.height.length &&
      input.speed.length &&
      input.weight.length &&
      input.types.length
    ) {
      let crear = {
        name: input.name,
        hp: input.hp,
        strength: input.strength,
        defense: input.defense,
        height: input.height,
        speed: input.speed,
        weight: input.weight,
        img: input.img,
        types: input.types.join(", "),
      };

      dispatch(postPoke(crear));
      setLoading(false);
      setResponse(true);

      setTimeout(() => setResponse(false), 4000);
      setInput({
        name: "",
        hp: "",
        strength: "",
        defense: "",
        height: "",
        speed: "",
        weight: "",
        types: [],
        img: "",
        createdDB: false,
      });
    } else {
      setErr(true);
      setLoading(false);
    }
  }
  function handelChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectTypes(e) {
    if (!input.types.includes(e.target.value)) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      types: input.types.filter((temp) => temp !== e.target.value),
    });
  }

  return (
    <div key="form" className="formPerfil">
      <div key="up" className="up-things">
        <Link to="/home">
          <button key="up1" className="boton">
            Home
          </button>
        </Link>
      </div>
      <div key="up45">
        <h1 key="up2" className="titleForm">
          Create Pokémon
        </h1>
      </div>

      <form key="form4" className="form" onSubmit={resState}>
        <div>
          <label key="name" className="title5">
            Name:
          </label>
          <input
            key="name2"
            type="text"
            name="name"
            placeholder="Poke Name"
            value={input.name}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.name}</strong>
        </div>
        <div>
          <label key="Strength" className="title5">
            Strength:
          </label>
          <input
            type="number"
            name="strength"
            key="strength2"
            placeholder="Strength"
            value={input.strength}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.strength}</strong>
        </div>

        <div>
          <label key="defense" className="title5">
            Defense:
          </label>
          <input
            type="number"
            name="defense"
            key="defense2"
            placeholder="Defense"
            value={input.defense}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.defense}</strong>
        </div>

        <div>
          <label key="image" name="img" className="title5">
            Image:
          </label>
          <input
            key="image2"
            name="img"
            value={input.img}
            placeholder="URL"
            onChange={(e) => handelChange(e)}
          ></input>
        </div>
        <div>
          <label key="hp2" className="title5">
            HP:
          </label>
          <input
            type="number"
            name="hp"
            key="hp3"
            placeholder="HP"
            value={input.hp}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.hp}</strong>
        </div>
        <div>
          <label key="height" className="title5">
            Height:
          </label>
          <input
            type="number"
            name="height2"
            key="height3"
            placeholder="Height"
            value={input.height}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.height}</strong>
        </div>
        <div>
          <label key="weight" className="title5">
            Weight:
          </label>
          <input
            type="number"
            name="weight2"
            key="weight3"
            placeholder="Weight"
            value={input.weight}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.weight}</strong>
        </div>
        <div>
          <label key="speed" className="title5">
            Speed:
          </label>
          <input
            type="number"
            name="speed2"
            key="speed3"
            placeholder="Speed"
            value={input.speed}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.speed}</strong>
        </div>
        <div>
          <label key="types" className="title5" value="types6" name="types7">
            {" "}
            Types:{" "}
          </label>
          <select
            key="types2"
            className="boton6"
            onChange={(e) => handleSelectTypes(e)}
          >
            {allTypes &&
              allTypes
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name.toUpperCase()}
                  </option>
                ))}
          </select>

          <div className="choosed">
            {!input.types.length ? (
              <strong>{errors.types}</strong>
            ) : (
              input.types.map((nombre, i) => {
                return (
                  <div key={i} className="card98">
                    <button
                      onClick={handleDelete}
                      value={nombre}
                      className="cross"
                      key="botonX"
                    >
                      X
                    </button>
                    <span key="poke" className="pokeName">
                      {nombre}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div>
          <button
            key="submit"
            className="btn-createPoke"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            {" "}
            Create Pokémon
          </button>
        </div>
        {loading && <Loader />}
        {response && (
          <Message
            msg="The pokémon was successfully created"
            bgColor="#198754"
          />
        )}
        {err && (
          <Message
            msg="You have to complete all the fields"
            bgColor="#FF0000"
          />
        )}
      </form>
    </div>
  );
}
