import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';

// Multi-layer parallax depth assets from ExploreScape
import bac1 from '../../assets/parallax/bac1.png';
import bac2 from '../../assets/parallax/bac2.png';
import bac2_2 from '../../assets/parallax/bac2_2.png';
import bac3 from '../../assets/parallax/bac3.png';
import bac4 from '../../assets/parallax/bac4.png';

export const DesktopLandingPage = ({ onOpenLogin }) => {
    // Parallax interactive mouse tracking & scroll position
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const normX = (e.clientX / window.innerWidth - 0.5) * 40; // -20 to +20px
            const normY = (e.clientY / window.innerHeight - 0.5) * 30; // -15 to +15px
            setMouseOffset({ x: normX, y: normY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        _jsxs("div", {
            style: {
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                background: '#04121a',
                fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
                color: '#ffffff',
                userSelect: 'none'
            },
            children: [
                // ── LAYER 4: DISTANT SKY BACKGROUND ──
                _jsx("img", {
                    src: bac4,
                    alt: "Parallax Sky",
                    style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        transform: `translate3d(${mouseOffset.x * 0.12}px, ${mouseOffset.y * 0.12}px, 0) scale(1.08)`,
                        transition: 'transform 0.12s ease-out',
                        zIndex: 1
                    }
                }),

                // ── LAYER 3: DISTANT MOUNTAINS ──
                _jsx("img", {
                    src: bac3,
                    alt: "Parallax Distant Mountains",
                    style: {
                        position: 'absolute',
                        bottom: '-6%',
                        left: 0,
                        width: '100%',
                        objectFit: 'cover',
                        transform: `translate3d(${mouseOffset.x * 0.25}px, ${mouseOffset.y * 0.2}px, 0) scale(1.04)`,
                        transition: 'transform 0.12s ease-out',
                        zIndex: 2
                    }
                }),

                // ── LAYER 2.5: HUGE 3D EMBEDDED CENTER TYPOGRAPHY (Placed BEHIND foreground mountains) ──
                _jsxs("div", {
                    style: {
                        position: 'absolute',
                        top: '38%',
                        left: '50%',
                        transform: `translate(calc(-50% + ${mouseOffset.x * 0.45}px), calc(-50% + ${mouseOffset.y * 0.3}px))`,
                        transition: 'transform 0.12s ease-out',
                        zIndex: 3,
                        textAlign: 'center',
                        width: '100%',
                        pointerEvents: 'none'
                    },
                    children: [
                        _jsx("h3", {
                            style: {
                                fontSize: 'clamp(0.95rem, 1.8vw, 1.5rem)',
                                fontWeight: 500,
                                letterSpacing: '14px',
                                color: 'rgba(255, 255, 255, 0.92)',
                                textTransform: 'uppercase',
                                margin: '0 0 10px 0',
                                textShadow: '0 4px 18px rgba(0,0,0,0.6)'
                            },
                            children: "The Department of EEE · SREC"
                        }),
                        _jsx("h1", {
                            style: {
                                fontSize: 'clamp(4.5rem, 11vw, 11rem)',
                                fontWeight: 900,
                                letterSpacing: 'clamp(12px, 3.5vw, 36px)',
                                textTransform: 'uppercase',
                                color: '#ffffff',
                                margin: 0,
                                lineHeight: 0.95,
                                textShadow: '0 10px 40px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,0.5)'
                            },
                            children: "TUTOR WARD"
                        })
                    ]
                }),

                // ── LAYER 2: MIDGROUND MOUNTAINS ──
                _jsx("img", {
                    src: bac2_2,
                    alt: "Parallax Midground",
                    style: {
                        position: 'absolute',
                        bottom: '-10%',
                        left: 0,
                        width: '100%',
                        objectFit: 'cover',
                        transform: `translate3d(${mouseOffset.x * 0.65}px, ${mouseOffset.y * 0.45}px, 0)`,
                        transition: 'transform 0.12s ease-out',
                        zIndex: 4
                    }
                }),

                // ── LAYER 1: FOREGROUND CLIFFS & FOLIAGE ──
                _jsx("img", {
                    src: bac1,
                    alt: "Parallax Foreground",
                    style: {
                        position: 'absolute',
                        bottom: '-12%',
                        left: 0,
                        width: '100%',
                        objectFit: 'cover',
                        transform: `translate3d(${mouseOffset.x * 1.05}px, ${mouseOffset.y * 0.65}px, 0)`,
                        transition: 'transform 0.12s ease-out',
                        zIndex: 5
                    }
                }),

                // ── VIGNETTE BOTTOM GRADIENT ──
                _jsx("div", {
                    style: {
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '200px',
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(4, 18, 26, 0.85) 100%)',
                        zIndex: 6,
                        pointerEvents: 'none'
                    }
                }),

                // ── FLOATING PILL NAVBAR: BRAND + ONLY LOGIN & SIGN UP BUTTONS ──
                _jsx("header", {
                    style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 20,
                        padding: '24px'
                    },
                    children: _jsxs("nav", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 32,
                            padding: '8px 24px',
                            minWidth: 420,
                            background: 'rgba(255, 255, 255, 0.18)',
                            border: '1px solid rgba(255, 255, 255, 0.35)',
                            borderRadius: 40,
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)'
                        },
                        children: [
                            // Brand
                            _jsxs("div", {
                                style: { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' },
                                onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
                                children: [
                                    _jsx("div", {
                                        style: {
                                            width: 34,
                                            height: 34,
                                            borderRadius: 10,
                                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 2px 10px rgba(37, 99, 235, 0.4)'
                                        },
                                        children: _jsxs("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            viewBox: "0 0 24 24",
                                            fill: "white",
                                            style: { width: 18, height: 18 },
                                            children: [
                                                _jsx("path", { d: "M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" }),
                                                _jsx("path", { d: "M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" })
                                            ]
                                        })
                                    }),
                                    _jsxs("span", {
                                        style: { fontWeight: 800, fontSize: 17, color: '#ffffff', letterSpacing: 0.2 },
                                        children: [
                                            "Tutor",
                                            _jsx("span", { style: { color: '#38bdf8' }, children: "Ward" })
                                        ]
                                    })
                                ]
                            }),

                            // ONLY Log In & Sign Up Buttons
                            _jsxs("div", {
                                style: { display: 'flex', alignItems: 'center', gap: 12 },
                                children: [
                                    _jsx("button", {
                                        onClick: () => onOpenLogin(false),
                                        style: {
                                            padding: '9px 24px',
                                            borderRadius: 99,
                                            border: '1.5px solid rgba(255, 255, 255, 0.65)',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            color: '#ffffff',
                                            fontSize: 13.5,
                                            fontWeight: 700,
                                            letterSpacing: '0.4px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.background = '#ffffff';
                                            e.currentTarget.style.color = '#0f172a';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                            e.currentTarget.style.color = '#ffffff';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        },
                                        children: "Log In"
                                    }),
                                    _jsx("button", {
                                        onClick: () => onOpenLogin(true),
                                        style: {
                                            padding: '9px 26px',
                                            borderRadius: 99,
                                            border: 'none',
                                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                            color: '#ffffff',
                                            fontSize: 13.5,
                                            fontWeight: 700,
                                            letterSpacing: '0.4px',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 16px rgba(37, 99, 235, 0.45)',
                                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 6px 22px rgba(37, 99, 235, 0.65)';
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.45)';
                                        },
                                        children: "Sign Up"
                                    })
                                ]
                            })
                        ]
                    })
                }),

                // ── FLOATING NARRATIVE CARD & ACTION BUTTONS ──
                _jsxs("div", {
                    style: {
                        position: 'absolute',
                        bottom: '12%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 16,
                        zIndex: 10,
                        textAlign: 'center',
                        padding: '0 20px',
                        boxSizing: 'border-box'
                    },
                    children: [
                        _jsx("p", {
                            style: {
                                maxWidth: 740,
                                fontSize: 14.5,
                                fontWeight: 400,
                                letterSpacing: '0.6px',
                                lineHeight: 1.8,
                                color: 'rgba(255, 255, 255, 0.9)',
                                textShadow: '0 2px 10px rgba(0, 0, 0, 0.85)',
                                margin: 0
                            },
                            children: "Sri Ramakrishna Engineering College provides an autonomous, award-winning academic mentoring environment. Connect seamlessly with verified department faculty tutors, track attendance dynamically, practice engineering circuits, and simulate graduation GPAs in one immersive portal."
                        }),
                        _jsxs("div", {
                            style: { display: 'flex', gap: 14, marginTop: 4 },
                            children: [
                                _jsx("button", {
                                    onClick: () => onOpenLogin(false),
                                    style: {
                                        fontSize: 13.5,
                                        fontWeight: 700,
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase',
                                        color: '#ffffff',
                                        backgroundColor: 'rgba(37, 99, 235, 0.9)',
                                        border: '1px solid rgba(255, 255, 255, 0.65)',
                                        borderRadius: 50,
                                        height: 48,
                                        padding: '0 34px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(8px)',
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                                        transition: 'all 0.25s ease'
                                    },
                                    onMouseEnter: (e) => {
                                        e.currentTarget.style.backgroundColor = '#ffffff';
                                        e.currentTarget.style.color = '#0f172a';
                                    },
                                    onMouseLeave: (e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.9)';
                                        e.currentTarget.style.color = '#ffffff';
                                    },
                                    children: "Log In to Portal →"
                                }),
                                _jsx("button", {
                                    onClick: () => onOpenLogin(true),
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 600,
                                        letterSpacing: '1.2px',
                                        textTransform: 'uppercase',
                                        color: 'rgba(255, 255, 255, 0.95)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        border: '1px solid rgba(255, 255, 255, 0.35)',
                                        borderRadius: 50,
                                        height: 48,
                                        padding: '0 30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(8px)',
                                        transition: 'all 0.2s ease'
                                    },
                                    onMouseEnter: (e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                                    },
                                    onMouseLeave: (e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                                    },
                                    children: "Create Account"
                                })
                            ]
                        }),
                        _jsxs("div", {
                            style: { marginTop: 8, fontSize: 11, color: 'rgba(255, 255, 255, 0.65)', letterSpacing: 0.3 },
                            children: [
                                "Developer: ",
                                _jsx("strong", { style: { color: '#ffffff' }, children: "Nithin Annamalai R" }),
                                " · ",
                                _jsx("a", { href: "mailto:tutorwardapp@gmail.com", style: { color: '#38bdf8', textDecoration: 'none' }, children: "tutorwardapp@gmail.com" })
                            ]
                        })
                    ]
                })
            ]
        })
    );
};
