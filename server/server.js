const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const dbName = 'LibBase'
let books

MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err)
    
    console.log(`Connected MongoDB: ${url}`)

    const db = client.db(dbName)
    books = db.collection('books') 
})

app.use(express.json())

app.listen(3002, () => {
    console.log("Listening on 3002")   
})

app.get("/get", async (req, res) => {
    const query = req.query.title
    let result 
    try {
        result = await findByTitle(query)
    } catch (err) {
        console.log(err)
    }
    res.send(result)
})

app.post("/add", async (req, res) => {
    const result = await addBookToDatabase(req.body.bookInfo)
    
    if(result.modifiedCount == 0 && result.upsertedCount == 0) {
        console.error("Server: Boken kunde inte läggas till i databasen")
        res.send("Boken kunde inte läggas till i databasen")
    } else if(result.modifiedCount > 0) {
        console.log("Server: Boken uppdaterades i databasen")
        res.send("Boken uppdaterades i databasen")
    } else if(result.upsertedCount > 0) {
        console.log("Server: Boken lades till i databasen")
        res.send("Boken lades till i databasen")
    } else {
        console.error("Server: Något gick fel")
        res.send("Något gick fel")
    }
})

const findByTitle = (title) => {
    const regex = new RegExp(title, "gi")
    return new Promise((resolve, reject) => {
        books.find({"title": {$regex: regex}}).toArray((err, items) => {
            err ? reject(err) : resolve(items)
        })
    })
}

const addBookToDatabase = async (bookInfo) => {
    return await books.updateOne({ ISBN: bookInfo.isbn }, { $set: bookInfo }, { upsert: true })
}