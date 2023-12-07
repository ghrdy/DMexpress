const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Author = require("../models/Author");
router.get("/", async (req, res) => {
  try {
    const [numbooks, numauth] = await Promise.all([
      Book.countDocuments(),
      Author.countDocuments(),
    ]);
    res.render("index", {
      bookcount: numbooks,
      authorcount: numauth,
      pageTitle: "Library",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "problem while counting books and authors" });
  }
});

module.exports = router;
