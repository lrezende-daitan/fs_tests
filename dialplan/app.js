"use strict";

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
      return returnNotFound(res);
    }
    switch(requestInfo.key_value) {
      case "callcenter.conf":
        return callcenterRequest(req, res)
      case "ivr.conf":
        return ivrRequest(req, res)
      default:
        return genericConfigRequest(req, res)
    }
});
 
var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});

function genericConfigRequest(req, res) {
    let requestInfo = req.body;
    let filePath = "./configurations/" + requestInfo.key_value + ".xml";
    if(!fs.existsSync(filePath)) {
      return returnNotFound(res);
    }
    return returnFile(res, filePath);
}

function ivrRequest(req, res) {
    let filePath = '';
    let requestInfo = req.body;
    if(requestInfo['Event-Name'] == "REQUEST_PARAMS") {
      filePath = "./ivr_menus/" + requestInfo['Menu-Name'] + ".xml";
    } else {
      return returnNotFound(res);
    }
    if(!fs.existsSync(filePath)) {
      return returnNotFound(res);
    }
    return returnFile(res, filePath);
}

function callcenterRequest(req, res) {
    let filePath = '';
    let requestInfo = req.body;
    if(requestInfo['Event-Name'] == "REQUEST_PARAMS") {
      filePath = "./callcenter_configs/" + requestInfo['CC-Queue'] + ".xml";
    } else {
      filePath = "./configurations/callcenter.conf.xml";
    }
    if(!fs.existsSync(filePath)) {
      return returnNotFound(res);
    }
    return returnFile(res, filePath);
}

function returnFile(res, filePath) {
    console.log("Returning " + filePath);
    return res.download(path.resolve(filePath));
}

function returnNotFound(res) {
  return res.download(path.resolve("./not-found.xml"));
}