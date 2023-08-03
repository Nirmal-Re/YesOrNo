const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const path = require("path");

const {
  createUser,
  checkPass,
  checkUserExist,
  confirmUser,
  changePasswordToken,
  updateUserPassword,
  queryUserID,
} = require("../model/user.js");

const { makeDecision } = require("../model/decision.js");
const { TOKEN_SECRET_KEY, PASSWORD_SECRET_KEY } = require("../constants");
const { FRONT_END_URL } = process.env;

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(
  session({
    secret: "some secret",
    cookie: { maxAge: 5000000, httpOnly: false },
    saveUninitialized: false,
    resave: false,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/../../client/build")));

app.post("/signup", async (req, res) => {
  console.log("User Data Route Accessed");
  //TODO authenticate data sent by the user
  const usrData = req.body;
  await createUser(usrData);
  res.json({ success: true });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (await checkUserExist(username)) {
    console.log("User Exist");
  } else {
    return res.send({
      message: "User doesn't exist",
    });
  }

  if (await checkPass({ username, password })) {
    req.session.authenticated = true;
    req.session.user = {
      username,
    };
    console.log("Session on successful login: ", req.session);
    req.session.save();
    return res.json({ loggedIn: true });
  } else {
    return res.status(401).json({ error: "Invalid username or password" });
  }
});

app.get("/isLoggedin", (req, res) => {
  console.log("[isLoggedin] API hit => ");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  const temp = {
    loggedIn: false,
  };
  if (req.session.authenticated) {
    temp.loggedIn = true;
    res.send(temp);
  } else {
    res.send(temp);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  const temp = {
    loggedIn: false,
  };
  res.send(temp);
});

app.get("/confirm/:token", async (req, res) => {
  const { username } = jwt.verify(req.params.token, TOKEN_SECRET_KEY);
  console.log("Confirm API hit => ");
  if (await checkUserExist(username)) {
    confirmUser(username);
  }
});

app.get("/isChangingPass/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const { email } = jwt.verify(token, PASSWORD_SECRET_KEY);

    if (await checkUserExist(email)) {
      res.send({ passChange: true });
    } else {
      res.send({ passChange: false });
    }
  } catch (e) {
    res.send({ passChange: false });
  }
});

app.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  console.log("[FORGOT PASSWORD API HIT]");
  if (await checkUserExist(email)) {
    changePasswordToken(email);
    res.json({ success: true });
  } else {
    res.json({ error: "Email Doesn't Exist", success: false });
  }
});

app.post("/resetPassword/:token", async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);
    const { email } = jwt.verify(token, PASSWORD_SECRET_KEY);
    const { password } = req.body;
    if (await checkUserExist(email)) {
      console.log(password);
      const result = await updateUserPassword(password, email);
      console.log(result);
      res.json({ message: "Password Change sucessfull" });
    } else {
      res.json({ error: "Something went wrong" });
    }
  } catch (e) {}
});

app.post("/decisionMade", async (req, res) => {
  if (req.session.authenticated) {
    const { username } = req.session.user;
    const { decision } = req.body;
    const value = ["GY", "GN", "BY", "BN"].includes(decision);
    //very close to finishing decision made
    // I stopped here because i need to modify retrieve function in db.js to more be more generic
    res.send({ username, decision, value });
  } else {
    res.send({ val: "val" });
  }

  //user ID
  //decision type
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../client/build", "index.html"));
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
