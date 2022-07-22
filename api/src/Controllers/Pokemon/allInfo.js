const getApiPoke = require("./getApiPoke");
const getInfoDB = require("./getInfoDb");

const allPoke = async () => {
  try {
    const api = await getApiPoke("https://pokeapi.co/api/v2/pokemon");
    const dbInfo = await getInfoDB();
    const allInfo = api.concat(dbInfo);
    return allInfo;
  } catch (error) {
    console.log(error);
  }
};

module.exports = allPoke;
