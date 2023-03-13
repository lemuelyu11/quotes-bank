const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      }
    });

  const quote = mongoose.model("quote", quoteSchema);
  
  module.exports = quote;