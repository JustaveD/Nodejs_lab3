const express = require("express")

const booksControllers = require("../controllers/books");

const router = express.Router();


router.get("/add-book", booksControllers.getAddBookPage)
router.post("/add-book", booksControllers.saveBookAndRedirectToList)

module.exports = router;
