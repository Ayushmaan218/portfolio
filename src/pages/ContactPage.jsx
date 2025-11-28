import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll';

const ContactPage = () => {
    const [setRef, isVisible] = useAnimateOnScroll();

    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: <FaLinkedin />,
            url: 'https://www.linkedin.com/in/ayushmaan-mohanty-065b31267/',
            color: 'text-blue-500 hover:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
            name: 'GitHub',
            icon: <FaGithub />,
            url: 'https://github.com/Ayushmaan218',
            color: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
            bgColor: 'bg-gray-100 dark:bg-gray-800'
        },
        {
            name: 'Twitter',
            icon: <FaTwitter />,
            url: 'https://x.com/AyushmaanM43704',
            color: 'text-blue-400 hover:text-blue-300',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
            name: 'Email',
            icon: <FaEnvelope />,
            url: 'mailto:aayushmaanmohanty21@gmail.com',
            color: 'text-red-500 hover:text-red-400',
            bgColor: 'bg-red-50 dark:bg-red-900/20'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
            <div className="container mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Contact Me
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Let's connect and collaborate
                    </p>
                </motion.div>

                <div
                    ref={setRef}
                    className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl">
                        <div className="text-center mb-8">
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                                Feel free to reach out through any of these platforms:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className={`flex items-center gap-4 p-6 ${link.bgColor} rounded-lg transition-all duration-300 shadow-md hover:shadow-xl`}
                                >
                                    <div className={`text-4xl ${link.color} transition-colors`}>
                                        {link.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {link.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Connect with me
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                                Direct Email
                            </h2>
                            <div className="text-center">
                                <a
                                    href="mailto:aayushmaanmohanty21@gmail.com"
                                    className="inline-flex items-center gap-2 text-lg text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                                >
                                    <FaEnvelope />
                                    aayushmaanmohanty21@gmail.com
                                </a>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg"
                        >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                📍 Location
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Based in India, available for remote work worldwide
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg"
                        >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                ⏰ Response Time
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                I typically respond within 24 hours. Looking forward to hearing from you!
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
