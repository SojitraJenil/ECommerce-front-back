const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token

    if (!token) {
        return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
        req.user = { id: decoded.id }; // Attach user ID to request
        next();
    } catch (err) {
        return res.status(401).json({ status: "error", message: "Invalid token" });
    }
};
