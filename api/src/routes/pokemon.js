const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  let {
    name,
    img,
    hp,
    strength,
    defense,
    speed,
    height,
    weight,
    type,
    createdDB,
  } = req.body;

  try {
    if (
      !name ||
      !hp ||
      !strength ||
      !defense ||
      !speed ||
      !height ||
      !weight ||
      !type
    ) {
      return res.status(400).send("Faltan parametros");
    }
    console.log(type);

    const findPokemon = await Pokemon.findAll({ where: { name: name } });
    if (findPokemon.length != 0) {
      return res.status(400).send("El nombre ya esta en uso");
    }

    let postTypes = await Type.findAll({
      where: { name: name },
      attribute: ["name"],
      through: {
        type: [],
      },
    });
    console.log(postTypes.data);
    if (postTypes.length === 0) {
      return res.status(400).send("Se debe ingresar un tipo valido");
    }

    let id = Math.floor(Math.random() * 1234567);

    let createPoke = await Pokemon.create({
      id: id,
      img,
      name,
      hp,
      strength,
      defense,
      speed,
      height,
      weight,
      createdDB,
    });

    createPoke.addType(types);

    res.send("El pokemon fue creado con exito");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
