const router = require("express").Router();
const getApiTypes = require("../Controllers/Type/getApiType");

router.get("/", async (req, res) => {
  try {
    const allTypes = await getApiTypes();
    res.send(allTypes);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
