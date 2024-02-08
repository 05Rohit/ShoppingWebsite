const express=require('express')
const router=express.Router();


const product= require('../Modal/ProjectSchema.js');

const app=express();
app.use(express.json())
app.use(router)


//Add data to the mangodb 
router.post('/uploadProduct',async(req, res)=>{
    const productdata= await product(req.body);
    await productdata.save();
})


// Getting data from the mamngobd 
router.get('/getproductdata',async(req, res)=>{
    const data= await product.find({})
    //res.send(data) // Getting Data from the MONGODB
    res.send(JSON.stringify(data)); // Getting Data from the MONGODB 
    

})

module.exports=router;