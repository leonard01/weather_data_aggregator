import { Request, Response, NextFunction } from "express";

const validateLocation = (req: Request, res: Response, next: NextFunction) => {
  const { location } = req.params;
  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }
  next();
};

const validateDays = (req: Request, res: Response, next: NextFunction) => {
  const { days } = req.params;
  const daysInt = parseInt(days, 10);
  if (isNaN(daysInt) || daysInt <= 0) {
    return res.status(400).json({ error: "Days must be a positive integer" });
  }
  next();
};

export { validateLocation, validateDays };
