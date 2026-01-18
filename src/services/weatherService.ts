import axios from 'axios';
import type { WeatherData } from '../types/index';

export const getWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    try {
        const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m`
        );

        const data = response.data.current;

        // Simple weather code mapping (partial)
        // WMO Weather interpretation codes (WW)
        // 0: Clear sky
        // 1, 2, 3: Mainly clear, partly cloudy, and overcast
        // 45, 48: Fog and depositing rime fog
        // 51, 53, 55: Drizzle: Light, moderate, and dense intensity
        // 61, 63, 65: Rain: Slight, moderate and heavy intensity
        // ... and so on

        let condition = "Clear";
        const code = data.weather_code;

        if (code >= 1 && code <= 3) condition = "Cloudy";
        else if (code >= 45 && code <= 48) condition = "Fog";
        else if (code >= 51 && code <= 67) condition = "Rain";
        else if (code >= 71 && code <= 77) condition = "Snow";
        else if (code >= 80 && code <= 82) condition = "Showers";
        else if (code >= 95 && code <= 99) condition = "Thunderstorm";

        return {
            temp: data.temperature_2m,
            condition: condition,
            windSpeed: data.wind_speed_10m,
        };
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
};
