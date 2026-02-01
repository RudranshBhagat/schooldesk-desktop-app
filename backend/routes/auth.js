const express = require("express")
const  router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./../models/User.Model");
const jwt = require("jsonwebtoken");
const { createTeacher } = require("../controllers/teacher");



// Register Route
// Post

router.post("/signup", async(req, res)=>{
    const {name, email, password} = req.body;
    try{
        if(!name || !email || !password){
            return res
            .status(400)
            .json({status:"N", message:"All fields are required"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
             return res
            .status(400)
            .json({status:"N", message:"User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = User({name , email, password: hashedPassword});
        await newUser.save();
          return res
      .status(201)
      .json({status:"Y", message: "User Registered Successfully"});
    }
    catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }
});

//Login Route
// Post

router.post("/login", async(req, res)=>{
    const { email, password} = req.body;
    try{
        if( !email || !password){
            return res
            .status(400)
            .json({status:"N", message:"All fields are required"});
        }
        const existingUser = await User.findOne({email});
        if(!existingUser){
             return res
            .status(400)
            .json({status:"N", message:"Invalide Email or Password"});
        }
        

        const isvalidPassword = await bcrypt.compare(
            password, 
            existingUser.password
        );
        if(!isvalidPassword){
            return res
            .status(400)
            .json({status:"N", message:"Invalide Email or Password"});
        }

        const token = jwt.sign({
            userId: existingUser._id, 
            email: existingUser.email, 
            name: existingUser.name
        }, 
        process.env.JWT_SECRET, 
        {expiresIn: "2h"}
    );


      return res
      .status(200)
      .json({status:"Y", message: "Loged In Successfully", token, 
      user:
      {
        id: existingUser._id, 
        name: existingUser.name, 
        email: existingUser.email
    }
});
    }
    catch(error){
        console.log(error);
        return res
            .status(500)
            .json({status:"N", error: `Internal Server Error: ${error}`}); 
    }
});


module.exports = router;