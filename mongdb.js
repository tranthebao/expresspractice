//mongodb://obitomadara:Asdasdasd@123@ds233238.mlab.com:33238/productdb
var mongoose = require('mongoose');
mongoose.connect('mongodb://<obitomadara>:<Asdasdasd@123>@ds233238.mlab.com:33238/productdb');
var personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String
});
var Person = mongoose.model("Person", personSchema);
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.get('/person', function(req, res){
  res.render('person');
});
app.post('/person', function(req, res){
  var personInfo = req.body; //Get the parsed information
  
  if(personInfo.name ===null || personInfo.age ===null || personInfo.nationality ===null){
     res.render('show_message', {
        message: "Sorry, you provided worng info", type: "error"});
  } else {
     var newPerson = new Person({
        name: personInfo.name,
        age: personInfo.age,
        nationality: personInfo.nationality
     });
   
     newPerson.save(function(err, Person){
        if(err)
           res.render('show_message', {message: "Database error", type: "error"});
        else
           res.render('show_message', {
              message: "New person added", type: "success", person: personInfo});
     });
  }
});
app.get('/people', function(req, res){
  Person.find(function(err, response){
     res.json(response);
  });
});

var Person = mongoose.model("Person", personSchema);

app.put('/people/:id', function(req, res){
   Person.findByIdAndUpdate(req.params.id, req.body, function(err, response){
      if(err) res.json({message: "Error in updating person with id " + req.params.id});
      res.json(response);
   });
});

var Person = mongoose.model("Person", personSchema);

app.delete('/people/:id', function(req, res){
   Person.findByIdAndRemove(req.params.id, function(err, response){
      if(err) res.json({message: "Error in deleting record id " + req.params.id});
      else res.json({message: "Person with id " + req.params.id + " removed."});
   });
});

app.listen(3000);