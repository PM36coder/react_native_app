import {Schema , model} from 'mongoose';

const userSchema = new Schema({
    email:{
        type: String, required: true, unique:true, trim: true, lowercase:true
    },
    password:{
        type: String, required: true,  trim: true 
    }
},{timestamps: true})


export const User = model('User', userSchema)