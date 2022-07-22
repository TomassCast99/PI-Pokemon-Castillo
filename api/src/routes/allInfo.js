const router = require("express").Router();

const allInfo = require("../Controllers/Pokemon/allInfo");
const getByName = require("../Controllers/Pokemon/getByName");

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      console.log(name);
      const byName = await getByName(name);
      console.log(byName);
      res.json([byName]);
    } else {
      const allPoke = await allInfo();
      res.json(allPoke);
    }
  } catch (error) {
    res.status(400).json({ msg: "No se encontro el pokemon solicitado" });
  }
});

module.exports = router;
