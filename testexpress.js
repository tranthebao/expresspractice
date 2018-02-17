var squares = require("./modules");
var express = require('express');
var square = require('./square');
var app = express();

app.get('/', function(req, res){
    
    res.send('test response method get!'+ squares.area(11)+ "---"+ squares.perimeter(4));
});

app.all('/testall', function(req, res, next){
    console.log("Accessing the secrect section.....");
    next();
});
app.listen(8000, function(){
    console.log('listening port 8000');
});

