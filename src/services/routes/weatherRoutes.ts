import { Router } from "express";
import { getWeather } from "../../controllers/weatherController";

const router = Router();

router.get(
  "/:location",
  (req, res, next) => {
    console.log(`Received request for /api/weather/${req.params.location}`);
    next();
  },
  getWeather
);

export default router;
