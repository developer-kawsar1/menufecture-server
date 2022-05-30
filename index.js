const express = require('express')
const cors = require('cors');  
const jwt = require('jsonwebtoken');
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
      const usersCollection = client.db('usersDb').collection('user')
      app.get('/product', async (req, res) => {
        const query = {}
        const cursor = serviceCollection.find(query);
        const products = await cursor.toArray()
        res.send(products)
      }) 


      app.post('/product',async(req,res)=>{
        const newProduct=req.body 
        console.log(newProduct);
        const result=await serviceCollection.insertOne(newProduct) 
        res.send(result) 
        console.log(result); 
        

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
      app.get('/user',  async (req, res) => {
        const users = await usersCollection.find().toArray();
        res.send(users);
      }); 
      app.get('/user/:id', async(req,res)=>{
        const id=req.params.id
        const query={_id:ObjectId(id)} 
        const user= await usersCollection.findOne(query)
        res.send(user) 
        // console.log(user);
      }) 
      // single item api 
      app.get('/user/:email', async(req,res)=>{
        const id=req.params.id
        const query={_id:ObjectId(id)} 
        const product= await serviceCollection.findOne(query)
        res.send(product)
    }) 
// put api

app.put('/user/:email',async (req,res)=>{
  const email = req.params.email; 
  const filter = { email: email };  
  const user = req.body;
  const options = { upsert: true };
  const updateDoc = {
    $set: user,
  }; 
  const result = await usersCollection.updateOne(filter, updateDoc, options); 
  const token=jwt.sign({email:email},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1h' })
  res.send( {result,token});
}) 




         // post  api
    app.post('/reviews',async(req,res)=>{
      const newReview=req.body 
      console.log(newReview);
      const result=await reviewCollection .insertOne(newReview) 
      res.send(result) 
      console.log(result); 
      

  }) 
  app.get('/api/users', function(req, res) {
    const user_id = req.query.id;
    const token = req.query.token;
    const geo = req.query.geo;
  
    res.send({
      'user_id': user_id,
      'token': token,
      'geo': geo
    });
  });
    app.post('/orders',async(req,res)=>{
      const newOrder=req.body 
      console.log(req.query);
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



