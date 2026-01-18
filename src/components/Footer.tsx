import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-white border-t border-slate-200 py-6 mt-12">
            <div className="container mx-auto px-4 text-center">
                <p className="text-slate-600 font-medium">Built with React + TypeScript</p>
                <p className="text-slate-400 text-sm mt-1">
                    Live data via <a href="https://earthquake.usgs.gov/" target="_blank" rel="noreferrer" className="hover:text-slate-600 transition-colors">USGS</a> & <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="hover:text-slate-600 transition-colors">Open-Meteo</a> APIs
                </p>
            </div>
        </footer>
    );
};
