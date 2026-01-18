import React from 'react';

export const SeverityLegend: React.FC = () => {
    return (
        <div className="flex items-center space-x-4 text-xs font-medium text-slate-600 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100">
            <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span>Low</span>
            </div>
            <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span>Moderate</span>
            </div>
            <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span>High</span>
            </div>
        </div>
    );
};
