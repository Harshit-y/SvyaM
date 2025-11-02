import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (res, userId, userRole) => {
  // Create the token
  const token = jwt.sign(
    { userId, role: userRole }, // The data we want to store
    process.env.JWT_SECRET,      // The secret key
    { expiresIn: '30d' }         // Token expires in 30 days
  );

  // Set the token as an httpOnly cookie
  res.cookie('jwt', token, {
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevents CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
};

export default generateTokenAndSetCookie;