const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;


const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fobb8.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run(){
    try{
        await client.connect();
        const database = client.db('jibon');
        const servicesCollection = database.collection('services');

        app.get('/services',async(req,res)=>{
            const query = {};
            const cursor = servicesCollection.find(query);
            const result = await cursor.toArray();
            res.json(result);
        })
    }
    finally{
        // client.close();
    }
}
run().catch(console.dir)

app.get('/',async(req,res)=>{
    res.send('getting info from index.js of jibon')
})

app.listen(port, ()=>{
    console.log(`listenning at ${port}`)
})