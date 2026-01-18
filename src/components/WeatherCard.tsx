import React from 'react';
import type { WeatherData, Coordinates } from '../types/index';
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react';

interface WeatherCardProps {
    weather: WeatherData | null;
    loading: boolean;
    error: string | null;
    location: Coordinates | null;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, loading, error, location }) => {
    if (loading) return <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse h-40"></div>;
    if (error) return <div className="bg-red-50 p-6 rounded-xl text-red-600">Failed to load weather data</div>;
    if (!weather || !location) return <div className="bg-white p-6 rounded-xl shadow-sm">Location access required for weather</div>;

    const getWeatherIcon = (condition: string) => {
        switch (condition) {
            case 'Clear': return <Sun className="w-10 h-10 text-yellow-500" />;
            case 'Cloudy': return <Cloud className="w-10 h-10 text-gray-500" />;
            case 'Rain': return <CloudRain className="w-10 h-10 text-blue-500" />;
            case 'Snow': return <CloudSnow className="w-10 h-10 text-blue-300" />;
            default: return <Cloud className="w-10 h-10 text-gray-400" />;
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
                <h3 className="text-slate-500 font-medium text-sm mb-1">Local Weather</h3>
                <div className="flex items-center space-x-2 text-slate-700 text-xs mt-1">
                    <span>Lat: {location.lat.toFixed(2)}</span>
                    <span>Lon: {location.lon.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-3">
                    {getWeatherIcon(weather.condition)}
                    <div>
                        <div className="text-3xl font-bold text-slate-800">{weather.temp}°C</div>
                        <div className="text-slate-600 font-medium">{weather.condition}</div>
                    </div>
                </div>

                <div className="text-right space-y-1">
                    <div className="flex items-center justify-end space-x-1 text-slate-500 text-sm">
                        <Wind className="w-4 h-4" />
                        <span>{weather.windSpeed} km/h</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
