import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: [String],     
  instructions: String,
  image: String,
  user : { type : Schema.ObjectId, ref:"User", required: true}
}, {
  timestamps: true           
});

const Recipe = model("Recipe", recipeSchema);

export default Recipe;