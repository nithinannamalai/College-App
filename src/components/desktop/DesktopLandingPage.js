import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, UserCheck, GraduationCap, Shield, UserPlus, LogIn } from 'lucide-react';

const SLIDES = [
    {
        subtitle: 'SRI RAMAKRISHNA ENGINEERING COLLEGE \u00B7 DEPT OF EEE',
        title: 'TUTOR WARD',
        info: 'Tutor Ward App is the official academic dynamicron portal for the Department of Electrical & Electronics Engineering. Track real-time attendance, simulate CGPA, generate On-Duty letters, view semester timetables, and coordinate tutor-ward counseling.',
        cta: 'EXPLORE PORTAL',
        badge: 'Smart Hub v2.5'
    },
    {
        subtitle: 'AUTONOMOUS ACADEMIC VAULT \u00B7 ANNA UNIVERSITY',
        title: 'ACADEMICS',
        info: 'Access curriculum syllabi, lecture notes, lab manuals, university question archives, and monitor semester grades with our built-in CGPA target planner.',
        cta: 'VIEW COURSES',
        badge: 'Curriculum & Notes'
    },
    {
        subtitle: 'RADAR ANALYTICS & REQUISITIONS',
        title: 'ATTENDANCE',
        info: 'Hourly attendance analytics, percentage projections, low-attendance alerts, and seamless digital On-Duty requisition generation with instant PDF export.',
        cta: 'CHECK ATTENDANCE',
        badge: '85% Target Radar'
    },
    {
        subtitle: 'DEPARTMENT CAREER ROADMAPS \u00B7 CORE & IT',
        title: 'CAREER HUB',
        info: 'Curated learning tracks for Electrical Core industries, IT placement preparation, GATE examinations, PSU opportunities, and higher studies.',
        cta: 'EXPLORE CAREERS',
        badge: 'Placements & GATE'
    },
    {
        subtitle: 'GEMINI AI DEEP LEARNING ENGINE',
        title: 'AI ADVISOR',
        info: '24/7 intelligent academic assistant trained on engineering mathematics, circuit theory, control systems, and department guidelines.',
        cta: 'LAUNCH AI TUTOR',
        badge: '24/7 Neural Assistant'
    }
];

export const DesktopLandingPage = ({ onOpenLogin }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    // Automatically transition slides every 5 seconds unless paused
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev === SLIDES.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide(prev => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    };

    const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX - innerWidth / 2) / 45;
        const y = (e.clientY - innerHeight / 2) / 45;
        setMouseOffset({ x, y });
    };

    const slide = SLIDES[currentSlide];

    return (
        _jsxs("div", { 
            className: "explorescape-wrapper",
            onMouseMove: handleMouseMove,
            onMouseEnter: () => setIsPaused(true),
            onMouseLeave: () => setIsPaused(false),
            children: [
                _jsx("div", { className: "ambient-mist-layer" }),
                _jsx("div", { className: "ambient-glow-orb orb-top-left" }),
                _jsx("div", { className: "ambient-glow-orb orb-bottom-right" }),
                _jsx("header", { className: "explorescape-header", children: [
                    _jsxs("nav", { className: "explorescape-nav", children: [
                        _jsx("button", {
                            className: `explorescape-nav-item ${currentSlide === 0 ? 'active' : ''}`,
                            onClick: () => setCurrentSlide(0),
                            children: "Home"
                        }),
                        _jsx("button", {
                            className: `explorescape-nav-item ${currentSlide === 1 ? 'active' : ''}`,
                            onClick: () => setCurrentSlide(1),
                            children: "Academics"
                        }),
                        _jsx("button", {
                            className: `explorescape-nav-item ${currentSlide === 2 ? 'active' : ''}`,
                            onClick: () => setCurrentSlide(2),
                            children: "Attendance"
                        }),
                        _jsx("button", {
                            className: `explorescape-nav-item ${currentSlide === 3 ? 'active' : ''}`,
                            onClick: () => setCurrentSlide(3),
                            children: "Career Hub"
                        }),
                        _jsx("button", {
                            className: `explorescape-nav-item ${currentSlide === 4 ? 'active' : ''}`,
                            onClick: () => setCurrentSlide(4),
                            children: "AI Tutor"
                        }),
                        _jsxs("button", {
                            className: "explorescape-nav-auth-btn signin",
                            onClick: () => onOpenLogin(false),
                            children: [_jsx(LogIn, { size: 14 }), _jsx("span", { children: "Sign In" })]
                        }),
                        _jsxs("button", {
                            className: "explorescape-nav-auth-btn signup",
                            onClick: () => onOpenLogin(true),
                            children: [_jsx(UserPlus, { size: 14 }), _jsx("span", { children: "Sign Up" })]
                        })
                    ] })
                ] }),
                _jsxs("div", { className: "explorescape-content", children: [
                    _jsx("img", { 
                        src: "/explorescape/bac-3.png", 
                        alt: "Parallax Layer 3", 
                        className: "back-layer back-3",
                        style: { transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.2}px, 0)` }
                    }),
                    _jsxs("div", { 
                        className: "explorescape-title", 
                        key: `title-${currentSlide}`,
                        style: { transform: `translate(calc(-50% + ${mouseOffset.x * 0.6}px), calc(-50% + ${mouseOffset.y * 0.4}px))` },
                        children: [
                            _jsx("h3", { children: slide.subtitle }),
                            _jsx("h1", { children: slide.title })
                        ] 
                    }),
                    _jsx("img", { 
                        src: "/explorescape/bac-2-2.png", 
                        alt: "Parallax Layer 2", 
                        className: "back-layer back-2",
                        style: { transform: `translate3d(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.4}px, 0)` }
                    }),
                    _jsx("img", { 
                        src: "/explorescape/bac-1.png", 
                        alt: "Parallax Layer 1", 
                        className: "back-layer back-1",
                        style: { transform: `translate3d(${mouseOffset.x * 1.2}px, ${mouseOffset.y * 0.6}px, 0)` }
                    }),
                    _jsx("div", { 
                        className: "explorescape-info-wrap", 
                        key: `info-${currentSlide}`, 
                        children: [
                            _jsx("p", { children: slide.info })
                        ] 
                    }),
                    _jsxs("div", { className: "explorescape-cta", children: [
                        _jsxs("button", {
                            className: "cta-btn",
                            onClick: () => onOpenLogin(false),
                            children: [
                                slide.cta,
                                _jsx(ArrowRight, { size: 18 })
                            ]
                        })
                    ] }),
                    _jsxs("div", { className: "explorescape-dots-indicator", children: [
                        SLIDES.map((_, idx) => (
                            _jsx("button", {
                                key: idx,
                                className: `slider-dot ${idx === currentSlide ? 'active' : ''}`,
                                onClick: () => setCurrentSlide(idx),
                                "aria-label": `Go to slide ${idx + 1}`
                            })
                        ))
                    ] }),
                    _jsxs("div", { className: "explorescape-slider-nav", children: [
                        _jsx("button", { onClick: prevSlide, "aria-label": "Previous Slide", children: _jsx(ChevronLeft, { size: 24 }) }),
                        _jsx("button", { onClick: nextSlide, "aria-label": "Next Slide", children: _jsx(ChevronRight, { size: 24 }) })
                    ] }),
                    _jsxs("div", { className: "explorescape-author-pill", children: [
                        "Developer: ",
                        _jsx("strong", { children: "Nithin Annamalai R" }),
                        " \u00B7 ",
                        _jsx("a", { href: "mailto:tutorwardapp@gmail.com", children: "tutorwardapp@gmail.com" })
                    ] })
                ] })
            ] 
        })
    );
};
