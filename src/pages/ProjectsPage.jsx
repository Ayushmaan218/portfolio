import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiMongodb, SiFlask, SiSocketdotio, SiVercel } from 'react-icons/si';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll';

const techIcons = {
    React: <FaReact className="text-sky-400 text-lg" />,
    "Node.js": <FaNodeJs className="text-green-500 text-lg" />,
    MongoDB: <SiMongodb className="text-green-400 text-lg" />,
    Python: <FaPython className="text-yellow-400 text-lg" />,
    Flask: <SiFlask className="text-gray-300 text-lg" />,
    "Machine Learning": (
        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    "Socket.io": <SiSocketdotio className="text-gray-400 text-lg" />,
    Vercel: <SiVercel className="text-white text-lg" />,
    "MERN Stack": (
        <span className="flex gap-1 items-center">
            <FaReact className="text-sky-400" />
            <FaNodeJs className="text-green-500" />
            <SiMongodb className="text-green-400" />
        </span>
    ),
};

const ProjectCard = ({ title, description, link, technologies, delay }) => {
    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1"
        >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">{description}</p>
            <div className="flex flex-wrap gap-3">
                {technologies.map((tech, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 text-sm"
                    >
                        {techIcons[tech] || null}
                        <span>{tech}</span>
                    </div>
                ))}
            </div>
        </motion.a>
    );
};

const ProjectsPage = () => {
    const projectData = [
        { title: "Codexly", description: "An interactive online code compiler and sharing platform where users can write, run, and share code snippets in real time. Includes a community feature for commenting, discussing, and collaborating on code projects.", link: "https://codexly.vercel.app/", technologies: ["Next.js", "Clerk", "Convex"] },
        { title: "Copy Ninja", description: "A secure, real-time web app for sharing text and files (documents, images, ZIP) without requiring login. Implemented Socket.io for instant communication.", link: "https://copy-ninja-ei3u.onrender.com", technologies: ["MERN Stack", "Socket.io"] },
        { title: "Chat App", description: "A real-time chat application featuring private and public rooms, media sharing (images, videos, files), and instant messaging using Socket.io. Built with the MERN stack for seamless communication and scalability.", link: "https://chatty-rtyb.onrender.com", technologies: ["MERN Stack", "Socket.io", "Express", "MongoDB"] },
        { title: "Fake News Detector", description: "A machine learning model built to identify and classify fake news articles using natural language processing techniques.", link: "https://fakenewsfrontend.onrender.com/", technologies: ["Python", "Machine Learning"] },
        { title: "Shop Sphere", description: "A full-featured e-commerce platform built with modern web technologies, offering a seamless shopping experience.", link: "https://shop-sphere-iota-beryl.vercel.app/", technologies: ["React", "Node.js", "MongoDB"] },
        { title: "Maan Meals", description: "A responsive food ordering application that allows users to browse menus and place orders with ease.", link: "https://maan-meals.vercel.app/", technologies: ["React", "Vercel"] },
        { title: "Stock Market Predictor", description: "A web app integrating ML models with a React frontend and Flask backend to forecast stock prices and provide real-time updates.", link: "https://github.com/Ayushmaan218/stockMarketApp", technologies: ["React", "Flask", "Machine Learning"] },
        { title: "Neural Network from Scratch", description: "Built a neural network from the ground up using only NumPy to classify handwritten digits from the MNIST dataset. Achieved 90%+ accuracy.", link: "https://github.com/Ayushmaan218/NeuralNetworkFromscratch", technologies: ["NumPy", "Python"] },
    ];

    const [setTitleRef, isTitleVisible] = useAnimateOnScroll();

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
                        Projects
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Explore my portfolio of full-stack applications and ML projects
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectData.map((p, index) => (
                        <ProjectCard key={p.title} {...p} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
