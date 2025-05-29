import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) =>{

    const token  = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Token not found",
            success: false
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decode);
        if(!decode){
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        }
        req.user = decode.id;
        console.log("User ID from token:", req.user);
        next();
    } catch (error) {
        console.log("Error during token verification:", error);
        return res.status(401).json({
            message: "Server error",
            error: error.message,
            success: false
        })
    }



}

export default authMiddleware;