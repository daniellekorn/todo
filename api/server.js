const express = require("express");
const cors = require("cors");
const path = require("path");
const key = require("./key");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
	console.log("Press Ctrl+C to quit.");
});

//Mongo DB
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const uri = `mongodb+srv://eliaye:${key}@cluster0-endtr.mongodb.net/test?retryWrites=true&w=majority`;
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

app.get("/", (req, res) => {
	const collection = client.db("todos").collection("user1");
	collection
		.find()
		.toArray()
		.then((searches) => {
			res.send(searches);
		});
});

app.post("/", (req, res) => {
	const collection = client.db("todos").collection("user1");
	console.log(req.body);
	collection.insertOne({
		id: uuidv4(),
		title: req.body.title,
		completed: false,
	});
	console.log("success");
});
