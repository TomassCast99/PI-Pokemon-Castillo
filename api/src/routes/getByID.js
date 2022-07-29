const router = require("express").Router();
const axios = require("axios");

const { Pokemon, Type } = require("../db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // validar si recibe id antes que nada

  try {
    const dbPokes = await Pokemon.findOne({
      where: { id: id },
      include: {
        model: Type,
        attribute: ["name"],
        through: {
          types: [],
        },
      },
    });
    if (dbPokes) {
      let dbTipo = dbPokes.types.map((tipo) => {
        return tipo.name;
      });
      const pokeId = {
        id: dbPokes.id,
        name: dbPokes.name,
        img: dbPokes.img,
        hp: dbPokes.hp,
        strength: dbPokes.strength,
        defense: dbPokes.defense,
        speed: dbPokes.speed,
        height: dbPokes.height,
        weight: dbPokes.weight,
        types: dbTipo,
      };

      return res.json(pokeId);
    } else {
      const allPokeId = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );

      const superData = allPokeId.data;
      const pokeId = {
        id: superData.id,
        name: superData.name,
        img: superData.sprites.front_default,
        hp: superData.stats[0].base_stat,
        strength: superData.stats[1].base_stat,
        defense: superData.stats[2].base_stat,
        speed: superData.stats[5].base_stat,
        height: superData.height,
        weight: superData.weight,
        types: superData.types.map((el) => el.type.name),
      };
      res.send(pokeId);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
