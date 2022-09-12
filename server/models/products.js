import mongoose from "mongoose"



const productSchema = mongoose.Schema({
    productname: String,
    selectmenu: String,
    fruitsarray: [String],
    radio: String,
    checked: Boolean,
    asd: String,
    gender: '',


    selectedFile: String,



})
const products = mongoose.model('products', productSchema)
export default products
