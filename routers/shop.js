const express = require("express")

const booksControllers = require("../controllers/books");

const router = express.Router();

router.get("/list", booksControllers.loadListOfBooks)

router.get("/:slug", booksControllers.bookDetail);

router.get("/cat/:slug", booksControllers.getBookByCat);

module.exports = router;