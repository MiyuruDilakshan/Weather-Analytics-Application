import React from 'react';

// Simple Temperature Graph component
// Shows temperature bars for all cities
const TemperatureGraph = ({ cities }) => {
  // Find the highest and lowest temperatures to scale the graph
  const temps = cities.map(city => city.temperature.current);
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const tempRange = maxTemp - minTemp;

  // Calculate how tall each bar should be (as percentage)
  const getBarHeight = (temp) => {
    if (tempRange === 0) return 50; // If all temps are same, show 50%
    return ((temp - minTemp) / tempRange) * 100;
  };

  // Get color based on temperature
  const getBarColor = (temp) => {
    if (temp > 30) return 'bg-red-500'; // Hot
    if (temp > 20) return 'bg-orange-400'; // Warm
    if (temp > 10) return 'bg-yellow-400'; // Mild
    if (temp > 0) return 'bg-blue-400'; // Cool
    return 'bg-blue-600'; // Cold
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Temperature Comparison
      </h2>

      <div className="flex items-end justify-between gap-2 h-64 mb-4">
        {cities.map((city) => {
          const height = getBarHeight(city.temperature.current);
          const colorClass = getBarColor(city.temperature.current);

          return (
            <div key={city.cityId} className="flex-1 flex flex-col items-center">
              {/* Temperature value on top of bar */}
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {city.temperature.current.toFixed(1)}°C
              </div>

              {/* Temperature bar */}
              <div
                className={`w-full ${colorClass} rounded-t transition-all duration-500 hover:opacity-80`}
                style={{ height: `${height}%`, minHeight: '20px' }}
                title={`${city.name}: ${city.temperature.current}°C`}
              ></div>

              {/* City name below bar */}
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center break-words">
                {city.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>&gt;30°C Hot</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-400 rounded"></div>
          <span>20-30°C Warm</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-400 rounded"></div>
          <span>10-20°C Mild</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-400 rounded"></div>
          <span>0-10°C Cool</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span>&lt;0°C Cold</span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureGraph;
