const router = require("express").Router();
const axios = require("axios");

const { Pokemon, Type } = require("../db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

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
      return res.json(dbPokes);
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
        type: superData.types.map((el) => el.type.name),
      };
      res.send(pokeId);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
