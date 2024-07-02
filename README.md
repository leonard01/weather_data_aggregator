# Weather Data Aggregator

A Node.js application that aggregates weather data from external APIs and provides endpoints for current weather and forecast data.

## Features

- Fetch current weather data for a given location
- Fetch weather forecast data for a given location for a specified number of days
- Caching of API responses using Redis to reduce the number of API calls
- Input validation and error handling
- API documentation using Swagger
- Unit tests using Jest

## Prerequisites

- Node.js (>= 12.x)
- Redis server
- npm or yarn

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/weather-data-aggregator.git
   cd weather-data-aggregator
   ```

2. Install Dependencies:

```bash
npm install
```

or

```bash
yarn install
```

3. Create a .env file in the root directory and add your configuration variables:

PORT=3000
REDIS_URL=redis://127.0.0.1:6379
WEATHER_API_KEY=your_weather_api_key

(goto https://www.weatherapi.com/ and sign up for free api key)

#### Running the Application

1. Ensure Redis Server is running:

```bash
redis-server
```

2. Start the application:

```bash
npm run dev
```

or

```bash
yarn dev
```

Server should now be running on http://localhost:3000.

API Endpoints
Get current weather:

```bash
GET /api/weather/{location}
Example: GET /api/weather/London

Get weather forecast:

GET /api/weather/{location}/forecast/{days}
Example: GET /api/weather/London/forecast/3
```

##### Tests

There are several unit tests that can be ran without starting the server

```bash
npm run test
```
