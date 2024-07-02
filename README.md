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
