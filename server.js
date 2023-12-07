const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Library");
    console.log("connected to mongo");
  } catch (error) {
    console.log(error);
  }
}

const booksRouter = require("./routers/books");
app.use("/books", booksRouter);

const authorsRouter = require("./routers/authors");
app.use("/authors", authorsRouter);

const indexRouter = require("./routers/index");
app.use("/", indexRouter);

app.use("/public", express.static("public"));

app.listen(3000);
main();
