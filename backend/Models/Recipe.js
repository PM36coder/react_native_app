import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: [String],     
  instructions: String,
  image: String
}, {
  timestamps: true           
});

const Recipe = model("Recipe", recipeSchema);

export default Recipe;