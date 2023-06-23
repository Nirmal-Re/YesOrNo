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
} = require("../model/user.js");
const { TOKEN_SECRET_KEY, PASSWORD_SECRET_KEY } = require("../constants");
const { FRONT_END_URL } = process.env;

const app = express();
app.use(cors());
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
    cookie: { maxAge: 5000000 },
    saveUninitialized: false,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/../../client/build")));

app.post("/userdata", async (req, res) => {
  console.log("User Data Route Accessed");
  const usrData = req.body;
  //TODO Check if username or Email already exist
  await createUser(usrData);
  res.redirect(`${FRONT_END_URL}/login`);
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
    return res.json({ loggedIn: true });
  } else {
    return res.send({
      message: "Incorrect Password",
    });
  }
});

app.get("/isLoggedin", (req, res) => {
  const temp = {
    loggedIn: false,
  };
  console.log("Session on isLogged In", req.session);
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
  if (await checkUserExist(email)) {
    changePasswordToken(email);
  } else {
    res.json({ error: "Email Doesn't Exist" });
  }
});

// app.get("/changePassword/:token", async (req, res) => {
//   const { token } = req.params;
//   const { email } = jwt.verify(token, PASSWORD_SECRET_KEY);
//   if (await checkUserExist(email)) {
//     res.send({ passChange: true });
//     // res.redirect(`/resetPassword/${token}`);
//   } else {
//     res.json({ error: "something went wrong" });
//   }
// });

app.post("/resetPassword/:token", async (req, res) => {
  const { token } = req.params;
  const { email } = jwt.verify(token, PASSWORD_SECRET_KEY);
  const { password } = req.body;
  if (await checkUserExist(email)) {
    console.log(password);
    const result = await updateUserPassword(password, email);
    console.log(result);
    res.json({ message: "Password Change sucessfull" });
  } else {
    res.json({ error: "something went wrong" });
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../client/build", "index.html"));
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
