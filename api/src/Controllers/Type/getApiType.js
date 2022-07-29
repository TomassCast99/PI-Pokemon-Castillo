const axios = require("axios");
const { Type } = require("../../db");

const getApiTypes = async () => {
  try {
    let tipos = await Type.findAll({ attributes: ["name"] });
    if (!tipos.length) {
      let url = `https://pokeapi.co/api/v2/type`;
      tipos = await axios.get(url);
      tipos = tipos.data.map((result) => ({
        name: result.name,
      }));
      await Type.bulkCreate(tipos);
    }
    return tipos;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getApiTypes;
