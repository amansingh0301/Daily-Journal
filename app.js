//jshint esversion:6
////.substring(0,Math.min(100,element.body.length))+"..."

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const  _ = require('lodash');
const mongoose = require("mongoose");

const homeStartingContent = "";
const contactContent = "mail : anakinskywalker0301@gmail.com";
const aboutContent = "Your Daily Journal"
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-aman:Test123@cluster0.gy0dg.mongodb.net/journalDB?retryWrites=true&w=majority",{useNewUrlParser : true, useUnifiedTopology: true});

const journalSchema = {
  Title: String,
  body: String
};

const Journal = mongoose.model("Journal",journalSchema);

// const journal1 = new Journal({
//   Title:"day 1",
//   body: "hello"
// });
//journal1.save();

// const posts = [];

// Journal.deleteOne({Title: "day 1"},function(err){
//   if(!err){
//     console.log("Deleted Succesfully");
//   }else{
//     console.log(err);
//   }
// });

app.get("/",function(req,res){
  Journal.find({},function(err,foundJournals){
    if(!err){
      console.log(foundJournals);
      res.render("home",{home: homeStartingContent,posts: foundJournals});
    }else{
      console.log(err);
    }
  })
  //res.render("home",{home: homeStartingContent,posts: posts});
});

app.get("/about",function(req,res){
  res.render("about",{aboutcon: aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactcon: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  console.log(req.body.title+" "+req.body.postBody);
  const newJournal = new Journal({
    Title: req.body.title,
    body: req.body.postBody
  });
  newJournal.save();
  res.redirect("/");
});

app.get("/post/:topic",function(req,res){
  Journal.findOne({_id: req.params.topic},function(err,result){
    if(!err){
      res.render("post",{title: result.Title,body: result.body});
    }else{
      console.log(err);
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
