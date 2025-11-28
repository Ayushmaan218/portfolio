import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SkillsPage from './pages/SkillsPage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

// Global Styles for animations
const GlobalStyles = () => (
    <style>{`
        @keyframes fade-in-down {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes text-focus-in {
            0% { filter: blur(12px); opacity: 0; }
            100% { filter: blur(0px); opacity: 1; }
        }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-text-focus-in { animation: text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both; }
        
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        
        html { scroll-behavior: smooth; }
        
        /* For 3D card effects */
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-y-10 { transform: rotateY(10deg); }
        .group-hover-card:hover .rotate-y-10 { transform: rotateY(0); }
    `}</style>
);

// Scroll to top button
const UpArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
);

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        >
            <UpArrowIcon />
        </button>
    );
}

const Footer = () => (
    <footer className="bg-gray-900 dark:bg-gray-900 text-white py-6 transition-colors duration-300">
        <div className="container mx-auto px-6 text-center">
            <p>&copy; {new Date().getFullYear()} Ayushmaan Mohanty. All rights reserved.</p>
        </div>
    </footer>
);

export default function App() {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <GlobalStyles />
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<SkillsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:id" element={<BlogPostPage />} />
                </Routes>
            </main>
            <ScrollToTop />
            <Footer />
        </div>
    )
}
