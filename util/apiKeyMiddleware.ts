import { Request, Response, NextFunction } from "express";

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["api-key"] || req.query.apiKey;

  // Check if the provided API key is valid (e.g., compare with a database record)
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // If the API key is valid, continue to the next middleware (e.g., your GraphQL server)
  next();
};

export default apiKeyMiddleware;
