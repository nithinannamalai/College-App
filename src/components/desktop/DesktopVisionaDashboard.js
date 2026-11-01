import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { 
    Search, Award, UserCheck, FileText, ArrowRight, Bot, BookOpen, 
    Clock, Compass, Layers, ShieldCheck, Sparkles, TrendingUp, 
    Calendar, CheckCircle2, AlertCircle, Plus, ExternalLink, Hash, 
    GraduationCap, Bell, MapPin, Gamepad2, Bug, Shield, User,
    Check, ChevronRight, Zap, RefreshCw, Mail, Phone, Cpu
} from 'lucide-react';
import { dbService } from '../../services/db';

export const DesktopVisionaDashboard = ({ currentUser, onOpenTab }) => {
    const [studentData, setStudentData] = useState(null);
    const [attendanceLogs, setAttendanceLogs] = useState([]);
    const [odRequests, setOdRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const userName = currentUser?.name || 'Nithin Annamalai R';
    const rollNo = currentUser?.rollNo || '71812503104';
    const className = currentUser?.className || 'II EEE-B';
    const email = currentUser?.email || 'nithin@srec.ac.in';
    const isAdmin = currentUser?.role === 'teacher';

    useEffect(() => {
        async function loadSupabaseData() {
            if (!email) return;
            try {
                const [student, attendance, od] = await Promise.all([
                    dbService.getStudentProfile(email),
                    dbService.getAttendanceForStudent(rollNo),
                    dbService.getODRequests(email)
                ]);
                if (student) setStudentData(student);
                if (attendance) setAttendanceLogs(attendance);
                if (od) setOdRequests(od);
            } catch (err) {
                console.warn('Error fetching dashboard data:', err);
            }
        }
        loadSupabaseData();
    }, [email, rollNo]);

    // Statistics & Calculations
    const totalClasses = attendanceLogs.length || 120;
    const attendedClasses = attendanceLogs.filter(l => l.status === 'present').length || 113;
    const attendancePercentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 94;
    const currentCgpa = studentData?.cgpa ? (Object.values(studentData.cgpa).slice(-1)[0]?.gpa || 8.75) : 8.75;
    const approvedODCount = odRequests.filter(r => r.status === 'Approved').length || 4;
    const nptelCount = studentData?.nptelExams?.length || 2;

    // Today's schedule data
    const todayPeriods = [
        { period: 1, time: '08:45 - 09:40', code: 'EE8401', name: 'Electric Drives & Control', hall: 'LH-304', faculty: 'Dr. C. Ezhilarasi', status: 'completed' },
        { period: 2, time: '09:40 - 10:35', code: 'EE8402', name: 'Microprocessors & Microcontrollers', hall: 'LH-304', faculty: 'Prof. M. Suresh', status: 'completed' },
        { period: 3, time: '10:55 - 11:50', code: 'EE8403', name: 'Transmission & Distribution', hall: 'LH-304', faculty: 'Dr. K. Ravichandran', status: 'active' },
        { period: 4, time: '11:50 - 12:45', code: 'EE8404', name: 'Linear Integrated Circuits', hall: 'LH-304', faculty: 'Prof. S. Preethi', status: 'upcoming' },
        { period: 5, time: '01:30 - 02:25', code: 'EE8411', name: 'Power Electronics Laboratory', hall: 'Lab 2', faculty: 'Dr. C. Ezhilarasi', status: 'upcoming' },
        { period: 6, time: '02:25 - 03:20', code: 'EE8411', name: 'Power Electronics Laboratory', hall: 'Lab 2', faculty: 'Dr. C. Ezhilarasi', status: 'upcoming' },
        { period: 7, time: '03:20 - 04:15', code: 'EE8421', name: 'Technical Seminar & Circuit Simulation', hall: 'Comp Lab', faculty: 'Prof. R. Anand', status: 'upcoming' }
    ];

    // Core Academic Modules
    const academicModules = [
        { key: 'attendance', title: 'Attendance Radar', icon: _jsx(UserCheck, { size: 20 }), color: '#059669', bg: '#ecfdf5', desc: 'Hourly tracking & buffer calculation' },
        { key: 'academics', title: 'Curriculum & Syllabi', icon: _jsx(BookOpen, { size: 20 }), color: '#0284c7', bg: '#eff6ff', desc: 'Course materials, notes & question banks' },
        { key: 'timetable', title: 'Class Timetable', icon: _jsx(Clock, { size: 20 }), color: '#d97706', bg: '#fffbeb', desc: 'Daily period schedule & lab rotations' },
        { key: 'cgpa-calc', title: 'Target GPA Simulator', icon: _jsx(Award, { size: 20 }), color: '#ea580c', bg: '#fff7ed', desc: 'Arrear-free semester GPA planning' },
        { key: 'request-letters', title: 'OD & Request Letters', icon: _jsx(FileText, { size: 20 }), color: '#0891b2', bg: '#ecfeff', desc: 'On-duty applications & Bonafide PDFs' },
        { key: 'lab-finder', title: 'Lab Seat Finder', icon: _jsx(Compass, { size: 20 }), color: '#4f46e5', bg: '#eef2ff', desc: 'Live computer & workstation availability' },
        { key: 'career', title: 'Career Roadmaps & GATE', icon: _jsx(Sparkles, { size: 20 }), color: '#db2777', bg: '#fdf2f8', desc: 'Core electrical & IT recruitment prep' },
        { key: 'ai', title: '24/7 AI Neural Tutor', icon: _jsx(Bot, { size: 20 }), color: '#7c3aed', bg: '#f5f3ff', desc: 'Gemini-powered circuit & theory tutor' },
        { key: 'puzzle-games', title: 'Mind & Brain Games', icon: _jsx(Gamepad2, { size: 20 }), color: '#9333ea', bg: '#faf5ff', desc: 'Cognitive circuit & logic puzzles' },
    ];

    const filteredModules = searchQuery.trim()
        ? academicModules.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.desc.toLowerCase().includes(searchQuery.toLowerCase()))
        : academicModules;

    // Greeting
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

    return (
        _jsxs("div", {
            className: "desktop-visionos-dashboard",
            style: {
                padding: '28px 40px 60px',
                maxWidth: 1440,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                boxSizing: 'border-box',
                animation: 'pageSlideUpFluid 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            },
            children: [
                // ── 1. TOP HEADER & QUICK ACTION BAR ──
                _jsxs("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 16
                    },
                    children: [
                        _jsxs("div", {
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 },
                                    children: [
                                        _jsx("span", {
                                            style: {
                                                fontSize: 11,
                                                fontWeight: 900,
                                                color: '#0284c7',
                                                background: 'rgba(2, 132, 199, 0.1)',
                                                padding: '3px 10px',
                                                borderRadius: 99,
                                                border: '1px solid rgba(2, 132, 199, 0.25)',
                                                textTransform: 'uppercase',
                                                letterSpacing: 0.5
                                            },
                                            children: isAdmin ? '👨‍🏫 Faculty Portal' : `🎓 ${className} · Roll: ${rollNo}`
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'flex', alignItems: 'center', gap: 6 },
                                            children: [
                                                _jsx("span", {
                                                    style: {
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: '50%',
                                                        background: '#10b981',
                                                        display: 'inline-block',
                                                        boxShadow: '0 0 10px #10b981'
                                                    }
                                                }),
                                                _jsx("span", {
                                                    style: { fontSize: 11, fontWeight: 800, color: '#64748b' },
                                                    children: "Campus Systems Live"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                _jsxs("h1", {
                                    style: {
                                        fontSize: 28,
                                        fontWeight: 950,
                                        color: '#0f172a',
                                        margin: 0,
                                        letterSpacing: -0.6
                                    },
                                    children: [
                                        `${greeting}, `,
                                        userName
                                    ]
                                }),
                                _jsx("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#64748b',
                                        margin: '3px 0 0 0',
                                        fontWeight: 600
                                    },
                                    children: "Sri Ramakrishna Engineering College · Department of Electrical & Electronics Engineering"
                                })
                            ]
                        }),

                        // Search and CTAs
                        _jsxs("div", {
                            style: { display: 'flex', alignItems: 'center', gap: 12 },
                            children: [
                                _jsxs("div", {
                                    style: {
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: 320
                                    },
                                    children: [
                                        _jsx(Search, { size: 16, style: { position: 'absolute', left: 14, color: '#94a3b8' } }),
                                        _jsx("input", {
                                            type: "text",
                                            placeholder: "Search features, notes, syllabi...",
                                            value: searchQuery,
                                            onChange: e => setSearchQuery(e.target.value),
                                            style: {
                                                width: '100%',
                                                padding: '10px 14px 10px 40px',
                                                borderRadius: 99,
                                                border: '1.5px solid #cbd5e1',
                                                background: '#ffffff',
                                                fontSize: 12.5,
                                                fontWeight: 600,
                                                color: '#0f172a',
                                                outline: 'none',
                                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                                                transition: 'border-color 0.2s ease'
                                            }
                                        })
                                    ]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => onOpenTab('request-letters'),
                                    style: {
                                        padding: '10px 18px',
                                        borderRadius: 99,
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                                        color: '#ffffff',
                                        fontSize: 12.5,
                                        fontWeight: 800,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                                        transition: 'all 0.2s ease'
                                    },
                                    children: [_jsx(Plus, { size: 14 }), " Apply OD"]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => onOpenTab('ai'),
                                    style: {
                                        padding: '10px 18px',
                                        borderRadius: 99,
                                        border: '1.5px solid rgba(124, 58, 237, 0.3)',
                                        background: '#faf5ff',
                                        color: '#7c3aed',
                                        fontSize: 12.5,
                                        fontWeight: 800,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    },
                                    children: [_jsx(Bot, { size: 14 }), " AI Tutor"]
                                })
                            ]
                        })
                    ]
                }),

                // ── 2. HERO IDENTITY & LIVE STATUS BANNER ──
                _jsxs("div", {
                    style: {
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0369a1 100%)',
                        borderRadius: 24,
                        padding: '24px 30px',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 20,
                        boxShadow: '0 12px 36px rgba(15, 23, 42, 0.15)',
                        position: 'relative',
                        overflow: 'hidden'
                    },
                    children: [
                        _jsxs("div", {
                            style: { display: 'flex', alignItems: 'center', gap: 18, zIndex: 2 },
                            children: [
                                _jsx("div", {
                                    style: {
                                        width: 58,
                                        height: 58,
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 22,
                                        fontWeight: 950,
                                        color: '#ffffff',
                                        boxShadow: '0 4px 16px rgba(2, 132, 199, 0.4)',
                                        border: '2px solid rgba(255, 255, 255, 0.4)'
                                    },
                                    children: userName.charAt(0)
                                }),
                                _jsxs("div", {
                                    children: [
                                        _jsxs("div", {
                                            style: { display: 'flex', alignItems: 'center', gap: 10 },
                                            children: [
                                                _jsx("h2", {
                                                    style: { fontSize: 20, fontWeight: 900, margin: 0, color: '#ffffff' },
                                                    children: userName
                                                }),
                                                _jsx("span", {
                                                    style: {
                                                        fontSize: 10,
                                                        fontWeight: 900,
                                                        background: 'rgba(56, 189, 248, 0.2)',
                                                        color: '#38bdf8',
                                                        border: '1px solid rgba(56, 189, 248, 0.4)',
                                                        padding: '2px 8px',
                                                        borderRadius: 99
                                                    },
                                                    children: "Autonomous Scholar"
                                                })
                                            ]
                                        }),
                                        _jsxs("p", {
                                            style: { margin: '4px 0 0 0', fontSize: 12.5, color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 },
                                            children: [
                                                `Department of EEE · Semester IV · ${className} · Roll No: ${rollNo}`
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),

                        // Fast action pills
                        _jsxs("div", {
                            style: { display: 'flex', gap: 10, zIndex: 2, flexWrap: 'wrap' },
                            children: [
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => onOpenTab('attendance'),
                                    style: {
                                        padding: '8px 16px',
                                        borderRadius: 99,
                                        border: '1px solid rgba(255, 255, 255, 0.25)',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        color: '#ffffff',
                                        fontSize: 12,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(8px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [_jsx(UserCheck, { size: 14 }), " Attendance Radar"]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => onOpenTab('timetable'),
                                    style: {
                                        padding: '8px 16px',
                                        borderRadius: 99,
                                        border: '1px solid rgba(255, 255, 255, 0.25)',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        color: '#ffffff',
                                        fontSize: 12,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(8px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [_jsx(Clock, { size: 14 }), " Period Timetable"]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => onOpenTab('profile-details'),
                                    style: {
                                        padding: '8px 16px',
                                        borderRadius: 99,
                                        border: 'none',
                                        background: '#38bdf8',
                                        color: '#0f172a',
                                        fontSize: 12,
                                        fontWeight: 900,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [_jsx(ShieldCheck, { size: 14 }), " Digital Pass"]
                                })
                            ]
                        })
                    ]
                }),

                // ── 3. TOP 4 EXECUTIVE KPI CARDS ──
                _jsxs("div", {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 18
                    },
                    children: [
                        // Card 1: Attendance
                        _jsxs("div", {
                            onClick: () => onOpenTab('attendance'),
                            style: {
                                background: '#ffffff',
                                borderRadius: 22,
                                padding: '22px',
                                border: '1.5px solid rgba(2, 132, 199, 0.15)',
                                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)',
                                cursor: 'pointer',
                                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                            },
                            onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-3px)',
                            onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
                                    children: [
                                        _jsx("div", {
                                            style: { width: 40, height: 40, borderRadius: 12, background: '#eff6ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' },
                                            children: _jsx(UserCheck, { size: 20 })
                                        }),
                                        _jsx("span", {
                                            style: { fontSize: 10, fontWeight: 900, background: '#dcfce7', color: '#16a34a', padding: '3px 8px', borderRadius: 99 },
                                            children: "● Safe > 75%"
                                        })
                                    ]
                                }),
                                _jsx("span", { style: { fontSize: 11.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Overall Attendance" }),
                                _jsxs("h2", { style: { fontSize: 32, fontWeight: 950, color: '#0f172a', margin: '4px 0 2px 0', letterSpacing: -1 }, children: [attendancePercentage, "%"] }),
                                _jsxs("p", { style: { fontSize: 11, color: '#16a34a', margin: 0, fontWeight: 700 }, children: ["✓ ", attendedClasses, " / ", totalClasses, " Classes Attended"] })
                            ]
                        }),

                        // Card 2: CGPA
                        _jsxs("div", {
                            onClick: () => onOpenTab('cgpa-calc'),
                            style: {
                                background: '#ffffff',
                                borderRadius: 22,
                                padding: '22px',
                                border: '1.5px solid rgba(22, 163, 74, 0.15)',
                                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)',
                                cursor: 'pointer',
                                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                            },
                            onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-3px)',
                            onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
                                    children: [
                                        _jsx("div", {
                                            style: { width: 40, height: 40, borderRadius: 12, background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' },
                                            children: _jsx(Award, { size: 20 })
                                        }),
                                        _jsx("span", {
                                            style: { fontSize: 10, fontWeight: 900, background: '#eff6ff', color: '#0284c7', padding: '3px 8px', borderRadius: 99 },
                                            children: "Top 5% Distinction"
                                        })
                                    ]
                                }),
                                _jsx("span", { style: { fontSize: 11.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Current Cumulative CGPA" }),
                                _jsxs("h2", { style: { fontSize: 32, fontWeight: 950, color: '#0f172a', margin: '4px 0 2px 0', letterSpacing: -1 }, children: [currentCgpa, " / 10"] }),
                                _jsx("p", { style: { fontSize: 11, color: '#0284c7', margin: 0, fontWeight: 700 }, children: "0 Active Arrears · Sem IV Clear" })
                            ]
                        }),

                        // Card 3: OD & Approvals
                        _jsxs("div", {
                            onClick: () => onOpenTab('request-letters'),
                            style: {
                                background: '#ffffff',
                                borderRadius: 22,
                                padding: '22px',
                                border: '1.5px solid rgba(217, 119, 6, 0.15)',
                                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)',
                                cursor: 'pointer',
                                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                            },
                            onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-3px)',
                            onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
                                    children: [
                                        _jsx("div", {
                                            style: { width: 40, height: 40, borderRadius: 12, background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' },
                                            children: _jsx(FileText, { size: 20 })
                                        }),
                                        _jsx("span", {
                                            style: { fontSize: 10, fontWeight: 900, background: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: 99 },
                                            children: "Verified by HOD"
                                        })
                                    ]
                                }),
                                _jsx("span", { style: { fontSize: 11.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "On-Duty Approvals" }),
                                _jsxs("h2", { style: { fontSize: 32, fontWeight: 950, color: '#0f172a', margin: '4px 0 2px 0', letterSpacing: -1 }, children: [approvedODCount, " Approved"] }),
                                _jsx("p", { style: { fontSize: 11, color: '#d97706', margin: 0, fontWeight: 700 }, children: "1 Request in verification" })
                            ]
                        }),

                        // Card 4: NPTEL & Honors
                        _jsxs("div", {
                            onClick: () => onOpenTab('career'),
                            style: {
                                background: '#ffffff',
                                borderRadius: 22,
                                padding: '22px',
                                border: '1.5px solid rgba(124, 58, 237, 0.15)',
                                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)',
                                cursor: 'pointer',
                                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                            },
                            onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-3px)',
                            onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
                                    children: [
                                        _jsx("div", {
                                            style: { width: 40, height: 40, borderRadius: 12, background: '#faf5ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' },
                                            children: _jsx(Sparkles, { size: 20 })
                                        }),
                                        _jsx("span", {
                                            style: { fontSize: 10, fontWeight: 900, background: '#ede9fe', color: '#6d28d9', padding: '3px 8px', borderRadius: 99 },
                                            children: "IIT Madras / Kharagpur"
                                        })
                                    ]
                                }),
                                _jsx("span", { style: { fontSize: 11.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "NPTEL & Value Added" }),
                                _jsxs("h2", { style: { fontSize: 32, fontWeight: 950, color: '#0f172a', margin: '4px 0 2px 0', letterSpacing: -1 }, children: [nptelCount, " Certified"] }),
                                _jsx("p", { style: { fontSize: 11, color: '#7c3aed', margin: 0, fontWeight: 700 }, children: "Elite + Silver Award Holder" })
                            ]
                        })
                    ]
                }),

                // ── 4. TWO-COLUMN WORKSPACE: LEFT (65%) SCHEDULE & MODULES, RIGHT (35%) NOTICES & TUTOR ──
                _jsxs("div", {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: '1.7fr 1fr',
                        gap: 24,
                        alignItems: 'start'
                    },
                    children: [
                        // Left Column
                        _jsxs("div", {
                            style: { display: 'flex', flexDirection: 'column', gap: 24 },
                            children: [
                                // Today's Class Timetable Tracker
                                _jsxs("div", {
                                    style: {
                                        background: '#ffffff',
                                        borderRadius: 24,
                                        border: '1.5px solid #e2e8f0',
                                        padding: '24px 28px',
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
                                    },
                                    children: [
                                        _jsxs("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: 18,
                                                paddingBottom: 14,
                                                borderBottom: '1px solid #f1f5f9'
                                            },
                                            children: [
                                                _jsxs("div", {
                                                    children: [
                                                        _jsxs("h3", {
                                                            style: { fontSize: 17, fontWeight: 950, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 8 },
                                                            children: [_jsx(Clock, { size: 18, style: { color: '#0284c7' } }), "Today's Academic Schedule · Monday"]
                                                        }),
                                                        _jsx("p", { style: { fontSize: 12, color: '#64748b', margin: '3px 0 0 0', fontWeight: 600 }, children: "Real-time class period progress tracker" })
                                                    ]
                                                }),
                                                _jsxs("button", {
                                                    type: "button",
                                                    onClick: () => onOpenTab('timetable'),
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        background: '#eff6ff',
                                                        border: '1px solid #bfdbfe',
                                                        borderRadius: 99,
                                                        padding: '6px 14px',
                                                        fontSize: 11.5,
                                                        fontWeight: 800,
                                                        color: '#0284c7',
                                                        cursor: 'pointer'
                                                    },
                                                    children: ["Full Timetable ", _jsx(ChevronRight, { size: 14 })]
                                                })
                                            ]
                                        }),

                                        // Period list
                                        _jsx("div", {
                                            style: { display: 'flex', flexDirection: 'column', gap: 10 },
                                            children: todayPeriods.map((p) => {
                                                const isActive = p.status === 'active';
                                                const isCompleted = p.status === 'completed';
                                                return (
                                                    _jsxs("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            padding: '12px 16px',
                                                            borderRadius: 14,
                                                            border: isActive ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
                                                            background: isActive ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(37, 99, 235, 0.05) 100%)' : isCompleted ? '#f8fafc' : '#ffffff',
                                                            transition: 'all 0.2s ease'
                                                        },
                                                        children: [
                                                            _jsxs("div", {
                                                                style: { display: 'flex', alignItems: 'center', gap: 14 },
                                                                children: [
                                                                    _jsx("div", {
                                                                        style: {
                                                                            width: 34,
                                                                            height: 34,
                                                                            borderRadius: 10,
                                                                            background: isActive ? '#0284c7' : isCompleted ? '#e2e8f0' : '#f1f5f9',
                                                                            color: isActive ? '#ffffff' : isCompleted ? '#64748b' : '#0f172a',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            fontWeight: 900,
                                                                            fontSize: 13
                                                                        },
                                                                        children: `P${p.period}`
                                                                    }),
                                                                    _jsxs("div", {
                                                                        children: [
                                                                            _jsxs("div", {
                                                                                style: { display: 'flex', alignItems: 'center', gap: 8 },
                                                                                children: [
                                                                                    _jsx("span", { style: { fontSize: 13.5, fontWeight: 900, color: '#0f172a' }, children: p.name }),
                                                                                    _jsx("span", { style: { fontSize: 10, fontWeight: 800, color: '#64748b', background: '#f1f5f9', padding: '1px 6px', borderRadius: 4 }, children: p.code })
                                                                                ]
                                                                            }),
                                                                            _jsxs("div", {
                                                                                style: { fontSize: 11, color: '#64748b', marginTop: 2, fontWeight: 600 },
                                                                                children: [
                                                                                    `Faculty: ${p.faculty} · Room: ${p.hall}`
                                                                                ]
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            _jsxs("div", {
                                                                style: { textAlign: 'right' },
                                                                children: [
                                                                    _jsx("div", { style: { fontSize: 11.5, fontWeight: 800, color: '#0f172a' }, children: p.time }),
                                                                    _jsx("span", {
                                                                        style: {
                                                                            fontSize: 9.5,
                                                                            fontWeight: 900,
                                                                            padding: '2px 8px',
                                                                            borderRadius: 99,
                                                                            background: isActive ? '#dbeafe' : isCompleted ? '#dcfce7' : '#f1f5f9',
                                                                            color: isActive ? '#0284c7' : isCompleted ? '#16a34a' : '#64748b'
                                                                        },
                                                                        children: isActive ? '⚡ ONGOING' : isCompleted ? '✓ Done' : 'Upcoming'
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }, p.period)
                                                );
                                            })
                                        })
                                    ]
                                }),

                                // Core Academic Services Grid
                                _jsxs("div", {
                                    style: {
                                        background: '#ffffff',
                                        borderRadius: 24,
                                        border: '1.5px solid #e2e8f0',
                                        padding: '24px 28px',
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
                                    },
                                    children: [
                                        _jsxs("div", {
                                            style: { marginBottom: 18 },
                                            children: [
                                                _jsx("h3", { style: { fontSize: 17, fontWeight: 950, color: '#0f172a', margin: 0 }, children: "Department Portals & Workflows" }),
                                                _jsx("p", { style: { fontSize: 12, color: '#64748b', margin: '3px 0 0 0', fontWeight: 600 }, children: "Quick jump to verified modules and engineering resources" })
                                            ]
                                        }),
                                        _jsx("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(3, 1fr)',
                                                gap: 14
                                            },
                                            children: filteredModules.map((m) => (
                                                _jsxs("div", {
                                                    onClick: () => onOpenTab(m.key),
                                                    style: {
                                                        padding: '16px',
                                                        borderRadius: 16,
                                                        border: '1px solid #e2e8f0',
                                                        background: '#ffffff',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                                                    },
                                                    onMouseEnter: (e) => {
                                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                                        e.currentTarget.style.borderColor = m.color;
                                                        e.currentTarget.style.boxShadow = `0 8px 20px ${m.color}20`;
                                                    },
                                                    onMouseLeave: (e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.02)';
                                                    },
                                                    children: [
                                                        _jsx("div", {
                                                            style: {
                                                                width: 38,
                                                                height: 38,
                                                                borderRadius: 12,
                                                                background: m.bg,
                                                                color: m.color,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                marginBottom: 10
                                                            },
                                                            children: m.icon
                                                        }),
                                                        _jsx("h4", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a', margin: '0 0 3px 0' }, children: m.title }),
                                                        _jsx("p", { style: { fontSize: 11, color: '#64748b', margin: 0, lineHeight: 1.4 }, children: m.desc })
                                                    ]
                                                }, m.key)
                                            ))
                                        })
                                    ]
                                })
                            ]
                        }),

                        // Right Column
                        _jsxs("div", {
                            style: { display: 'flex', flexDirection: 'column', gap: 24 },
                            children: [
                                // Notice Board & Circulars Card
                                _jsxs("div", {
                                    style: {
                                        background: '#ffffff',
                                        borderRadius: 24,
                                        border: '1.5px solid #e2e8f0',
                                        padding: '24px',
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
                                    },
                                    children: [
                                        _jsxs("div", {
                                            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
                                            children: [
                                                _jsxs("h3", { style: { fontSize: 16, fontWeight: 950, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsx(Bell, { size: 16, style: { color: '#d97706' } }), "Notice Board & Events"] }),
                                                _jsx("span", { style: { fontSize: 10, fontWeight: 900, background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: 99 }, children: "LIVE" })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'flex', flexDirection: 'column', gap: 12 },
                                            children: [
                                                _jsxs("div", {
                                                    style: { padding: '12px 14px', borderRadius: 14, background: '#f8fafc', border: '1px solid #f1f5f9' },
                                                    children: [
                                                        _jsxs("div", {
                                                            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
                                                            children: [
                                                                _jsx("span", { style: { fontSize: 9.5, fontWeight: 900, background: '#fee2e2', color: '#dc2626', padding: '1px 6px', borderRadius: 4 }, children: "INTERNAL EXAM" }),
                                                                _jsx("span", { style: { fontSize: 10.5, color: '#94a3b8' }, children: "Nov 5, 2026" })
                                                            ]
                                                        }),
                                                        _jsx("div", { style: { fontSize: 12.5, fontWeight: 800, color: '#0f172a' }, children: "Continuous Assessment Test 2 (CAT-2)" }),
                                                        _jsx("p", { style: { fontSize: 11, color: '#64748b', margin: '3px 0 0 0' }, children: "Seating arrangement and room plan published in portal." })
                                                    ]
                                                }),
                                                _jsxs("div", {
                                                    style: { padding: '12px 14px', borderRadius: 14, background: '#f8fafc', border: '1px solid #f1f5f9' },
                                                    children: [
                                                        _jsxs("div", {
                                                            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
                                                            children: [
                                                                _jsx("span", { style: { fontSize: 9.5, fontWeight: 900, background: '#eff6ff', color: '#0284c7', padding: '1px 6px', borderRadius: 4 }, children: "SYMPOSIUM" }),
                                                                _jsx("span", { style: { fontSize: 10.5, color: '#94a3b8' }, children: "Nov 14, 2026" })
                                                            ]
                                                        }),
                                                        _jsx("div", { style: { fontSize: 12.5, fontWeight: 800, color: '#0f172a' }, children: "National EEE Technical Fest 'VOLTS 26'" }),
                                                        _jsx("p", { style: { fontSize: 11, color: '#64748b', margin: '3px 0 0 0' }, children: "Project display, circuit debugging and paper presentations." })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),

                                // Department Tutor Ward Mentorship Card
                                _jsxs("div", {
                                    style: {
                                        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.05) 0%, rgba(37, 99, 235, 0.08) 100%)',
                                        borderRadius: 24,
                                        border: '1.5px solid rgba(2, 132, 199, 0.2)',
                                        padding: '24px',
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
                                    },
                                    children: [
                                        _jsx("span", { style: { fontSize: 10, fontWeight: 900, color: '#0284c7', textTransform: 'uppercase', letterSpacing: 0.6 }, children: "ASSIGNED FACULTY TUTOR" }),
                                        _jsxs("div", {
                                            style: { display: 'flex', alignItems: 'center', gap: 14, margin: '14px 0' },
                                            children: [
                                                _jsx("div", {
                                                    style: { width: 48, height: 48, borderRadius: 14, background: '#0284c7', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18 },
                                                    children: "CE"
                                                }),
                                                _jsxs("div", {
                                                    children: [
                                                        _jsx("h4", { style: { fontSize: 14.5, fontWeight: 950, color: '#0f172a', margin: 0 }, children: "Dr. C. Ezhilarasi, Ph.D." }),
                                                        _jsx("p", { style: { fontSize: 11.5, color: '#64748b', margin: '2px 0 0 0', fontWeight: 600 }, children: "Associate Professor · Dept of EEE" }),
                                                        _jsx("span", { style: { fontSize: 10.5, color: '#0284c7', fontWeight: 800 }, children: "Cabin: Room 214, EEE Block" })
                                                    ]
                                                })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'flex', gap: 8 },
                                            children: [
                                                _jsxs("a", {
                                                    href: "mailto:hod.eee@srec.ac.in",
                                                    style: {
                                                        flex: 1,
                                                        padding: '8px 12px',
                                                        borderRadius: 10,
                                                        background: '#ffffff',
                                                        border: '1px solid #cbd5e1',
                                                        color: '#0f172a',
                                                        fontSize: 11.5,
                                                        fontWeight: 800,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: 6,
                                                        textDecoration: 'none'
                                                    },
                                                    children: [_jsx(Mail, { size: 14 }), " Email Tutor"]
                                                }),
                                                _jsxs("button", {
                                                    type: "button",
                                                    onClick: () => onOpenTab('request-letters'),
                                                    style: {
                                                        flex: 1,
                                                        padding: '8px 12px',
                                                        borderRadius: 10,
                                                        background: '#0284c7',
                                                        border: 'none',
                                                        color: '#ffffff',
                                                        fontSize: 11.5,
                                                        fontWeight: 800,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: 6,
                                                        cursor: 'pointer'
                                                    },
                                                    children: [_jsx(FileText, { size: 14 }), " Request OD"]
                                                })
                                            ]
                                        })
                                    ]
                                }),

                                // Smart Lab Workstation Status
                                _jsxs("div", {
                                    style: {
                                        background: '#ffffff',
                                        borderRadius: 24,
                                        border: '1.5px solid #e2e8f0',
                                        padding: '24px',
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
                                    },
                                    children: [
                                        _jsxs("div", {
                                            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
                                            children: [
                                                _jsxs("h3", { style: { fontSize: 15, fontWeight: 950, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsx(Compass, { size: 16, style: { color: '#4f46e5' } }), "Live Lab Workstations"] }),
                                                _jsx("span", { style: { fontSize: 10, fontWeight: 800, color: '#16a34a' }, children: "● Real-time" })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'flex', flexDirection: 'column', gap: 10 },
                                            children: [
                                                _jsxs("div", {
                                                    style: { display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700 },
                                                    children: [
                                                        _jsx("span", { style: { color: '#0f172a' }, children: "Power Electronics Lab" }),
                                                        _jsx("span", { style: { color: '#16a34a' }, children: "18 / 32 Free" })
                                                    ]
                                                }),
                                                _jsx("div", { style: { width: '100%', height: 6, borderRadius: 99, background: '#f1f5f9' }, children: _jsx("div", { style: { width: '56%', height: '100%', borderRadius: 99, background: '#16a34a' } }) }),

                                                _jsxs("div", {
                                                    style: { display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginTop: 4 },
                                                    children: [
                                                        _jsx("span", { style: { color: '#0f172a' }, children: "Embedded Systems & IoT" }),
                                                        _jsx("span", { style: { color: '#0284c7' }, children: "24 / 30 Free" })
                                                    ]
                                                }),
                                                _jsx("div", { style: { width: '100%', height: 6, borderRadius: 99, background: '#f1f5f9' }, children: _jsx("div", { style: { width: '80%', height: '100%', borderRadius: 99, background: '#0284c7' } }) })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    );
};
