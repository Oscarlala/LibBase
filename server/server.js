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

const findByTitle = (title) => {
    const regex = new RegExp(title, "gi")
    return new Promise((resolve, reject) => {
        books.find({"title": {$regex: regex}}).toArray((err, items) => {
            err ? reject(err) : resolve(items)
        })
    })
}