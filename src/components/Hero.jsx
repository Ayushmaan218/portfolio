import React, { useState, useEffect } from 'react';
import {  AnimatePresence } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
    const titles = [
        "Frontend Dev",
        "Backend Dev",
        "Full-Stack Dev",
        "Machine Learning",
        "AI Enthusiast",
        "Tech Enthusiast"
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }, 2500); // Change every 2.5 seconds

        return () => clearInterval(interval);
    }, [titles.length]);

    return (
        <section id="home" className="min-h-screen flex items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
            <ParticleBackground />
            <div className="container mx-auto px-6 text-center z-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-extrabold mb-4"
                >
                    Ayushmaan Mohanty
                </motion.h1>

                <div className="h-12 md:h-16 relative flex justify-center items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={titles[index]}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-xl md:text-2xl text-indigo-600 dark:text-indigo-300 font-semibold absolute"
                        >
                            {titles[index]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-4 text-xl text-indigo-500 dark:text-indigo-400 font-medium"
                >
                    Complete Skill Set
                </motion.p>
            </div>
        </section>
    );
};

export default Hero;
