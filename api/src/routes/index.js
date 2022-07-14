const { Router } = require('express');
const router = Router();
const countrieMidlleware = require("./countries");
const activityMidlleware = require("./acitvity");


router.use("/countries",countrieMidlleware);
router.use("/activity",activityMidlleware );





module.exports = router;
