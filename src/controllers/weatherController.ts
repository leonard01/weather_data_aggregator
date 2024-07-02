import { Request, Response } from "express";
import {
  fetchWeatherData,
  fetchWeatherForecast,
} from "../services/weatherService";

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

const getWeatherForecast = async (req: Request, res: Response) => {
  try {
    const { location, days } = req.params;
    console.log(
      `Handling request for weather forecast for location: ${location} for ${days} days`
    );
    const forecastData = await fetchWeatherForecast(
      location,
      parseInt(days, 10)
    );
    console.log("Weather forecast fetched successfully:", forecastData);
    res.json(forecastData);
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    res.status(500).json({ error: "Failed to fetch weather forecast" });
  }
};

export { getWeather, getWeatherForecast };
