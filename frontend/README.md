# Weather Analytics Frontend

This is the frontend application for the Weather Analytics Dashboard built with React.

## Features

- User authentication with Auth0
- Real-time weather data display
- Custom Comfort Index scoring
- City ranking based on comfort scores
- Responsive design for mobile and desktop
- Dark mode support
- Search and filter functionality
- Sort by rank, temperature, or city name
- Cached data indicator

## Technologies Used

- React 18
- Auth0 for authentication
- Axios for API calls
- Tailwind CSS for styling
- OpenWeatherMap API for weather icons

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Configure the environment variables in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_AUTH0_DOMAIN=your-auth0-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_AUTH0_AUDIENCE=your-auth0-api-audience
```

4. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Auth0 Configuration

1. Create an Auth0 account and application
2. Set the Allowed Callback URLs to: `http://localhost:3000`
3. Set the Allowed Logout URLs to: `http://localhost:3000`
4. Set the Allowed Web Origins to: `http://localhost:3000`
5. Copy your Domain and Client ID to the `.env` file

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── LoginButton.jsx
│   │   ├── LogoutButton.jsx
│   │   └── ProtectedRoute.jsx
│   ├── Layout/
│   │   ├── Header.jsx
│   │   └── Loading.jsx
│   └── Weather/
│       ├── WeatherCard.jsx
│       ├── WeatherDashboard.jsx
│       └── WeatherList.jsx
├── services/
│   └── api.js
├── App.jsx
├── App.css
├── index.js
└── index.css
```

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Component Overview

### WeatherDashboard
Main component that displays the weather data, handles sorting/filtering, and shows the top 3 cities.

### WeatherCard
Individual city card displaying weather information, comfort index, and ranking.

### ProtectedRoute
Wrapper component that ensures users are authenticated before accessing content.

### Header
Navigation bar with login/logout functionality and user information.

## Features Explained

### Comfort Index Display
Each city shows a visual comfort index score from 0-100 with color-coded categories:
- Excellent (80-100): Green
- Good (60-79): Blue
- Moderate (40-59): Yellow
- Poor (0-39): Red

### Top 3 Podium
When sorted by rank, the top 3 cities are displayed prominently with special styling.

### Caching Indicator
Cities with cached data show a "CACHED" label to indicate the data is being served from cache.

### Responsive Design
The application automatically adapts to different screen sizes:
- Mobile: Single column layout
- Tablet: 2 column grid
- Desktop: 3 column grid
