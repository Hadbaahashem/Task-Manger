const jwt = require("jsonwebtoken");

// Authentication 
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication token is required" });
    }

    jwt.verify(token, process.env.JWT_SECRET || "tcmTm", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user;  // Attach the user object to the request
        next();
    });
};

module.exports = { authenticateToken };
