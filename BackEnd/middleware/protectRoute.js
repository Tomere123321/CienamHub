const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, "secretKey");

    if (!decoded) {
      return res.status(401).json({ error: "Token is not valid"});
    }

    const user = (req.user = await userModel.findById(decoded.userId));

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    
    req.user = user;
    
    next();
  
  } 
   catch (e) {
    console.log("error in ProtectRoute Middlwere", e.message);
    res.status(401).json({ error: "Unauthorized, token failed" });
  }
};

module.exports = protectRoute;