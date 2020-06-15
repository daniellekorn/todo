const express = require("express");
const cors = require("cors");
const path = require("path");
const uri = require("./key");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
var cookieParser = require("cookie-parser");

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

//Mongo DB
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies["access_token"];
  console.log(authToken);
  // Inject the user to the request
  //set authToken in mongoDB for user and then pull it below to check in req.user
  // req.user = authTokens[authToken];

  next();
});

client.connect((err) => {
  if (!err) {
    console.log("Mongodb connected successfully");
  } else {
    console.log(err);
    client.close();
  }
});

const requireAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send({
      message: "Please login to continue",
      messageClass: "alert-danger",
    });
  }
};

app.get("/", requireAuth, (req, res) => {
  // const collection = client.db("todo").collection("user1");
  collection
    .find()
    .toArray()
    .then((todoItems) => {
      res.send(todoItems);
    });
});

app.post("/", requireAuth, (req, res) => {
  // const collection = client.db("todo").collection("user1");
  collection.insertOne({
    id: uuidv4(),
    title: req.body.title,
    completed: false,
  });
  console.log("success");
});

//All login / auth stuff
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

app.post("/signup", (req, res) => {
  const { email, first, last, password, confirm } = req.body;
  const collection = client.db("todo").collection("users");

  // Check if the password and confirm password fields match
  if (password === confirm) {
    // Check if user with the same email is also registered
    // if (collection.find({ email: email })) {
    //   console.log("already exists");
    //   res.send("already exists");
    // }

    const hashedPassword = getHashedPassword(password);

    // Store user into the database if you are using one
    collection.insertOne({
      first,
      last,
      email,
      password: hashedPassword,
    });
    console.log("success");

    res.send("yay");
  } else {
    console.log("nope");
    res.send("nope");
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);
  const collection = client.db("todo").collection("users");

  const user = collection.findOne({ email: email, password: hashedPassword });

  if (user) {
    const authToken = generateAuthToken();

    // // Store authentication token
    // authTokens[authToken] = user;

    // Setting the auth token in cookies
    res.cookie("AuthToken", authToken);
    res.send(authToken);
    // Redirect user to the protected page
  } else {
    res.send("Invalid login information");
  }
});
