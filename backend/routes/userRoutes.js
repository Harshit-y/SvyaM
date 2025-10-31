import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post("/register", async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message: "Please provide all the fields"})
        
        try{
            const userExists = await User.findOne({email});
            if(userExists) return res
                .status(409)
                .json({message: "user already exists"})

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const user = await User.create({
                email,
                password: hashedPassword
            })
            res.status(201).json({message:"User resgistered", user:
                {email: user.email}
            })
        }catch (err){
            res.status(500).json({message: "Server error"})
        }
})

export default router;