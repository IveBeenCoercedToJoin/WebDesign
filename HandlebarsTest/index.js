var express = require("express");
var app = express();
var path = require("path");
var hbs = require("hbs");

app.set("view engine", "hbs");
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));

app.get("/", function(req, res){
    console.log(req.query.id);
    //res.sendFile(__dirname + "\\home.html");
    data = {
        title: req.query.id
    }
    res.render("home", data);
});
var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function(){
    console.log("Listening on port 8080");
});