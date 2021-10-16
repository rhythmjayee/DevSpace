const express=require('express');
const router=express.Router();
const { check,validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const config=require("config");

const User=require("../../models/User");
const auth=require("../../middleware/auth");


router.get('/',auth,async(req,res)=>{
    
    try{
        const user=await User.findById(req.user.id).select("-password");
        res.json(user);

    }catch(err){
        res.status(500).send("Server error");
    }

});

router.post('/',[
    check('email',"Please provide valid email").isEmail(),
    check('password',"Please is required").exists()
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    } 
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});

        if(!user){
            return res.status(400).json({errors:[{msg:'Invalid credentials'}]});
        }

        const isMath=await bcrypt.compare(password,user.password);

        if(!isMath){
            return res.status(400).json({errors:[{msg:'Invalid credentials'}]});
        }


        // res.send("User Registered")
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,
            config.get('jwtsecret'),
            {expiresIn:3600},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            });

    }catch(err){
        console.log(err.message);
        res.status(500).send("Server error");
    }
});


module.exports=router;