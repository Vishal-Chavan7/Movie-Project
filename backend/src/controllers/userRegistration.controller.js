import User from "../models/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


const userRegistration = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("Received registration request:", req.body);

    if (!name || !email || !password) {
      console.log("Missing fields:", { name, email, password });
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const token = crypto.randomBytes(32).toString("hex");
    console.log("Generated verification token:", token);

    newUser.verificationToken = token;
    await newUser.save();
    console.log("New user saved:", newUser);

    // send the verification email with the token
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
      to: newUser.email,
      subject: "Verify your email",
      text: `Please click on the link to verify your email:\n${process.env.BASE_URL}/api/v1/users/verify/${token}`,
      html: `<b>Please click on the link to verify your email:</b>
             <a href="${process.env.BASE_URL}/api/v1/users/verify/${token}">Verify Email</a>`,
    };

    console.log("Mail options:", mailOptions);

    // Use await for sendMail to catch errors properly
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.response);
    } catch (mailErr) {
      console.log("Error sending email:", mailErr);
      // Optionally, you can return an error here if email is critical
    }

    return res.status(201).json({
      message: "User registered succefully. Please verify your email",
      user: newUser,
      success: true,
    });

  } catch (error) {
    console.log("Registration error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

const verifyEmail = async (req,res) =>{
    const {token} = req.params;
    console.log("Verification token received:", token);
    
    if(!token) {
        console.log("No token provided");
        return res.status(400).json({ message: "Invalid token" });
    }

    try{
        const user = await User.findOne({verificationToken:token});
        if(!user){
            console.log("User not found for token:", token);
            return res.status(404).json({ message: "User not found" });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
        console.log("User verified successfully:", user.email);

        return res.status(200).json({
            message: "Email verfied successfully",
            user: user, success: true
        })

    }catch(error){
        console.log("Error during email verification:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

const login  = async (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "Please fill all the fields",
            success: false  
        })
    }

    try{
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            })
        }

        if(!existingUser.isVerified){
            return res.status(400).json({
                message: "User not verified",
                success: false
            })
        }

        const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });
        console.log("Generated JWT token:", token);

        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict", 
            maxAge: 24 * 60 * 60 * 1000, // 1d,
            path: "/"

        })


        return res.status(200).json({
            message: "Login successful",
            success: true,
            user: existingUser,
            token: token
        })
    }catch(error){
        console.log("Login error: ", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message,
            success: false
        })
    }
}

export { userRegistration, verifyEmail, login};