import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { 
    X, Lock, Mail, Eye, EyeOff, UserCheck, CheckCircle2, User, 
    Download, KeyRound, Building2, Sparkles, ArrowRight, ArrowLeft,
    Activity, BookOpen, Bot, Award, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { authService } from '../../services/auth';
import appLogo from '../../assets/app-logo.png';

const MOBILE_AUTH_SLIDES = [
    {
        icon: Activity,
        title: 'Real-Time Attendance Radar',
        desc: 'Hourly tracking & 75% cutoff threshold alert',
        color: '#38bdf8'
    },
    {
        icon: BookOpen,
        title: 'Autonomous Academic Vault',
        desc: 'Syllabi, marksheets & target CGPA planner',
        color: '#4ade80'
    },
    {
        icon: Bot,
        title: 'Gemini 2.0 AI Tutor',
        desc: '24/7 instant engineering doubt solver',
        color: '#c084fc'
    },
    {
        icon: Award,
        title: 'Smart Holographic Pass',
        desc: 'Encrypted QR ID for lab & campus clearance',
        color: '#fcd34d'
    }
];

export const SignInPage = ({ onClose, onLoginSuccess, initialIsSignUp = false }) => {
    const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
    const [signUpStep, setSignUpStep] = useState(1);
    const [currentSlide, setCurrentSlide] = useState(0);
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
    const [forgotSent, setForgotSent] = useState(false);
    const isNative = Capacitor.isNativePlatform();

    // Auto rotate feature slides every 3.8s
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev === MOBILE_AUTH_SLIDES.length - 1 ? 0 : prev + 1));
        }, 3800);
        return () => clearInterval(timer);
    }, []);

    const handleQuickFill = (targetEmail, targetPass) => {
        setEmail(targetEmail);
        setPassword(targetPass);
        setIsSignUp(false);
        setError('');
        setSuccessMsg(`Autofilled ${targetEmail}`);
        setTimeout(() => setSuccessMsg(''), 2200);
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
                setError('Please fill in institutional email and password.');
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
            setError(res.error || 'Invalid credentials. Please verify your email & password.');
        }
        setLoading(false);
    };

    const slide = MOBILE_AUTH_SLIDES[currentSlide];
    const SlideIcon = slide.icon;

    return (
        _jsxs("div", { 
            className: "signin-page-overlay", 
            style: { minHeight: '100vh', background: '#0a0f1d', color: '#ffffff', overflowY: 'auto' },
            children: [
                // ── HEADER WITH BRANDING & FEATURE MINI-SLIDER ──
                _jsxs("div", { 
                    className: "mobile-curved-header", 
                    style: {
                        background: 'radial-gradient(ellipse at top, #1e293b 0%, #0f172a 75%, #020617 100%)',
                        padding: '24px 20px 32px',
                        position: 'relative',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    },
                    children: [
                        _jsxs("div", { className: "mobile-header-nav", style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, children: [
                            onClose && (
                                _jsx("button", { 
                                    className: "signin-back-btn", 
                                    onClick: onClose,
                                    "aria-label": "Close",
                                    style: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
                                    children: _jsx(X, { size: 18 }) 
                                })
                            ),
                            !isNative && (
                                _jsxs("a", { 
                                    href: "/EEE-SREC-Portal.apk", 
                                    download: "EEE-SREC-Portal.apk",
                                    className: "signin-get-started-btn", 
                                    title: "Download Android APK",
                                    style: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 99, background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#6ee7b7', fontSize: 11, fontWeight: 800, textDecoration: 'none' },
                                    children: [
                                        _jsx(Download, { size: 13 }),
                                        _jsx("span", { children: "Get APK" })
                                    ] 
                                })
                            )
                        ] }),

                        _jsxs("div", { className: "mobile-header-title-wrap", style: { textAlign: 'center' }, children: [
                            _jsx("div", { style: { width: 52, height: 52, borderRadius: 16, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.4)', margin: '0 auto 10px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }, children: [
                                _jsx("img", { src: appLogo, alt: "Tutor Ward App Logo", style: { width: '100%', height: '100%', objectFit: 'cover' } })
                            ] }),
                            _jsx("h1", { className: "mobile-header-h1", style: { fontSize: 22, fontWeight: 900, margin: '0 0 2px 0', color: '#ffffff' }, children: isSignUp ? 'Create Real Account' : 'Portal Sign In' }),
                            _jsx("p", { className: "mobile-header-p", style: { fontSize: 12, color: '#38bdf8', margin: 0, fontWeight: 700 }, children: "Tutor Ward App \u00B7 Dept of EEE SREC" })
                        ] }),

                        // ── MINI FEATURE CAROUSEL IN MOBILE HEADER ──
                        _jsxs("div", { 
                            style: {
                                marginTop: 16,
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: `1px solid ${slide.color}40`,
                                borderRadius: 14,
                                padding: '10px 14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                animation: 'pageSlideUpFluid 0.3s ease-out'
                            },
                            children: [
                                _jsx("div", { style: { width: 32, height: 32, borderRadius: 10, background: `${slide.color}25`, color: slide.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }, children: [
                                    _jsx(SlideIcon, { size: 16 })
                                ] }),
                                _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                                    _jsx("div", { style: { fontSize: 12, fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: slide.title }),
                                    _jsx("div", { style: { fontSize: 10.5, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: slide.desc })
                                ] }),
                                _jsx("div", { style: { display: 'flex', gap: 3 }, children: MOBILE_AUTH_SLIDES.map((_, idx) => (
                                    _jsx("span", { 
                                        key: idx, 
                                        style: { width: currentSlide === idx ? 12 : 5, height: 5, borderRadius: 99, background: currentSlide === idx ? slide.color : 'rgba(255,255,255,0.2)', transition: 'all 0.3s ease' } 
                                    }, idx)
                                )) })
                            ]
                        })
                    ] 
                }),

                // ── FORM CONTAINER SHEET ──
                _jsxs("div", { 
                    className: "mobile-form-sheet", 
                    style: { padding: '20px 18px 40px', background: '#0a0f1d' },
                    children: [
                        // Pill Tab Switcher
                        _jsxs("div", { 
                            style: { 
                                display: 'grid', 
                                gridTemplateColumns: '1fr 1fr', 
                                gap: 4, 
                                marginBottom: 14, 
                                background: 'rgba(30, 41, 59, 0.7)', 
                                padding: 4, 
                                borderRadius: 14,
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }, 
                            children: [
                                _jsx("button", {
                                    type: "button",
                                    onClick: () => { setIsSignUp(false); setError(''); },
                                    style: {
                                        padding: '9px 12px',
                                        borderRadius: 10,
                                        border: 'none',
                                        fontSize: 12.5,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        background: !isSignUp ? 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' : 'transparent',
                                        color: !isSignUp ? '#ffffff' : '#94a3b8',
                                        boxShadow: !isSignUp ? '0 4px 12px rgba(37, 99, 235, 0.4)' : 'none',
                                        transition: 'all 0.25s ease'
                                    },
                                    children: "Sign In"
                                }),
                                _jsx("button", {
                                    type: "button",
                                    onClick: () => { setIsSignUp(true); setError(''); setSignUpStep(1); },
                                    style: {
                                        padding: '9px 12px',
                                        borderRadius: 10,
                                        border: 'none',
                                        fontSize: 12.5,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        background: isSignUp ? 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' : 'transparent',
                                        color: isSignUp ? '#ffffff' : '#94a3b8',
                                        boxShadow: isSignUp ? '0 4px 12px rgba(37, 99, 235, 0.4)' : 'none',
                                        transition: 'all 0.25s ease'
                                    },
                                    children: "Register / Sign Up"
                                })
                            ] 
                        }),

                        // In Sign Up: Show Step Indicator
                        isSignUp && (
                            _jsxs("div", { 
                                style: { 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    padding: '8px 12px', 
                                    borderRadius: 12, 
                                    background: 'rgba(255,255,255,0.04)', 
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    marginBottom: 14 
                                },
                                children: [
                                    _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: [
                                        _jsx("span", { style: { width: 18, height: 18, borderRadius: '50%', background: signUpStep === 1 ? '#0284c7' : '#10b981', color: '#fff', fontSize: 10, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: signUpStep === 1 ? '1' : '✓' }),
                                        _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: signUpStep === 1 ? '#ffffff' : '#94a3b8' }, children: "Identity & Role" })
                                    ] }),
                                    _jsx("div", { style: { width: 24, height: 1, background: 'rgba(255,255,255,0.15)' } }),
                                    _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: [
                                        _jsx("span", { style: { width: 18, height: 18, borderRadius: '50%', background: signUpStep === 2 ? '#0284c7' : 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 10, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: '2' }),
                                        _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: signUpStep === 2 ? '#ffffff' : '#94a3b8' }, children: "Security" })
                                    ] })
                                ]
                            })
                        ),

                        // Error and Success Feedback
                        error && (
                            _jsxs("div", { 
                                style: { background: 'rgba(239, 68, 68, 0.16)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '10px 14px', borderRadius: 12, fontSize: 11.5, fontWeight: 700, marginBottom: 12 },
                                children: ["\u26A0\uFE0F ", error] 
                            })
                        ),
                        successMsg && (
                            _jsxs("div", { 
                                style: { background: 'rgba(16, 185, 129, 0.16)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#86efac', padding: '10px 14px', borderRadius: 12, fontSize: 11.5, fontWeight: 700, marginBottom: 12 },
                                children: ["\u2705 ", successMsg] 
                            })
                        ),
                        forgotSent && (
                            _jsxs("div", { 
                                style: { background: 'rgba(56, 189, 248, 0.16)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#7dd3fc', padding: '10px 14px', borderRadius: 12, fontSize: 11.5, fontWeight: 700, marginBottom: 12 },
                                children: [_jsx(CheckCircle2, { size: 14 }), " Password reset link sent to institutional email!"] 
                            })
                        ),

                        // ── FORM ──
                        _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: 11 }, children: [
                            // SIGN UP STEP 1
                            isSignUp && signUpStep === 1 && (
                                _jsxs(_Fragment, { children: [
                                    _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }, children: [
                                        _jsxs("button", {
                                            type: "button",
                                            onClick: () => setRole('student'),
                                            style: {
                                                padding: '9px 12px',
                                                borderRadius: 10,
                                                border: `1.5px solid ${role === 'student' ? '#38bdf8' : 'rgba(255,255,255,0.12)'}`,
                                                background: role === 'student' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.04)',
                                                fontSize: 12,
                                                fontWeight: 800,
                                                color: '#ffffff',
                                                cursor: 'pointer'
                                            },
                                            children: ["\uD83C\uDF93 Student"]
                                        }),
                                        _jsxs("button", {
                                            type: "button",
                                            onClick: () => setRole('teacher'),
                                            style: {
                                                padding: '9px 12px',
                                                borderRadius: 10,
                                                border: `1.5px solid ${role === 'teacher' ? '#fb923c' : 'rgba(255,255,255,0.12)'}`,
                                                background: role === 'teacher' ? 'rgba(251, 146, 60, 0.2)' : 'rgba(255,255,255,0.04)',
                                                fontSize: 12,
                                                fontWeight: 800,
                                                color: '#ffffff',
                                                cursor: 'pointer'
                                            },
                                            children: ["\uD83D\uDC68\u200D\uD83C\uDFEB Faculty"]
                                        })
                                    ] }),
                                    _jsxs("div", { style: { position: 'relative', display: 'flex', alignItems: 'center' }, children: [
                                        _jsx(User, { size: 16, style: { position: 'absolute', left: 12, color: '#94a3b8' } }),
                                        _jsx("input", { type: "text", placeholder: "Full Name (e.g. Nithin Annamalai R)", value: name, onChange: e => setName(e.target.value), required: true, style: { width: '100%', padding: '10px 12px 10px 36px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13 } })
                                    ] }),
                                    _jsxs("div", { style: { position: 'relative', display: 'flex', alignItems: 'center' }, children: [
                                        _jsx(UserCheck, { size: 16, style: { position: 'absolute', left: 12, color: '#94a3b8' } }),
                                        _jsx("input", { type: "text", placeholder: role === 'teacher' ? "Staff ID (e.g. FAC-EEE-001)" : "Roll Number (e.g. 71812503104)", value: rollNo, onChange: e => setRollNo(e.target.value), required: true, style: { width: '100%', padding: '10px 12px 10px 36px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13 } })
                                    ] }),
                                    _jsx("button", {
                                        type: "button",
                                        onClick: () => {
                                            if (!name.trim() || !rollNo.trim()) {
                                                setError('Please enter your full name and roll number / staff ID.');
                                                return;
                                            }
                                            setError('');
                                            setSignUpStep(2);
                                        },
                                        style: { padding: '12px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', color: '#fff', fontSize: 13, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4 },
                                        children: ["Continue to Security", _jsx(ArrowRight, { size: 15 })]
                                    })
                                ] })
                            ),

                            // SIGN UP STEP 2 OR SIGN IN
                            (!isSignUp || signUpStep === 2) && (
                                _jsxs(_Fragment, { children: [
                                    _jsxs("div", { style: { position: 'relative', display: 'flex', alignItems: 'center' }, children: [
                                        _jsx(Mail, { size: 16, style: { position: 'absolute', left: 12, color: '#94a3b8' } }),
                                        _jsx("input", { type: "email", placeholder: "Institutional Email (e.g. nithin@srec.ac.in)", value: email, onChange: e => setEmail(e.target.value), required: true, style: { width: '100%', padding: '10px 12px 10px 36px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13 } })
                                    ] }),
                                    _jsxs("div", { style: { position: 'relative', display: 'flex', alignItems: 'center' }, children: [
                                        _jsx(Lock, { size: 16, style: { position: 'absolute', left: 12, color: '#94a3b8' } }),
                                        _jsx("input", { type: showPassword ? 'text' : 'password', placeholder: "Password (Min. 6 chars)", value: password, onChange: e => setPassword(e.target.value), required: true, style: { width: '100%', padding: '10px 36px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13 } }),
                                        _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), style: { position: 'absolute', right: 10, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 4 }, children: showPassword ? _jsx(EyeOff, { size: 15 }) : _jsx(Eye, { size: 15 }) })
                                    ] }),
                                    isSignUp && (
                                        _jsxs("div", { style: { position: 'relative', display: 'flex', alignItems: 'center' }, children: [
                                            _jsx(KeyRound, { size: 16, style: { position: 'absolute', left: 12, color: '#94a3b8' } }),
                                            _jsx("input", { type: showPassword ? 'text' : 'password', placeholder: "Confirm Password", value: confirmPassword, onChange: e => setConfirmPassword(e.target.value), required: true, style: { width: '100%', padding: '10px 12px 10px 36px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13 } })
                                        ] })
                                    ),
                                    !isSignUp && (
                                        _jsx("div", { style: { textAlign: 'right', marginTop: -4 }, children: [
                                            _jsx("button", { type: "button", onClick: () => setForgotSent(true), style: { background: 'none', border: 'none', color: '#38bdf8', fontSize: 11, fontWeight: 700, cursor: 'pointer' }, children: "Forgot password?" })
                                        ] })
                                    ),
                                    _jsxs("div", { style: { display: 'flex', gap: 8, marginTop: 4 }, children: [
                                        isSignUp && signUpStep === 2 && (
                                            _jsxs("button", {
                                                type: "button",
                                                onClick: () => { setSignUpStep(1); setError(''); },
                                                style: { padding: '12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 12.5, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 },
                                                children: [_jsx(ArrowLeft, { size: 14 }), " Back"]
                                            })
                                        ),
                                        _jsxs("button", { 
                                            type: "submit", 
                                            disabled: loading, 
                                            style: { flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', color: '#fff', fontSize: 13, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)' },
                                            children: [
                                                loading ? 'Authenticating...' : isSignUp ? 'Complete Registration' : 'Sign In to Portal',
                                                _jsx(ArrowRight, { size: 15 })
                                            ] 
                                        })
                                    ] })
                                ] })
                            )
                        ] }),

                        // ── 1-TAP VERIFIED ACCOUNTS QUICKFILL ──
                        _jsxs("div", { style: { marginTop: 22, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }, children: [
                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 10 }, children: [
                                _jsx(Sparkles, { size: 12, style: { color: '#38bdf8' } }),
                                _jsx("span", { style: { fontSize: 10.5, fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: 0.8 }, children: "Verified College Accounts (1-Tap Autofill)" })
                            ] }),
                            _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }, children: [
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => handleQuickFill('nithin@srec.ac.in', 'Password@123'),
                                    style: {
                                        background: 'rgba(37, 99, 235, 0.16)',
                                        border: '1px solid rgba(59, 130, 246, 0.4)',
                                        borderRadius: 12,
                                        padding: '9px 10px',
                                        textAlign: 'left',
                                        cursor: 'pointer'
                                    },
                                    children: [
                                        _jsx("div", { style: { fontSize: 11, fontWeight: 900, color: '#93c5fd' }, children: "\uD83C\uDF93 Student: Nithin" }),
                                        _jsx("div", { style: { fontSize: 9.5, color: 'rgba(255,255,255,0.7)', marginTop: 2 }, children: "nithin@srec.ac.in" })
                                    ]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => handleQuickFill('hod.eee@srec.ac.in', 'Faculty@123'),
                                    style: {
                                        background: 'rgba(234, 88, 12, 0.16)',
                                        border: '1px solid rgba(249, 115, 22, 0.4)',
                                        borderRadius: 12,
                                        padding: '9px 10px',
                                        textAlign: 'left',
                                        cursor: 'pointer'
                                    },
                                    children: [
                                        _jsx("div", { style: { fontSize: 11, fontWeight: 900, color: '#fdba74' }, children: "\uD83D\uDC68\u200D\uD83C\uDFEB Dr. Ezhilarasi" }),
                                        _jsx("div", { style: { fontSize: 9.5, color: 'rgba(255,255,255,0.7)', marginTop: 2 }, children: "hod.eee@srec.ac.in" })
                                    ]
                                })
                            ] }),
                            _jsxs("div", { style: { textAlign: 'center', marginTop: 16, fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }, children: [
                                "Developer: Nithin Annamalai R \u00B7 ",
                                _jsx("a", { href: "mailto:tutorwardapp@gmail.com", style: { color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }, children: "tutorwardapp@gmail.com" })
                            ] })
                        ] })
                    ] 
                })
            ] 
        })
    );
};