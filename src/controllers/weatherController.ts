import { Request, Response } from "express";
import { fetchWeatherData } from "../services/weatherService";

const getWeather = async (req: Request, res: Response) => {
  try {
    const { location } = req.params;
    console.log(`Handling request for weather data for location: ${location}`);
    const weatherData = await fetchWeatherData(location);
    console.log("Weather data fetched successfully:", weatherData);
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

export { getWeather };
