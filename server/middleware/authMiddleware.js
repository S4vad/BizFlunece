import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "User not found" });
    }

    // 5. Check if user changed password after token was issued
    // if (user.changedPasswordAfter(decoded.iat)) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "User recently changed password. Please log in again.",
    //   });
    // }

    req.user = decoded;
    req.currentUser = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
