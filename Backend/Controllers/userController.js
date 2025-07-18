import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}


//Route for user login
const loginUser = async (req, res)=>{
    try {
        const {email, password}=req.body;
        const user = await userModel.findOne({email});
        if(!user){
            res.json({msg:"User does'nt Exist", success:false})
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(isMatched){
            const token = createToken(user._id)
            res.json({success:true, token})
        }else{
            res,json({success:false, msg:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
            res.json({success:false, msg:"Invalid"})

    }

}

//route for registration
const registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        //checking user already exist or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, msg: "User Already Exist"})
        }
        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, msg: "Please enter a valid Email"})            
        } 
        if (password.length < 8) {
            return res.json({success:false, msg: "Please enter a Strong Password"})            
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name, email, password : hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error)
        res.json({success:false, msg:"error.msg"})
    }
}

//Admin Login route
const adminLogin = async (req, res)=>{
    try {
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true, token})
        }else{
            res.json({succees:false, message:"invalid credentials"})
        }
    } catch (error) {
         console.log(error)
        res.json({success:false, msg:"error.msg"})
    }
}

export {loginUser, registerUser, adminLogin}