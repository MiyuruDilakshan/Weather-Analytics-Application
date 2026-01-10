# Weather Analytics Application (Fidenz)

My name is Miyuru Dilakshan. This is my full stack assignment for Fidenz.(NodeJS+React)

This application:

- Reads city codes from `backend/data/cities.json`
- Fetches weather data from OpenWeatherMap
- Calculates a Comfort Index score (0 to 100) in the backend
- Ranks cities from most comfortable to least comfortable
- Uses server-side caching (5 minutes)
- Uses Auth0 authentication and authorization (JWT)
- Works on desktop and mobile

## 1. Setup Instructions

### Requirements

- Node.js (18+ recommended)
- An OpenWeatherMap API key
- An Auth0 account (SPA + API settings)

### Backend Setup

1. Go to backend folder:

	`cd backend`

2. Install packages:

	`npm install`

3. Create `backend/.env` file:

	```
	PORT=5000
	FRONTEND_URL=http://localhost:3000
	WEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
	AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
	AUTH0_AUDIENCE=https://weather-analytics-api
	```

4. Start backend:

	`npm start`

Backend runs on `http://localhost:5000`.

### Frontend Setup

1. Go to frontend folder:

	`cd frontend`

2. Install packages:

	`npm install`

3. Create `frontend/.env` file:

	```
	REACT_APP_API_URL=http://localhost:5000/api
	REACT_APP_AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
	REACT_APP_AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
	REACT_APP_AUTH0_AUDIENCE=https://weather-analytics-api
	```

4. Start frontend:

	`npm start`

Frontend runs on `http://localhost:3000`.

### Auth0 Notes

- API Endpoint `GET /api/weather` needs a Bearer token.
- In Auth0, make sure your SPA has the correct callback URLs and your API audience matches `AUTH0_AUDIENCE`.

## 2. UI Previews

### Auth0 Integration
![Auth0 Configuration](UI%20previews/auth0.png)

### Login Screen
![Login Screen](UI%20previews/login.png)

### Weather Dashboard Views
![Dashboard View 1](UI%20previews/ui1.png)
![Dashboard View 2](UI%20previews/ui2.png)
![Dashboard View 3](UI%20previews/ui3.png)

## 3. Comfort Index Formula (My Design)

I created a simple Comfort Index score from 0 to 100 using 3 parameters:

- Temperature
- Humidity
- Wind speed

The score is calculated in the backend (not in frontend).

Formula (clamped to 0 and 100):

```
Score = 100 - TempPenalty - HumidityPenalty - WindPenalty

TempPenalty     = |temp - 22| * 2.5
HumidityPenalty = |humidity - 50| * 0.5
WindPenalty     = windSpeed * 1.5
```

Implementation: `backend/src/services/comfortIndexService.js`

## 4. Reasoning Behind Variable Weights

I used these weights to make the score easy to understand and still meaningful:

- Temperature weight is high (2.5 per 1°C) because temperature affects comfort strongly.
- Humidity weight is medium (0.5 per 1%) because humidity affects comfort, but not as strong as temperature.
- Wind weight is medium (1.5 per 1 m/s) because wind can reduce comfort, especially if it is strong.

I selected ideal values based on common comfort range:

- Ideal temperature: 22°C
- Ideal humidity: 50%

## 5. Trade-offs I Considered

- I used a simple linear formula. It is easier to explain and debug, but it may not match real human comfort in extreme climates.
- I did not include more complex variables like dew point or pressure to keep it simple.
- I chose 3 parameters because the assignment asked at least 3, and these are available in the API response.

## 6. Cache Design Explanation

I used `node-cache` with 5 minutes TTL (300 seconds).

Caching layers:

1. Raw OpenWeatherMap response per city
	- Key: `raw_{CityCode}`
	- Helps reduce API calls per city

2. Processed dashboard output
	- Key: `weather_dashboard`
	- Contains comfort score + ranking for all cities
	- Faster response for repeated requests

Debug endpoint:

- `GET /api/cache/status` returns cache stats and keys.

## 7. Known Limitations

- Cache is in-memory. If the backend restarts, cache will be cleared.
- Comfort Index is a simplified model. Real comfort depends on more factors (clothing, activity, personal preferences).
- App depends on external services (OpenWeatherMap and Auth0). If they are down or rate-limited, results may fail.
- This uses current weather data (not forecast).

## API Endpoints

- `GET /api/weather` (requires Auth0 Bearer token)
- `GET /api/cache/status` (debug)
- `GET /health`
