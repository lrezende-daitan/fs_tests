
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.post("/dialplan.xml", function(req, res) {
    let requestInfo = req.body;
    console.log("\n==================================\n");
    console.log("Core-UUID: " + requestInfo["Core-UUID"] + "\n");
    console.log("Call UUID: " + requestInfo["Channel-Call-UUID"] + "\n");
    console.log("Caller: " + requestInfo["Caller-Username"] + "\n");
    console.log("Destination: " + requestInfo["Caller-Destination-Number"] + "\n");
    let filePath = "./extensions/" + requestInfo["Caller-Destination-Number"] + ".xml";
    if(!fs.existsSync(filePath)) {
      filePath = "./extensions/generic.xml";
    }
    console.log("Returning " + filePath);
    return res.download(path.resolve(filePath));
});
 
var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});


