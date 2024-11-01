// database.js
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://jose-new:WPXAbwRWYCEUZKUJ@cluster0.2jkla.mongodb.net/"; 

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDB() {
    await client.connect();
    console.log("Conectado a MongoDB");
    return client.db("edicionesalmeyda");
}

module.exports = connectToDB;
