const express = require("express");

const errorControllers = require("../controllers/error");

const router = express.Router();

router.use("/", errorControllers.show404Page);

module.exports = router;