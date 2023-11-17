


const express = require('express')
require('dotenv').config()

const app = express()

const cors = require('cors')
const port = process.env.PORT ||5000;

app.use(cors());
app.use(express.json())





console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xm8ksdz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const foodCollection = client.db('foodDB').collection("food");
    const foodRequestCollection = client.db('foodDB').collection("foodRequestDb");
    // const productCollection = client.db('productDB').collection("product");

    

// All get operation
// feuarted 6 data on home page get oparetion
 app.get("/foods" , async(req , res)=>{
      const cursur = foodCollection.find();
      const result = await cursur.toArray();
      res.send(result)
    })


    // aviable food to get data

 app.get("/aviableFood" , async(req , res)=>{
      const cursur = foodCollection.find();
      const result = await cursur.toArray();
      res.send(result)
    })

    // Get one single Data
    app.get("/foods/:id" , async(req , res)=>{
   try {
    const   id  = req.params.id;
    // console.log(id);
    const queary = {_id : new ObjectId(id)}
    // console.log(queary);
    const result = await foodCollection.findOne(queary );
    // console.log(result);
    res.send(result)
   } catch (error) {
    console.log(error);
   }
    })
    
    app.get("/aviableFood:id" , async(req , res)=>{
   try {
    const   id  = req.params.id;
    // console.log(id);
    const queary = {_id : new ObjectId(id)}
    // console.log(queary);
    const result = await foodCollection.findOne(queary );
    // console.log(result);
    res.send(result)
   } catch (error) {
    console.log(error);
   }
    })
    // fOOD rEQUEST gET oPERATION
    app.get("/foodRequest" , async(req , res)=>{
      const cursur = foodRequestCollection.find();
      const result = await cursur.toArray();
      res.send(result)
    })




// All post Operation 
// User post Opertaion

    app.post("/foods", async(req , res)=> {
      const users = req.body;
      const result = await foodCollection.insertOne(users)  
    // console.log(brand); 
      res.send(result)
  })


  // Food Request Post Operation 
    app.post("/foodRequest", async(req , res)=> {
      const request = req.body;
      const result = await foodRequestCollection.insertOne(request)  
    // console.log(brand); 
      res.send(result)
  })







  // All Update Operation 
      app.put("/foods/:id" , async(req , res)=>{
      const   id  = req.params.id;
      const filter = {_id : new ObjectId(id)}
      const option = {upsert: true}
      const updateFood = req.body;
      const food ={
        $set:{
          food_name:updateFood.food_name,
          additional_notes:updateFood.additional_notes ,
          food_quantity:updateFood.food_quantity ,
          expired_date:updateFood.expired_date,
          pickup_location:updateFood.pickup_location,
          donator:updateFood.donator
        }
      }
      const result = await foodCollection.updateOne(filter,food,option);
      res.send(result)
    })


    // Food Request Put Operation  
    app.put("/foodRequest/:id" , async(req , res)=>{
      const   id  = req.params.id;
      const filter = {_id : new ObjectId(id)}
      const option = {upsert: true}
      const updateFood = req.body;
      const food ={
        $set:{
          food_status:updateFood.food_status,
          
        }
      }
      const result = await foodRequestCollection.updateOne(filter,food,option);
      res.send(result)
    })

    // Delete Operation 

    // Cancel Request Delete Opreation
   app.delete("/foodRequest/:id" , async(req , res)=>{
     try {
      const   id  = req.params.id;
      const queary = {_id : new ObjectId(id)}
      const result = await foodRequestCollection.deleteOne(queary);
      res.send(result)
      console.log(id);
     } catch (error) {
      console.log(error);
     }
    })



   app.delete("/foods/:id" , async(req , res)=>{
     try {
      const   id  = req.params.id;
      const queary = {_id : new ObjectId(id)}
      const result = await foodCollection.deleteOne(queary);
      res.send(result)
      console.log(id);
     } catch (error) {
      console.log(error);
     }
    })








    // app.get("/brand/:brandName" , async(req , res)=>{
    //   const   brandName  = req.params.brandName;
    //   const queary = {brandName:brandName}
      
    //   const items = await bransCollection.find(queary).toArray();
     
    //   res.send(items)
    // })
    // // Specific One Brand Get Dtata
    // app.get("/brands/:id" , async(req , res)=>{
    //   const   id  = req.params.id;
    //   console.log(id);
    //   const queary = {_id : new ObjectId(id)}
    //   console.log(queary);
    //   const result = await bransCollection.findOne(queary );
    //   // console.log(result);
    //   res.send(result)
    // })

    // app.get("/brand" , async(req , res)=>{
    //   const cursur = bransCollection.find();
    //   const result = await cursur.toArray();
    //   res.send(result)
    // })

    // app.get("/update" , async(req , res)=>{
    //   const cursur = bransCollection.find();
    //   const result = await cursur.toArray();
    //   res.send(result)
    // })



   


    // app.get("/update/:id" , async(req , res)=>{
    //   const   id  = req.params.id;
    //   const queary = {_id : new ObjectId(id)}
    //   const result = await bransCollection.findOne(queary);
    //   res.send(result)
    // })




    // app.put("/update/:id" , async(req , res)=>{
    //   const   id  = req.params.id;
    //   const filter = {_id : new ObjectId(id)}
    //   const option = {upsert: true}
    //   const updateBrand = req.body;
    //   const brand ={
    //     $set:{
    //       productName:updateBrand.productName,
    //        brandName:updateBrand.brandName ,
    //         typeName:updateBrand.typeName ,
    //          rating:updateBrand.rating,
    //          url:updateBrand.url,
    //          price:updateBrand.price
    //     }
    //   }
    //   const result = await bransCollection.updateOne(filter,brand,option);
    //   res.send(result)
    // })

    

    // app.delete("/products/:id" , async(req , res)=>{
    //   const   id  = req.params.id;
    //   const queary = {_id : new ObjectId(id)}
    //   const result = await productCollection.deleteOne(queary);
    //   res.send(result)
    // })

  





//     app.post("/brand", async(req , res)=> {
//       const brand = req.body;
//       const result = await bransCollection.insertOne(brand)  
//     // console.log(brand); 
//       res.send(result)
//   })


//     app.post("/product", async(req , res)=> {
//       const product = req.body;
//       const result = await productCollection.insertOne(product)  
//     // console.log(brand); 
//       res.send(result)
//   })







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}






run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello World!ddd')

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})