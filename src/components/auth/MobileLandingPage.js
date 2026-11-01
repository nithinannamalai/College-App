import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { 
    ArrowRight, ShieldCheck, Award, GraduationCap, Zap, UserCheck, 
    FileText, BookOpen, UserPlus, LogIn, ChevronLeft, ChevronRight, 
    Download, Sparkles, Building2, Bot, Layers, Phone
} from 'lucide-react';
import appLogo from '../../assets/app-logo.png';

const MOBILE_SLIDES = [
    {
        icon: Zap,
        badge: 'Attendance & OD',
        color: '#0284c7',
        title: 'Real-Time Attendance Radar',
        desc: 'Hourly subject analytics, safe 75% cutoff calculation, and instant On-Duty PDF requisition generator.',
        stat: '94.5% Average'
    },
    {
        icon: BookOpen,
        badge: 'Academics & Syllabi',
        color: '#16a34a',
        title: 'Autonomous Academic Dossier',
        desc: 'Semester marksheets, university question papers, lab manuals, and target CGPA simulator.',
        stat: 'Regulation 2022'
    },
    {
        icon: Bot,
        badge: 'AI Neural Assistant',
        color: '#7c3aed',
        title: '24/7 Gemini Neural Tutor',
        desc: 'Instant engineering problem solver trained on circuits, control systems, and power engineering.',
        stat: 'Instant Solutions'
    },
    {
        icon: Award,
        badge: 'Digital Identity',
        color: '#d97706',
        title: 'Smart Digital Pass & ID',
        desc: 'Holographic smart ID pass with animated laser QR verification for lab and gate clearance.',
        stat: 'ISO 9001:2015'
    }
];

export const MobileLandingPage = ({ onOpenSignIn }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto rotate slides every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev === MOBILE_SLIDES.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const slide = MOBILE_SLIDES[currentSlide];
    const SlideIcon = slide.icon;

    return (
        _jsxs("div", { 
            className: "mobile-landing-wrapper", 
            style: { minHeight: '100vh', background: '#f8fafc', paddingBottom: 40 },
            children: [
                // ── HERO BANNER WITH EXPLORESCAPE GRAPHIC ──
                _jsxs("div", { 
                    style: {
                        position: 'relative',
                        backgroundImage: "linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.95) 100%), url('/explorescape/bac-4.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: '#ffffff',
                        padding: '36px 20px 48px',
                        borderRadius: '0 0 32px 32px',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                        overflow: 'hidden'
                    },
                    children: [
                        // Ambient glow orbs
                        _jsx("div", { style: { position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)', pointerEvents: 'none' } }),
                        
                        // Top Header Pill
                        _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }, children: [
                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [
                                _jsx("div", { style: { width: 36, height: 36, borderRadius: 10, overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.4)' }, children: [
                                    _jsx("img", { src: appLogo, alt: "Logo", style: { width: '100%', height: '100%', objectFit: 'cover' } })
                                ] }),
                                _jsxs("div", { children: [
                                    _jsx("span", { style: { fontSize: 9.5, fontWeight: 900, color: '#38bdf8', letterSpacing: 1, textTransform: 'uppercase', display: 'block' }, children: "SREC \u00B7 DEPT OF EEE" }),
                                    _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#ffffff', letterSpacing: -0.2 }, children: "Tutor Ward App" })
                                ] })
                            ] }),
                            _jsxs("a", { 
                                href: "/EEE-SREC-Portal.apk", 
                                download: "EEE-SREC-Portal.apk",
                                style: {
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 5,
                                    padding: '5px 10px',
                                    borderRadius: 99,
                                    background: 'rgba(16, 185, 129, 0.25)',
                                    border: '1px solid #10b981',
                                    color: '#6ee7b7',
                                    fontSize: 10.5,
                                    fontWeight: 800,
                                    textDecoration: 'none'
                                },
                                children: [_jsx(Download, { size: 12 }), " APK"]
                            })
                        ] }),

                        // Hero Title
                        _jsx("h1", { style: { fontSize: 26, fontWeight: 900, margin: '0 0 6px 0', letterSpacing: -0.5, lineHeight: 1.2 }, children: "Academic Dynamicron Portal" }),
                        _jsx("p", { style: { fontSize: 12, color: 'rgba(255,255,255,0.85)', margin: '0 0 20px 0', lineHeight: 1.5 }, children: "Real-time attendance radar, target CGPA forecasting, On-Duty letters & 24/7 AI Tutor." }),

                        // Primary Action Buttons
                        _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10 }, children: [
                            _jsxs("button", { 
                                onClick: () => onOpenSignIn(false),
                                style: {
                                    padding: '12px 14px',
                                    borderRadius: 14,
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                                    color: '#ffffff',
                                    fontSize: 13,
                                    fontWeight: 900,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 6,
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.45)'
                                },
                                children: [_jsx(LogIn, { size: 15 }), " Sign In", _jsx(ArrowRight, { size: 15 })]
                            }),
                            _jsxs("button", { 
                                onClick: () => onOpenSignIn(true),
                                style: {
                                    padding: '12px 14px',
                                    borderRadius: 14,
                                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: '#ffffff',
                                    fontSize: 13,
                                    fontWeight: 800,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 6,
                                    cursor: 'pointer'
                                },
                                children: [_jsx(UserPlus, { size: 15 }), " Register"]
                            })
                        ] })
                    ]
                }),

                // ── BODY CONTAINER ──
                _jsxs("div", { style: { padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 16 }, children: [
                    
                    // ── INTERACTIVE FEATURE SLIDER CARD ──
                    _jsxs("div", { 
                        key: `mob-slide-${currentSlide}`,
                        style: {
                            background: '#ffffff',
                            borderRadius: 22,
                            padding: '18px 16px',
                            border: `1.5px solid ${slide.color}35`,
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
                            animation: 'pageSlideUpFluid 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                        },
                        children: [
                            _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }, children: [
                                _jsxs("div", { style: { display: 'inline-flex', alignItems: 'center', gap: 6, background: `${slide.color}15`, padding: '4px 8px', borderRadius: 8 }, children: [
                                    _jsx(SlideIcon, { size: 14, color: slide.color }),
                                    _jsx("span", { style: { fontSize: 10.5, fontWeight: 900, color: slide.color, textTransform: 'uppercase' }, children: slide.badge })
                                ] }),
                                _jsx("span", { style: { fontSize: 10, fontWeight: 800, background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: 6 }, children: slide.stat })
                            ] }),
                            _jsx("h3", { style: { fontSize: 16, fontWeight: 900, color: '#0f172a', margin: '0 0 6px 0' }, children: slide.title }),
                            _jsx("p", { style: { fontSize: 12, color: '#64748b', lineHeight: 1.5, margin: '0 0 12px 0' }, children: slide.desc }),
                            
                            // Dots indicator
                            _jsx("div", { style: { display: 'flex', gap: 6, justifyContent: 'center' }, children: MOBILE_SLIDES.map((_, idx) => (
                                _jsx("button", {
                                    key: idx,
                                    onClick: () => setCurrentSlide(idx),
                                    style: {
                                        width: currentSlide === idx ? 20 : 6,
                                        height: 6,
                                        borderRadius: 99,
                                        background: currentSlide === idx ? slide.color : '#cbd5e1',
                                        border: 'none',
                                        padding: 0,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    }
                                }, idx)
                            )) })
                        ]
                    }),

                    // ── VERIFIED ACCOUNTS 1-TAP LOGIN CARD ──
                    _jsxs("div", { 
                        style: {
                            background: '#ffffff',
                            borderRadius: 22,
                            padding: '16px',
                            border: '1.5px solid rgba(0, 82, 204, 0.12)',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.03)'
                        },
                        children: [
                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }, children: [
                                _jsx(Sparkles, { size: 14, color: "#0052cc" }),
                                _jsx("span", { style: { fontSize: 11, fontWeight: 900, color: '#0052cc', textTransform: 'uppercase', letterSpacing: 0.5 }, children: "Verified College Accounts (Tap to Sign In)" })
                            ] }),
                            _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [
                                _jsxs("div", { 
                                    onClick: () => onOpenSignIn(false),
                                    style: {
                                        background: '#eff6ff',
                                        border: '1px solid #bfdbfe',
                                        borderRadius: 12,
                                        padding: '10px 12px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    },
                                    children: [
                                        _jsxs("div", { children: [
                                            _jsx("span", { style: { fontSize: 12, fontWeight: 900, color: '#1e40af', display: 'block' }, children: "\uD83C\uDF93 Student: Nithin Annamalai R" }),
                                            _jsx("span", { style: { fontSize: 10, color: '#64748b' }, children: "nithin@srec.ac.in \u00B7 Roll: 71812503104" })
                                        ] }),
                                        _jsx("span", { style: { fontSize: 10, fontWeight: 900, background: '#2563eb', color: '#fff', padding: '3px 8px', borderRadius: 6 }, children: "LOGIN" })
                                    ]
                                }),
                                _jsxs("div", { 
                                    onClick: () => onOpenSignIn(false),
                                    style: {
                                        background: '#fff7ed',
                                        border: '1px solid #fed7aa',
                                        borderRadius: 12,
                                        padding: '10px 12px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    },
                                    children: [
                                        _jsxs("div", { children: [
                                            _jsx("span", { style: { fontSize: 12, fontWeight: 900, color: '#9a3412', display: 'block' }, children: "\uD83D\uDC68\u200D\uD83C\uDFEB Faculty: Dr. M. Ezhilarasi" }),
                                            _jsx("span", { style: { fontSize: 10, color: '#64748b' }, children: "hod.eee@srec.ac.in \u00B7 Dept of EEE" })
                                        ] }),
                                        _jsx("span", { style: { fontSize: 10, fontWeight: 900, background: '#ea580c', color: '#fff', padding: '3px 8px', borderRadius: 6 }, children: "LOGIN" })
                                    ]
                                })
                            ] })
                        ]
                    }),

                    // ── ACCREDITATION PILLS ──
                    _jsxs("div", { style: { display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }, children: [
                        _jsxs("div", { style: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 99, background: '#ffffff', border: '1px solid #e2e8f0', fontSize: 10.5, fontWeight: 800, color: '#16a34a' }, children: [
                            _jsx(Award, { size: 12 }), " NAAC A+ Grade"
                        ] }),
                        _jsxs("div", { style: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 99, background: '#ffffff', border: '1px solid #e2e8f0', fontSize: 10.5, fontWeight: 800, color: '#2563eb' }, children: [
                            _jsx(ShieldCheck, { size: 12 }), " NBA Accredited"
                        ] }),
                        _jsxs("div", { style: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 99, background: '#ffffff', border: '1px solid #e2e8f0', fontSize: 10.5, fontWeight: 800, color: '#7c3aed' }, children: [
                            _jsx(Building2, { size: 12 }), " Anna Univ"
                        ] })
                    ] }),

                    // ── FOOTER BRANDING ──
                    _jsxs("div", { style: { textAlign: 'center', marginTop: 10, padding: '14px', borderTop: '1px solid #e2e8f0' }, children: [
                        _jsx("p", { style: { margin: 0, fontSize: 11, fontWeight: 800, color: '#475569' }, children: "\u00A9 2026 Tutor Ward App \u00B7 Sri Ramakrishna Engineering College" }),
                        _jsxs("p", { style: { margin: '4px 0 0 0', fontSize: 10.5, color: '#64748b' }, children: [
                            "Developer: ",
                            _jsx("strong", { children: "Nithin Annamalai R" }),
                            " (",
                            _jsx("a", { href: "mailto:tutorwardapp@gmail.com", style: { color: '#0052cc', fontWeight: 700 }, children: "tutorwardapp@gmail.com" }),
                            ")"
                        ] })
                    ] })
                ] })
            ]
        })
    );
};
