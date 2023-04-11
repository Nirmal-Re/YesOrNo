const express = require("express");
const session = require("express-session");
const { restart } = require("nodemon");

const path = require("path");

const { createUser, checkPass, checkUserExist } = require("../model/user.js");

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "some secret",
    cookie: { maxAge: 5000000 },
    saveUninitialized: false,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/../../client/build")));

app.post("/userData", async (req, res) => {
  console.log("User Data Route Accessed");
  const usrData = req.body;
  await createUser(usrData);
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  const usrData = req.body;
  if (await checkUserExist(usrData)) {
    console.log("User Exist");
  } else {
    return res.send({
      message: "User doesn't exist",
    });
  }

  if (await checkPass(usrData)) {
    console.log("User Logged In");
    req.session.authenticated = true;
    req.session.user = {
      username: usrData.username,
    };
    return res.redirect("/login");
  } else {
    return res.send({
      message: "Incorrect Password",
    });
  }
});

app.get("/isLoggedIn", (req, res) => {
  const temp = {
    loggedIn: false,
  };
  if (req.session.authenticated) {
    console.log("User IS Logged In");
    temp.loggedIn = true;
    res.send(temp);
  } else {
    console.log("User Isn't Logged In");
    res.send(temp);
  }
});

app.get("/logOut", (req, res) => {
  req.session.destroy();
  const temp = {
    loggedIn: false,
  };
  res.send(temp);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../client/build", "index.html"));
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
