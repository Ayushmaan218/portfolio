import React, { useState, useRef, useEffect } from 'react';

//- Global Styles for animations
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


//- Heroicons
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

const UpArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
);


//- Custom hook for animations
const useAnimateOnScroll = (threshold = 0.1) => {
    const [ref, setRef] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref) {
            observer.observe(ref);
        }

        return () => {
            if (ref) {
                observer.unobserve(ref);
            }
        };
    }, [ref, threshold]);

    return [setRef, isVisible];
};

//- Particle Background Component
const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            let particleCount = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: Math.random() * 0.5 - 0.25,
                    vy: Math.random() * 0.5 - 0.25,
                    radius: Math.random() * 1.5,
                });
            }
        };
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
                if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(129, 140, 248, 0.5)'; // Indigo color
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        resizeCanvas();
        createParticles();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};


//- Components
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

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

    return (
        <header className={`bg-gray-900 text-white fixed w-full top-0 z-20 transition-shadow duration-300 ${hasScrolled ? 'shadow-lg shadow-indigo-500/20' : ''}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" className="text-2xl font-bold">Ayushmaan Mohanty</a>
                <nav className="hidden md:flex space-x-6">
                    <a href="#about" className="hover:text-indigo-400 transition duration-300">About</a>
                    <a href="#projects" className="hover:text-indigo-400 transition duration-300">Projects</a>
                    <a href="#services" className="hover:text-indigo-400 transition duration-300">Services</a>
                    <a href="#contact" className="hover:text-indigo-400 transition duration-300">Contact</a>
                </nav>
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-gray-800">
                    <nav className="flex flex-col items-center space-y-4 py-4">
                        <a href="#about" onClick={toggleMenu} className="hover:text-indigo-400 transition duration-300">About</a>
                        <a href="#projects" onClick={toggleMenu} className="hover:text-indigo-400 transition duration-300">Projects</a>
                        <a href="#services" onClick={toggleMenu} className="hover:text-indigo-400 transition duration-300">Services</a>
                        <a href="#contact" onClick={toggleMenu} className="hover:text-indigo-400 transition duration-300">Contact</a>
                    </nav>
                </div>
            )}
        </header>
    );
};

const Home = () => (
    <section id="home" className="min-h-screen flex items-center bg-gray-900 text-white relative">
        <ParticleBackground />
        <div className="container mx-auto px-6 text-center z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-text-focus-in">Ayushmaan Mohanty</h1>
            <p className="text-xl md:text-2xl text-indigo-300 animate-text-focus-in animation-delay-600">Full-Stack Developer | Machine Learning Enthusiast</p>
        </div>
    </section>
);

const SkillItem = ({ name, logo, delay }) => {
    const [setRef, isVisible] = useAnimateOnScroll(0.3);
    return (
        <li
            ref={setRef}
            className={`flex flex-col items-center justify-center gap-2 p-4 bg-gray-700/50 rounded-lg shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:bg-gray-700/80 hover:shadow-indigo-500/40 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ transitionDelay: `${isVisible ? delay : 0}ms` }}
        >
            <div className="w-16 h-16 flex items-center justify-center text-indigo-400">
                {logo}
            </div>
            <span className="font-medium text-center">{name}</span>
        </li>
    );
};


// Logos for skills
const Icons = {
    react: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M12.001 2C6.476 2 2 6.476 2 12.001c0 5.526 4.476 10.001 10.001 10.001s10.001-4.475 10.001-10.001C22.002 6.476 17.526 2 12.001 2zM8.553 8.869c.536-1.001 1.78-1.54 2.895-1.129.17.062.333.14.486.233-1.488.948-2.31 2.923-1.921 4.79.39 1.868 2.052 3.212 3.948 3.212a4.263 4.263 0 0 0 1.948-.44c-.538 1.001-1.782 1.54-2.896 1.129-.17-.063-.333-.141-.486-.234 1.488-.948 2.31-2.923 1.921-4.79-.39-1.868-2.052-3.212-3.947-3.212a4.263 4.263 0 0 0-1.948.441zM12 4.14A7.86 7.86 0 1 1 4.14 12 7.87 7.87 0 0 1 12 4.14z"/></svg>,
    nodejs: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M11.99 24a12 12 0 0 1 0-24 12 12 0 0 1 0 24zm-1.1-18.43h2.15v12.86h-2.15zM8.54 9.14l1.52-1.29 6.4 7.56-1.52 1.29zM15.46 14.86l-1.52 1.29-6.4-7.56 1.52-1.29z"/></svg>,
    javascript: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M0 0h24v24H0V0zm22.034 18.262c.385-1.133.56-2.04.56-3.214 0-1.68-.455-3.15-1.26-4.214-.805-1.12-1.96-1.732-3.465-1.732-1.505 0-2.66.58-3.465 1.732-.805 1.064-1.208 2.534-1.208 4.214 0 1.176.175 2.081.525 3.214H5.082V6.6h2.884v10.35h2.1v-10.35h2.884v10.35h2.1v-10.35h2.884v10.35h2.1V6.6h2.884v11.662h-2.135z"/></svg>,
    python: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M24 12c0-3.324-1.353-6.33-3.525-8.485C18.3 1.34 15.309 0 12 0 8.682 0 5.682 1.347 3.515 3.515 1.347 5.682 0 8.682 0 12c0 3.313 1.347 6.313 3.515 8.485C5.682 22.653 8.682 24 12 24c3.309 0 6.3-.1353 8.475-3.515C22.647 18.313 24 15.313 24 12zM6 6a3 3 0 110 6 3 3 0 010-6zm12 12a3 3 0 110-6 3 3 0 010 6z"/></svg>,
    mongodb: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M12 0C7.3 0 4.1 3.3 4.1 7.2v9.6c0 3.9 3.2 7.2 7.9 7.2s7.9-3.3 7.9-7.2V7.2C19.9 3.3 16.7 0 12 0zm0 2.4c2.6 0 4.3 1.8 4.3 4.2v.2c-1.3-.8-2.8-1.3-4.3-1.3s-3 .5-4.3 1.3v-.2c0-2.4 1.7-4.2 4.3-4.2zm0 20.4c-3.5 0-5.5-2.2-5.5-5.4V9.9c1.3.8 2.9 1.3 4.6 1.3h1.8c1.7 0 3.3-.5 4.6-1.3v7.5c0 3.2-2 5.4-5.5 5.4z"/></svg>,
    html5: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622-13.23.002.69 7.843h11.4l-.33 3.572-3.301 1.005-3.315-.984-.21-2.404h-2.92l.433 4.965 5.992 1.83 6.007-1.83.78-8.704h-12.24z"/></svg>,
    css3: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.91l-11.23.001-.231-2.622 14.18-.002.23 2.623h-2.95zm-1.88 3.592l-.21-2.4h-6.12l.208 2.4h5.912zm-.33 3.571l-.21-2.4h-5.4l.21 2.4h5.19z"/></svg>,
    tailwind: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1.5-12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>,
    git: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M22.95 9.712c-.22-.64-.92-1.04-1.58-1.04h-3.21c-.01 0-.01-.01-.02-.01V5.292c0-1.12-.91-2.04-2.04-2.04H8.83c-1.13 0-2.04.92-2.04 2.04v3.37c0 .01-.01.01-.02.01h-3.2c-.67 0-1.37.39-1.59 1.04-.22.64.04 1.35.61 1.7l7.5 4.63v3.7c0 .54.44.98.98.98h1.9c.54 0 .98-.44.98-.98v-3.7l7.5-4.63c.57-.35.83-1.06.6-1.7z"/></svg>,
    github: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
    flask: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.04 4.5h2.08v15H10.96v-15zm-3.12 3.12h2.08v8.76H7.84V7.62zm8.32 0h2.08v8.76h-2.08V7.62z"/></svg>,
    cpp: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M13.5 0l-1.5 1.5h-3L7.5 0H0v7.5l1.5 1.5v3l-1.5 1.5V24h7.5l1.5-1.5v-3l-1.5-1.5V10.5h4.5l1.5 1.5v3l-1.5 1.5V24h7.5l1.5-1.5v-3l-1.5-1.5V9l1.5-1.5V0h-7.5zM9 10.5H4.5V4.5H9v6zm7.5 0h-4.5V4.5h4.5v6z"/></svg>,
    java: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.243 16.8c-1.284 1.284-3.138 2.002-5.243 2.002-2.104 0-3.958-.718-5.242-2.002C5.474 15.517 4.757 13.662 4.757 11.56c0-2.104.717-3.958 2.002-5.242C8.042 5.034 9.896 4.317 12 4.317c2.104 0 3.958.717 5.243 2.002C18.526 7.604 19.243 9.458 19.243 11.56c0 2.102-.717 3.957-2.002 5.24zM8.04 8.04a.9.9 0 100-1.8.9.9 0 000 1.8zm7.92 0a.9.9 0 100-1.8.9.9 0 000 1.8zm-3.96 8.4a3.6 3.6 0 01-3.6-3.6h7.2a3.6 3.6 0 01-3.6 3.6z"/></svg>,
    express: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M24 13.4L13.2 24H10.8L0 13.4V10.7L10.8 0H13.2L24 10.7V13.4Z"/></svg>,
    postman: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M22.68 12.3c-.66.38-1.4.58-2.2.58-1.58 0-3.04-.62-4.14-1.72-1.1-1.1-1.72-2.56-1.72-4.14s.62-3.04 1.72-4.14C17.34 1.8 18.8 1.18 20.38 1.18c.8 0 1.54.2 2.2.58l.6-1.04C22.28.2 21.36 0 20.38 0 18.3 0 16.48.78 15.08 2.2c-1.4 1.4-2.2 3.24-2.2 5.2s.8 3.8 2.2 5.2c1.4 1.4 3.22 2.2 5.3 2.2.98 0 1.9-.2 2.8-.72l-.6-1.04zM3.62 12.3c.66.38 1.4.58 2.2.58 1.58 0 3.04-.62 4.14-1.72 1.1-1.1 1.72-2.56 1.72-4.14S11.06 3.9 9.96 2.78c-1.1-1.1-2.56-1.72-4.14-1.72-.8 0-1.54.2-2.2.58l-.6-1.04C2.12.2.98 0 0 0v24h24v-2.2H9.28c-1.84-1.34-3-3.48-3-5.94 0-2.46 1.16-4.6 3-5.94V2.2H1.32C4.12 4.22 5.82 8.04 5.82 12.3c0 4.26-1.7 8.08-4.5 10.08H3.62v-9.42z"/></svg>,
    vscode: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M23.15 2.924l-10.354 7.52L22.9 20.57c.45.324.45.913 0 1.237l-2.03.882c-.404.174-.9-.05-.9-.51v-19.1c0-.46.496-.685.9-.51l2.03.882c.45.324.45.913 0 1.237zM12.003 12.01L1.24 2.812C.835 2.536.32 2.808.32 3.298v17.404c0 .49.515.762.92.486l10.763-9.178z"/></svg>,
    ml: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M12 6a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM8.5 14.5A3.5 3.5 0 1015.5 18a3.5 3.5 0 00-7-3.5zm7 0a3.5 3.5 0 10-7-3.5 3.5 3.5 0 007 3.5zM12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/></svg>,
    dsa: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current"><path d="M19 5a3 3 0 100-6 3 3 0 000 6zm-7 14a3 3 0 100-6 3 3 0 000 6zm7 0a3 3 0 100-6 3 3 0 000 6zM5 12a3 3 0 100-6 3 3 0 000 6zm2 7a3 3 0 100-6 3 3 0 000 6zM12 2a1 1 0 00-1 1v6a1 1 0 102 0V3a1 1 0 00-1-1zm-7 8a1 1 0 00-1 1v6a1 1 0 102 0v-6a1 1 0 00-1-1zm14 0a1 1 0 00-1 1v6a1 1 0 102 0v-6a1 1 0 00-1-1z"/></svg>,
};


const About = () => {
    const [setRef, isVisible] = useAnimateOnScroll();
    const skills = [
        { name: 'React', logo: Icons.react },
        { name: 'Node.js', logo: Icons.nodejs },
        { name: 'JavaScript', logo: Icons.javascript },
        { name: 'Python', logo: Icons.python },
        { name: 'Java', logo: Icons.java },
        { name: 'Express.js', logo: Icons.express },
        { name: 'MongoDB', logo: Icons.mongodb },
        { name: 'HTML5', logo: Icons.html5 },
        { name: 'CSS3', logo: Icons.css3 },
        { name: 'Tailwind CSS', logo: Icons.tailwind },
        { name: 'Flask', logo: Icons.flask },
        { name: 'C++', logo: Icons.cpp },
        { name: 'Machine Learning', logo: Icons.ml },
        { name: 'DSA', logo: Icons.dsa },
        { name: 'Git', logo: Icons.git },
        { name: 'GitHub', logo: Icons.github },
        { name: 'Postman', logo: Icons.postman },
        { name: 'VS Code', logo: Icons.vscode },
    ];

    return (
        <section id="about" className="py-20 bg-gray-800 text-white">
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

const ProjectCard = ({ title, description, link, technologies, delay }) => {
    const [setRef, isVisible] = useAnimateOnScroll();
    return (
        <div ref={setRef} className={`group perspective transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${delay}ms`}}>
             <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full preserve-3d transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-x-3">
                <h3 className="text-2xl font-bold text-indigo-400 mb-2">{title}</h3>
                <p className="mb-4">{description}</p>
                <div className="mb-4">
                    {technologies.map(tech => (
                        <span key={tech} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">{tech}</span>
                    ))}
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:underline">
                    View Project &rarr;
                </a>
            </div>
        </div>
    );
};


const Projects = () => {
    const projectData = [
        { title: "Shop Sphere", description: "A full-featured e-commerce platform built with modern web technologies, offering a seamless shopping experience.", link: "https://shop-sphere-iota-beryl.vercel.app/", technologies: ["React", "Node.js", "MongoDB"] },
        { title: "Maan Meals", description: "A responsive food ordering application that allows users to browse menus and place orders with ease.", link: "https://maan-meals.vercel.app/", technologies: ["React", "Vercel"] },
        { title: "Copy Ninja", description: "A secure, real-time web app for sharing text and files (documents, images, ZIP) without requiring login. Implemented Socket.io for instant communication.", link: "https://copy-ninja-io.onrender.com/", technologies: ["MERN Stack", "Socket.io"] },
        { title: "Fake News Detector", description: "A machine learning model built to identify and classify fake news articles using natural language processing techniques.", link: "https://github.com/Ayushmaan218/FakeNewsDetector", technologies: ["Python", "Machine Learning"] },
        { title: "Stock Market Predictor App", description: "A web app integrating ML models with a React frontend and Flask backend to forecast stock prices and provide real-time updates.", link: "https://github.com/Ayushmaan218/stockMarketApp", technologies: ["React", "Flask", "Machine Learning"] },
        { title: "Neural Network from Scratch", description: "Built a neural network from the ground up using only NumPy to classify handwritten digits from the MNIST dataset. Achieved 90%+ accuracy.", link: "https://github.com/Ayushmaan218/NeuralNetworkFromscratch", technologies: ["NumPy", "Python"] },
    ];
    const [setTitleRef, isTitleVisible] = useAnimateOnScroll();

    return (
        <section id="projects" className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-6">
                <h2 ref={setTitleRef} className={`text-4xl font-bold text-center mb-12 transition-all duration-700 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectData.map((p, index) => <ProjectCard key={p.title} {...p} delay={index * 150} />)}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ title, description, delay }) => {
    const [setRef, isVisible] = useAnimateOnScroll();
    return (
        <div ref={setRef} className={`group perspective transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${delay}ms`}}>
            <div className={`bg-gray-700 p-8 rounded-lg preserve-3d transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-x-3`}>
                 <h3 className="text-2xl font-bold text-indigo-400 mb-4">{title}</h3>
                 <p>{description}</p>
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
        <section id="services" className="py-20 bg-gray-800 text-white">
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
    const form = useRef();
    const [message, setMessage] = useState('');
    const [setRef, isVisible] = useAnimateOnScroll();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);


    const sendEmail = (e) => {
    e.preventDefault();
    setMessage('Sending...');

    if (window.emailjs) {
        window.emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then((result) => {
                console.log(result.text);
                setMessage('Message sent successfully!');
                form.current.reset();
            }, (error) => {
                console.error(error.text);
                setMessage('Failed to send message. Please try again.');
            });
    } else {
        setMessage('Email service is not available. Please try again later.');
    }
};

    
    return (
        <section id="contact" className="py-20 bg-gray-900 text-white">
            <div ref={setRef} className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
                <div className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg">
                    
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-2">Name</label>
                            <input type="text" id="name" name="user_name" className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <input type="email" id="email" name="user_email" className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block mb-2">Message</label>
                            <textarea id="message" name="message" rows="4" className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Send Message
                        </button>
                    </form>
                     {message && <p className="text-center mt-4">{message}</p>}
                </div>
            </div>
        </section>
    );
};

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
    <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-6 text-center">
            <p>&copy; {new Date().getFullYear()} Ayushmaan Mohanty. All rights reserved.</p>
        </div>
    </footer>
);


export default function App() {
    return (
        <div className="bg-gray-900">
            <GlobalStyles />
            <Header />
            <main>
                <Home />
                <About />
                <Projects />
                <Services />
                <Contact />
            </main>
            <ScrollToTop />
            <Footer />
        </div>
    )
}

