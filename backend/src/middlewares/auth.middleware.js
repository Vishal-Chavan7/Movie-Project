import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("Auth middleware triggered");
  console.log("Request cookies:", req.cookies);
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" }); 
  }
};

export default authMiddleware;