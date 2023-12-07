const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "Le Prénom est requis"],
    minLength: 1,
    maxLength: 20,
  },
  family_name: {
    type: String,
    unique: true,
    required: [true, "Le nom est requis"],
    minLength: 1,
    maxLength: 20,
  },
  date_of_birth: String,
  date_of_death: String,
});

module.exports = mongoose.model("Author", AuthorSchema);
