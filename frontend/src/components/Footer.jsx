import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gradient mb-2">Portfolio</h3>
                        <p className="text-gray-400">
                            Building the future, one line at a time.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary transition-colors duration-300"
                        >
                            <Github size={22} />
                        </a>

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary transition-colors duration-300"
                        >
                            <Linkedin size={22} />
                        </a>

                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary transition-colors duration-300"
                        >
                            <Twitter size={22} />
                        </a>

                        <a
                            href="mailto:your@email.com"
                            className="text-gray-400 hover:text-primary transition-colors duration-300"
                        >
                            <Mail size={22} />
                        </a>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 pt-6 border-t border-gray-700 text-center">
                    <p className="text-gray-400 flex items-center justify-center space-x-2">
                        <span>© {currentYear} Portfolio. Made with</span>
                        <Heart size={16} className="text-red-500" />
                        <span>All rights reserved.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;