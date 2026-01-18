import React from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold text-slate-800 mb-4">About DIAT</h2>
                <div className="space-y-4 text-slate-600 text-sm">
                    <p>
                        The <strong>Disaster Identification and Awareness Tool (DIAT)</strong> is a real-time monitoring platform designed to keep you informed about environmental conditions and potential hazards.
                    </p>

                    <div>
                        <h3 className="font-semibold text-slate-800 mb-1">Status:</h3>
                        <p className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Live Monitoring Active
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-800 mb-1">Data Sources:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>User Location via Browser Geolocation</li>
                            <li>Current Weather via Open-Meteo API</li>
                            <li>Seismic Activity via USGS Earthquake Feed</li>
                        </ul>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
                >
                    Got it
                </button>
            </div>
        </div>
    );
};
