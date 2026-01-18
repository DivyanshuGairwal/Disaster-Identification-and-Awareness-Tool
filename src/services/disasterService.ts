import axios from 'axios';
import type { DisasterResponse } from '../types/index';

export const getDisasters = async (): Promise<DisasterResponse> => {
    try {
        const response = await axios.get<DisasterResponse>(
            'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching disasters:", error);
        throw error;
    }
};
