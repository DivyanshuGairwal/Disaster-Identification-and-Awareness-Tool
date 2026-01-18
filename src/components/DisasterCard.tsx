import React from 'react';
import type { DisasterFeature } from '../types/index';
import { formatDistanceToNow } from 'date-fns';
import { Activity, MapPin, Clock } from 'lucide-react';

interface DisasterCardProps {
    data: DisasterFeature;
}

export const DisasterCard: React.FC<DisasterCardProps> = ({ data }) => {
    const { properties } = data;
    const severityColor = properties.mag >= 5 ? 'bg-red-100 text-red-700 border-red-200' :
        properties.mag >= 3 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
            'bg-green-50 text-green-700 border-green-200';

    const severityIconColor = properties.mag >= 5 ? 'text-red-500' : 'text-yellow-500';

    return (
        <div className={`p-4 rounded-xl border ${severityColor} transition-all hover:shadow-md cursor-default`}>
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                    <Activity className={`w-5 h-5 ${severityIconColor}`} />
                    <span className="font-bold text-lg">M {properties.mag?.toFixed(1)}</span>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-white/50 rounded-full">
                    {properties.type.toUpperCase()}
                </span>
            </div>

            <h3 className="font-semibold text-sm mb-2 line-clamp-2" title={properties.place}>
                {properties.place}
            </h3>

            <div className="space-y-1 text-xs opacity-80 mt-auto">
                <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDistanceToNow(properties.time)} ago</span>
                </div>
                <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{data.geometry.coordinates[1].toFixed(2)}, {data.geometry.coordinates[0].toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};
