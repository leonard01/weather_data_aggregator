import {
  fetchWeatherData,
  fetchWeatherForecast,
} from "../../src/services/weatherService";
import axios from "axios";
import { createClient } from "redis";

jest.mock("axios");
jest.mock("redis", () => ({
  createClient: jest.fn(() => ({
    connect: jest.fn().mockResolvedValue(undefined),
    get: jest.fn().mockResolvedValue(null),
    setEx: jest.fn().mockResolvedValue(undefined),
  })),
}));

const redisClient = createClient();

describe("Weather Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch current weather data for London", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { location: { name: "London" }, current: {} },
    });

    const data = await fetchWeatherData("London");
    expect(data).toHaveProperty("location");
    expect(data.location.name).toBe("London"); // Confirm the location is London
    expect(data).toHaveProperty("current");
  });

  it("should fetch weather forecast data for London", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { location: { name: "London" }, forecast: {} },
    });

    const data = await fetchWeatherForecast("London", 3);
    expect(data).toHaveProperty("location");
    expect(data.location.name).toBe("London"); // Confirm the location is London
    expect(data).toHaveProperty("forecast");
  });
});
