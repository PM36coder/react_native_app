import { User } from "../Models/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userRegister = async (req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({message : "All fields are required"})
        }

        const existsEmail = await User.findOne({email})
        if(existsEmail){
            return res.status(400).json({message : "Email already exists"})
        }
const hashPassword = await bcrypt.hash(password,10)

        const newUser = await User.create({
            email,
            password : hashPassword
        })

        newUser.password = undefined

        const token = jwt.sign({email: newUser.email, id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        return res.status(201).json({message: "user created", newUser,token})
    } catch (error) {
        console.log("error ",error)
        res.status(500).json({message : "server error"})
    }
}

const userLogin = async (req,res)=>{
    try {
        const {email,password} = req.body
 if(!email || !password){
            return res.status(400).json({message : "All fields are required"})
        }

         const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message : "Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({message : "Invalid Credentials"})
        }

        user.password = undefined
        const token = jwt.sign({email: user.email, id: user._id},process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        res.status(200).json({message: "user logged in", user,token})
    } catch (error) {
        console.log("error ",error)
        res.status(500).json({message : "server error"})
    }
}

export {userRegister,userLogin}