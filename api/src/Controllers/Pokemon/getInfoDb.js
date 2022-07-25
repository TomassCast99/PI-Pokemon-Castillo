const { Type, Pokemon } = require("../../db");

const getInfoDB = async () => {
  const dbData = await Pokemon.findAll({
    include: {
      model: Type,
      attribute: ["name"],
      through: {
        types: [],
      },
    },
  });
  return dbData;
};

module.exports = getInfoDB;
