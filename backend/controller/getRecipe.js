// controller/getRecipe.js
import e from "express";
import Recipe from "../Models/Recipe.js";

const getAllRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.find();

    return res.status(200).json({ message: "fetched ", recipe });
  } catch (error) {
    console.error("❌ Error in getAllRecipe:", error);
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

//!upload recipe 
const uploadRecipe = async(req,res)=>{
  try {
    const  {title,ingredients,instructions,image} = req.body
  if( !title || !ingredients || !instructions){
    return res.status(400).json({message : 'All fields are required'})
  }

  const newRecipe = await Recipe.create({
    title,
    ingredients,
    instructions,
    image: image || null
  })

  res.status(201).json({message:"Recipe Uploaded" , newRecipe})
  } catch (error) {
    console.log(error, "server side error")
    res.status(500).json({message: "Server Side Error"})
  }
}




export { getAllRecipe ,uploadRecipe};
