import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-8 h-8 text-red-500" />
                    <h1 className="text-xl font-bold tracking-tight">DIAT <span className="text-slate-400 text-sm font-normal ml-2 hidden sm:inline">Disaster Identification and Awareness Tool</span></h1>
                </div>
                <div className="text-sm text-slate-400">
                    Live Monitor
                </div>
            </div>
        </header>
    );
};
