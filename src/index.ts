import express from "express";
import { createClient } from "redis";
import { PORT, REDIS_URL } from "./config";
import weatherRoutes from "./services/routes/weatherRoutes";
import { fetchWeatherData } from "./services/weatherService";

const app = express();
const redisClient = createClient({ url: REDIS_URL });

redisClient
  .connect()
  .then(() => console.log("Redis client connected"))
  .catch((error) => console.error("Redis connection error:", error));

app.use(express.json());

app.use(
  "/api/weather",
  (req, res, next) => {
    console.log(`Received request for ${req.url}`);
    next();
  },
  weatherRoutes
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/test", async (req, res) => {
  console.log("Received request for /test");
  try {
    const weatherData = await fetchWeatherData("London");
    console.log("Weather data:", weatherData);
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});
