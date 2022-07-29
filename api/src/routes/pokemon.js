const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  let { name, img, hp, strength, defense, speed, height, weight, types } =
    req.body;

  try {
    if (
      !name ||
      !hp ||
      !strength ||
      !defense ||
      !speed ||
      !height ||
      !weight ||
      !types
    ) {
      return res.status(400).send("Faltan parametros");
    }

    const findPokemon = await Pokemon.findOne({ where: { name: name } });
    if (findPokemon) {
      return res.status(400).send("El nombre ya esta en uso");
    }

    let id = Math.floor(Math.random() * 1234567);

    let [createPoke, exist] = await Pokemon.findOrCreate({
      where: {
        id: id,
        img,
        name,
        hp,
        strength,
        defense,
        speed,
        height,
        weight,
        createdDB: true,
      },
    });

    types.forEach(async (t) => {
      let postTypes = await Type.findOne({ where: { name: t } });
      await createPoke.addType(postTypes);
    });

    res.json(createPoke);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
