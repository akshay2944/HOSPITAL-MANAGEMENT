import jwt from "jsonwebtoken";

const verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({
      message: "Token expired"
    });
  }
};

export default verifyAccessToken;