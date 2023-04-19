const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://mongodb:27017";

let db;
let messageCollection;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, Docker Compose!");
});

app.get("/messages", async (req, res) => {
    const messages = await messageCollection.find({}).toArray();
    res.json(messages);
});

app.post("/messages", async (req, res) => {
    const message = req.body;
    await messageCollection.insertOne(message);
    res.status(201).send("Message created");
});

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Connected to MongoDB");
    db = client.db("test");
    messageCollection = db.collection("messages");
    app.listen(3000, () => console.log("Server listening on port 3000"));
});
