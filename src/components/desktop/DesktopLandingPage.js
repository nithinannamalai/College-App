import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { 
    ArrowRight, ChevronLeft, ChevronRight, Sparkles, UserCheck, 
    GraduationCap, Shield, UserPlus, LogIn, Award, Activity, Bot, 
    BookOpen, Layers, ShieldCheck, Download, CheckCircle2, Clock, 
    FileText, Cpu, ExternalLink, Hash, Building2
} from 'lucide-react';
import appLogo from '../../assets/app-logo.png';

const HERO_SLIDES = [
    {
        tag: 'ATTENDANCE RADAR & ON-DUTY',
        title: 'Real-Time Dynamicron Attendance',
        desc: 'Hourly subject tracking, automated 75% cutoff forecasting, low-attendance prevention radar, and instant digital On-Duty requisition generation with verified PDF exports.',
        accent: '#38bdf8',
        kpi: '94.5% Safe Zone',
        badge: 'Smart Radar v2.5'
    },
    {
        tag: 'AUTONOMOUS ACADEMIC VAULT',
        title: 'Autonomous Curricula & CGPA Simulator',
        desc: 'Direct access to semester syllabi, lecture notes, lab manuals, university archive papers, and a target GPA planner designed for Regulation 2022 CBCS standards.',
        accent: '#4ade80',
        kpi: '8.75 Distinction',
        badge: 'Curriculum & Records'
    },
    {
        tag: 'GEMINI 2.0 AI NEURAL ENGINE',
        title: '24/7 Neural Engineering Tutor',
        desc: 'Instant engineering problem solver specialized in Circuit Theory, Control Systems, Power Electronics, Microcontrollers, and Anna University syllabus patterns.',
        accent: '#c084fc',
        kpi: 'Instant Doubt Resolver',
        badge: 'Neural AI Core'
    },
    {
        tag: 'BIOMETRIC DIGITAL IDENTITY',
        title: 'Smart Student Pass & Credentials Vault',
        desc: 'Holographic smart ID card with scannable QR verification code for laboratory computers, gate passes, and semester exam hall clearances.',
        accent: '#fcd34d',
        kpi: 'ISO 9001:2015',
        badge: 'Smart Pass Passcode'
    },
    {
        tag: 'ELECTRICAL & IT RECRUITMENT',
        title: 'Career & Placement Roadmaps',
        desc: 'Structured learning tracks for Core Electrical engineering, Embedded Systems, EV Powertrain technology, GATE examinations, and Tier-1 software company placements.',
        accent: '#f472b6',
        kpi: 'Tier-1 Core Roadmaps',
        badge: 'Core & IT Placements'
    }
];

export const DesktopLandingPage = ({ onOpenLogin }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [timeString, setTimeString] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateTime();
        const t = setInterval(updateTime, 1000);
        return () => clearInterval(t);
    }, []);

    // 5-second automatic rotation
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide(prev => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    };

    const slide = HERO_SLIDES[currentSlide];

    return (
        _jsxs("div", { 
            className: "desktop-nextgen-landing",
            onMouseEnter: () => setIsPaused(true),
            onMouseLeave: () => setIsPaused(false),
            style: {
                minHeight: '100vh',
                width: '100vw',
                background: 'radial-gradient(ellipse at 50% 0%, #0f172a 0%, #020617 65%, #000000 100%)',
                color: '#ffffff',
                position: 'relative',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            },
            children: [
                // ── AMBIENT NEURAL BACKGROUND MESH & LIGHT BEAMS ──
                _jsx("div", { 
                    style: {
                        position: 'absolute',
                        top: '-15%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '85vw',
                        height: '550px',
                        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.18) 0%, rgba(37, 99, 235, 0.08) 45%, transparent 70%)',
                        filter: 'blur(80px)',
                        pointerEvents: 'none',
                        zIndex: 0
                    } 
                }),
                _jsx("div", { 
                    style: {
                        position: 'absolute',
                        bottom: '5%',
                        right: '-10%',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
                        filter: 'blur(90px)',
                        pointerEvents: 'none',
                        zIndex: 0
                    } 
                }),
                _jsx("div", { 
                    style: {
                        position: 'absolute',
                        bottom: '10%',
                        left: '-10%',
                        width: '450px',
                        height: '450px',
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
                        filter: 'blur(90px)',
                        pointerEvents: 'none',
                        zIndex: 0
                    } 
                }),

                // ── 1. LUXURY VISIONOS TOP NAVIGATION PILL ──
                _jsx("header", { 
                    style: {
                        position: 'sticky',
                        top: 20,
                        zIndex: 1000,
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '0 24px'
                    },
                    children: _jsxs("nav", { 
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 20,
                            padding: '8px 14px 8px 18px',
                            background: 'rgba(15, 23, 42, 0.75)',
                            backdropFilter: 'blur(30px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                            border: '1.5px solid rgba(255, 255, 255, 0.14)',
                            borderRadius: 999,
                            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45), 0 0 25px rgba(56, 189, 248, 0.15)'
                        },
                        children: [
                            // Brand Mark
                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10, paddingRight: 10, borderRight: '1px solid rgba(255,255,255,0.14)' }, children: [
                                _jsx("div", { 
                                    style: { 
                                        width: 32, 
                                        height: 32, 
                                        borderRadius: 10, 
                                        overflow: 'hidden', 
                                        background: 'rgba(255,255,255,0.1)', 
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)' 
                                    }, 
                                    children: _jsx("img", { src: appLogo, alt: "Logo", style: { width: '100%', height: '100%', objectFit: 'cover' } }) 
                                }),
                                _jsxs("div", { children: [
                                    _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#ffffff', letterSpacing: -0.3, display: 'block', lineHeight: 1.1 }, children: "Tutor Ward App" }),
                                    _jsx("span", { style: { fontSize: 9.5, fontWeight: 800, color: '#38bdf8', letterSpacing: 0.5, textTransform: 'uppercase' }, children: "SREC EEE Hub" })
                                ] })
                            ] }),

                            // Interactive Slide Jumps
                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 4 }, children: [
                                _jsx("button", {
                                    onClick: () => setCurrentSlide(0),
                                    style: {
                                        padding: '6px 14px',
                                        borderRadius: 99,
                                        border: 'none',
                                        background: currentSlide === 0 ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                                        color: currentSlide === 0 ? '#38bdf8' : '#94a3b8',
                                        fontSize: 12.5,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    },
                                    children: "Attendance Radar"
                                }),
                                _jsx("button", {
                                    onClick: () => setCurrentSlide(1),
                                    style: {
                                        padding: '6px 14px',
                                        borderRadius: 99,
                                        border: 'none',
                                        background: currentSlide === 1 ? 'rgba(74, 222, 128, 0.2)' : 'transparent',
                                        color: currentSlide === 1 ? '#4ade80' : '#94a3b8',
                                        fontSize: 12.5,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    },
                                    children: "Academics Vault"
                                }),
                                _jsx("button", {
                                    onClick: () => setCurrentSlide(2),
                                    style: {
                                        padding: '6px 14px',
                                        borderRadius: 99,
                                        border: 'none',
                                        background: currentSlide === 2 ? 'rgba(192, 132, 252, 0.2)' : 'transparent',
                                        color: currentSlide === 2 ? '#c084fc' : '#94a3b8',
                                        fontSize: 12.5,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    },
                                    children: "AI Neural Tutor"
                                }),
                                _jsx("button", {
                                    onClick: () => setCurrentSlide(3),
                                    style: {
                                        padding: '6px 14px',
                                        borderRadius: 99,
                                        border: 'none',
                                        background: currentSlide === 3 ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                                        color: currentSlide === 3 ? '#fcd34d' : '#94a3b8',
                                        fontSize: 12.5,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    },
                                    children: "Digital Smart Pass"
                                }),
                                _jsx("button", {
                                    onClick: () => setCurrentSlide(4),
                                    style: {
                                        padding: '6px 14px',
                                        borderRadius: 99,
                                        border: 'none',
                                        background: currentSlide === 4 ? 'rgba(244, 114, 182, 0.2)' : 'transparent',
                                        color: currentSlide === 4 ? '#f472b6' : '#94a3b8',
                                        fontSize: 12.5,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    },
                                    children: "Career Tracks"
                                })
                            ] }),

                            // Auth Buttons
                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 10, borderLeft: '1px solid rgba(255,255,255,0.14)' }, children: [
                                _jsxs("button", {
                                    onClick: () => onOpenLogin(false),
                                    style: {
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        padding: '7px 16px',
                                        borderRadius: 99,
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        color: '#ffffff',
                                        fontSize: 12,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    },
                                    children: [_jsx(LogIn, { size: 13 }), " Sign In"]
                                }),
                                _jsxs("button", {
                                    onClick: () => onOpenLogin(true),
                                    style: {
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        padding: '7px 18px',
                                        borderRadius: 99,
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                                        color: '#ffffff',
                                        fontSize: 12,
                                        fontWeight: 900,
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 16px rgba(37, 99, 235, 0.45)',
                                        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    },
                                    children: [_jsx(UserPlus, { size: 13 }), " Register"]
                                })
                            ] })
                        ] 
                    })
                }),

                // ── 2. HERO SHOWCASE & 3D BENTO DOSSIER ──
                _jsx("main", { 
                    style: {
                        position: 'relative',
                        zIndex: 10,
                        maxWidth: 1320,
                        margin: '0 auto',
                        padding: '40px 28px',
                        width: '100%',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    },
                    children: _jsxs("div", { 
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1.1fr 1fr',
                            gap: 40,
                            alignItems: 'center'
                        },
                        children: [
                            // ── LEFT COLUMN: TYPOGRAPHY, STATS & ACTIONS ──
                            _jsxs("div", { 
                                style: { display: 'flex', flexDirection: 'column', gap: 20 },
                                children: [
                                    // Live accreditation tag
                                    _jsxs("div", { 
                                        style: {
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            padding: '6px 14px',
                                            borderRadius: 99,
                                            background: 'rgba(56, 189, 248, 0.1)',
                                            border: '1px solid rgba(56, 189, 248, 0.25)',
                                            width: 'fit-content'
                                        },
                                        children: [
                                            _jsx("span", { style: { width: 8, height: 8, borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 10px #38bdf8' } }),
                                            _jsx("span", { style: { fontSize: 11.5, fontWeight: 900, color: '#38bdf8', letterSpacing: 1, textTransform: 'uppercase' }, children: "SRI RAMAKRISHNA ENGINEERING COLLEGE \u00B7 DEPT OF EEE" })
                                        ] 
                                    }),

                                    // Hero Title
                                    _jsxs("div", { children: [
                                        _jsxs("h1", { 
                                            style: {
                                                fontSize: 54,
                                                fontWeight: 950,
                                                letterSpacing: -1.8,
                                                lineHeight: 1.05,
                                                margin: 0,
                                                background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            },
                                            children: [
                                                "Tutor Ward",
                                                _jsx("span", { 
                                                    style: { 
                                                        background: 'linear-gradient(135deg, #38bdf8 0%, #3b82f6 50%, #8b5cf6 100%)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        display: 'block' 
                                                    }, 
                                                    children: "Operating System" 
                                                })
                                            ]
                                        }),
                                        _jsx("p", { 
                                            style: {
                                                fontSize: 16,
                                                color: '#94a3b8',
                                                lineHeight: 1.6,
                                                maxWidth: 580,
                                                marginTop: 14,
                                                marginBottom: 0
                                            },
                                            children: "Autonomous academic dynamicron for Electrical & Electronics Engineering. Track real-time attendance, simulate CGPA, generate On-Duty letters with digital signatures, and learn with Gemini 2.0 AI."
                                        })
                                    ] }),

                                    // Dynamic slide highlight ticker
                                    _jsxs("div", { 
                                        key: `feature-${currentSlide}`,
                                        style: {
                                            background: 'rgba(15, 23, 42, 0.65)',
                                            backdropFilter: 'blur(20px)',
                                            border: `1.5px solid ${slide.accent}40`,
                                            borderRadius: 20,
                                            padding: '18px 20px',
                                            boxShadow: `0 14px 34px rgba(0, 0, 0, 0.35), 0 0 25px ${slide.accent}15`,
                                            animation: 'pageSlideUpFluid 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                                        },
                                        children: [
                                            _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }, children: [
                                                _jsx("span", { style: { fontSize: 10.5, fontWeight: 900, color: slide.accent, letterSpacing: 1, textTransform: 'uppercase' }, children: slide.tag }),
                                                _jsx("span", { style: { fontSize: 11, fontWeight: 800, background: 'rgba(255,255,255,0.12)', color: '#ffffff', padding: '2px 8px', borderRadius: 6 }, children: slide.kpi })
                                            ] }),
                                            _jsx("h3", { style: { fontSize: 18, fontWeight: 900, color: '#ffffff', margin: '0 0 6px 0' }, children: slide.title }),
                                            _jsx("p", { style: { fontSize: 13, color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.5 }, children: slide.desc })
                                        ]
                                    }),

                                    // Action buttons row
                                    _jsxs("div", { style: { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }, children: [
                                        _jsxs("button", {
                                            onClick: () => onOpenLogin(false),
                                            style: {
                                                padding: '14px 28px',
                                                borderRadius: 16,
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%)',
                                                color: '#ffffff',
                                                fontSize: 14.5,
                                                fontWeight: 900,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                cursor: 'pointer',
                                                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.5)',
                                                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                            },
                                            children: [
                                                "Launch Student Portal",
                                                _jsx(ArrowRight, { size: 16 })
                                            ]
                                        }),
                                        _jsxs("button", {
                                            onClick: () => onOpenLogin(true),
                                            style: {
                                                padding: '14px 24px',
                                                borderRadius: 16,
                                                border: '1.5px solid rgba(255, 255, 255, 0.22)',
                                                background: 'rgba(255, 255, 255, 0.08)',
                                                color: '#ffffff',
                                                fontSize: 14,
                                                fontWeight: 800,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                cursor: 'pointer',
                                                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                            },
                                            children: [
                                                _jsx(UserPlus, { size: 16 }),
                                                " Register Real Account"
                                            ]
                                        }),
                                        _jsxs("a", {
                                            href: "/EEE-SREC-Portal.apk",
                                            download: "EEE-SREC-Portal.apk",
                                            style: {
                                                padding: '14px 20px',
                                                borderRadius: 16,
                                                border: '1px solid rgba(16, 185, 129, 0.35)',
                                                background: 'rgba(16, 185, 129, 0.12)',
                                                color: '#6ee7b7',
                                                fontSize: 13,
                                                fontWeight: 800,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                textDecoration: 'none',
                                                cursor: 'pointer'
                                            },
                                            children: [
                                                _jsx(Download, { size: 15 }),
                                                " Get APK (30 MB)"
                                            ]
                                        })
                                    ] }),

                                    // Quick autofill preview pills
                                    _jsxs("div", { 
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10,
                                            padding: '10px 14px',
                                            borderRadius: 14,
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            width: 'fit-content'
                                        },
                                        children: [
                                            _jsx(Sparkles, { size: 14, style: { color: '#38bdf8' } }),
                                            _jsx("span", { style: { fontSize: 11, color: '#94a3b8', fontWeight: 700 }, children: "Verified Accounts Available: " }),
                                            _jsxs("button", {
                                                onClick: () => onOpenLogin(false),
                                                style: { background: 'none', border: 'none', color: '#93c5fd', fontSize: 11, fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' },
                                                children: ["Student: Nithin Annamalai R (71812503104)"]
                                            }),
                                            _jsx("span", { style: { color: 'rgba(255,255,255,0.2)' }, children: "\u00B7" }),
                                            _jsxs("button", {
                                                onClick: () => onOpenLogin(false),
                                                style: { background: 'none', border: 'none', color: '#fdba74', fontSize: 11, fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' },
                                                children: ["Faculty: Dr. M. Ezhilarasi (HOD)"]
                                            })
                                        ]
                                    })
                                ]
                            }),

                            // ── RIGHT COLUMN: 3D VISIONOS BENTO DOSSIER CARDS ──
                            _jsxs("div", { 
                                style: { 
                                    display: 'grid', 
                                    gridTemplateColumns: '1fr 1fr', 
                                    gap: 16,
                                    position: 'relative'
                                },
                                children: [
                                    // Bento Card 1: Attendance Radar
                                    _jsxs("div", { 
                                        style: {
                                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
                                            borderRadius: 24,
                                            padding: '20px',
                                            border: '1.5px solid rgba(56, 189, 248, 0.3)',
                                            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)',
                                            transition: 'transform 0.3s ease'
                                        },
                                        children: [
                                            _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, children: [
                                                _jsx("div", { style: { width: 36, height: 36, borderRadius: 10, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(Activity, { size: 18 }) }),
                                                _jsx("span", { style: { fontSize: 10, fontWeight: 900, background: 'rgba(16, 185, 129, 0.2)', color: '#4ade80', padding: '2px 8px', borderRadius: 99 }, children: "\u25CF Safe Zone" })
                                            ] }),
                                            _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }, children: "Overall Attendance" }),
                                            _jsx("h2", { style: { fontSize: 32, fontWeight: 900, color: '#ffffff', margin: '4px 0 2px 0', letterSpacing: -1 }, children: "94.5%" }),
                                            _jsx("p", { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: 0 }, children: "Buffer of 18 classes without dropping below 75% cutoff." })
                                        ]
                                    }),

                                    // Bento Card 2: CGPA & Marks
                                    _jsxs("div", { 
                                        style: {
                                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
                                            borderRadius: 24,
                                            padding: '20px',
                                            border: '1.5px solid rgba(74, 222, 128, 0.3)',
                                            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)',
                                            transition: 'transform 0.3s ease'
                                        },
                                        children: [
                                            _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, children: [
                                                _jsx("div", { style: { width: 36, height: 36, borderRadius: 10, background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(GraduationCap, { size: 18 }) }),
                                                _jsx("span", { style: { fontSize: 10, fontWeight: 900, background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', padding: '2px 8px', borderRadius: 99 }, children: "Distinction" })
                                            ] }),
                                            _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }, children: "Target Cumulative CGPA" }),
                                            _jsx("h2", { style: { fontSize: 32, fontWeight: 900, color: '#ffffff', margin: '4px 0 2px 0', letterSpacing: -1 }, children: "8.75" }),
                                            _jsx("p", { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: 0 }, children: "Ranked Top 5% in Section II EEE-B \u00B7 Regulation 2022" })
                                        ]
                                    }),

                                    // Bento Card 3: 24/7 AI Tutor Assistant
                                    _jsxs("div", { 
                                        style: {
                                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
                                            borderRadius: 24,
                                            padding: '20px',
                                            border: '1.5px solid rgba(192, 132, 252, 0.3)',
                                            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)',
                                            gridColumn: 'span 2'
                                        },
                                        children: [
                                            _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }, children: [
                                                _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [
                                                    _jsx("div", { style: { width: 32, height: 32, borderRadius: 8, background: 'rgba(192, 132, 252, 0.2)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(Bot, { size: 16 }) }),
                                                    _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#ffffff' }, children: "Gemini 2.0 Academic Intelligence" })
                                                ] }),
                                                _jsx("span", { style: { fontSize: 10, fontWeight: 800, background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '2px 8px', borderRadius: 99 }, children: "Live Solver" })
                                            ] }),
                                            _jsx("div", { 
                                                style: {
                                                    background: 'rgba(0,0,0,0.3)',
                                                    borderRadius: 12,
                                                    padding: '10px 12px',
                                                    fontSize: 11.5,
                                                    color: '#cbd5e1',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    lineHeight: 1.45
                                                },
                                                children: "\uD83D\uDCAC \"Student asked: How to derive state space model for RLC network? \u2192 Generated step-by-step matrix derivation in 1.2s.\""
                                            })
                                        ]
                                    })
                                ] 
                            })
                        ]
                    })
                }),

                // ── 3. BOTTOM ACCREDITATION STRIP & DEVELOPER FOOTER ──
                _jsxs("footer", { 
                    style: {
                        position: 'relative',
                        zIndex: 10,
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(3, 7, 18, 0.95)',
                        backdropFilter: 'blur(20px)',
                        padding: '18px 32px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 16
                    },
                    children: [
                        // Accreditations
                        _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }, children: [
                            _jsxs("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 800, color: '#4ade80' }, children: [
                                _jsx(ShieldCheck, { size: 13 }), " NAAC A+ Accredited"
                            ] }),
                            _jsxs("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 800, color: '#60a5fa' }, children: [
                                _jsx(ShieldCheck, { size: 13 }), " NBA Tier-1 Approved"
                            ] }),
                            _jsxs("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 800, color: '#c084fc' }, children: [
                                _jsx(Building2, { size: 13 }), " Autonomous \u00B7 Anna University"
                            ] }),
                            _jsxs("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 800, color: '#fcd34d' }, children: [
                                _jsx(Award, { size: 13 }), " ISO 9001:2015"
                            ] })
                        ] }),

                        // Developer Credit & Official Contact
                        _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12, fontSize: 11.5, color: '#94a3b8' }, children: [
                            _jsxs("span", { children: [
                                "Developer: ",
                                _jsx("strong", { style: { color: '#ffffff' }, children: "Nithin Annamalai R" }),
                                " \u00B7 ",
                                _jsx("a", { href: "mailto:tutorwardapp@gmail.com", style: { color: '#38bdf8', textDecoration: 'none', fontWeight: 800 }, children: "tutorwardapp@gmail.com" })
                            ] }),
                            _jsx("span", { style: { color: 'rgba(255,255,255,0.2)' }, children: "|" }),
                            _jsx("span", { style: { color: '#64748b' }, children: "\u00A9 2026 Tutor Ward App \u00B7 SREC EEE" })
                        ] })
                    ]
                })
            ] 
        })
    );
};
