const { Type, Pokemon } = require("../../db");

const getInfoDB = async () => {
  try {
    let dbData = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          types: [],
        },
      },
    });

    let poke = [];
    for (let i = 0; i < dbData.length; i++) {
      let tipos = dbData[i].types.map((tipo) => {
        return tipo.name;
      });

      let newPoke = {
        id: dbData[i].id,
        name: dbData[i].name,
        img: dbData[i].img,
        hp: dbData[i].hp,
        strength: dbData[i].strength,
        defense: dbData[i].defense,
        speed: dbData[i].speed,
        height: dbData[i].height,
        weight: dbData[i].weight,
        types: tipos,
        createdDB: true,
      };
      poke.push(newPoke);
    }

    return poke;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getInfoDB;
