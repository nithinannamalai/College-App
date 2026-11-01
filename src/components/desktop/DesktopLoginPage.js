import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { 
    X, Lock, Mail, Eye, EyeOff, Sparkles, UserCheck, User, ArrowLeft, 
    ShieldCheck, ArrowRight, UserPlus, LogIn, KeyRound, Building2, 
    ChevronLeft, ChevronRight, Activity, BookOpen, Bot, Award, Briefcase, 
    CheckCircle2, Shield, Compass, FileCheck
} from 'lucide-react';
import { authService } from '../../services/auth';
import appLogo from '../../assets/app-logo.png';

const FEATURE_SLIDES = [
    {
        icon: Activity,
        badge: 'Attendance & OD Radar',
        color: '#38bdf8',
        gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)',
        border: 'rgba(56, 189, 248, 0.35)',
        title: 'Real-Time Attendance Radar',
        desc: 'Instant hourly subject analytics, 75% cutoff threshold calculations, and 1-click On-Duty PDF generation with verified digital tutor endorsements.',
        stat: '94.5% Safe Zone',
        subtext: 'Zero-lag hourly synchronization'
    },
    {
        icon: BookOpen,
        badge: 'Curriculum & Syllabi',
        color: '#4ade80',
        gradient: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%)',
        border: 'rgba(74, 222, 128, 0.35)',
        title: 'Autonomous Academic Dossier',
        desc: 'Direct repository for CBCS Regulation 2022 syllabi, previous semester question archives, laboratory manuals, and internal mark forecasting.',
        stat: 'Regulation 2022',
        subtext: 'Verified Anna University archive'
    },
    {
        icon: Bot,
        badge: 'Gemini 2.0 AI Tutor',
        color: '#c084fc',
        gradient: 'linear-gradient(135deg, rgba(192, 132, 252, 0.2) 0%, rgba(124, 58, 237, 0.1) 100%)',
        border: 'rgba(192, 132, 252, 0.35)',
        title: '24/7 Neural Engineering Tutor',
        desc: 'Dedicated AI assistant trained on Circuit Theory, Linear Integrated Circuits, Power Systems, Microprocessors, and electrical derivations.',
        stat: 'Instant Doubt Resolver',
        subtext: 'Trained on SREC Department curriculum'
    },
    {
        icon: Award,
        badge: 'Digital Identity Pass',
        color: '#fcd34d',
        gradient: 'linear-gradient(135deg, rgba(252, 211, 77, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%)',
        border: 'rgba(252, 211, 77, 0.35)',
        title: 'Smart Student Holographic Pass',
        desc: 'Encrypted digital ID card with active laser scanline QR verification for laboratory entry, gate clearances, and library terminal access.',
        stat: 'ISO 9001:2015',
        subtext: 'Encrypted institutional credentials'
    },
    {
        icon: Briefcase,
        badge: 'Placements & Roadmaps',
        color: '#f472b6',
        gradient: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2) 0%, rgba(219, 39, 119, 0.1) 100%)',
        border: 'rgba(244, 114, 182, 0.35)',
        title: 'Core & IT Placement Pathways',
        desc: 'Industry-curated learning paths for Embedded Systems, EV Powertrains, Renewable Energy, GATE EEE, and Tier-1 IT software interviews.',
        stat: 'Tier-1 Core Roadmaps',
        subtext: 'Direct alumni mentorship links'
    }
];

export const DesktopLoginPage = ({ onClose, onLoginSuccess, initialIsSignUp = false }) => {
    const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
    const [signUpStep, setSignUpStep] = useState(1); // 1 = Identity, 2 = Security
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [role, setRole] = useState('student');
    const [className, setClassName] = useState('II EEE-B');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    // Auto rotate feature slider every 4.5 seconds
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev === FEATURE_SLIDES.length - 1 ? 0 : prev + 1));
        }, 4500);
        return () => clearInterval(timer);
    }, [isPaused]);

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? FEATURE_SLIDES.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide(prev => (prev === FEATURE_SLIDES.length - 1 ? 0 : prev + 1));
    };

    const handleQuickFill = (targetEmail, targetPass) => {
        setEmail(targetEmail);
        setPassword(targetPass);
        setIsSignUp(false);
        setError('');
        setSuccessMsg(`Autofilled credentials for ${targetEmail}`);
        setTimeout(() => setSuccessMsg(''), 2500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (isSignUp) {
            if (signUpStep === 1) {
                if (!name.trim() || !rollNo.trim()) {
                    setError('Please enter your full name and roll number / staff ID.');
                    return;
                }
                setSignUpStep(2);
                return;
            }

            if (!email.trim() || !password.trim()) {
                setError('Please provide institutional email and password.');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match. Please verify.');
                return;
            }
            if (password.length < 6) {
                setError('Password must contain at least 6 characters.');
                return;
            }

            setLoading(true);
            const res = await authService.signUp({
                name,
                email,
                rollNo: rollNo || (role === 'teacher' ? 'FAC-EEE-NEW' : '71812503999'),
                role,
                className: role === 'teacher' ? 'Staff Portal' : className,
                yearOfStudy: role === 'teacher' ? 'Faculty' : '2nd Year',
                password
            });
            if (res.success) {
                onLoginSuccess(res.user);
            } else {
                setError(res.error || 'Failed to register account.');
            }
            setLoading(false);
            return;
        }

        // SIGN IN
        if (!email.trim() || !password.trim()) {
            setError('Please enter your email and password.');
            return;
        }

        setLoading(true);
        const res = await authService.signIn(email, password);
        if (res.success) {
            onLoginSuccess(res.user);
        } else {
            setError(res.error || 'Authentication failed. Please verify credentials.');
        }
        setLoading(false);
    };

    const slide = FEATURE_SLIDES[currentSlide];
    const SlideIcon = slide.icon;

    return (
        _jsx("div", { 
            className: "cosmic-login-fullscreen",
            style: {
                background: 'radial-gradient(circle at 15% 15%, #0f172a 0%, #030712 65%, #000000 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                overflowY: 'auto'
            },
            children: [
                // ── AMBIENT NEON GLOW ORBS ──
                _jsx("div", { 
                    style: {
                        position: 'absolute',
                        top: '10%',
                        left: '12%',
                        width: '420px',
                        height: '420px',
                        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.18) 0%, transparent 70%)',
                        filter: 'blur(70px)',
                        pointerEvents: 'none'
                    }
                }),
                _jsx("div", { 
                    style: {
                        position: 'absolute',
                        bottom: '10%',
                        right: '12%',
                        width: '450px',
                        height: '450px',
                        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.16) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        pointerEvents: 'none'
                    }
                }),

                // ── MAIN SPLIT DIALOG CARD ──
                _jsxs("div", { 
                    className: "cosmic-login-card",
                    style: {
                        width: '100%',
                        maxWidth: 1060,
                        borderRadius: 32,
                        background: 'rgba(15, 23, 42, 0.88)',
                        backdropFilter: 'blur(36px) saturate(210%)',
                        WebkitBackdropFilter: 'blur(36px) saturate(210%)',
                        border: '1.5px solid rgba(255, 255, 255, 0.16)',
                        boxShadow: '0 32px 80px rgba(0, 0, 0, 0.7), 0 0 45px rgba(56, 189, 248, 0.16)',
                        display: 'grid',
                        gridTemplateColumns: '1.18fr 1fr',
                        overflow: 'hidden',
                        position: 'relative',
                        zIndex: 2,
                        animation: 'modalCardPop 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                    },
                    children: [
                        // ── LEFT PANEL: INTERACTIVE FEATURE CAROUSEL & ACCREDITATION ──
                        _jsxs("div", { 
                            className: "cosmic-login-left",
                            onMouseEnter: () => setIsPaused(true),
                            onMouseLeave: () => setIsPaused(false),
                            style: {
                                padding: '36px 32px',
                                background: 'linear-gradient(165deg, rgba(30, 41, 59, 0.75) 0%, rgba(15, 23, 42, 0.95) 100%)',
                                borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative'
                            },
                            children: [
                                _jsxs("div", { children: [
                                    // Top Portal Navigation Pill
                                    _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [
                                        _jsxs("button", { 
                                            className: "cosmic-back-btn", 
                                            onClick: onClose,
                                            style: {
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                padding: '7px 14px',
                                                borderRadius: 99,
                                                background: 'rgba(255, 255, 255, 0.08)',
                                                border: '1px solid rgba(255, 255, 255, 0.16)',
                                                color: '#ffffff',
                                                fontSize: 12,
                                                fontWeight: 800,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            },
                                            children: [
                                                _jsx(ArrowLeft, { size: 14 }),
                                                " Back to Campus Portal"
                                            ] 
                                        }),
                                        _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 99, background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)' }, children: [
                                            _jsx("span", { style: { width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' } }),
                                            _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#6ee7b7' }, children: "Campus Systems Live" })
                                        ] })
                                    ] }),

                                    // Brand Title Block
                                    _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 14, marginTop: 22, marginBottom: 20 }, children: [
                                        _jsx("div", { 
                                            style: {
                                                width: 50,
                                                height: 50,
                                                borderRadius: 16,
                                                overflow: 'hidden',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                                                flexShrink: 0
                                            },
                                            children: _jsx("img", { src: appLogo, alt: "Logo", style: { width: '100%', height: '100%', objectFit: 'cover' } })
                                        }),
                                        _jsxs("div", { children: [
                                            _jsx("h2", { style: { fontSize: 22, fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: -0.4 }, children: "Tutor Ward App" }),
                                            _jsx("p", { style: { fontSize: 12, color: '#38bdf8', margin: '2px 0 0 0', fontWeight: 800 }, children: "Sri Ramakrishna Eng. College \u00B7 Dept of EEE" })
                                        ] })
                                    ] }),

                                    // ── DYNAMIC FEATURE SLIDER CARD ──
                                    _jsxs("div", { 
                                        key: `slide-${currentSlide}`,
                                        style: {
                                            background: slide.gradient,
                                            border: `1.5px solid ${slide.border}`,
                                            borderRadius: 22,
                                            padding: '22px 20px',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            boxShadow: `0 16px 36px rgba(0, 0, 0, 0.35), 0 0 24px ${slide.color}20`,
                                            animation: 'pageSlideUpFluid 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                                        },
                                        children: [
                                            _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, children: [
                                                _jsxs("div", { style: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 99, background: 'rgba(0,0,0,0.3)', border: `1px solid ${slide.color}50` }, children: [
                                                    _jsx(SlideIcon, { size: 13, style: { color: slide.color } }),
                                                    _jsx("span", { style: { fontSize: 11, fontWeight: 900, color: slide.color, letterSpacing: 0.5, textTransform: 'uppercase' }, children: slide.badge })
                                                ] }),
                                                _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#ffffff', background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 6 }, children: slide.stat })
                                            ] }),
                                            _jsx("h3", { style: { fontSize: 17, fontWeight: 900, color: '#ffffff', margin: '0 0 6px 0', letterSpacing: -0.2 }, children: slide.title }),
                                            _jsx("p", { style: { fontSize: 12, color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.55, margin: '0 0 10px 0' }, children: slide.desc }),
                                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: [
                                                _jsx(Sparkles, { size: 12, style: { color: slide.color } }),
                                                _jsx("span", { style: { fontSize: 10.5, fontWeight: 700, color: slide.color }, children: slide.subtext })
                                            ] })
                                        ]
                                    }),

                                    // SLIDER CONTROLS & DOTS
                                    _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }, children: [
                                        _jsx("div", { style: { display: 'flex', gap: 6, alignItems: 'center' }, children: FEATURE_SLIDES.map((_, idx) => (
                                            _jsx("button", {
                                                key: idx,
                                                onClick: () => setCurrentSlide(idx),
                                                style: {
                                                    width: currentSlide === idx ? 24 : 7,
                                                    height: 7,
                                                    borderRadius: 99,
                                                    background: currentSlide === idx ? '#38bdf8' : 'rgba(255, 255, 255, 0.25)',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                                    padding: 0
                                                }
                                            }, idx)
                                        )) }),
                                        _jsxs("div", { style: { display: 'flex', gap: 6 }, children: [
                                            _jsx("button", {
                                                onClick: prevSlide,
                                                "aria-label": "Previous Slide",
                                                style: { width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
                                                children: _jsx(ChevronLeft, { size: 14 })
                                            }),
                                            _jsx("button", {
                                                onClick: nextSlide,
                                                "aria-label": "Next Slide",
                                                style: { width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
                                                children: _jsx(ChevronRight, { size: 14 })
                                            })
                                        ] })
                                    ] })
                                ] }),

                                // ── QUICK FILL REAL ACCOUNTS & INSTITUTIONAL ACCREDITATIONS ──
                                _jsxs("div", { style: { marginTop: 20 }, children: [
                                    _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }, children: [
                                        _jsx(Sparkles, { size: 13, style: { color: '#38bdf8' } }),
                                        _jsx("span", { style: { fontSize: 11, fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: 0.8 }, children: "Verified College Accounts (1-Tap Autofill)" })
                                    ] }),
                                    _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }, children: [
                                        _jsxs("div", { 
                                            onClick: () => handleQuickFill('nithin@srec.ac.in', 'Password@123'),
                                            style: {
                                                background: 'rgba(37, 99, 235, 0.16)',
                                                border: '1px solid rgba(59, 130, 246, 0.45)',
                                                borderRadius: 14,
                                                padding: '9px 12px',
                                                cursor: 'pointer',
                                                transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                            },
                                            onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-2px)',
                                            onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                                            children: [
                                                _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }, children: [
                                                    _jsx("span", { style: { fontSize: 11.5, fontWeight: 900, color: '#93c5fd' }, children: "\uD83C\uDF93 Student: Nithin" }),
                                                    _jsx("span", { style: { fontSize: 9, fontWeight: 900, background: '#2563eb', color: '#fff', padding: '1px 5px', borderRadius: 4 }, children: "FILL" })
                                                ] }),
                                                _jsx("span", { style: { fontSize: 10, color: 'rgba(255,255,255,0.7)', display: 'block' }, children: "nithin@srec.ac.in" })
                                            ]
                                        }),
                                        _jsxs("div", { 
                                            onClick: () => handleQuickFill('hod.eee@srec.ac.in', 'Faculty@123'),
                                            style: {
                                                background: 'rgba(234, 88, 12, 0.16)',
                                                border: '1px solid rgba(249, 115, 22, 0.45)',
                                                borderRadius: 14,
                                                padding: '9px 12px',
                                                cursor: 'pointer',
                                                transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                            },
                                            onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-2px)',
                                            onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                                            children: [
                                                _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }, children: [
                                                    _jsx("span", { style: { fontSize: 11.5, fontWeight: 900, color: '#fdba74' }, children: "\uD83D\uDC68\u200D\uD83C\uDFEB Dr. Ezhilarasi (HOD)" }),
                                                    _jsx("span", { style: { fontSize: 9, fontWeight: 900, background: '#ea580c', color: '#fff', padding: '1px 5px', borderRadius: 4 }, children: "FILL" })
                                                ] }),
                                                _jsx("span", { style: { fontSize: 10, color: 'rgba(255,255,255,0.7)', display: 'block' }, children: "hod.eee@srec.ac.in" })
                                            ]
                                        })
                                    ] }),

                                    // Accreditation Badges
                                    _jsxs("div", { style: { display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }, children: [
                                        _jsxs("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 10, fontWeight: 800, color: '#4ade80' }, children: [
                                            _jsx(ShieldCheck, { size: 12 }), " NAAC A+"
                                        ] }),
                                        _jsxs("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 10, fontWeight: 800, color: '#60a5fa' }, children: [
                                            _jsx(ShieldCheck, { size: 12 }), " NBA Accredited"
                                        ] }),
                                        _jsxs("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 10, fontWeight: 800, color: '#c084fc' }, children: [
                                            _jsx(Building2, { size: 12 }), " Anna University"
                                        ] })
                                    ] })
                                ] })
                            ]
                        }),

                        // ── RIGHT PANEL: SLIDING SIGN IN / REGISTER FORM ──
                        _jsxs("div", { 
                            className: "cosmic-login-right",
                            style: {
                                padding: '36px 32px',
                                background: 'rgba(15, 23, 42, 0.95)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                position: 'relative'
                            },
                            children: [
                                // Top close icon
                                _jsx("button", { 
                                    onClick: onClose, 
                                    "aria-label": "Close Modal",
                                    style: {
                                        position: 'absolute',
                                        top: 20,
                                        right: 20,
                                        width: 34,
                                        height: 34,
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        border: '1px solid rgba(255, 255, 255, 0.16)',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    },
                                    children: _jsx(X, { size: 16 }) 
                                }),

                                // Title & Subtitle
                                _jsxs("div", { style: { marginBottom: 18 }, children: [
                                    _jsx("h2", { style: { fontSize: 24, fontWeight: 900, color: '#ffffff', margin: 0 }, children: isSignUp ? 'Register Real Account' : 'Portal Sign In' }),
                                    _jsx("p", { style: { fontSize: 12.5, color: '#94a3b8', margin: '4px 0 0 0', fontWeight: 600 }, children: isSignUp ? 'Create your authorized student or faculty profile' : 'Access your academic radar, timetable & personal dossiers' })
                                ] }),

                                // ── SLIDING TAB PILL SWITCHER ──
                                _jsxs("div", { 
                                    style: {
                                        position: 'relative',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        background: 'rgba(30, 41, 59, 0.7)',
                                        borderRadius: 14,
                                        padding: 4,
                                        marginBottom: 16,
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    },
                                    children: [
                                        _jsx("div", { 
                                            style: {
                                                position: 'absolute',
                                                top: 4,
                                                bottom: 4,
                                                left: isSignUp ? '50%' : '4px',
                                                width: 'calc(50% - 4px)',
                                                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                                                borderRadius: 10,
                                                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                                                transition: 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                                pointerEvents: 'none'
                                            } 
                                        }),
                                        _jsxs("button", { 
                                            type: "button",
                                            onClick: () => { setIsSignUp(false); setError(''); },
                                            style: {
                                                position: 'relative',
                                                zIndex: 2,
                                                padding: '9px 12px',
                                                background: 'none',
                                                border: 'none',
                                                color: !isSignUp ? '#ffffff' : '#94a3b8',
                                                fontWeight: 800,
                                                fontSize: 12.5,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 6,
                                                cursor: 'pointer',
                                                transition: 'color 0.2s ease'
                                            },
                                            children: [_jsx(LogIn, { size: 14 }), " Sign In"] 
                                        }),
                                        _jsxs("button", { 
                                            type: "button",
                                            onClick: () => { setIsSignUp(true); setError(''); setSignUpStep(1); },
                                            style: {
                                                position: 'relative',
                                                zIndex: 2,
                                                padding: '9px 12px',
                                                background: 'none',
                                                border: 'none',
                                                color: isSignUp ? '#ffffff' : '#94a3b8',
                                                fontWeight: 800,
                                                fontSize: 12.5,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 6,
                                                cursor: 'pointer',
                                                transition: 'color 0.2s ease'
                                            },
                                            children: [_jsx(UserPlus, { size: 14 }), " Register / Sign Up"] 
                                        })
                                    ] 
                                }),

                                // In Sign Up: Show 2-Step Progress Indicator
                                isSignUp && (
                                    _jsxs("div", { 
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginBottom: 14,
                                            padding: '8px 12px',
                                            borderRadius: 12,
                                            background: 'rgba(255, 255, 255, 0.04)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)'
                                        },
                                        children: [
                                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: [
                                                _jsx("span", { style: { width: 20, height: 20, borderRadius: '50%', background: signUpStep === 1 ? '#0284c7' : '#10b981', color: '#fff', fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: signUpStep === 1 ? '1' : '✓' }),
                                                _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: signUpStep === 1 ? '#ffffff' : '#94a3b8' }, children: "Identity & Role" })
                                            ] }),
                                            _jsx("div", { style: { width: 30, height: 1, background: 'rgba(255,255,255,0.15)' } }),
                                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: [
                                                _jsx("span", { style: { width: 20, height: 20, borderRadius: '50%', background: signUpStep === 2 ? '#0284c7' : 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: '2' }),
                                                _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: signUpStep === 2 ? '#ffffff' : '#94a3b8' }, children: "Security & Passcode" })
                                            ] })
                                        ]
                                    })
                                ),

                                // Feedback Banners
                                error && (
                                    _jsxs("div", { 
                                        style: { 
                                            background: 'rgba(239, 68, 68, 0.16)', 
                                            border: '1px solid rgba(239, 68, 68, 0.4)', 
                                            color: '#fca5a5', 
                                            padding: '10px 14px', 
                                            borderRadius: 12, 
                                            fontSize: 12, 
                                            fontWeight: 700, 
                                            marginBottom: 12,
                                            animation: 'modalCardPop 0.25s ease-out'
                                        }, 
                                        children: [
                                            "\u26A0\uFE0F ", error
                                        ] 
                                    })
                                ),
                                successMsg && (
                                    _jsxs("div", { 
                                        style: { 
                                            background: 'rgba(16, 185, 129, 0.16)', 
                                            border: '1px solid rgba(16, 185, 129, 0.4)', 
                                            color: '#86efac', 
                                            padding: '10px 14px', 
                                            borderRadius: 12, 
                                            fontSize: 12, 
                                            fontWeight: 700, 
                                            marginBottom: 12,
                                            animation: 'modalCardPop 0.25s ease-out'
                                        }, 
                                        children: [
                                            "\u2705 ", successMsg
                                        ] 
                                    })
                                ),

                                // ── FORM FIELDS ──
                                _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: 11 }, children: [
                                    // REGISTER STEP 1: IDENTITY
                                    isSignUp && signUpStep === 1 && (
                                        _jsxs("div", { 
                                            style: { animation: 'pageSlideUpFluid 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex', flexDirection: 'column', gap: 11 },
                                            children: [
                                                // Role Switcher
                                                _jsxs("div", { children: [
                                                    _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: 4 }, children: "Select Institutional Role" }),
                                                    _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }, children: [
                                                        _jsxs("button", {
                                                            type: "button",
                                                            onClick: () => setRole('student'),
                                                            style: {
                                                                padding: '8px 12px',
                                                                borderRadius: 10,
                                                                border: `1.5px solid ${role === 'student' ? '#38bdf8' : 'rgba(255,255,255,0.12)'}`,
                                                                background: role === 'student' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.04)',
                                                                color: '#ffffff',
                                                                fontSize: 12,
                                                                fontWeight: 800,
                                                                cursor: 'pointer',
                                                                transition: 'all 0.2s ease'
                                                            },
                                                            children: ["\uD83C\uDF93 Student"]
                                                        }),
                                                        _jsxs("button", {
                                                            type: "button",
                                                            onClick: () => setRole('teacher'),
                                                            style: {
                                                                padding: '8px 12px',
                                                                borderRadius: 10,
                                                                border: `1.5px solid ${role === 'teacher' ? '#fb923c' : 'rgba(255,255,255,0.12)'}`,
                                                                background: role === 'teacher' ? 'rgba(251, 146, 60, 0.2)' : 'rgba(255,255,255,0.04)',
                                                                color: '#ffffff',
                                                                fontSize: 12,
                                                                fontWeight: 800,
                                                                cursor: 'pointer',
                                                                transition: 'all 0.2s ease'
                                                            },
                                                            children: ["\uD83D\uDC68\u200D\uD83C\uDFEB Faculty"]
                                                        })
                                                    ] })
                                                ] }),

                                                // Name
                                                _jsxs("div", { children: [
                                                    _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#cbd5e1', display: 'block', marginBottom: 4 }, children: "Full Name *" }),
                                                    _jsxs("div", { style: { position: 'relative', display: 'flex', alignItems: 'center' }, children: [
                                                        _jsx(User, { size: 15, style: { position: 'absolute', left: 12, color: '#94a3b8' } }),
                                                        _jsx("input", { 
                                                            type: "text", 
                                                            className: "cosmic-input", 
                                                            placeholder: "e.g. Nithin Annamalai R", 
                                                            value: name, 
                                                            onChange: e => setName(e.target.value), 
                                                            required: true,
                                                            style: { width: '100%', padding: '10px 12px 10px 36px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13 }
                                                        })
                                                    ] })
                                                ] }),

                                                // Roll No & Class
                                                _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 8 }, children: [
                                                    _jsxs("div", { children: [
                                                        _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#cbd5e1', display: 'block', marginBottom: 4 }, children: role === 'teacher' ? "Staff ID *" : "Roll Number *" }),
                                                        _jsxs("div", { style: { position: 'relative', display: 'flex', alignItems: 'center' }, children: [
                                                            _jsx(UserCheck, { size: 15, style: { position: 'absolute', left: 12, color: '#94a3b8' } }),
                                                            _jsx("input", { 
                                                                type: "text", 
                                                                className: "cosmic-input", 
                                                                placeholder: role === 'teacher' ? "FAC-EEE-001" : "71812503104", 
                                                                value: rollNo, 
                                                                onChange: e => setRollNo(e.target.value), 
                                                                required: true,
                                                                style: { width: '100%', padding: '10px 12px 10px 36px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13 }
                                                            })
                                                        ] })
                                                    ] }),
                                                    _jsxs("div", { children: [
                                                        _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#cbd5e1', display: 'block', marginBottom: 4 }, children: "Class / Section" }),
                                                        _jsx("input", { 
                                                            type: "text", 
                                                            className: "cosmic-input", 
                                                            placeholder: "II EEE-B", 
                                                            value: className, 
                                                            onChange: e => setClassName(e.target.value),
                                                            style: { width: '100%', padding: '10px 12px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13 }
                                                        })
                                                    ] })
                                                ] })
                                            ]
                                        })
                                    ),

                                    // REGISTER STEP 2: SECURITY & EMAIL (or SIGN IN)
                                    (!isSignUp || signUpStep === 2) && (
                                        _jsxs("div", { 
                                            style: { animation: 'pageSlideUpFluid 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex', flexDirection: 'column', gap: 11 },
                                            children: [
                                                // Email Input
                                                _jsxs("div", { children: [
                                                    _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#cbd5e1', display: 'block', marginBottom: 4 }, children: "Institutional Email *" }),
                                                    _jsxs("div", { style: { position: 'relative', display: 'flex', alignItems: 'center' }, children: [
                                                        _jsx(Mail, { size: 15, style: { position: 'absolute', left: 12, color: '#94a3b8' } }),
                                                        _jsx("input", { 
                                                            type: "email", 
                                                            className: "cosmic-input", 
                                                            placeholder: role === 'teacher' ? "hod.eee@srec.ac.in" : "nithin@srec.ac.in", 
                                                            value: email, 
                                                            onChange: e => setEmail(e.target.value), 
                                                            required: true,
                                                            style: { width: '100%', padding: '10px 12px 10px 36px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13 }
                                                        })
                                                    ] })
                                                ] }),

                                                // Password Input
                                                _jsxs("div", { children: [
                                                    _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#cbd5e1', display: 'block', marginBottom: 4 }, children: "Password *" }),
                                                    _jsxs("div", { style: { position: 'relative', display: 'flex', alignItems: 'center' }, children: [
                                                        _jsx(Lock, { size: 15, style: { position: 'absolute', left: 12, color: '#94a3b8' } }),
                                                        _jsx("input", { 
                                                            type: showPassword ? 'text' : 'password', 
                                                            className: "cosmic-input", 
                                                            placeholder: "Min. 6 characters", 
                                                            value: password, 
                                                            onChange: e => setPassword(e.target.value), 
                                                            required: true,
                                                            style: { width: '100%', padding: '10px 38px 10px 36px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13 }
                                                        }),
                                                        _jsx("button", { 
                                                            type: "button", 
                                                            onClick: () => setShowPassword(!showPassword),
                                                            style: { position: 'absolute', right: 10, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 4 },
                                                            children: showPassword ? _jsx(EyeOff, { size: 15 }) : _jsx(Eye, { size: 15 }) 
                                                        })
                                                    ] })
                                                ] }),

                                                // Confirm Password (Sign Up only)
                                                isSignUp && (
                                                    _jsxs("div", { children: [
                                                        _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#cbd5e1', display: 'block', marginBottom: 4 }, children: "Confirm Password *" }),
                                                        _jsxs("div", { style: { position: 'relative', display: 'flex', alignItems: 'center' }, children: [
                                                            _jsx(KeyRound, { size: 15, style: { position: 'absolute', left: 12, color: '#94a3b8' } }),
                                                            _jsx("input", { 
                                                                type: showPassword ? 'text' : 'password', 
                                                                className: "cosmic-input", 
                                                                placeholder: "Re-enter password", 
                                                                value: confirmPassword, 
                                                                onChange: e => setConfirmPassword(e.target.value), 
                                                                required: true,
                                                                style: { width: '100%', padding: '10px 12px 10px 36px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13 }
                                                            })
                                                        ] })
                                                    ] })
                                                )
                                            ]
                                        })
                                    ),

                                    // Action Buttons: If SignUp Step 1, "Continue to Security ->", else Submit
                                    isSignUp && signUpStep === 1 ? (
                                        _jsxs("button", { 
                                            type: "button", 
                                            onClick: () => {
                                                if (!name.trim() || !rollNo.trim()) {
                                                    setError('Please enter your full name and roll number / staff ID.');
                                                    return;
                                                }
                                                setError('');
                                                setSignUpStep(2);
                                            }, 
                                            style: {
                                                marginTop: 8,
                                                padding: '12px',
                                                borderRadius: 14,
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                                                color: '#ffffff',
                                                fontSize: 13.5,
                                                fontWeight: 900,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 8,
                                                cursor: 'pointer',
                                                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.45)',
                                                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                            },
                                            children: [
                                                "Continue to Security",
                                                _jsx(ArrowRight, { size: 16 })
                                            ] 
                                        })
                                    ) : (
                                        _jsxs("div", { style: { display: 'flex', gap: 8, marginTop: 8 }, children: [
                                            isSignUp && signUpStep === 2 && (
                                                _jsxs("button", { 
                                                    type: "button", 
                                                    onClick: () => { setSignUpStep(1); setError(''); },
                                                    style: {
                                                        padding: '12px 14px',
                                                        borderRadius: 14,
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        background: 'rgba(255, 255, 255, 0.08)',
                                                        color: '#ffffff',
                                                        fontSize: 13,
                                                        fontWeight: 800,
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6
                                                    },
                                                    children: [
                                                        _jsx(ArrowLeft, { size: 15 }),
                                                        " Back"
                                                    ]
                                                })
                                            ),
                                            _jsxs("button", { 
                                                type: "submit", 
                                                disabled: loading, 
                                                style: {
                                                    flex: 1,
                                                    padding: '12px',
                                                    borderRadius: 14,
                                                    border: 'none',
                                                    background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%)',
                                                    color: '#ffffff',
                                                    fontSize: 13.5,
                                                    fontWeight: 900,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: 8,
                                                    cursor: 'pointer',
                                                    boxShadow: '0 8px 24px rgba(37, 99, 235, 0.45)',
                                                    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                                },
                                                onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-2px)',
                                                onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                                                children: [
                                                    loading ? 'Authenticating...' : isSignUp ? 'Complete Registration' : 'Sign In to Portal',
                                                    _jsx(ArrowRight, { size: 16 })
                                                ] 
                                            })
                                        ] })
                                    )
                                ] }),

                                // Bottom footer toggle
                                _jsxs("div", { style: { marginTop: 14, textAlign: 'center' }, children: [
                                    _jsx("button", {
                                        type: "button",
                                        onClick: () => { setIsSignUp(!isSignUp); setError(''); setSignUpStep(1); },
                                        style: { background: 'none', border: 'none', color: '#38bdf8', fontSize: 12, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' },
                                        children: isSignUp ? 'Already registered? Sign In to your account' : 'Need an account? Register new student or staff here'
                                    }),
                                    _jsxs("div", { style: { marginTop: 12, fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }, children: [
                                        "Developer: Nithin Annamalai R \u00B7 ",
                                        _jsx("a", { href: "mailto:tutorwardapp@gmail.com", style: { color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }, children: "tutorwardapp@gmail.com" })
                                    ] })
                                ] })
                            ]
                        })
                    ]
                })
            ]
        })
    );
};