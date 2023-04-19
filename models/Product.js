import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({  
  url: {
    type: String,
    required: true
  },
  metadata: {
    type: Object,    
  }
})


const Product = mongoose.model('Producto', ProductSchema)
export default Product