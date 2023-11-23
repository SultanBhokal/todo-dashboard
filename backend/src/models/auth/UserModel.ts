import {mongoose} from "../../service/mongooseService";
import { signUpType } from "../../types/auth/signup";

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:String,
    password:String,
    email:String,
})


const userModel = mongoose.model('dbuser',userSchema);

export const registerUser = (data:signUpType)=>{
    const newUser = new userModel(data);
    return newUser.save()
}

export const getUserByEmail = (email:string)=>{
    return userModel.findOne({email})
}
