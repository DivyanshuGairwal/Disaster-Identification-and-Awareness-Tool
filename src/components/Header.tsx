import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="bg-slate-900/90 backdrop-blur-md text-white shadow-xl sticky top-0 z-50 border-b border-slate-800">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-red-500/10 p-2 rounded-lg">
                        <ShieldAlert className="w-7 h-7 text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight leading-none">DIAT</h1>
                        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-medium mt-1 hidden sm:block">Disaster Awareness Tool</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold rounded border border-indigo-500/20 uppercase tracking-wider">
                        v1.2 Live
                    </div>
                    <div className="text-sm text-slate-400 font-medium">
                        Live Monitor
                    </div>
                </div>
            </div>
        </header>
    );
};
