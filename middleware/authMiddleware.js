const jwt = require('jsonwebtoken');

const jwtSecret = "secret_ecom";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

module.exports = { authMiddleware, jwtSecret };
