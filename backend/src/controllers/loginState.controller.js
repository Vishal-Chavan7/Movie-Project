import User from "../models/user.model.js";
const loginState = async(req,res) =>{
    const user = await User.findById(req.user); // req.user is the user ID
  res.json({ success: true, user });
}

export  {loginState}