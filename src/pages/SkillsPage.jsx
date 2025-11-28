import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaPython, FaJsSquare, FaJava, FaReact, FaNodeJs, FaGitAlt, FaDatabase
} from 'react-icons/fa';
import {
    SiMongodb, SiExpress, SiSocketdotio, SiPostman,
    SiTensorflow, SiScikitlearn
} from 'react-icons/si';
import { DiCss3 } from 'react-icons/di';
import { AiOutlineApi, AiOutlineCloudUpload } from 'react-icons/ai';
import { BiBrain, BiCodeAlt } from 'react-icons/bi';
import { MdRealEstateAgent } from 'react-icons/md';
import { VscCode } from 'react-icons/vsc';

const SkillBadge = ({ name, icon }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.08, y: -8 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
    >
        <div className="text-4xl text-indigo-600 dark:text-indigo-400">
            {icon}
        </div>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 text-center">
            {name}
        </span>
    </motion.div>
);

const SkillCategory = ({ title, emoji, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
    >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="text-4xl">{emoji}</span>
            {title}
        </h2>
        {children}
    </motion.div>
);

const SubCategory = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {title}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {children}
        </div>
    </div>
);

const ProjectHighlight = ({ title, description }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border-l-4 border-indigo-600"
    >
        <span className="text-indigo-600 dark:text-indigo-400 text-xl">•</span>
        <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        </div>
    </motion.div>
);

const SkillsPage = () => {
    const titles = [
        "Frontend Dev",
        "Backend Dev",
        "Full-Stack Dev",
        "Machine Learning",
        "AI Enthusiast",
        "Tech Enthusiast"
    ];
    const [titleIndex, setTitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }, 2500); // Change every 2.5 seconds

        return () => clearInterval(interval);
    }, [titles.length]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
            <div className="container mx-auto px-6 py-12">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Ayushmaan Mohanty
                    </h1>
                    <div className="h-8 relative flex justify-center items-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={titles[titleIndex]}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-lg text-gray-600 dark:text-gray-400 absolute"
                            >
                                {titles[titleIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Programming Languages */}
                <SkillCategory title="Programming Languages" emoji="🧑‍💻">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <SkillBadge name="Python" icon={<FaPython />} />
                        <SkillBadge name="JavaScript" icon={<FaJsSquare />} />
                        <SkillBadge name="Java" icon={<FaJava />} />
                        <SkillBadge name="C" icon={<BiCodeAlt />} />
                        <SkillBadge name="SQL" icon={<FaDatabase />} />
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Python:</strong> OOP, Data Structures, NLP, ML, Deep Learning
                        </p>
                    </div>
                </SkillCategory>

                {/* Web Development */}
                <SkillCategory title="Web Development" emoji="🌐">
                    <SubCategory title="Frontend">
                        <SkillBadge name="React.js" icon={<FaReact />} />
                        <SkillBadge name="HTML5" icon={<BiCodeAlt />} />
                        <SkillBadge name="CSS3" icon={<DiCss3 />} />
                        <SkillBadge name="Responsive UI" icon={<BiCodeAlt />} />
                        <SkillBadge name="Socket.io UI" icon={<SiSocketdotio />} />
                    </SubCategory>

                    <SubCategory title="Backend">
                        <SkillBadge name="Node.js" icon={<FaNodeJs />} />
                        <SkillBadge name="Express.js" icon={<SiExpress />} />
                        <SkillBadge name="REST APIs" icon={<AiOutlineApi />} />
                        <SkillBadge name="File Upload" icon={<AiOutlineCloudUpload />} />
                        <SkillBadge name="OAuth" icon={<BiCodeAlt />} />
                        <SkillBadge name="NextAuth" icon={<BiCodeAlt />} />
                    </SubCategory>

                    <SubCategory title="Databases">
                        <SkillBadge name="MongoDB" icon={<SiMongodb />} />
                        <SkillBadge name="Mongoose" icon={<SiMongodb />} />
                        <SkillBadge name="Schema Design" icon={<FaDatabase />} />
                        <SkillBadge name="LocalStorage" icon={<FaDatabase />} />
                    </SubCategory>
                </SkillCategory>

                {/* Dev Tools */}
                <SkillCategory title="Dev Tools & Environment" emoji="🔧">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <SkillBadge name="Git & GitHub" icon={<FaGitAlt />} />
                        <SkillBadge name="VS Code" icon={<VscCode />} />
                        <SkillBadge name="Postman" icon={<SiPostman />} />
                        <SkillBadge name=".env Files" icon={<BiCodeAlt />} />
                        <SkillBadge name="API Integration" icon={<AiOutlineApi />} />
                    </div>
                </SkillCategory>

                {/* AI & Machine Learning */}
                <SkillCategory title="Artificial Intelligence & Machine Learning" emoji="🤖">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <SkillBadge name="Gradient Descent" icon={<BiBrain />} />
                        <SkillBadge name="Regression" icon={<SiScikitlearn />} />
                        <SkillBadge name="Classification" icon={<SiScikitlearn />} />
                        <SkillBadge name="Clustering" icon={<SiScikitlearn />} />
                        <SkillBadge name="Neural Networks" icon={<SiTensorflow />} />
                        <SkillBadge name="NLP" icon={<BiBrain />} />
                        <SkillBadge name="ML Pipelines" icon={<BiBrain />} />
                    </div>
                    <div className="mt-4 p-4 bg-purple-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Specializations:</strong> Fake News Detection, Real-time News Validation,
                            Tokenization, Stemming, Lemmatization, KNN, SVM, K-Means, Hierarchical Clustering
                        </p>
                    </div>
                </SkillCategory>

                {/* Real-Time Systems */}
                <SkillCategory title="Real-Time & Collaborative Systems" emoji="📡">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <SkillBadge name="Socket.io" icon={<SiSocketdotio />} />
                        <SkillBadge name="Real-time Chat" icon={<MdRealEstateAgent />} />
                        <SkillBadge name="User Presence" icon={<BiCodeAlt />} />
                        <SkillBadge name="File Sharing" icon={<AiOutlineCloudUpload />} />
                        <SkillBadge name="AI Workspace" icon={<BiBrain />} />
                    </div>
                </SkillCategory>

                {/* Full-Stack Projects */}
                <SkillCategory title="Full-Stack App Development" emoji="📱">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProjectHighlight
                            title="Discord-like Real-Time Chat"
                            description="Public/private rooms, user presence, join/leave events"
                        />
                        <ProjectHighlight
                            title="MERN Social Media Platform"
                            description="Groups, chat, video call, screen share, stories, AI feed"
                        />
                        <ProjectHighlight
                            title="Online Clipboard"
                            description="Multi-file transfer without login"
                        />
                        <ProjectHighlight
                            title="AI Chatroom"
                            description="AI-powered collaborative workspace"
                        />
                        <ProjectHighlight
                            title="Fake News Detector"
                            description="Python + React ML model for news validation"
                        />
                        <ProjectHighlight
                            title="Todo App with Reminders"
                            description="Browser Notification API integration"
                        />
                    </div>
                </SkillCategory>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-16 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-2xl"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Build Something Amazing?
                    </h2>
                    <p className="text-lg text-indigo-100 mb-6">
                        Let's collaborate on your next project
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                    >
                        Get In Touch
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default SkillsPage;
