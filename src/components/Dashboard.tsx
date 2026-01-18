import React, { useEffect, useState, useCallback } from 'react';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { getWeather } from '../services/weatherService';
import { getDisasters } from '../services/disasterService';
import type { WeatherData, DisasterFeature } from '../types/index';
import { WeatherCard } from './WeatherCard';
import { DisasterCard } from './DisasterCard';
import { AlertTriangle, MapPin, RefreshCw, Radio, Info } from 'lucide-react';
import { Footer } from './Footer';
import { InfoModal } from './InfoModal';
import { SeverityLegend } from './SeverityLegend';
import { formatDistanceToNow } from 'date-fns';

export const Dashboard: React.FC = () => {
    const { location, error: geoError, loading: geoLoading, retry: retryGeo, setManualLocation } = useGeoLocation();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [disasters, setDisasters] = useState<DisasterFeature[]>([]);
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [loadingDisasters, setLoadingDisasters] = useState(true);
    const [errorWeather, setErrorWeather] = useState<string | null>(null);
    const [errorDisasters, setErrorDisasters] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    // Fetch Weather
    const fetchWeather = useCallback(async () => {
        if (!location) return;
        setLoadingWeather(true);
        try {
            const data = await getWeather(location.lat, location.lon);
            setWeather(data);
            setErrorWeather(null);
        } catch (err) {
            console.error(err);
            setErrorWeather('Could not fetch weather data');
        } finally {
            setLoadingWeather(false);
        }
    }, [location]);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    // Fetch Disasters
    const fetchDisasters = useCallback(async () => {
        setLoadingDisasters(true);
        try {
            const data = await getDisasters();
            setDisasters(data.features.slice(0, 12));
            setLastUpdated(new Date());
            setErrorDisasters(null);
        } catch (err) {
            console.error(err);
            setErrorDisasters('Could not fetch disaster alerts');
        } finally {
            setLoadingDisasters(false);
        }
    }, []);

    useEffect(() => {
        fetchDisasters();
        // Auto-refresh every 60 seconds
        const interval = setInterval(fetchDisasters, 60000);
        return () => clearInterval(interval);
    }, [fetchDisasters]);

    const handleUseDefaultLocation = () => {
        // New Delhi coordinates
        setManualLocation(28.6139, 77.2090);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="container mx-auto px-4 py-8 flex-grow">
                <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                    <div className="flex items-center space-x-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-slate-500">
                            Live Data &bull; Updated {formatDistanceToNow(lastUpdated)} ago
                        </span>
                    </div>
                    <button
                        onClick={() => setIsInfoOpen(true)}
                        className="flex items-center text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
                    >
                        <Info className="w-4 h-4 mr-1.5" />
                        About DIAT
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Status & Weather */}
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                                Your Status
                            </h2>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
                                {geoLoading ? (
                                    <div className="space-y-3">
                                        <div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse"></div>
                                        <div className="h-6 bg-slate-100 rounded w-3/4 animate-pulse"></div>
                                    </div>
                                ) : geoError ? (
                                    <div className="text-center py-2">
                                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                                            Location access denied. Local weather unavailable.
                                        </div>
                                        <div className="space-y-2">
                                            <button
                                                onClick={retryGeo}
                                                className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Retry Location
                                            </button>
                                            <button
                                                onClick={handleUseDefaultLocation}
                                                className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Use Default (New Delhi)
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        <div className="text-sm text-slate-500">Monitoring Region</div>
                                        <div className="font-semibold text-slate-800 text-lg">
                                            {location?.lat.toFixed(4)}, {location?.lon.toFixed(4)}
                                        </div>
                                        <div className="text-xs text-green-600 font-medium flex items-center mt-2">
                                            <Radio className="w-3 h-3 mr-1" />
                                            Active
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-4">Local Conditions</h2>
                            {loadingWeather ? (
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-48 animate-pulse"></div>
                            ) : (
                                <WeatherCard
                                    weather={weather}
                                    loading={loadingWeather}
                                    error={errorWeather}
                                    location={location}
                                />
                            )}
                        </section>

                        <button
                            onClick={fetchDisasters}
                            disabled={loadingDisasters}
                            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors flex items-center justify-center disabled:opacity-70"
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${loadingDisasters ? 'animate-spin' : ''}`} />
                            {loadingDisasters ? 'Refreshing...' : 'Refresh Feed'}
                        </button>
                    </div>

                    {/* Right Column: Disaster Feed */}
                    <div className="lg:col-span-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 flex items-center">
                                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                                    Global Disaster Feed
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Real-time earthquake reports from USGS</p>
                            </div>
                            <SeverityLegend />
                        </div>

                        {loadingDisasters ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-32 bg-white rounded-xl border border-slate-100 shadow-sm animate-pulse p-4 space-y-3">
                                        <div className="flex justify-between">
                                            <div className="h-5 bg-slate-100 rounded w-1/4"></div>
                                            <div className="h-5 bg-slate-100 rounded w-1/6"></div>
                                        </div>
                                        <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                        <div className="h-3 bg-slate-100 rounded w-1/2 mt-auto"></div>
                                    </div>
                                ))}
                            </div>
                        ) : errorDisasters ? (
                            <div className="bg-red-50 p-8 rounded-xl text-center text-red-600 border border-red-100">
                                <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>{errorDisasters}</p>
                                <button onClick={fetchDisasters} className="text-sm font-semibold underline mt-2 hover:text-red-800">Try Again</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {disasters.map((feature) => (
                                    <DisasterCard key={feature.id} data={feature} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
            </main>
            <Footer />
        </div>
    );
};
