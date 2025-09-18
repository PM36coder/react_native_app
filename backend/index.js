import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './DataBase/db.js'
import logger from './middleware/logger.js'
import RecipeRoute from './router/RecipeRouter.js'
import userAuth from './router/userAuth.js'
dotenv.config()


const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/api/recipe',RecipeRoute)
app.use('/api/user', userAuth)

app.get('/',(req,res)=>{
    return res.status(200).json({message: "running"})
})


// Fixed: Added proper error handling
connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});