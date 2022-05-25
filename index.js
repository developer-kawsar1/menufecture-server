const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 5000
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://dbuser1:8x1PSO1aLxsujfdU@cluster0.13n6t.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  
  
    try {
      await client.connect();
      const serviceCollection = client.db('menufactureBD').collection('product')
      const reviewCollection = client.db('reviewDb').collection('review')
      app.get('/product', async (req, res) => {
        const query = {}
        const cursor = serviceCollection.find(query);
        const products = await cursor.toArray()
        res.send(products)
      })
      app.get('/reviews', async (req, res) => {
        const query = {}
        const cursor = reviewCollection.find(query);
        const products = await cursor.toArray()
        res.send(products)
      })
      
  }finally{
    
  }
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

run().catch(console.dir)



