import { useState, useEffect } from 'react';
import type { Coordinates } from '../types/index';

export const useGeoLocation = () => {
    const [location, setLocation] = useState<Coordinates | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getLocation = () => {
        setLoading(true);
        setError(null);
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        getLocation();
    }, []);

    // Helper to manually set location (e.g. default City)
    const setManualLocation = (lat: number, lon: number) => {
        setLocation({ lat, lon });
        setError(null);
        setLoading(false);
    };

    return { location, error, loading, retry: getLocation, setManualLocation };
};
