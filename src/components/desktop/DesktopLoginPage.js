import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { 
    X, Lock, Mail, Eye, EyeOff, Sparkles, UserCheck, User, ArrowLeft, 
    ShieldCheck, ArrowRight, UserPlus, LogIn, KeyRound, Building2, 
    ChevronLeft, ChevronRight, Activity, BookOpen, Bot, Award, Briefcase, CheckCircle2
} from 'lucide-react';
import { authService } from '../../services/auth';
import appLogo from '../../assets/app-logo.png';

const FEATURE_SLIDES = [
    {
        icon: Activity,
        badge: 'Attendance & OD Hub',
        color: '#38bdf8',
        gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(37, 99, 235, 0.15) 100%)',
        title: 'Real-Time Attendance Radar',
        desc: 'Track subject-wise hourly attendance, calculate safe cutoff margins, and generate instant On-Duty approvals with printable digital signatures.',
        stat: '94.5% Average Safe Zone'
    },
    {
        icon: BookOpen,
        badge: 'Curriculum & Records',
        color: '#4ade80',
        gradient: 'linear-gradient(135deg, rgba(74, 222, 128, 0.25) 0%, rgba(5, 150, 105, 0.15) 100%)',
        title: 'Autonomous Academic Dossier',
        desc: 'Securely manage semester marksheets, syllabi, university question archives, and simulate internal target CGPA with AI precision.',
        stat: '100% Autonomous Archive'
    },
    {
        icon: Bot,
        badge: 'Gemini AI Assistant',
        color: '#c084fc',
        gradient: 'linear-gradient(135deg, rgba(192, 132, 252, 0.25) 0%, rgba(124, 58, 237, 0.15) 100%)',
        title: '24/7 Neural Academic Tutor',
        desc: 'Deep learning intelligence trained on Circuit Theory, Control Systems, Power Electronics, and SREC department curriculum standards.',
        stat: 'Instant Doubt Resolver'
    },
    {
        icon: Award,
        badge: 'Digital Identity Pass',
        color: '#fcd34d',
        gradient: 'linear-gradient(135deg, rgba(252, 211, 77, 0.25) 0%, rgba(217, 119, 6, 0.15) 100%)',
        title: 'Smart Student ID & Vault',
        desc: 'Holographic smart ID card with scannable QR verification for campus gate access, laboratory computers, and library book checkouts.',
        stat: 'ISO 9001:2015 Verified'
    },
    {
        icon: Briefcase,
        badge: 'Career & Industry Tracks',
        color: '#f472b6',
        gradient: 'linear-gradient(135deg, rgba(244, 114, 182, 0.25) 0%, rgba(219, 39, 119, 0.15) 100%)',
        title: 'Placement & GATE Roadmaps',
        desc: 'Curated technical pathways for Core Electrical, Embedded Systems, EV powertrains, and premier Tier-1 software company recruitments.',
        stat: 'Tier-1 Core Roadmaps'
    }
];

export const DesktopLoginPage = ({ onClose, onLoginSuccess, initialIsSignUp = false }) => {
    const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setLoading(true);

        if (isSignUp) {
            if (!name.trim() || !email.trim() || !password.trim()) {
                setError('Please fill in all required fields.');
                setLoading(false);
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match. Please verify.');
                setLoading(false);
                return;
            }
            if (password.length < 6) {
                setError('Password must contain at least 6 characters.');
                setLoading(false);
                return;
            }
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
            setLoading(false);
            return;
        }

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
                backgroundImage: "linear-gradient(180deg, rgba(3,7,18,0.82) 0%, rgba(3,7,18,0.94) 100%), url('/explorescape/bac-4.png')",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                overflowY: 'auto'
            },
            children: _jsxs("div", { 
                className: "cosmic-login-card",
                style: {
                    width: '100%',
                    maxWidth: 1040,
                    borderRadius: 32,
                    background: 'rgba(15, 23, 42, 0.88)',
                    backdropFilter: 'blur(32px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(32px) saturate(200%)',
                    border: '1.5px solid rgba(255, 255, 255, 0.16)',
                    boxShadow: '0 32px 80px rgba(0, 0, 0, 0.65), 0 0 40px rgba(56, 189, 248, 0.15)',
                    display: 'grid',
                    gridTemplateColumns: '1.15fr 1fr',
                    overflow: 'hidden',
                    position: 'relative'
                },
                children: [
                    // ── LEFT PANEL: INTERACTIVE FEATURE SLIDER & BRANDING ──
                    _jsxs("div", { 
                        className: "cosmic-login-left",
                        onMouseEnter: () => setIsPaused(true),
                        onMouseLeave: () => setIsPaused(false),
                        style: {
                            padding: '36px 32px',
                            background: 'linear-gradient(165deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)',
                            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            position: 'relative'
                        },
                        children: [
                            // Header bar
                            _jsxs("div", { children: [
                                _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [
                                    _jsxs("button", { 
                                        className: "cosmic-back-btn", 
                                        onClick: onClose,
                                        style: {
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            padding: '8px 14px',
                                            borderRadius: 99,
                                            background: 'rgba(255, 255, 255, 0.08)',
                                            border: '1px solid rgba(255, 255, 255, 0.15)',
                                            color: '#ffffff',
                                            fontSize: 12,
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        },
                                        children: [
                                            _jsx(ArrowLeft, { size: 14 }),
                                            " ExploreScape Landing"
                                        ] 
                                    }),
                                    _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: [
                                        _jsx("span", { style: { width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 10px #10b981' } }),
                                        _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#94a3b8' }, children: "Systems Live" })
                                    ] })
                                ] }),
                                
                                // Brand Title
                                _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 14, marginTop: 24, marginBottom: 20 }, children: [
                                    _jsx("div", { 
                                        style: {
                                            width: 52,
                                            height: 52,
                                            borderRadius: 16,
                                            overflow: 'hidden',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1.5px solid rgba(255, 255, 255, 0.25)',
                                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
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
                                        border: `1.5px solid ${slide.color}40`,
                                        borderRadius: 24,
                                        padding: '22px 20px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: `0 16px 36px rgba(0, 0, 0, 0.3), 0 0 24px ${slide.color}20`,
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
                                        _jsx("h3", { style: { fontSize: 17, fontWeight: 900, color: '#ffffff', margin: '0 0 6px 0' }, children: slide.title }),
                                        _jsx("p", { style: { fontSize: 12, color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.55, margin: 0 }, children: slide.desc })
                                    ]
                                }),

                                // SLIDER CONTROLS & DOTS
                                _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }, children: [
                                    _jsx("div", { style: { display: 'flex', gap: 6 }, children: FEATURE_SLIDES.map((_, idx) => (
                                        _jsx("button", {
                                            key: idx,
                                            onClick: () => setCurrentSlide(idx),
                                            style: {
                                                width: currentSlide === idx ? 22 : 7,
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
                                            style: { width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
                                            children: _jsx(ChevronLeft, { size: 14 })
                                        }),
                                        _jsx("button", {
                                            onClick: nextSlide,
                                            style: { width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
                                            children: _jsx(ChevronRight, { size: 14 })
                                        })
                                    ] })
                                ] })
                            ] }),

                            // Quick Fill real accounts & Institutional accreditation badges
                            _jsxs("div", { style: { marginTop: 22 }, children: [
                                _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }, children: [
                                    _jsx(Sparkles, { size: 13, style: { color: '#38bdf8' } }),
                                    _jsx("span", { style: { fontSize: 11, fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: 0.8 }, children: "Verified College Accounts" })
                                ] }),
                                _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }, children: [
                                    _jsxs("div", { 
                                        onClick: () => handleQuickFill('nithin@srec.ac.in', 'Password@123'),
                                        style: {
                                            background: 'rgba(37, 99, 235, 0.16)',
                                            border: '1px solid rgba(59, 130, 246, 0.4)',
                                            borderRadius: 14,
                                            padding: '9px 12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                        },
                                        onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-2px)',
                                        onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                                        children: [
                                            _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }, children: [
                                                _jsx("span", { style: { fontSize: 11, fontWeight: 900, color: '#93c5fd' }, children: "\uD83C\uDF93 Nithin (Student)" }),
                                                _jsx("span", { style: { fontSize: 9, fontWeight: 900, background: '#2563eb', color: '#fff', padding: '1px 5px', borderRadius: 4 }, children: "FILL" })
                                            ] }),
                                            _jsx("span", { style: { fontSize: 10, color: 'rgba(255,255,255,0.7)', display: 'block' }, children: "nithin@srec.ac.in" })
                                        ]
                                    }),
                                    _jsxs("div", { 
                                        onClick: () => handleQuickFill('hod.eee@srec.ac.in', 'Faculty@123'),
                                        style: {
                                            background: 'rgba(234, 88, 12, 0.16)',
                                            border: '1px solid rgba(249, 115, 22, 0.4)',
                                            borderRadius: 14,
                                            padding: '9px 12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                        },
                                        onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-2px)',
                                        onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                                        children: [
                                            _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }, children: [
                                                _jsx("span", { style: { fontSize: 11, fontWeight: 900, color: '#fdba74' }, children: "\uD83D\uDC68\u200D\uD83C\uDFEB Dr. Ezhilarasi" }),
                                                _jsx("span", { style: { fontSize: 9, fontWeight: 900, background: '#ea580c', color: '#fff', padding: '1px 5px', borderRadius: 4 }, children: "FILL" })
                                            ] }),
                                            _jsx("span", { style: { fontSize: 10, color: 'rgba(255,255,255,0.7)', display: 'block' }, children: "hod.eee@srec.ac.in" })
                                        ]
                                    })
                                ] }),

                                // Accreditation Footer Badges
                                _jsxs("div", { style: { display: 'flex', gap: 8, marginTop: 14 }, children: [
                                    _jsxs("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 10, fontWeight: 800, color: '#4ade80' }, children: [
                                        _jsx(ShieldCheck, { size: 12 }), " NAAC A+"
                                    ] }),
                                    _jsxs("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 10, fontWeight: 800, color: '#60a5fa' }, children: [
                                        _jsx(ShieldCheck, { size: 12 }), " NBA Accredited"
                                    ] }),
                                    _jsxs("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 10, fontWeight: 800, color: '#c084fc' }, children: [
                                        _jsx(Building2, { size: 12 }), " Anna Univ"
                                    ] })
                                ] })
                            ] })
                        ]
                    }),

                    // ── RIGHT PANEL: SLIDING SIGN IN / SIGN UP FORM ──
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
                                _jsx("h2", { style: { fontSize: 24, fontWeight: 900, color: '#ffffff', margin: 0 }, children: isSignUp ? 'Create Real Account' : 'Portal Sign In' }),
                                _jsx("p", { style: { fontSize: 12.5, color: '#94a3b8', margin: '4px 0 0 0', fontWeight: 600 }, children: isSignUp ? 'Register as student or faculty member' : 'Access your academic dashboard & personal dossiers' })
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
                                    // Moving glowing slider indicator
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
                                        onClick: () => { setIsSignUp(true); setError(''); },
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

                            // Error & Success Feedback Banners
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

                            // Dynamic Form Content
                            _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: 11 }, children: [
                                isSignUp && (
                                    _jsxs("div", { 
                                        style: { animation: 'pageSlideUpFluid 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex', flexDirection: 'column', gap: 11 },
                                        children: [
                                            // Role Switcher
                                            _jsxs("div", { children: [
                                                _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: 4 }, children: "Account Role" }),
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

                                // Confirm Password
                                isSignUp && (
                                    _jsxs("div", { 
                                        style: { animation: 'pageSlideUpFluid 0.3s cubic-bezier(0.16, 1, 0.3, 1)' },
                                        children: [
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
                                        ]
                                    })
                                ),

                                // Submit Button
                                _jsxs("button", { 
                                    type: "submit", 
                                    disabled: loading, 
                                    style: {
                                        marginTop: 8,
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
                                        " ",
                                        _jsx(ArrowRight, { size: 16 })
                                    ] 
                                })
                            ] }),

                            // Bottom footer toggle
                            _jsx("div", { style: { marginTop: 14, textAlign: 'center' }, children: [
                                _jsx("button", {
                                    type: "button",
                                    onClick: () => { setIsSignUp(!isSignUp); setError(''); },
                                    style: { background: 'none', border: 'none', color: '#38bdf8', fontSize: 12, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' },
                                    children: isSignUp ? 'Already registered? Sign In to your account' : 'Need an account? Register new student or staff here'
                                })
                            ] })
                        ]
                    })
                ]
            })
        })
    );
};
