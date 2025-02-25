// Middleware:
import express from 'express';
import jwt from 'jsonwebtoken';
import "dotenv/config";

const authMiddleware = express.Router();

authMiddleware.use((req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    // Compare The Token:
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token is not valid' });
        req.user = user;
        next();
    });
});

export default authMiddleware;