import axios from "axios";
import { createClient } from "redis";
import { WEATHER_API_KEY, REDIS_URL } from "../config";

const redisClient = createClient({ url: REDIS_URL });
redisClient
  .connect()
  .then(() => console.log("Redis client connected"))
  .catch((error) => console.error("Redis connection error:", error));

const fetchWeatherData = async (location: string) => {
  console.log(`Fetching weather data for location: ${location}`);
  const cacheKey = `weather:${location}`;

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for location: ${location}`);
      return JSON.parse(cachedData);
    }
    console.log(`Cache miss for location: ${location}, fetching from API`);
  } catch (error) {
    console.error(
      `Error fetching data from Redis for location ${location}:`,
      error
    );
  }

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}`
    );
    const data = response.data;
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(data)); // Cache for 1 hour
    console.log(`Fetched and cached weather data for location: ${location}`);
    return data;
  } catch (error) {
    console.error(
      `Error fetching data from API for location ${location}:`,
      error
    );
    throw new Error("Failed to fetch weather data from API");
  }
};

export { fetchWeatherData };
