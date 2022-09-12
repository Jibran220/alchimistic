import mongoose from "mongoose";
import products from "../models/products.js"


export const getProducts = async (req, res) => {
    try {
        const postMessages = await products.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getProduct = async (req, res) => {

    let result = await products.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ "result": "No Record Find" })
    }



}

export const createPost = async (req, res) => {
    const productpost = req.body;
    const newproductpost = new products(productpost)
    try {
        await newproductpost.save();
        res.status(200).json(newproductpost)
        console.log(productpost);

    } catch (error) {
        res.status(409).json({ message: error })

    }

}



export const updateproduct = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    // {...post,_id}
    const updatedproduct = await products.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.json(updatedproduct)
}


export const deleteproduct = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
    await products.findByIdAndRemove(id)
    res.json({ message: "Post Deleted Sucessfully" })

}
















