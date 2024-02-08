const mongoose= require ('mongoose')

const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
       
    },
    discountedPrice:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },

})

const product= mongoose.model('ProductData',productSchema)

module.exports=product;