import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Middleware to protect routes (user must be logged in)
export const protect = async (req, res, next) => {
  let token;

  // Read the JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the token's payload
      // Attach the user object to the request (excluding the password)
      req.user = await User.findById(decoded.userId).select('-password');

      // Call the next middleware or route handler
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to restrict routes to admins only
export const adminOnly = (req, res, next) => {
  // This middleware MUST run AFTER the 'protect' middleware
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' }); // 403 Forbidden
  }
};