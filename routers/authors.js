const express = require("express");
const router = express.Router();
const Author = require("../models/Author");

router.post("/addAuthor", async (req, res) => {
  try {
    console.log("req : " + req.body);
    const newBook = new Author(req.body);
    await newBook.save().then((savedAuthor) => {
      console.log(savedAuthor);
      res.status(201).json({ msg: "Auteur Créé" });
    });
  } catch (error) {
    console.log(error);
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.family_name
    ) {
      res.status(500).json({ msg: "Auteur déja existant" });
    } else {
      res
        .status(500)
        .json({ msg: "impossible de créer un nouvel Auteur, erreur inconnue" });
    }
  }
});

router.get("/", async (req, res) => {
  try {
    await Author.find().then((authors) => {
      console.log(authors);
      res.render("index", { pageTitle: "Authors", authors: authors });
      //res.status(200).json({ authors: authors });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to gets authors list" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Author.findByIdAndDelete(id)
      .then((deletedAuth) => {
        console.log(deletedAuth);
        res.status(200).json({ msg: "Auteur supprimé" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "l'id n'existe pas" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "impossible de delete cet Auteur" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const searchRegex = new RegExp(searchTerm, "i"); // case insensitive search
    await Author.find({
      family_name: searchRegex,
    })
      .then((author) => {
        console.log(author);
        res.status(200).json({ author: author });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "impossible de trouver l'auteur" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "no matching record found" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const separator = id.indexOf("-");
  firstname = id.substring(0, separator);
  lastname = id.substring(separator + 1);

  try {
    await Author.findOne({ first_name: firstname, family_name: lastname })
      .then((author) => {
        console.log(author);
        res.status(200).json({ authors: author });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "le Nom entré n'existe pas" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to gets wanted author" });
  }
});

module.exports = router;
