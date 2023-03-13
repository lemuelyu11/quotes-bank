const express = require('express');
const app = express();
const mongoose = require('mongoose');
const quotesController = require("./controllers/quote_controller.js");
const methodOverride = require("method-override");
const morgan = require('morgan');

require("dotenv").config();

app.set('view engine', 'ejs');

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(express.static("public"));

const port = process.env.PORT || 3000;

const mongoUri = `mongodb+srv://
${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWD}
@${process.env.MONGO_HOST_NAME}/${process.env.MONGO_DB_NAME}`;

mongoose.connect(mongoUri, { useNewUrlParser: true });
  

const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database');
});

app.use("/quotes", quotesController);

app.listen(port, () => {
    console.log("Random Quote Generator app is listening on port: " + port);
  });


