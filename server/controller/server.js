const path = require("path");
const { createUser, checkUser } = require("../model/user.js");

const express = require("express");
const { create } = require("domain");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/../../client/build")));

app.post("/userData", async (req, res) => {
  console.log("User Data Route Accessed");
  const usrData = req.body;
  await createUser(usrData);
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  console.log("User Getting Logged In");
  const usrData = req.body;
  console.log(usrData);
  checkUser(usrData);
  res.redirect("/home");
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../client/build", "index.html"));
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
