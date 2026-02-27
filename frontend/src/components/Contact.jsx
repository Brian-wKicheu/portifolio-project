import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { portfolioAPI } from '../services/api';

const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await portfolioAPI.sendMessage(formData);
            setStatus({
                type: 'success',
                message: 'Message sent successfully! I will get back to you soon.',
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Failed to send message. Please try again.',
            });
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section-padding bg-slate-900">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
                    Get In <span className="text-gradient">Touch</span>
                </h2>

                <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl animate-slide-up">
                    {status.message && (
                        <div
                            className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${status.type === 'success'
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-red-500/20 text-red-400'
                                }`}
                        >
                            {status.type === 'success' ? (
                                <CheckCircle size={24} />
                            ) : (
                                <AlertCircle size={24} />
                            )}

                            <span>{status.message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-gray-300 mb-2 font-medium"
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-gray-300 mb-2 font-medium"
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-gray-300 mb-2 font-medium"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                placeholder="Project Inquiry"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-gray-300 mb-2 font-medium"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-8 py-4 bg-linear-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span>Sending...</span>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <Send size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;