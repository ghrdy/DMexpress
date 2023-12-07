const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.post("/addBook", async (req, res) => {
  try {
    console.log("req : " + req.body);
    const newBook = new Book(req.body);
    await newBook.save().then((savedBook) => {
      console.log(savedBook);
      res.status(201).json({ msg: "Livre Créé" });
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.isbn) {
      res.status(500).json({ msg: "Livre déja existant" });
    } else {
      res
        .status(500)
        .json({ msg: "impossible de créer un nouveau livre, erreur inconnue" });
    }
  }
});

router.get("/", async (req, res) => {
  try {
    await Book.find().then((books) => {
      console.log(books);
      res.render("index", { pageTitle: "Books", books: books });
      //res.status(200).json({ books: books });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to gets books list" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await Book.findOne({ title: id })
      .then((book) => {
        console.log(book);
        res.status(200).json({ book: book });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "l'isbn entré n'existe pas" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to gets wanted book" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Book.findByIdAndDelete(id)
      .then((deletedBook) => {
        console.log(deletedBook);
        res.status(200).json({ msg: "Livre supprimé" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "l'id n'existe pas" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "impossible de delete ce livre" });
  }
});
module.exports = router;
