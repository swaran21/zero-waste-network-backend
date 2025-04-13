const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Your JWT secret
    req.user = decoded; // You can use decoded.id or decoded.email based on what you stored
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

