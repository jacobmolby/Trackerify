const router = require("express").Router();
const verifyToken = require("./verifyToken");
const TeamController = require("../controllers/TeamController");

router.post("/team/create", verifyToken, TeamController.create);
router.post("/team/adduser", verifyToken, TeamController.addUser);
router.get("/team", verifyToken, TeamController.get);
module.exports = router;
