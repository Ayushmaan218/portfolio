import React from 'react';
import { motion } from 'framer-motion';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll';

const ServiceCard = ({ title, description, delay }) => {
    const [setRef, isVisible] = useAnimateOnScroll();
    return (
        <motion.div
            ref={setRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
            <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">{title}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
        </motion.div>
    );
};

const ServicesPage = () => {
    const servicesData = [
        {
            title: "Full-Stack Web Development",
            description: "I can build complete, scalable web applications using the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js. From responsive frontends to robust backends with RESTful APIs, I deliver end-to-end solutions."
        },
        {
            title: "Python Development",
            description: "Leveraging Python for backend development with frameworks like Flask, and for building machine learning models. Expertise in OOP, data structures, and creating efficient, maintainable code."
        },
        {
            title: "API Development & Integration",
            description: "Designing and building robust, secure, and scalable RESTful APIs to power your web and mobile applications. Experience with authentication, OAuth, file uploads, and third-party API integrations."
        },
        {
            title: "Machine Learning Solutions",
            description: "Developing and deploying machine learning models for tasks like prediction, classification, clustering, and NLP. Specializing in fake news detection, sentiment analysis, and real-time data validation."
        },
        {
            title: "Real-Time Applications",
            description: "Building real-time collaborative systems using Socket.io. Experience with chat applications, live notifications, user presence tracking, and real-time data synchronization."
        },
        {
            title: "Portfolio & Business Websites",
            description: "I can create stunning, professional, and responsive websites to showcase your work, business, or personal brand. Custom designs tailored to your needs with modern UI/UX principles."
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
                        Services
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        What I can do for you
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {servicesData.map((service, index) => (
                        <ServiceCard key={service.title} {...service} delay={index * 0.1} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-16 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-2xl max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Let's Work Together
                    </h2>
                    <p className="text-lg text-indigo-100 mb-6">
                        Have a project in mind? I'd love to hear about it and help bring your ideas to life.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                    >
                        Contact Me
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default ServicesPage;
