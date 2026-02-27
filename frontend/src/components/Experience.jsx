import React, { useEffect, useState } from "react";
import { Calendar, MapPin } from 'lucide-react';
import { portfolioAPI } from '../services/api';

const Experience = () => {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await portfolioAPI.getExperience();
                setExperience(response.data);
            } catch (error) {
                console.error("Error fetching experience:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperience();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    if (loading) {
        return (
            <section id="experience" className="section-padding bg-dark">
                <div className="max-w-7xl mx-auto text-center text-white">
                    <h2 className="text-4xl font-bold text-white ">Loading Experience... </h2>
                </div>
            </section>
        );
    }

    return (
        <section id="experience" className="section-padding bg-dark">
            <div className="max-w-7xl mx-auto ">
                <h2 className="text-4xl md:text-5xl  font-bold text-center text-white mb-12">
                    Work <span className="text-gradient">Experience</span>
                </h2>

                <div className="space-y-8">
                    {experience.map((exp, index) => (
                        <div
                            key={exp.id}
                            className="bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white">
                                        {exp.position}
                                    </h3>
                                    <p className="text-primary mb-2">{exp.company}</p>

                                    <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-4">
                                        <div className="flex items-center space-x-2">
                                            <Calendar size={16} />
                                            <span>
                                                {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        {exp.location && (
                                            <div className="flex items-center space-x-2">
                                                <MapPin size={16} />
                                                <span>{exp.location}</span>
                                            </div>
                                        )}
                                    </div>

                                </div>
                                {exp.company_logo && (
                                    <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center ">
                                        <img
                                            src={exp.company_logo}
                                            alt={exp.company}
                                            className="w-full h-full object-contain" />
                                    </div>
                                )}
                            </div>

                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {exp.description}
                            </p>

                            {exp.current && (
                                <div >
                                    <span className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                                        Current Position
                                    </span>
                                </div>
                            )}

                        </div>
                    ))}
                </div>

                {experience.length === 0 && (
                    <div className="text-center text-gray-400">
                        <p className="text-xl">No experience found.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
export default Experience;
