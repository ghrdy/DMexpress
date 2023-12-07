const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Le titre est requis"],
    minLength: 1,
    maxLength: 20,
  },
  author: {
    type: String,
    required: [true, "Le nom d'auteur est requis"],
    minLength: 1,
    maxLength: 20,
  },

  summary: {
    type: String,
    minLength: 0,
    maxLength: 100,
  },
  isbn: {
    type: Number,
    unique: true,
    required: [true, "L'isbn est requis"],
    minlength: 1,
  },
});

module.exports = mongoose.model("Book", BookSchema);
