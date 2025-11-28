import React from 'react';
import Hero from '../components/Hero';
import ParticleBackground from '../components/ParticleBackground';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiMongodb, SiFlask, SiNumpy, SiSocketdotio, SiVercel } from 'react-icons/si';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll';

// Import all the sections from the original App.jsx
// We'll keep the same components but organize them better

const SkillItem = ({ name, logo, delay }) => {
    const [setRef, isVisible] = useAnimateOnScroll(0.3);
    return (
        <li
            ref={setRef}
            className={`flex flex-col items-center justify-center gap-2 p-4 bg-gray-700/50 dark:bg-gray-700/50 rounded-lg shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:bg-gray-700/80 hover:shadow-indigo-500/40 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ transitionDelay: `${isVisible ? delay : 0}ms` }}
        >
            <div className="w-16 h-16 flex items-center justify-center text-indigo-400">
                {logo}
            </div>
            <span className="font-medium text-center text-white">{name}</span>
        </li>
    );
};

// Skill icons (same as in original App.jsx - keeping for reference)
const Icons = {
    react: <FaReact className="text-5xl text-sky-400" />,
    nodejs: <FaNodeJs className="text-5xl text-green-500" />,
    python: <FaPython className="text-5xl text-yellow-400" />,
    mongodb: <SiMongodb className="text-5xl text-green-400" />,
};

const About = () => {
    const [setRef, isVisible] = useAnimateOnScroll();
    const skills = [
        { name: 'React', logo: Icons.react },
        { name: 'Node.js', logo: Icons.nodejs },
        { name: 'JavaScript', logo: <span className="text-5xl">JS</span> },
        { name: 'Python', logo: Icons.python },
        { name: 'MongoDB', logo: Icons.mongodb },
        { name: 'HTML5', logo: <span className="text-5xl">HTML</span> },
        { name: 'CSS3', logo: <span className="text-5xl">CSS</span> },
        { name: 'Tailwind CSS', logo: <span className="text-5xl">TW</span> },
        { name: 'Git', logo: <span className="text-5xl">Git</span> },
    ];

    return (
        <section id="about" className="py-20 bg-gray-800 dark:bg-gray-800 text-white transition-colors duration-300">
            <div ref={setRef} className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
                <div className="flex flex-col items-center text-center gap-12">
                    <img
                        src="https://res.cloudinary.com/djk6pc6jm/image/upload/v1756569740/1740979848932_k5z8rq.jpg"
                        alt="Ayushmaan Mohanty"
                        className="w-48 h-48 rounded-full object-cover shadow-2xl transform hover:scale-105 transition-transform duration-300"
                    />
                    <p className="text-lg leading-relaxed mb-6 max-w-3xl">
                        I am a motivated Computer Science student with a strong foundation in full-stack development, machine learning, and cloud technologies. I have experience in building scalable web applications, deploying ML models, and automating workflows. I am skilled in applying data structures, algorithms, and software engineering principles to solve real-world challenges.
                    </p>
                    <div>
                        <h3 className="text-3xl font-semibold mb-8">Technologies I Work With</h3>
                        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
                            {skills.map((skill, index) => (
                                <SkillItem key={skill.name} {...skill} delay={index * 50} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

const techIcons = {
    React: <FaReact className="text-sky-400 text-lg" />,
    "Node.js": <FaNodeJs className="text-green-500 text-lg" />,
    MongoDB: <SiMongodb className="text-green-400 text-lg" />,
    Python: <FaPython className="text-yellow-400 text-lg" />,
    Flask: <SiFlask className="text-gray-300 text-lg" />,
    NumPy: <SiNumpy className="text-blue-400 text-lg" />,
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

const Projects = () => {
    const projectData = [
        { title: "Codexly", description: "An interactive online code compiler and sharing platform where users can write, run, and share code snippets in real time. Includes a community feature for commenting, discussing, and collaborating on code projects.", link: "https://codexly.vercel.app/", technologies: ["Next.js", "Clerk", "Convex"] },
        { title: "Copy Ninja", description: "A secure, real-time web app for sharing text and files (documents, images, ZIP) without requiring login. Implemented Socket.io for instant communication.", link: "https://copy-ninja-ei3u.onrender.com", technologies: ["MERN Stack", "Socket.io"] },
        { title: "Chat App", description: "A real-time chat application featuring private and public rooms, media sharing (images, videos, files), and instant messaging using Socket.io. Built with the MERN stack for seamless communication and scalability.", link: "https://chatty-rtyb.onrender.com", technologies: ["MERN Stack", "Socket.io", "Express", "MongoDB"] },
        { title: "Fake News Detector", description: "A machine learning model built to identify and classify fake news articles using natural language processing techniques.", link: "https://fakenewsfrontend.onrender.com/", technologies: ["Python", "Machine Learning"] },
        { title: "Shop Sphere", description: "A full-featured e-commerce platform built with modern web technologies, offering a seamless shopping experience.", link: "https://shop-sphere-iota-beryl.vercel.app/", technologies: ["React", "Node.js", "MongoDB"] },
        { title: "Maan Meals", description: "A responsive food ordering application that allows users to browse menus and place orders with ease.", link: "https://maan-meals.vercel.app/", technologies: ["React", "Vercel"] },
    ];

    const [setTitleRef, isTitleVisible] = useAnimateOnScroll();

    const ProjectCard = ({ title, description, link, technologies, delay }) => {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-800 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-700 dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1"
                style={{ transitionDelay: `${delay}ms` }}
            >
                <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
                <p className="text-gray-300 mb-3">{description}</p>
                <div className="flex flex-wrap gap-3">
                    {technologies.map((tech, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-1 bg-gray-700 dark:bg-gray-700 rounded-md text-gray-200 text-sm"
                        >
                            {techIcons[tech] || null}
                            <span>{tech}</span>
                        </div>
                    ))}
                </div>
            </a>
        );
    };

    return (
        <section id="projects" className="py-20 bg-gray-900 dark:bg-gray-900 text-white transition-colors duration-300">
            <div className="container mx-auto px-6">
                <h2
                    ref={setTitleRef}
                    className={`text-4xl font-bold text-center mb-12 transition-all duration-700 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectData.map((p, index) => (
                        <ProjectCard key={p.title} {...p} delay={index * 150} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ title, description, delay }) => {
    const [setRef, isVisible] = useAnimateOnScroll();
    return (
        <div ref={setRef} className={`group perspective transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>
            <div className={`bg-gray-700 dark:bg-gray-700 p-8 rounded-lg preserve-3d transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-x-3`}>
                <h3 className="text-2xl font-bold text-indigo-400 mb-4">{title}</h3>
                <p className="text-white">{description}</p>
            </div>
        </div>
    );
};

const Services = () => {
    const servicesData = [
        { title: "Full-Stack Web Development", description: "I can build complete, scalable web applications using the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js." },
        { title: "Python Development", description: "Leveraging Python for backend development with frameworks like Flask, and for building machine learning models." },
        { title: "API Development", description: "Designing and building robust, secure, and scalable RESTful APIs to power your web and mobile applications." },
        { title: "Machine Learning Solutions", description: "Developing and deploying machine learning models for tasks like prediction, classification, and data analysis." },
        { title: "Portfolio Websites", description: "I can create stunning, professional, and responsive portfolio websites to showcase your work and skills effectively." }
    ];
    const [setTitleRef, isTitleVisible] = useAnimateOnScroll();

    return (
        <section id="services" className="py-20 bg-gray-800 dark:bg-gray-800 text-white transition-colors duration-300">
            <div className="container mx-auto px-6">
                <h2 ref={setTitleRef} className={`text-4xl font-bold text-center mb-12 transition-all duration-700 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    {servicesData.map((service, index) => (
                        <ServiceCard key={service.title} {...service} delay={index * 150} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    const [setRef, isVisible] = useAnimateOnScroll();

    return (
        <section id="contact" className="py-20 bg-gray-900 dark:bg-gray-900 text-white transition-colors duration-300">
            <div
                ref={setRef}
                className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
                <div className="max-w-lg mx-auto bg-gray-800 dark:bg-gray-800 p-8 rounded-lg flex flex-col items-center space-y-6">
                    <p className="text-lg text-gray-300 text-center">
                        Feel free to connect with me through any of these platforms 👇
                    </p>
                    <div className="flex space-x-6 text-3xl">
                        <a
                            href="https://www.linkedin.com/in/ayushmaan-mohanty-065b31267/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-400 transition"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://github.com/Ayushmaan218"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://x.com/AyushmaanM43704"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=aayushmaanmohanty21@gmail.com&su=Portfolio Inquiry&body=Hello Ayushmaan,"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:text-red-300 transition"
                        >
                            <FaEnvelope />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HomePage = () => {
    return (
        <div>
            <Hero />
            <About />
            <Projects />
            <Services />
            <Contact />
        </div>
    );
};

export default HomePage;
