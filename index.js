const express = require('express')
const cors = require('cors'); 
require('dotenv').config()
const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const app = express()
const port = process.env.PORT||5000
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.13n6t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  
  
    try {
      await client.connect();
      const serviceCollection = client.db('menufactureBD').collection('product')
      const reviewCollection = client.db('reviewDb').collection('review')
      const orderCollection = client.db('orderDb').collection('order')
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
      app.get('/orders', async (req, res) => {
        const query = {}
        const cursor = orderCollection.find(query);
        const orders = await cursor.toArray()
        res.send(orders)
      }) 
      // single item api 

         // post  api
    app.post('/reviews',async(req,res)=>{
      const newReview=req.body 
      console.log(newReview);
      const result=await reviewCollection .insertOne(newReview) 
      res.send(result) 
      console.log(result); 
      

  }) 
    app.post('/orders',async(req,res)=>{
      const newOrder=req.body 
      console.log(newOrder);
      const result=await orderCollection .insertOne(newOrder) 
      res.send(result) 
      console.log(result); 
      

  }) 

      app.get('/product/:id', async(req,res)=>{
        const id=req.params.id
        const query={_id:ObjectId(id)} 
        const product= await serviceCollection.findOne(query)
        res.send(product)
    }) 
      
  }finally{
    
  }
}


app.get('/', (req, res) => {
  res.send('Running server')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

run().catch(console.dir)



