const express = require("express");
const router = express.Router();
const Author = require("../models/Author");
const Book = require("../models/Book");

router.get("/addAuthor", async (req, res) => {
  try {
    await Author.find().then((authors) => {
      console.log(authors);
      res.render("index", { pageTitle: "addAuthor", authors: authors});
      //res.status(200).json({ authors: authors });
    });
    //console.log("req : " + req.body);
    //const newBook = new Author(req.body);
    //await newBook.save().then((savedAuthor) => {
      //console.log(savedAuthor);
      //res.status(201).json({ msg: "Auteur Créé" });
    //})
    
    
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
      res.render("index", { pageTitle: "Authors", authors: authors});
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
      .then(async (author) => {
        await Book.find().then((books) => {
        console.log(author);
        //res.status(200).json({ authors: author });
        res.render("index",{pageTitle:"SingleAuthor",author:author,books : books});})
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



router.post("/addAuthor", async (req, res) => {
  try {
    const newAuthor = new Author({
      first_name: req.body.first_name,
      family_name:req.body.family_name,
      date_of_birth:req.body.date_of_birth,
      date_of_death:req.body.date_of_death
    });
    await newAuthor.save().then(async (savedAuthor) => {

      await Author.find().then((authors) => { 
        console.log(savedAuthor);
        res.render("index", { pageTitle: "Authors",authors : authors });
      })
    
    //res.status(201).json({ msg: "Livre Créé" });
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
module.exports = router;
