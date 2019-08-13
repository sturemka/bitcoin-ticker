//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});



app.post("/", function(req, res) {
  var crypto = req.body.crypto;
  var real = req.body.real;
  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: real,
      amount: amount
    }
  };

  request(options, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;
    var date = data.time;

    res.write("<p>At " + date + "</p>");
    res.write("<h1>" + amount + " " + crypto + " is " + price + " " + real + "</h1>");
    res.send();
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
