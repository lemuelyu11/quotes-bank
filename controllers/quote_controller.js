const express = require('express');
const router = express.Router();
const quote = require('../models/schema.js');

//To load the new fruit form
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// Create a new quote
router.post('/', async (req, res) => {
      quote.create(req.body,(err, createdQuote) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/quotes");
        }
      });
    });

  
  // Read all quotes
  router.get('/', (req, res) => {
      quote.find({},(err, quotesDetails) => {
        if (err) {
          console.log(err);
        } else {
          res.render("home.ejs", { quotes: quotesDetails });
        }
      });
    } 
  );
  
  // Read a single quote
  router.get("/:id", (req, res) => {
    //To get fruit details from the mongodb
    quote.findById(req.params.id, (err, foundQuote) => {
      if (err) {
        console.log(err);
      } else {
        //   res.send(foundFruit);
        res.render("views.ejs", { quote: foundQuote });
      }
    });
  });
  
  // Edit a quote
  router.get("/:id/edit", (req, res) => {
    quote.findById(req.params.id, (err, foundQuote) => {
      if (err) {
        console.log(err);
      } else {
        res.render("edit.ejs", { quote: foundQuote });
      }
    });
  });
  
  // Delete a quote
  router.delete("/:id", (req, res) => {
    // res.send("Deleting...");
    quote.findByIdAndDelete(req.params.id, (err, success) => {
      if (err) {
        console.log(err);
      } else {
        //Redirect back to index page
        res.redirect("/quotes");
      }
    });
  });

  //To update the fruit details
  router.put("/:id/update", (req, res) => {
  quote.findByIdAndUpdate(req.params.id, req.body, (err, updatedQuotes) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/quotes");
    }
  });
});
  
  // quote.statics.getRandom = function(callback) {
  //   this.aggregate([{ $sample: { size: 1 } }]).exec(callback);
  // };

  module.exports = router;
