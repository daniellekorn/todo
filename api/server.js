const express = require("express");
const cors = require("cors");
const path = require("path");
const uri = require("./key");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

//Mongo DB
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (!err) {
    console.log("Mongodb connected successfully");
  } else {
    console.log(err);
    client.close();
  }
});

// app.use((req, res, next) => {
//   // Get auth token from the cookies
//   const collection = client.db("todo").collection("users");
//   const authToken = req.cookies["access_token"];
//   console.log(authToken);
//   collection.findOne({ authToken: authToken }).then((data) => {
//     data ? (req.user = data) : (req.user = false);
//   });
//   next();
// });

// const requireAuth = (req, res, next) => {
//   if (req.user) {
//     console.log("user exists");
//     next();
//   } else {
//     res.send({
//       message: "Please login to continue",
//       messageClass: "alert-danger",
//     });
//   }
// };

app.get("/todos", authenticateToken, (req, res) => {
  const collection = client.db("todo").collection("todos");
  collection
    //find all docs with a userId saved as same id of user
    .find()
    .toArray()
    .then((todoItems) => {
      res.send(todoItems);
    });
});

app.post("/todos", authenticateToken, (req, res) => {
  const collection = client.db("todo").collection("todos");
  collection
    .insertOne({
      id: uuidv4(),
      title: req.body.title,
      completed: false,
      //add userId field for one to many relationship
      userId: 1,
    })
    .then((data) => console.log(data));
});

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

app.post("/signup", (req, res) => {
  const { email, first, last, password, confirm } = req.body;
  const collection = client.db("todo").collection("users");

  // Check if the password and confirm password fields match
  if (password === confirm) {
    //want to check here if already user with that password
    const hashedPassword = getHashedPassword(password);

    // Store user into the database if you are using one
    collection
      .insertOne({
        first,
        last,
        email,
        password: hashedPassword,
      })
      .then((data) => {
        console.log("success");
        res.send(data);
      });
  } else {
    res.send("nope");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);
  const collection = client.db("todo").collection("users");

  let user;
  await collection
    .findOne({ email: email, password: hashedPassword })
    .then((data) => {
      if (data) {
        const authToken = "testing";

        // Store authentication token in db
        collection.updateOne(
          { email: email, password: hashedPassword },
          { $set: { authToken } }
        );

        // Setting the auth token in cookies
        res.cookie("AuthToken", authToken);
        res.send(authToken);
        // Redirect user to the protected page
      } else {
        res.status(400);
        res.send("Invalid login information");
      }
    });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
