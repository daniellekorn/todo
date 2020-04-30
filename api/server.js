const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const PORT = 5000;
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello");
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));

//Mongo DB
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const uri = `mongodb+srv://eliaye:${key}@cluster0-yoyrf.mongodb.net/test?retryWrites=true&w=majority`;
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
