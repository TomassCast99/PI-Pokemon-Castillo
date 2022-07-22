const axios = require("axios");
const { Pokemon, Op, Type } = require("../../db");

const getByName = async (name) => {
  try {
    const nameDb = await Pokemon.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: {
        model: Type,
        attributes: ["name"],
        through: { type: [] },
      },
    });
    if (nameDb) {
      return nameDb;
    }
    const namePokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    if (namePokemon.data) {
      let r = namePokemon.data;
      let pokeName = {
        name: name,
        id: r.id,
        img: r.sprites.front_default,
        hp: r.stats[0].base_stat,
        strength: r.stats[1].base_stat,
        defense: r.stats[2].base_stat,
        speed: r.stats[5].base_stat,
        height: r.height,
        weight: r.weight,
        type: r.types.map((el) => el.type.name),
      };
      console.log(pokeName);
      return pokeName;
    }
  } catch (error) {
    console.log("holas" + error);
    return { msg: "No se encontro" };
  }
};
module.exports = getByName;
