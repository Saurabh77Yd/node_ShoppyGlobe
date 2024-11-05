import jwt from "jsonwebtoken";

const JWT_SECRET = "sau123";

export const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, sau123);
    req.userId = verified.userId;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
