import User from "../models/user.model.js";


const userRegistration = async (req,res) =>{

    const {name, email, password} = req.body;

    try{
        if(!name || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        
        const newUser =  new User({
            name,
            email,
            password
        });

        await newUser.save();
        
        return res.status(201).json({message: "User registered succefully", user: newUser});



    }catch(error){
        return res.status(500).json({message: "Server error", error: error.message});
    }
}



export {userRegistration};