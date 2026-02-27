import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Twitter } from 'lucide-react';
import { portfolioAPI } from '../services/api';

const Hero = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await portfolioAPI.getProfile();
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <section
                id="home"
                className="min-h-screen flex items-center justify-center bg-linear-to-br from-dark via-slate-900 to-dark"
            >
                <div className="text-white text-2xl">Loading...</div>
            </section>
        );
    }

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center bg-linear-to-br from-dark via-slate-900 to-dark relative overflow-hidden"
        >
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
                <div className="text-center animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                        {profile?.name || "Your Name"}
                    </h1>
                    <p className="text-2xl md:text-3xl text-gradient mb-8">
                        {profile?.title || "Full Stack Developer"}
                    </p>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                        {profile?.bio || "Passionate about building amazing web experiences."}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-6 mb-12">
                        {profile?.github && (
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                <Github size={24} />
                            </a>
                        )}
                        {profile?.linkedin && (
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                <Linkedin size={24} />
                            </a>
                        )}
                        {profile?.twitter && (
                            <a
                                href={profile.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                <Twitter size={24} />
                            </a>
                        )}
                    </div>
                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="#projects"
                            className="px-6 py-3 bg-primary text-white rounded-full text-lg font-medium hover:bg-primary-dark transition-colors duration-300"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="px-6 py-3 bg-secondary text-white rounded-full text-lg font-medium hover:bg-secondary-dark transition-colors duration-300"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown size={32}  className="text-gray-400" />
                </div>
            </div>
        </section>
    );
};

export default Hero;