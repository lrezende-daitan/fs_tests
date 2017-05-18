
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.post("/dialplan.xml", function(req, res) {
    console.log("\n==================================\n");
    console.log(req.body);
    res.download(path.resolve("./dialplan.xml"));
});
 
var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});


