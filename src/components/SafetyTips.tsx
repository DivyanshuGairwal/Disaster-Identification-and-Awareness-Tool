import React from 'react';
import { Shield, CheckCircle2, AlertCircle } from 'lucide-react';

export const SafetyTips: React.FC = () => {
    const tips = [
        { id: 1, text: 'Drop, Cover, and Hold On during shaking.', category: 'Action' },
        { id: 2, text: 'Stay away from glass, windows, and outside walls.', category: 'Warning' },
        { id: 3, text: 'Keep an emergency kit with water and first aid.', category: 'Prep' },
        { id: 4, text: 'If outside, move to an open area away from buildings.', category: 'Action' },
    ];

    return (
        <section className="mt-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Awareness & Safety
            </h2>
            <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Shield className="w-24 h-24" />
                </div>
                
                <h3 className="text-lg font-bold mb-4 relative z-10">Earthquake Safety Tips</h3>
                <div className="space-y-4 relative z-10">
                    {tips.map((tip) => (
                        <div key={tip.id} className="flex items-start space-x-3 text-sm">
                            {tip.category === 'Warning' ? (
                                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                            ) : (
                                <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0" />
                            )}
                            <p className="leading-relaxed text-indigo-50">{tip.text}</p>
                        </div>
                    ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-indigo-800">
                    <p className="text-xs text-indigo-300 italic">
                        Source: Red Cross & USGS Safety Guidelines
                    </p>
                </div>
            </div>
        </section>
    );
};
