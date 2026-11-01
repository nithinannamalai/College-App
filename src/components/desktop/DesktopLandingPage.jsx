import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';

// Tutor photos from tutor-booking-client-main
import tutor1 from '../../assets/tutor/tutor1.jpg';
import tutor2 from '../../assets/tutor/tutor2.jpg';
import tutor3 from '../../assets/tutor/tutor3.jpg';

// Multi-layer parallax depth assets from ExploreScape
import bac1 from '../../assets/parallax/bac1.png';
import bac2 from '../../assets/parallax/bac2.png';
import bac2_2 from '../../assets/parallax/bac2_2.png';
import bac3 from '../../assets/parallax/bac3.png';
import bac4 from '../../assets/parallax/bac4.png';

export const DesktopLandingPage = ({ onOpenLogin }) => {
    // Parallax interactive mouse tracking & scroll position
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [scrollOffset, setScrollOffset] = useState(0);

    // Hero carousel state
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const normX = (e.clientX / window.innerWidth - 0.5) * 40; // -20 to +20px
            const normY = (e.clientY / window.innerHeight - 0.5) * 30; // -15 to +15px
            setMouseOffset({ x: normX, y: normY });
        };

        const handleScroll = () => {
            setScrollOffset(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 4.5s auto-sliding for tutor hero cards
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev === 2 ? 0 : prev + 1));
        }, 4500);
        return () => clearInterval(interval);
    }, [isPaused]);

    const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? 2 : prev - 1));
    const nextSlide = () => setCurrentSlide(prev => (prev === 2 ? 0 : prev + 1));

    // Stats data from tutor-booking-client-main
    const stats = [
        {
            value: "200+",
            label: "Expert Tutors",
            color: "blue",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" style={{ width: 20, height: 20 }}>
                    <path d="M487.938,162.108l-224-128a16,16,0,0,0-15.876,0l-224,128a16,16,0,0,0,.382,28l224,120a16,16,0,0,0,15.112,0l224-120a16,16,0,0,0,.382-28ZM256,277.849,65.039,175.548,256,66.428l190.961,109.12Z" />
                    <path d="M263.711,394.02,480,275.061V238.539L256,361.74,32,238.539v36.522L248.289,394.02a16.005,16.005,0,0,0,15.422,0Z" />
                    <path d="M32,362.667,248.471,478.118a16,16,0,0,0,15.058,0L480,362.667V326.4L256,445.867,32,326.4Z" />
                </svg>
            )
        },
        {
            value: "7,500+",
            label: "Active Learners",
            color: "violet",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" style={{ width: 20, height: 20 }}>
                    <path d="M462.541,316.3l-64.344-42.1,24.774-45.418A79.124,79.124,0,0,0,432.093,192V120A103.941,103.941,0,0,0,257.484,43.523L279.232,67a71.989,71.989,0,0,1,120.861,53v72a46.809,46.809,0,0,1-5.215,21.452L355.962,284.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421V432h-72v32h104V378.494A74.061,74.061,0,0,0,462.541,316.3Z" />
                    <path d="M318.541,348.3l-64.343-42.1,24.773-45.418A79.124,79.124,0,0,0,288.093,224V152A104.212,104.212,0,0,0,184.04,47.866C126.723,47.866,80.093,94.581,80.093,152v72a78,78,0,0,0,9.015,36.775l24.908,45.664L50.047,348.3A74.022,74.022,0,0,0,16.5,410.4L16,496H352.093V410.494A74.061,74.061,0,0,0,318.541,348.3ZM320.093,464H48.186l.31-53.506a42.158,42.158,0,0,1,19.073-35.421l88.682-58.029L117.2,245.452A46.838,46.838,0,0,1,112.093,224V152a72,72,0,1,1,144,0v72a46.809,46.809,0,0,1-5.215,21.452L211.962,316.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421Z" />
                </svg>
            )
        },
        {
            value: "14",
            label: "Awards Won",
            color: "amber",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" style={{ width: 20, height: 20 }}>
                    <polygon points="328.375 384 332.073 458.999 256.211 406.28 179.924 459.049 183.625 384 151.586 384 146.064 496 182.756 496 256.169 445.22 329.242 496 365.936 496 360.414 384 328.375 384" />
                    <path d="M415.409,154.914l-2.194-48.054L372.7,80.933,346.768,40.414l-48.055-2.2L256,16.093,213.287,38.219l-48.055,2.2L139.3,80.933,98.785,106.86l-2.194,48.054L74.464,197.628l22.127,42.715,2.2,48.053L139.3,314.323l25.928,40.52,48.055,2.195L256,379.164l42.713-22.126,48.055-2.195,25.928-40.52L413.214,288.4l2.195-48.053,22.127-42.715Zm-31.646,76.949L382,270.377l-32.475,20.78-20.78,32.475-38.515,1.76L256,343.125l-34.234-17.733-38.515-1.76-20.78-32.475L130,270.377l-1.759-38.514L110.5,197.628,128.237,163.4,130,124.88,162.471,104.1l20.78-32.474,38.515-1.76L256,52.132l34.234,17.733,38.515,1.76,20.78,32.474L382,124.88l1.759,38.515L401.5,197.628Z" />
                </svg>
            )
        },
        {
            value: "24/7",
            label: "Support",
            color: "teal",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" style={{ width: 20, height: 20 }}>
                    <path d="M256.25,16A240,240,0,0,0,88,84.977V16H56V144H184V112H106.287A208,208,0,0,1,256.25,48C370.8,48,464,141.2,464,255.75S370.8,463.5,256.25,463.5,48.5,370.3,48.5,255.75h-32A239.75,239.75,0,0,0,425.779,425.279,239.75,239.75,0,0,0,256.25,16Z" />
                    <polygon points="240 111.951 239.465 288 368 288 368 256 271.563 256 272 112.049 240 111.951" />
                </svg>
            )
        },
        {
            value: "99.9%",
            label: "Uptime",
            color: "green",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" style={{ width: 20, height: 20 }}>
                    <path d="M415.313,358.7c36.453-36.452,55.906-85.231,54.779-137.353-1.112-51.375-21.964-99.908-58.715-136.66L388.75,107.314A166.816,166.816,0,0,1,438.1,222.039c.937,43.313-15.191,83.81-45.463,114.083l-48.617,49.051.044-89.165-32-.016L311.992,440H456.063V408H366.449Z" />
                    <path d="M47.937,112h89.614L88.687,161.3c-36.453,36.451-55.906,85.231-54.779,137.352a198.676,198.676,0,0,0,58.715,136.66l22.627-22.627A166.818,166.818,0,0,1,65.9,297.962c-.937-43.314,15.191-83.811,45.463-114.083l48.617-49.051-.044,89.165,32,.015L192.008,80H47.937Z" />
                </svg>
            )
        },
        {
            value: "720+",
            label: "Service Providers",
            color: "rose",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" style={{ width: 20, height: 20 }}>
                    <path d="M416,180H320V340h96a20.023,20.023,0,0,0,20-20V200A20.023,20.023,0,0,0,416,180ZM404,308H352V212h52Z" />
                    <path d="M436.574,120H352V64H32V408a64.072,64.072,0,0,0,64,64H288a64.072,64.072,0,0,0,64-64v-8h84.574A59.493,59.493,0,0,0,496,340.574V179.426A59.493,59.493,0,0,0,436.574,120ZM464,340.574A27.457,27.457,0,0,1,436.574,368H320v40a32.036,32.036,0,0,1-32,32H96a32.036,32.036,0,0,1-32-32V96H320v56H436.574A27.457,27.457,0,0,1,464,179.426Z" />
                </svg>
            )
        }
    ];

    const colorMap = {
        blue: { bg: '#eff6ff', icon: '#2563eb', text: '#2563eb', border: '#dbeafe' },
        violet: { bg: '#f5f3ff', icon: '#7c3aed', text: '#7c3aed', border: '#ede9fe' },
        amber: { bg: '#fffbeb', icon: '#d97706', text: '#d97706', border: '#fef3c7' },
        teal: { bg: '#f0fdfa', icon: '#0d9488', text: '#0d9488', border: '#ccfbf1' },
        green: { bg: '#f0fdf4', icon: '#16a34a', text: '#16a34a', border: '#dcfce7' },
        rose: { bg: '#fff1f2', icon: '#e11d48', text: '#e11d48', border: '#ffe4e6' },
    };

    // Features list
    const features = [
        {
            title: "Verified Faculty Tutors",
            desc: "Every tutor undergoes department verification to ensure rigorous teaching, academic excellence, and personalized mentoring.",
            color: "blue",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: "Flexible Scheduling",
            desc: "Book mentoring sessions at hours tailored to your academic periods — before lab slots or afternoon consultation hours.",
            color: "violet",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "Global Reach & Core Tracks",
            desc: "Structured roadmaps across Power Systems, Embedded Systems, IoT, EV Technology, and Tier-1 IT software placements.",
            color: "teal",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
            )
        },
        {
            title: "Award-Winning Institution",
            desc: "NBA & NAAC A+ accredited Department of Electrical & Electronics Engineering with 14 national and state awards.",
            color: "amber",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            )
        },
        {
            title: "24/7 Neural AI Tutor",
            desc: "Integrated Gemini 2.0 AI tutor specialized in engineering circuit analysis, DSP algorithms, and exam problem solving.",
            color: "green",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            title: "Dynamic Attendance Radar",
            desc: "Live period logs, automatic 75% cutoff forecasting, low-attendance alerts, and instant On-Duty generation.",
            color: "rose",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            title: "Digital Credentials & Pass",
            desc: "Holographic student pass with verified QR code, automated request letters, bonafide certificates, and grade archives.",
            color: "blue",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Instant One-Click Booking",
            desc: "Connect directly with faculty advisors, book academic counseling slots, and review research mentoring guidance in seconds.",
            color: "violet",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        }
    ];

    // Popular faculty tutors
    const popularTutors = [
        {
            id: "1",
            tutorName: "Dr. K. Balamurugan",
            subjectCategory: "Power Systems & Smart Grids",
            tutorImage: tutor1,
            availableTimeSlot: "Mon - Fri, 09:00 AM - 04:30 PM",
            sessionStartDate: "Immediate",
            hourlyFee: 25
        },
        {
            id: "2",
            tutorName: "Prof. S. Radhika",
            subjectCategory: "Embedded Systems & IoT",
            tutorImage: tutor2,
            availableTimeSlot: "Tue - Sat, 10:00 AM - 05:00 PM",
            sessionStartDate: "Immediate",
            hourlyFee: 30
        },
        {
            id: "3",
            tutorName: "Dr. M. Kathirvel",
            subjectCategory: "Control Systems & Robotics",
            tutorImage: tutor3,
            availableTimeSlot: "Mon - Thu, 08:30 AM - 04:00 PM",
            sessionStartDate: "Immediate",
            hourlyFee: 28
        }
    ];

    return (
        <div style={{ fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif", background: '#ffffff', color: '#09090b', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
            
            {/* ── 1. CINEMATIC 3D PARALLAX HERO (ExploreScape Travel Style) ── */}
            <section style={{
                position: 'relative',
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
                background: '#04121a'
            }}>
                {/* Layer 4: Distant Sky Background */}
                <img
                    src={bac4}
                    alt="Parallax Sky"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        transform: `translate3d(${mouseOffset.x * 0.12}px, ${scrollOffset * 0.2 + mouseOffset.y * 0.12}px, 0) scale(1.08)`,
                        transition: 'transform 0.12s ease-out',
                        zIndex: 1
                    }}
                />

                {/* Layer 3: Distant Mountains */}
                <img
                    src={bac3}
                    alt="Parallax Distant Mountains"
                    style={{
                        position: 'absolute',
                        bottom: '-6%',
                        left: 0,
                        width: '100%',
                        objectFit: 'cover',
                        transform: `translate3d(${mouseOffset.x * 0.25}px, ${scrollOffset * 0.35 + mouseOffset.y * 0.2}px, 0) scale(1.04)`,
                        transition: 'transform 0.12s ease-out',
                        zIndex: 2
                    }}
                />

                {/* Layer 2.5: Huge 3D Embedded Center Typography (Placed BEHIND foreground mountains like KERALA in ExploreScape) */}
                <div style={{
                    position: 'absolute',
                    top: '38%',
                    left: '50%',
                    transform: `translate(calc(-50% + ${mouseOffset.x * 0.45}px), calc(-50% + ${scrollOffset * 0.42 + mouseOffset.y * 0.3}px))`,
                    transition: 'transform 0.12s ease-out',
                    zIndex: 3,
                    textAlign: 'center',
                    width: '100%',
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                    <h3 style={{
                        fontSize: 'clamp(1rem, 2vw, 1.6rem)',
                        fontWeight: 500,
                        letterSpacing: '14px',
                        color: 'rgba(255, 255, 255, 0.92)',
                        textTransform: 'uppercase',
                        margin: '0 0 10px 0',
                        textShadow: '0 4px 18px rgba(0,0,0,0.6)'
                    }}>
                        The Department of EEE · SREC
                    </h3>
                    <h1 style={{
                        fontSize: 'clamp(4.5rem, 11vw, 11rem)',
                        fontWeight: 900,
                        letterSpacing: 'clamp(12px, 3.5vw, 36px)',
                        textTransform: 'uppercase',
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: 0.95,
                        textShadow: '0 10px 40px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,0.5)'
                    }}>
                        TUTOR WARD
                    </h1>
                </div>

                {/* Layer 2: Midground Mountain Slopes */}
                <img
                    src={bac2_2}
                    alt="Parallax Midground"
                    style={{
                        position: 'absolute',
                        bottom: '-10%',
                        left: 0,
                        width: '100%',
                        objectFit: 'cover',
                        transform: `translate3d(${mouseOffset.x * 0.65}px, ${scrollOffset * 0.55 + mouseOffset.y * 0.45}px, 0)`,
                        transition: 'transform 0.12s ease-out',
                        zIndex: 4
                    }}
                />

                {/* Layer 1: Foreground Cliffs & Foliage */}
                <img
                    src={bac1}
                    alt="Parallax Foreground"
                    style={{
                        position: 'absolute',
                        bottom: '-12%',
                        left: 0,
                        width: '100%',
                        objectFit: 'cover',
                        transform: `translate3d(${mouseOffset.x * 1.05}px, ${scrollOffset * 0.72 + mouseOffset.y * 0.65}px, 0)`,
                        transition: 'transform 0.12s ease-out',
                        zIndex: 5
                    }}
                />

                {/* Bottom Shadow Gradient to blend smoothly into the next sections */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '240px',
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.7) 60%, #0f172a 100%)',
                    zIndex: 6,
                    pointerEvents: 'none'
                }} />

                {/* ── ULTRA-CLEAN FLOATING PILL NAVBAR: BRAND + ONLY LOGIN & SIGN UP BUTTONS ── */}
                <header style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 20,
                    padding: '20px 24px'
                }}>
                    <nav style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 28,
                        padding: '8px 24px',
                        minWidth: 420,
                        background: 'rgba(255, 255, 255, 0.18)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        borderRadius: 40,
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
                        transition: 'all 0.3s ease'
                    }}>
                        {/* Brand Logo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <div style={{
                                width: 34,
                                height: 34,
                                borderRadius: 10,
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 10px rgba(37, 99, 235, 0.4)'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: 18, height: 18 }}>
                                    <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                                    <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                                </svg>
                            </div>
                            <span style={{ fontWeight: 800, fontSize: 17, color: '#ffffff', letterSpacing: 0.2 }}>
                                Tutor<span style={{ color: '#38bdf8' }}>Ward</span>
                            </span>
                        </div>

                        {/* ONLY LOGIN & SIGN UP BUTTONS */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <button
                                onClick={() => onOpenLogin(false)}
                                style={{
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
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#ffffff';
                                    e.currentTarget.style.color = '#0f172a';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                    e.currentTarget.style.color = '#ffffff';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                Log In
                            </button>

                            <button
                                onClick={() => onOpenLogin(true)}
                                style={{
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
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 22px rgba(37, 99, 235, 0.65)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.45)';
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </nav>
                </header>

                {/* ExploreScape Floating Description Narrative & Clean Dual CTA */}
                <div style={{
                    position: 'absolute',
                    bottom: '14%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 16,
                    zIndex: 10,
                    textAlign: 'center',
                    padding: '0 20px',
                    boxSizing: 'border-box'
                }}>
                    <p style={{
                        maxWidth: 720,
                        fontSize: 14,
                        fontWeight: 400,
                        letterSpacing: '0.8px',
                        lineHeight: 1.8,
                        color: 'rgba(255, 255, 255, 0.88)',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.75)',
                        margin: 0
                    }}>
                        Sri Ramakrishna Engineering College provides an autonomous, award-winning academic mentoring environment. Connect seamlessly with verified department faculty tutors, track attendance dynamically, practice engineering circuits, and simulate graduation GPAs in one immersive portal.
                    </p>

                    <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
                        <button
                            onClick={() => onOpenLogin(false)}
                            style={{
                                fontSize: 13.5,
                                fontWeight: 700,
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                color: '#ffffff',
                                backgroundColor: 'rgba(37, 99, 235, 0.88)',
                                border: '1px solid rgba(255, 255, 255, 0.65)',
                                borderRadius: 50,
                                height: 48,
                                padding: '0 32px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                cursor: 'pointer',
                                backdropFilter: 'blur(8px)',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                                transition: 'all 0.25s ease'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#0f172a'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.88)'; e.currentTarget.style.color = '#ffffff'; }}
                        >
                            Log In to Portal →
                        </button>

                        <button
                            onClick={() => onOpenLogin(true)}
                            style={{
                                fontSize: 13,
                                fontWeight: 600,
                                letterSpacing: '1.5px',
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
                                backdropFilter: 'blur(8px)'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'; }}
                        >
                            Create Account
                        </button>
                    </div>
                </div>

                {/* ExploreScape Left/Right Arrow Navigation */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 3%',
                    boxSizing: 'border-box',
                    zIndex: 10,
                    pointerEvents: 'none'
                }}>
                    <button
                        onClick={prevSlide}
                        aria-label="Previous Slide"
                        style={{
                            pointerEvents: 'auto',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            color: '#ffffff',
                            fontSize: 22,
                            fontWeight: 900,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                        }}
                    >
                        ‹
                    </button>
                    <button
                        onClick={nextSlide}
                        aria-label="Next Slide"
                        style={{
                            pointerEvents: 'auto',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            color: '#ffffff',
                            fontSize: 22,
                            fontWeight: 900,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                        }}
                    >
                        ›
                    </button>
                </div>
            </section>

            {/* ── 2. TUTOR CAROUSEL SHOWCASE (From tutor-booking-client-main/src/components/Hero.jsx) ── */}
            <section
                id="details-section"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                style={{ width: '100%', position: 'relative', overflow: 'hidden', background: '#0f172a' }}
            >
                {/* SLIDE 1 */}
                {currentSlide === 0 && (
                    <div style={{ minHeight: '82vh', display: 'flex', alignItems: 'center', background: '#EFF6FF', transition: 'background 0.5s ease', padding: '60px 0' }}>
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 580 }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#dbeafe', color: '#1d4ed8', fontSize: 13, fontWeight: 600, padding: '6px 16px', borderRadius: 99, width: 'fit-content' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563eb', animation: 'pulse 2s infinite' }} />
                                    Trusted by 7,500+ learners worldwide
                                </span>

                                <h1 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.18, color: '#111827', margin: 0, letterSpacing: '-0.8px' }}>
                                    Study Your Own Mind, <span style={{ color: '#2563eb' }}>Find the Best Tutor</span> in the World
                                </h1>

                                <p style={{ fontSize: 16, lineHeight: 1.65, color: '#6b7280', margin: 0 }}>
                                    We have the international reputation for high quality teaching and success. Connect with verified faculty tutors for personalized counseling, academic radar, and career growth.
                                </p>

                                <div style={{ display: 'flex', gap: 14, paddingTop: 8 }}>
                                    <button
                                        onClick={() => onOpenLogin(false)}
                                        style={{ background: '#2563eb', color: '#ffffff', fontWeight: 600, fontSize: 14.5, padding: '12px 26px', borderRadius: 10, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.28)' }}
                                    >
                                        Explore Tutors →
                                    </button>
                                    <button
                                        onClick={() => onOpenLogin(false)}
                                        style={{ border: '1px solid #d1d5db', background: '#ffffff', color: '#374151', fontWeight: 600, fontSize: 14.5, padding: '12px 24px', borderRadius: 10, cursor: 'pointer' }}
                                    >
                                        Learn More
                                    </button>
                                </div>

                                <div style={{ display: 'flex', gap: 36, paddingTop: 20, borderTop: '1px solid #e5e7eb', marginTop: 8 }}>
                                    {[
                                        { value: "200+", label: "Expert tutors" },
                                        { value: "7,500+", label: "Learners" },
                                        { value: "24/7", label: "Support" },
                                    ].map(stat => (
                                        <div key={stat.label}>
                                            <p style={{ fontSize: 22, fontWeight: 800, color: '#2563eb', margin: '0 0 2px 0' }}>{stat.value}</p>
                                            <p style={{ fontSize: 12, color: '#6b7280', margin: 0, fontWeight: 500 }}>{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ position: 'relative', width: '100%', maxWidth: 440, borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)' }}>
                                    <img src={tutor3} alt="Tutor" style={{ width: '100%', height: 430, objectFit: 'cover', display: 'block' }} />
                                    <div style={{ position: 'absolute', bottom: 18, left: 18, background: '#ffffff', borderRadius: 14, padding: '12px 18px', boxShadow: '0 10px 25px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ display: 'flex', marginLeft: -6 }}>
                                            {['#2563eb', '#059669', '#d97706'].map((bg, idx) => (
                                                <div key={idx} style={{ width: 32, height: 32, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, border: '2.5px solid #fff', marginLeft: -6 }}>
                                                    {['AS', 'SR', 'FM'][idx]}
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#1f2937' }}>200+ Active Tutors</p>
                                            <p style={{ margin: 0, fontSize: 11, color: '#6b7280' }}>Available now</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SLIDE 2 */}
                {currentSlide === 1 && (
                    <div style={{ minHeight: '82vh', display: 'flex', alignItems: 'center', background: '#F0FDF4', transition: 'background 0.5s ease', padding: '60px 0' }}>
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'center' }}>
                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ position: 'relative', width: '100%', maxWidth: 440, borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)' }}>
                                    <img src={tutor1} alt="Tutor" style={{ width: '100%', height: 430, objectFit: 'cover', display: 'block' }} />
                                    <div style={{ position: 'absolute', top: 18, right: 18, background: '#ffffff', borderRadius: 14, padding: '12px 18px', boxShadow: '0 10px 25px rgba(0,0,0,0.12)' }}>
                                        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#1f2937' }}>Beginner → Advanced</p>
                                        <p style={{ margin: 0, fontSize: 11, color: '#6b7280' }}>Year-round classes</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 580 }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#dcfce7', color: '#15803d', fontSize: 13, fontWeight: 600, padding: '6px 16px', borderRadius: 99, width: 'fit-content' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', animation: 'pulse 2s infinite' }} />
                                    Enroll now — limited seats
                                </span>

                                <h1 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.18, color: '#111827', margin: 0, letterSpacing: '-0.8px' }}>
                                    Classes Now <span style={{ color: '#16a34a' }}>Forming!</span>
                                </h1>

                                <p style={{ fontSize: 16, lineHeight: 1.65, color: '#6b7280', margin: 0 }}>
                                    Our courses are taught at beginner to advanced levels on a year-round basis. Find the perfect pace for your engineering journey with hands-on lab experiments and research guidance.
                                </p>

                                <div style={{ display: 'flex', gap: 14, paddingTop: 8 }}>
                                    <button
                                        onClick={() => onOpenLogin(false)}
                                        style={{ background: '#16a34a', color: '#ffffff', fontWeight: 600, fontSize: 14.5, padding: '12px 28px', borderRadius: 10, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.28)' }}
                                    >
                                        Explore More →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SLIDE 3 */}
                {currentSlide === 2 && (
                    <div style={{ minHeight: '82vh', display: 'flex', alignItems: 'center', background: '#FFF7ED', transition: 'background 0.5s ease', padding: '60px 0' }}>
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 580 }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#ffedd5', color: '#c2410c', fontSize: 13, fontWeight: 600, padding: '6px 16px', borderRadius: 99, width: 'fit-content' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ea580c', animation: 'pulse 2s infinite' }} />
                                    Internationally recognized institution
                                </span>

                                <h1 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.18, color: '#111827', margin: 0, letterSpacing: '-0.8px' }}>
                                    We Are a <span style={{ color: '#ea580c' }}>Trusted Institution!</span>
                                </h1>

                                <p style={{ fontSize: 16, lineHeight: 1.65, color: '#6b7280', margin: 0 }}>
                                    We offer programs designed to meet the needs of scholars from all around the world — with 14 international awards for excellence in technical education and research outcomes.
                                </p>

                                <div style={{ display: 'flex', gap: 14, paddingTop: 8 }}>
                                    <button
                                        onClick={() => onOpenLogin(false)}
                                        style={{ background: '#f97316', color: '#ffffff', fontWeight: 600, fontSize: 14.5, padding: '12px 28px', borderRadius: 10, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(249, 115, 22, 0.28)' }}
                                    >
                                        Hire Tutors →
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, paddingTop: 10 }}>
                                    {["14 Awards", "720+ Providers", "99.9% Uptime"].map((badge) => (
                                        <span
                                            key={badge}
                                            style={{ background: '#fff7ed', border: '1px solid #fed7aa', color: '#c2410c', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 99 }}
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ position: 'relative', width: '100%', maxWidth: 440, borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)' }}>
                                    <img src={tutor2} alt="Tutor" style={{ width: '100%', height: 430, objectFit: 'cover', display: 'block' }} />
                                    <div style={{ position: 'absolute', bottom: 18, right: 18, background: '#ffffff', borderRadius: 14, padding: '12px 18px', boxShadow: '0 10px 25px rgba(0,0,0,0.12)' }}>
                                        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#1f2937' }}>🏆 14 International Awards</p>
                                        <p style={{ margin: 0, fontSize: 11, color: '#6b7280' }}>For teaching excellence</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* ── 3. STATS SECTION (Exact match to tutor-booking-client-main/src/components/Stats.jsx) ── */}
            <section style={{ padding: '75px 24px', background: '#ffffff' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 44 }}>
                        <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#2563eb', marginBottom: 8 }}>
                            By the numbers
                        </span>
                        <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0' }}>
                            Trusted by thousands worldwide
                        </h2>
                        <p style={{ fontSize: 14.5, color: '#64748b', margin: 0 }}>
                            Our platform has helped learners and tutors across the globe
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
                        {stats.map((stat) => {
                            const c = colorMap[stat.color];
                            return (
                                <div
                                    key={stat.label}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 12,
                                        padding: '24px 16px',
                                        borderRadius: 20,
                                        border: `1px solid ${c.border}`,
                                        background: c.bg,
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        cursor: 'default'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                                >
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: c.icon, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                                        {stat.icon}
                                    </div>
                                    <p style={{ fontSize: 24, fontWeight: 800, lineHeight: 1, color: c.text, margin: 0 }}>
                                        {stat.value}
                                    </p>
                                    <p style={{ fontSize: 12.5, fontWeight: 600, color: '#64748b', textAlign: 'center', margin: 0, lineHeight: 1.3 }}>
                                        {stat.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 4. POPULAR TUTORS SECTION (Exact match to tutor-booking-client-main/src/components/TutorsFeatures) ── */}
            <section id="tutors" style={{ padding: '80px 24px', background: '#f8fafc' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 50 }}>
                        <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#2563eb', marginBottom: 8 }}>
                            Our Experts
                        </span>
                        <h2 style={{ fontSize: 34, fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0' }}>
                            Our Popular Tutors
                        </h2>
                        <p style={{ fontSize: 15, color: '#64748b', margin: '0 auto', maxWidth: 460 }}>
                            Here are a few of our verified, top-rated teachers ready to help you succeed.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
                        {popularTutors.map((tutor) => (
                            <div
                                key={tutor.id}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: '#ffffff',
                                    borderRadius: 20,
                                    overflow: 'hidden',
                                    border: '1px solid #e2e8f0',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.08)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)'; }}
                            >
                                <div style={{ position: 'relative', height: 210, overflow: 'hidden', background: '#f1f5f9' }}>
                                    <img
                                        src={tutor.tutorImage}
                                        alt={tutor.tutorName}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <span style={{ position: 'absolute', top: 14, left: 14, background: '#2563eb', color: '#ffffff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 99, boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                                        {tutor.subjectCategory}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 22, gap: 14 }}>
                                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                                        {tutor.tutorName}
                                    </h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: '#64748b' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 16, height: 16, color: '#2563eb', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tutor.availableTimeSlot}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 16, height: 16, color: '#2563eb', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Starts: {tutor.sessionStartDate}</span>
                                        </div>
                                    </div>

                                    <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0 0 0' }} />

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                                        <div>
                                            <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>Hourly fee</p>
                                            <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#2563eb' }}>
                                                ${tutor.hourlyFee}
                                                <span style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8' }}>/hr</span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => onOpenLogin(false)}
                                            style={{
                                                padding: '8px 22px',
                                                borderRadius: 10,
                                                border: 'none',
                                                background: '#2563eb',
                                                color: '#ffffff',
                                                fontSize: 13,
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                boxShadow: '0 2px 6px rgba(37,99,235,0.25)'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
                                        >
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 44 }}>
                        <button
                            onClick={() => onOpenLogin(false)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                background: 'none',
                                border: 'none',
                                fontSize: 14.5,
                                fontWeight: 700,
                                color: '#2563eb',
                                cursor: 'pointer',
                                transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#2563eb'}
                        >
                            View all tutors
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* ── 5. WHY CHOOSE US / ALL FEATURES SECTION (Exact match to tutor-booking-client-main/src/components/OurAllFeature.jsx) ── */}
            <section id="features" style={{ padding: '80px 24px', background: '#ffffff' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 50 }}>
                        <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#2563eb', marginBottom: 8 }}>
                            Why choose us
                        </span>
                        <h2 style={{ fontSize: 34, fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0' }}>
                            All the features you want
                        </h2>
                        <p style={{ fontSize: 15, color: '#64748b', margin: '0 auto', maxWidth: 520 }}>
                            Everything you need to find, book, and learn with the perfect tutor — all in one place.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
                        {features.map((f) => {
                            const c = colorMap[f.color];
                            return (
                                <div
                                    key={f.title}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 14,
                                        padding: 22,
                                        borderRadius: 20,
                                        border: '1px solid #f1f5f9',
                                        background: '#f8fafc',
                                        transition: 'all 0.3s ease',
                                        cursor: 'default'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.05)'; e.currentTarget.style.background = '#ffffff'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }}
                                >
                                    <div style={{ width: 42, height: 42, borderRadius: 12, background: c.icon, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ margin: '0 0 6px 0', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>
                                            {f.title}
                                        </h3>
                                        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: '#64748b' }}>
                                            {f.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 6. MODERN SOLUTIONS CTA BANNER (Exact match to tutor-booking-client-main/src/components/ModernSolution.jsx) ── */}
            <section style={{ padding: '40px 24px 80px', background: '#f8fafc' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 28, background: '#2563eb', padding: '60px 54px', boxShadow: '0 20px 50px rgba(37, 99, 235, 0.3)' }}>
                        {/* Glow Orbs */}
                        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(59, 130, 246, 0.5)', filter: 'blur(70px)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(124, 58, 237, 0.35)', filter: 'blur(70px)', pointerEvents: 'none' }} />

                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: 320, color: '#ffffff' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 54, height: 54, borderRadius: 16, background: 'rgba(255, 255, 255, 0.18)', marginBottom: 20 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" style={{ width: 28, height: 28 }}>
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>

                                <h2 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.25, color: '#ffffff', margin: '0 0 14px 0' }}>
                                    Modern solutions to<br />all kinds of problems
                                </h2>

                                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#dbeafe', margin: 0, maxWidth: 480 }}>
                                    Whether you are a student struggling with a subject or seeking academic mentoring, our platform connects you instantly with verified experts worldwide.
                                </p>

                                <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
                                    {["200+ Tutors", "7,500+ Learners", "14 Awards"].map((badge) => (
                                        <span
                                            key={badge}
                                            style={{ background: 'rgba(255, 255, 255, 0.18)', border: '1px solid rgba(255, 255, 255, 0.28)', color: '#ffffff', fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 99 }}
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ width: 330, background: '#ffffff', borderRadius: 22, padding: 32, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <h3 style={{ margin: '0 0 6px 0', fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
                                        Ready to get started?
                                    </h3>
                                    <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
                                        Classes now forming — find your perfect tutor today.
                                    </p>
                                </div>

                                <button
                                    onClick={() => onOpenLogin(false)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 20px',
                                        background: '#2563eb',
                                        color: '#ffffff',
                                        fontSize: 14,
                                        fontWeight: 700,
                                        borderRadius: 12,
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s ease',
                                        boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
                                >
                                    Explore Tutors →
                                </button>

                                <button
                                    onClick={() => onOpenLogin(false)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 20px',
                                        border: '1px solid #e2e8f0',
                                        background: '#ffffff',
                                        color: '#475569',
                                        fontSize: 13.5,
                                        fontWeight: 600,
                                        borderRadius: 12,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                                >
                                    Learn More
                                </button>

                                <p style={{ margin: 0, textAlign: 'center', fontSize: 11.5, color: '#94a3b8' }}>
                                    No signup fee · Cancel anytime
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 7. FOOTER (Exact match to tutor-booking-client-main/src/components/Footer.jsx) ── */}
            <footer style={{ background: '#09090b', color: '#a1a1aa', borderTop: '1px solid #27272a' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 40px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
                        {/* Column 1 & 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 34, height: 34, borderRadius: 10, background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: 18, height: 18 }}>
                                        <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                                        <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                                        <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                                    </svg>
                                </div>
                                <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.5px', color: '#ffffff' }}>
                                    Tutor<span style={{ color: '#3b82f6' }}>Book</span>
                                </span>
                            </div>

                            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: '#71717a', maxWidth: 320 }}>
                                We have the international reputation for high quality teaching and success. Connecting learners with the world's best tutors and mentors.
                            </p>

                            <div style={{ display: 'flex', gap: 10 }}>
                                {[
                                    { label: "Facebook", vb: "0 0 32 32", path: "M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z" },
                                    { label: "Twitter", vb: "0 0 24 24", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                                    { label: "LinkedIn", vb: "0 0 24 24", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }
                                ].map((s) => (
                                    <button
                                        key={s.label}
                                        aria-label={s.label}
                                        style={{ width: 36, height: 36, borderRadius: 8, background: '#27272a', border: 'none', color: '#a1a1aa', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = '#ffffff'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = '#27272a'; e.currentTarget.style.color = '#a1a1aa'; }}
                                    >
                                        <svg viewBox={s.vb} fill="currentColor" style={{ width: 16, height: 16 }}>
                                            <path d={s.path} />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Product */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <h4 style={{ margin: 0, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#f4f4f5' }}>
                                Product
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {['Features', 'Tutors', 'Academics', 'FAQ'].map((l) => (
                                    <li key={l}>
                                        <button onClick={() => onOpenLogin(false)} style={{ background: 'none', border: 'none', padding: 0, fontSize: 13.5, color: '#71717a', cursor: 'pointer', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#71717a'}>
                                            {l}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Institution */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <h4 style={{ margin: 0, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#f4f4f5' }}>
                                Institution
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {['Sri Ramakrishna Eng. College', 'Department of EEE', 'Accreditation (NBA/NAAC)', 'About Portal'].map((l) => (
                                    <li key={l}>
                                        <button onClick={() => onOpenLogin(false)} style={{ background: 'none', border: 'none', padding: 0, fontSize: 13.5, color: '#71717a', cursor: 'pointer', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#71717a'}>
                                            {l}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 5: Developers */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <h4 style={{ margin: 0, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#f4f4f5' }}>
                                Developers
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {['Public API', 'Documentation', 'Security & RLS', 'Support Guides'].map((l) => (
                                    <li key={l}>
                                        <button onClick={() => onOpenLogin(false)} style={{ background: 'none', border: 'none', padding: 0, fontSize: 13.5, color: '#71717a', cursor: 'pointer', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#71717a'}>
                                            {l}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ borderTop: '1px solid #18181b', padding: '20px 24px' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                        <p style={{ margin: 0, fontSize: 12, color: '#52525b' }}>
                            © {new Date().getFullYear()} TutorBook · Tutor Ward App · Department of EEE, Sri Ramakrishna Engineering College. All rights reserved.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <span style={{ fontSize: 12, color: '#71717a' }}>
                                Developer: <strong style={{ color: '#d4d4d8' }}>Nithin Annamalai R</strong> · <a href="mailto:tutorwardapp@gmail.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>tutorwardapp@gmail.com</a>
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
