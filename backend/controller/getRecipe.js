// controller/getRecipe.js

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
    image: image || null,
    user: req.user.id
  })

  res.status(201).json({message:"Recipe Uploaded" , newRecipe})
  } catch (error) {
    console.log(error, "server side error")
    res.status(500).json({message: "Server Side Error"})
  }
}

const getRecipeByUserId = async(req,res)=>{
    const id = req.user.id
    try {
        
        const recipes = await Recipe.find({user : id})
         if (!recipes.length) {
      return res.status(404).json({ message: "No recipes posted" });
    }
     res.status(200).json({ recipes });
     
    } catch (error) {
        console.log("error" , error)
        res.status(500).json({message: "server error"})
    }
}
 const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { getAllRecipe ,uploadRecipe,getRecipeByUserId,getRecipeById};
