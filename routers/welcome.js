const express = require("express");

const welcomeControllers = require("../controllers/welcome");

const router = express.Router();

router.get("/", welcomeControllers.showWelcomeAndDay)

module.exports = router;