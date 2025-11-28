import React from 'react';
import { motion } from 'framer-motion';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll';

const AboutPage = () => {
    const [setRef, isVisible] = useAnimateOnScroll();

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
                        About Me
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Get to know me better
                    </p>
                </motion.div>

                <div ref={setRef} className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex flex-col items-center text-center gap-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            src="https://res.cloudinary.com/djk6pc6jm/image/upload/v1756569740/1740979848932_k5z8rq.jpg"
                            alt="Ayushmaan Mohanty"
                            className="w-48 h-48 rounded-full object-cover shadow-2xl border-4 border-indigo-500"
                        />

                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Ayushmaan Mohanty
                            </h2>
                            <p className="text-xl text-indigo-600 dark:text-indigo-400 font-semibold mb-6">
                                Full-Stack Developer | Machine Learning Enthusiast
                            </p>
                        </div>

                        <div className="text-left space-y-4">
                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                I am a motivated Computer Science student with a strong foundation in full-stack development,
                                machine learning, and cloud technologies. I have experience in building scalable web applications,
                                deploying ML models, and automating workflows.
                            </p>

                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                My journey in web development started with Code with Harry's YouTube tutorials, where I learned
                                HTML, CSS, and JavaScript from scratch. Since then, I've expanded my skills to include modern
                                frameworks like React, Node.js, and Express, as well as diving deep into machine learning and
                                artificial intelligence.
                            </p>

                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                I am skilled in applying data structures, algorithms, and software engineering principles to
                                solve real-world challenges. I'm passionate about creating innovative solutions that combine
                                web technologies with AI to build intelligent, user-friendly applications.
                            </p>
                        </div>

                        <div className="w-full mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                What I'm Currently Working On
                            </h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-600 dark:text-indigo-400">•</span>
                                    Building real-time collaborative applications with Socket.io
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-600 dark:text-indigo-400">•</span>
                                    Exploring advanced machine learning techniques for NLP
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-600 dark:text-indigo-400">•</span>
                                    Contributing to open-source projects
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-600 dark:text-indigo-400">•</span>
                                    Learning system design and scalability patterns
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
