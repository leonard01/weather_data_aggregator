import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
export const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "";
