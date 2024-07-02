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

    try {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(data)); // Cache for 1 hour
      console.log(`Fetched and cached weather data for location: ${location}`);
    } catch (redisError) {
      console.error(
        `Error saving data to Redis for location ${location}:`,
        redisError
      );
    }

    return data;
  } catch (error) {
    console.error(
      `Error fetching data from API for location ${location}:`,
      error
    );
    throw new Error("Failed to fetch weather data from API");
  }
};

const fetchWeatherForecast = async (location: string, days: number) => {
  console.log(
    `Fetching weather forecast for location: ${location} for ${days} days`
  );
  const cacheKey = `weather:forecast:${location}:${days}`;

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
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=${days}`
    );
    const data = response.data;

    try {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(data)); // Cache for 1 hour
      console.log(
        `Fetched and cached weather forecast for location: ${location}`
      );
    } catch (redisError) {
      console.error(
        `Error saving data to Redis for location ${location}:`,
        redisError
      );
    }

    return data;
  } catch (error) {
    console.error(
      `Error fetching data from API for location ${location}:`,
      error
    );
    throw new Error("Failed to fetch weather forecast from API");
  }
};

export { fetchWeatherData, fetchWeatherForecast };
