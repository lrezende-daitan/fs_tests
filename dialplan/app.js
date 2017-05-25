
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.post("/dialplan", function(req, res) {
    let requestInfo = req.body;
    console.log("\n==================================\n");
    console.log("Core-UUID: " + requestInfo["Core-UUID"]);
    console.log("Call UUID: " + requestInfo["Channel-Call-UUID"]);
    console.log("Caller: " + requestInfo["Caller-Username"]);
    console.log("Destination: " + requestInfo["Caller-Destination-Number"]);
    let filePath = "./extensions/" + requestInfo["Caller-Destination-Number"] + ".xml";
    if(!fs.existsSync(filePath)) {
      filePath = "./extensions/generic.xml";
    }
    console.log("Returning " + filePath);
    return res.download(path.resolve(filePath));
});

app.post("/config", function(req, res) {
    let requestInfo = req.body;
    console.log("\n==================================\n");
    console.log(requestInfo);
    if(requestInfo.section !== "configuration") {
      return res.status(400).send("bad section");
    }
    let filePath = "./configurations/" + requestInfo.key_value + ".xml";
    if(!fs.existsSync(filePath)) {
      return res.status(404).send("Not found")
    }
    console.log("Returning " + filePath);
    return res.download(path.resolve(filePath));
});
 
var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});


