var express = require("express");
var app = express();
var path = require("path");

app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));

var numberofusersvisiting = 0;
var magicnumber = Math.floor(Math.random() * 100) + 1; 

app.get("/", function(req, res){
    console.log("A new visitor arrived!")
    res.sendFile(__dirname + "\\home.html");
    
});

app.get("/call", function(req, res){
     numberofusersvisiting = numberofusersvisiting + 1;
    if (numberofusersvisiting == magicnumber) {
        res.send("yes");
    } else {
        res.send("no");
    }
});
var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function(){
    console.log("Listening on port 8080");
});