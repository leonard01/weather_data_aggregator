import { Request, Response, NextFunction, Router } from "express";
import {
  getWeather,
  getWeatherForecast,
} from "../../controllers/weatherController";

const router = Router();

router.get(
  "/:location",
  (req, res, next) => {
    console.log(`Received request for /api/weather/${req.params.location}`);
    next();
  },
  getWeather
);

router.get(
  "/:location/forecast/:days",
  (req, res, next) => {
    console.log(
      `Received request for /api/weather/${req.params.location}/forecast/${req.params.days}`
    );
    next();
  },
  getWeatherForecast
);

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

export default router;
export { validateLocation, validateDays };
