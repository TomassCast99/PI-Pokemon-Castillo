const { Router } = require("express");
const types = require("./types");
const postPoke = require("./pokemon");
const allInfo = require("./allInfo");
const getByID = require("./getByID");

const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemon", postPoke);
router.use("/types", types);
router.use("/pokemons", allInfo);
router.get("/:id", getByID);

module.exports = router;
