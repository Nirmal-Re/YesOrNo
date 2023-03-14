const path = require("path");

const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "/../../client/build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/../../client/build", "index.html"));
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
