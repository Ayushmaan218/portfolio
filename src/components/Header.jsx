import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${hasScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo / Left Side */}
                <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    AM
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 items-center">
                    <Link
                        to="/"
                        className={`${isActive('/') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'} hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300 font-medium`}
                    >
                        Skills
                    </Link>
                    <Link
                        to="/about"
                        className={`${isActive('/about') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'} hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300 font-medium`}
                    >
                        About
                    </Link>
                    <Link
                        to="/projects"
                        className={`${isActive('/projects') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'} hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300 font-medium`}
                    >
                        Projects
                    </Link>
                    <Link
                        to="/services"
                        className={`${isActive('/services') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'} hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300 font-medium`}
                    >
                        Services
                    </Link>
                    <Link
                        to="/contact"
                        className={`${isActive('/contact') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'} hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300 font-medium`}
                    >
                        Contact
                    </Link>
                    <Link
                        to="/blog"
                        className={`${isActive('/blog') || location.pathname.startsWith('/blog/') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'} hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300 font-medium`}
                    >
                        Blog
                    </Link>
                </nav>

                {/* Right Side: Name/Photo */}
                <div className="hidden md:flex items-center gap-4">
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            duration: 0.6,
                            type: "spring",
                            stiffness: 100
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)"
                        }}
                        className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 cursor-pointer"
                    >
                        <motion.span
                            className="font-medium text-sm text-gray-800 dark:text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Ayushmaan
                        </motion.span>
                        <motion.img
                            src="https://res.cloudinary.com/djk6pc6jm/image/upload/v1756569740/1740979848932_k5z8rq.jpg"
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
                            whileHover={{
                                scale: 1.2,
                                rotate: 5,
                                borderColor: "#818cf8"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                    </motion.div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={toggleMenu} className="text-gray-800 dark:text-white">
                        {isOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700"
                >
                    <nav className="flex flex-col items-center space-y-4 py-6">
                        <Link to="/" onClick={toggleMenu} className={`${isActive('/') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'} hover:text-indigo-500 font-medium`}>Skills</Link>
                        <Link to="/about" onClick={toggleMenu} className={`${isActive('/about') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'} hover:text-indigo-500 font-medium`}>About</Link>
                        <Link to="/projects" onClick={toggleMenu} className={`${isActive('/projects') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'} hover:text-indigo-500 font-medium`}>Projects</Link>
                        <Link to="/services" onClick={toggleMenu} className={`${isActive('/services') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'} hover:text-indigo-500 font-medium`}>Services</Link>
                        <Link to="/contact" onClick={toggleMenu} className={`${isActive('/contact') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'} hover:text-indigo-500 font-medium`}>Contact</Link>
                        <Link to="/blog" onClick={toggleMenu} className={`${isActive('/blog') || location.pathname.startsWith('/blog/') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'} hover:text-indigo-500 font-medium`}>Blog</Link>

                        <div className="flex items-center gap-3 mt-4 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
                            <span className="font-medium text-sm text-gray-800 dark:text-white">Ayushmaan</span>
                            <img
                                src="https://res.cloudinary.com/djk6pc6jm/image/upload/v1756569740/1740979848932_k5z8rq.jpg"
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
                            />
                        </div>
                    </nav>
                </motion.div>
            )}
        </header>
    );
};

export default Header;
