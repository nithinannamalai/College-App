import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { 
    Search, Award, UserCheck, FileText, ArrowRight, Bot, BookOpen, 
    Clock, Compass, Layers, ShieldCheck, Sparkles, TrendingUp, 
    Calendar, CheckCircle2, AlertCircle, Plus, ExternalLink, Hash, 
    GraduationCap, Bell, MapPin, Gamepad2, Bug, Shield
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

    // Derived statistics
    const totalClasses = attendanceLogs.length || 120;
    const attendedClasses = attendanceLogs.filter(l => l.status === 'present').length || 113;
    const attendancePercentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 94.5;
    const currentCgpa = studentData?.cgpa ? (Object.values(studentData.cgpa).slice(-1)[0]?.gpa || 8.75) : 8.75;
    const approvedODCount = odRequests.filter(r => r.status === 'Approved').length || 4;
    const nptelCount = studentData?.nptelExams?.length || 2;

    const quickModules = [
        { key: 'academics', label: 'Curriculum & Syllabi', icon: _jsx(BookOpen, { size: 18 }), color: '#0284c7', bg: '#eff6ff', desc: 'Lecture notes & archives' },
        { key: 'attendance', label: 'Attendance Radar', icon: _jsx(UserCheck, { size: 18 }), color: '#059669', bg: '#ecfdf5', desc: 'Hourly subject check' },
        { key: 'timetable', label: 'Class Timetable', icon: _jsx(Clock, { size: 18 }), color: '#d97706', bg: '#fffbeb', desc: 'Daily period grid' },
        { key: 'cgpa-calc', label: 'GPA Calculator', icon: _jsx(Award, { size: 18 }), color: '#ea580c', bg: '#fff7ed', desc: 'Target simulation' },
        { key: 'ai', label: 'AI Neural Tutor', icon: _jsx(Bot, { size: 18 }), color: '#7c3aed', bg: '#f5f3ff', desc: '24/7 Gemini solver' },
        { key: 'profile-details', label: 'Smart Pass & ID', icon: _jsx(ShieldCheck, { size: 18 }), color: '#2563eb', bg: '#eff6ff', desc: 'Biometric pass' },
        { key: 'request-letters', label: 'OD & Bonafide', icon: _jsx(FileText, { size: 18 }), color: '#0891b2', bg: '#ecfeff', desc: 'Instant PDF export' },
        { key: 'lab-finder', label: 'Lab Seat Finder', icon: _jsx(Compass, { size: 18 }), color: '#4f46e5', bg: '#eef2ff', desc: 'Workstation status' },
        { key: 'career', label: 'Career Roadmaps', icon: _jsx(Sparkles, { size: 18 }), color: '#db2777', bg: '#fdf2f8', desc: 'Core & IT placement' },
        { key: 'puzzle-games', label: 'Mind Games', icon: _jsx(Gamepad2, { size: 18 }), color: '#9333ea', bg: '#faf5ff', desc: 'Brain cognitive puzzles' },
    ];

    const filteredModules = searchQuery.trim()
        ? quickModules.filter(m => m.label.toLowerCase().includes(searchQuery.toLowerCase()) || m.desc.toLowerCase().includes(searchQuery.toLowerCase()))
        : quickModules;

    return (
        _jsxs("div", { 
            className: "desktop-visionos-dashboard",
            style: {
                padding: '32px 40px 60px',
                maxWidth: 1440,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 28,
                animation: 'pageSlideUpFluid 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            },
            children: [
                // ── 1. HEADER ROW: GREETING, SEARCH & QUICK CTAs ──
                _jsxs("div", { 
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 16
                    },
                    children: [
                        _jsxs("div", { children: [
                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }, children: [
                                _jsxs("span", { 
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
                                    children: [isAdmin ? '👨‍🏫 Faculty Portal' : `🎓 ${className} · Roll: ${rollNo}`] 
                                }),
                                _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: [
                                    _jsx("span", { style: { width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 10px #10b981' } }),
                                    _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#64748b' }, children: "Campus Systems Live" })
                                ] })
                            ] }),
                            _jsxs("h1", { 
                                style: { 
                                    fontSize: 28, 
                                    fontWeight: 950, 
                                    color: '#0f172a', 
                                    margin: 0, 
                                    letterSpacing: -0.6 
                                }, 
                                children: [
                                    "Welcome back, ", 
                                    userName
                                ] 
                            }),
                            _jsxs("p", { 
                                style: { 
                                    fontSize: 12.5, 
                                    color: '#64748b', 
                                    margin: '3px 0 0 0', 
                                    fontWeight: 600 
                                }, 
                                children: [
                                    "Sri Ramakrishna Engineering College \u00B7 Department of Electrical & Electronics Engineering"
                                ] 
                            })
                        ] }),

                        // Search Bar & Action Buttons
                        _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12 }, children: [
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
                                        placeholder: "Search features, syllabi, notes...", 
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
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                                            transition: 'border-color 0.2s ease'
                                        }
                                    })
                                ] 
                            }),
                            _jsxs("button", {
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
                                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                                    transition: 'all 0.2s ease'
                                },
                                children: [_jsx(Plus, { size: 14 }), " Apply OD"]
                            }),
                            _jsxs("button", {
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
                                    cursor: 'pointer'
                                },
                                children: [_jsx(Bot, { size: 14 }), " AI Tutor"]
                            })
                        ] })
                    ]
                }),

                // ── 2. TOP 4 VISIONOS KPI CARDS ──
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
                                borderRadius: 24,
                                padding: '22px',
                                border: '1.5px solid rgba(2, 132, 199, 0.18)',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                                cursor: 'pointer',
                                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            },
                            onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-4px)',
                            onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                            children: [
                                _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, children: [
                                    _jsx("div", { style: { width: 42, height: 42, borderRadius: 14, background: '#eff6ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(UserCheck, { size: 20 }) }),
                                    _jsx("span", { style: { fontSize: 10, fontWeight: 900, background: '#dcfce7', color: '#16a34a', padding: '3px 8px', borderRadius: 99 }, children: "● Safe Zone" })
                                ] }),
                                _jsx("span", { style: { fontSize: 11.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Overall Attendance" }),
                                _jsxs("h2", { style: { fontSize: 32, fontWeight: 950, color: '#0f172a', margin: '4px 0 2px 0', letterSpacing: -1 }, children: [attendancePercentage, "%"] }),
                                _jsx("p", { style: { fontSize: 11, color: '#16a34a', margin: 0, fontWeight: 700 }, children: "✓ +18 Classes Buffer Available" })
                            ]
                        }),

                        // Card 2: CGPA
                        _jsxs("div", { 
                            onClick: () => onOpenTab('cgpa-calc'),
                            style: {
                                background: '#ffffff',
                                borderRadius: 24,
                                padding: '22px',
                                border: '1.5px solid rgba(22, 163, 74, 0.18)',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                                cursor: 'pointer',
                                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            },
                            onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-4px)',
                            onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                            children: [
                                _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, children: [
                                    _jsx("div", { style: { width: 42, height: 42, borderRadius: 14, background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(Award, { size: 20 }) }),
                                    _jsx("span", { style: { fontSize: 10, fontWeight: 900, background: '#f0fdf4', color: '#16a34a', padding: '3px 8px', borderRadius: 99 }, children: "Distinction" })
                                ] }),
                                _jsx("span", { style: { fontSize: 11.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Cumulative CGPA" }),
                                _jsxs("h2", { style: { fontSize: 32, fontWeight: 950, color: '#0f172a', margin: '4px 0 2px 0', letterSpacing: -1 }, children: [currentCgpa, " / 10"] }),
                                _jsx("p", { style: { fontSize: 11, color: '#64748b', margin: 0, fontWeight: 700 }, children: "Ranked Top 5% in Dept of EEE" })
                            ]
                        }),

                        // Card 3: Earned Credits
                        _jsxs("div", { 
                            onClick: () => onOpenTab('courses'),
                            style: {
                                background: '#ffffff',
                                borderRadius: 24,
                                padding: '22px',
                                border: '1.5px solid rgba(217, 119, 6, 0.18)',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                                cursor: 'pointer',
                                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            },
                            onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-4px)',
                            onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                            children: [
                                _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, children: [
                                    _jsx("div", { style: { width: 42, height: 42, borderRadius: 14, background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(GraduationCap, { size: 20 }) }),
                                    _jsx("span", { style: { fontSize: 10, fontWeight: 900, background: '#fffbeb', color: '#b45309', padding: '3px 8px', borderRadius: 99 }, children: "73.7% Done" })
                                ] }),
                                _jsx("span", { style: { fontSize: 11.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Earned Credits" }),
                                _jsx("h2", { style: { fontSize: 32, fontWeight: 950, color: '#0f172a', margin: '4px 0 2px 0', letterSpacing: -1 }, children: "118 / 160" }),
                                _jsx("p", { style: { fontSize: 11, color: '#64748b', margin: 0, fontWeight: 700 }, children: "Regulation 2022 (Choice Based)" })
                            ]
                        }),

                        // Card 4: Approved Leaves / Arrears
                        _jsxs("div", { 
                            onClick: () => onOpenTab('profile-details'),
                            style: {
                                background: '#ffffff',
                                borderRadius: 24,
                                padding: '22px',
                                border: '1.5px solid rgba(124, 58, 237, 0.18)',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                                cursor: 'pointer',
                                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            },
                            onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-4px)',
                            onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                            children: [
                                _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, children: [
                                    _jsx("div", { style: { width: 42, height: 42, borderRadius: 14, background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(ShieldCheck, { size: 20 }) }),
                                    _jsx("span", { style: { fontSize: 10, fontWeight: 900, background: '#f5f3ff', color: '#6d28d9', padding: '3px 8px', borderRadius: 99 }, children: "0 Arrears" })
                                ] }),
                                _jsx("span", { style: { fontSize: 11.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Standing Status" }),
                                _jsx("h2", { style: { fontSize: 32, fontWeight: 950, color: '#0f172a', margin: '4px 0 2px 0', letterSpacing: -1 }, children: "All Cleared" }),
                                _jsx("p", { style: { fontSize: 11, color: '#16a34a', margin: 0, fontWeight: 700 }, children: "✓ Standing Arrears: Nil (Clear)" })
                            ]
                        })
                    ]
                }),

                // ── 3. INTERACTIVE CENTER WORKSPACE: TIMETABLE & GPA PREDICTION ──
                _jsxs("div", { 
                    style: { 
                        display: 'grid', 
                        gridTemplateColumns: '1.2fr 1fr', 
                        gap: 20 
                    },
                    children: [
                        // Left: Today's Live Class Timetable Tracker
                        _jsxs("div", { 
                            style: {
                                background: '#ffffff',
                                borderRadius: 28,
                                padding: '24px',
                                border: '1px solid rgba(0, 82, 204, 0.1)',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)'
                            },
                            children: [
                                _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }, children: [
                                    _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: [
                                        _jsx("div", { style: { width: 36, height: 36, borderRadius: 12, background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(Clock, { size: 18 }) }),
                                        _jsxs("div", { children: [
                                            _jsx("h3", { style: { fontSize: 16, fontWeight: 900, color: '#0f172a', margin: 0 }, children: "Today's Schedule & Live Class" }),
                                            _jsx("p", { style: { fontSize: 11, color: '#64748b', margin: 0 }, children: "Semester III · Electrical & Electronics Engineering" })
                                        ] })
                                    ] }),
                                    _jsxs("button", { 
                                        onClick: () => onOpenTab('timetable'), 
                                        style: { background: 'none', border: 'none', color: '#0052cc', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 },
                                        children: ["Full Timetable ", _jsx(ArrowRight, { size: 13 })]
                                    })
                                ] }),

                                // Active live class banner
                                _jsxs("div", { 
                                    style: {
                                        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
                                        borderRadius: 20,
                                        padding: '16px 20px',
                                        color: '#ffffff',
                                        marginBottom: 16,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        boxShadow: '0 8px 20px rgba(15, 23, 42, 0.25)'
                                    },
                                    children: [
                                        _jsxs("div", { children: [
                                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }, children: [
                                                _jsx("span", { style: { width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' } }),
                                                _jsx("span", { style: { fontSize: 10.5, fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase' }, children: "LIVE PERIOD IN SESSION" })
                                            ] }),
                                            _jsx("h4", { style: { fontSize: 16, fontWeight: 900, margin: '0 0 2px 0' }, children: "Control Systems (25EE2201)" }),
                                            _jsx("span", { style: { fontSize: 11.5, opacity: 0.8 }, children: "Faculty: Dr. S. Kavitha \u00B7 Hall C-204 \u00B7 10:45 AM \u2013 11:35 AM" })
                                        ] }),
                                        _jsx("span", { style: { padding: '6px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.15)', fontSize: 11, fontWeight: 800, border: '1px solid rgba(255,255,255,0.25)' }, children: "Period 3" })
                                    ]
                                }),

                                // Upcoming periods list
                                _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [
                                    _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                        _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: [
                                            _jsx("span", { style: { fontSize: 10, fontWeight: 900, background: '#e0f2fe', color: '#0284c7', padding: '3px 8px', borderRadius: 6 }, children: "P4" }),
                                            _jsxs("div", { children: [
                                                _jsx("span", { style: { fontSize: 12.5, fontWeight: 800, color: '#0f172a', display: 'block' }, children: "Power Electronics" }),
                                                _jsx("span", { style: { fontSize: 10, color: '#64748b' }, children: "11:35 AM \u2013 12:25 PM \u00B7 Hall C-204" })
                                            ] })
                                        ] }),
                                        _jsx("span", { style: { fontSize: 11, fontWeight: 700, color: '#64748b' }, children: "Next Up" })
                                    ] }),
                                    _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                        _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: [
                                            _jsx("span", { style: { fontSize: 10, fontWeight: 900, background: '#fef3c7', color: '#d97706', padding: '3px 8px', borderRadius: 6 }, children: "P5-6" }),
                                            _jsxs("div", { children: [
                                                _jsx("span", { style: { fontSize: 12.5, fontWeight: 800, color: '#0f172a', display: 'block' }, children: "DC Machines & Transformers Lab" }),
                                                _jsx("span", { style: { fontSize: 10, color: '#64748b' }, children: "01:10 PM \u2013 02:50 PM \u00B7 Machines Lab Block" })
                                            ] })
                                        ] }),
                                        _jsx("span", { style: { fontSize: 10.5, fontWeight: 800, color: '#d97706', background: '#fffbeb', padding: '2px 8px', borderRadius: 6 }, children: "Practical" })
                                    ] })
                                ] })
                            ]
                        }),

                        // Right: Semester GPA Visualizer & Target Tracker
                        _jsxs("div", { 
                            style: {
                                background: '#ffffff',
                                borderRadius: 28,
                                padding: '24px',
                                border: '1px solid rgba(0, 82, 204, 0.1)',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            },
                            children: [
                                _jsxs("div", { children: [
                                    _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, children: [
                                        _jsx("h3", { style: { fontSize: 16, fontWeight: 900, color: '#0f172a', margin: 0 }, children: "Semester GPA Trajectory" }),
                                        _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: 99 }, children: "+0.32 Distinction" })
                                    ] }),
                                    _jsx("p", { style: { fontSize: 11.5, color: '#64748b', margin: '0 0 16px 0' }, children: "Historical grade trends across completed semesters at SREC" }),
                                    
                                    // Visual SVG Trend Chart
                                    _jsx("div", { 
                                        style: { width: '100%', height: 120, position: 'relative', marginBottom: 14 }, 
                                        children: _jsxs("svg", { viewBox: "0 0 400 120", style: { width: '100%', height: '100%' }, children: [
                                            _jsx("defs", { children: _jsxs("linearGradient", { id: "dashGrad", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
                                                _jsx("stop", { offset: "0%", stopColor: "#2563eb", stopOpacity: "0.25" }),
                                                _jsx("stop", { offset: "100%", stopColor: "#2563eb", stopOpacity: "0.0" })
                                            ] }) }),
                                            _jsx("path", { d: "M0,90 Q80,40 160,65 T320,30 T400,20", stroke: "#2563eb", strokeWidth: "3.5", fill: "none" }),
                                            _jsx("path", { d: "M0,90 Q80,40 160,65 T320,30 T400,20 L400,120 L0,120 Z", fill: "url(#dashGrad)" })
                                        ] }) 
                                    })
                                ] }),

                                // Bottom Target Box
                                _jsxs("div", { 
                                    style: {
                                        background: 'rgba(0, 82, 204, 0.05)',
                                        border: '1px solid rgba(0, 82, 204, 0.12)',
                                        borderRadius: 18,
                                        padding: '14px 16px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        _jsxs("div", { children: [
                                            _jsx("span", { style: { fontSize: 10, fontWeight: 900, color: '#0052cc', textTransform: 'uppercase', display: 'block' }, children: "Target CGPA Goal" }),
                                            _jsx("strong", { style: { fontSize: 16, color: '#0f172a' }, children: "9.00 / 10.00" })
                                        ] }),
                                        _jsxs("button", {
                                            onClick: () => onOpenTab('cgpa-calc'),
                                            style: {
                                                padding: '8px 14px',
                                                borderRadius: 12,
                                                border: 'none',
                                                background: '#0052cc',
                                                color: '#ffffff',
                                                fontSize: 11.5,
                                                fontWeight: 800,
                                                cursor: 'pointer'
                                            },
                                            children: ["Simulate GPA \u2192"]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),

                // ── 4. COMMAND MODULE HUB (10 MODULES GRID) ──
                _jsxs("div", { 
                    style: {
                        background: '#ffffff',
                        borderRadius: 28,
                        padding: '24px',
                        border: '1px solid rgba(0, 82, 204, 0.1)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)'
                    },
                    children: [
                        _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }, children: [
                            _jsxs("div", { children: [
                                _jsx("h3", { style: { fontSize: 16, fontWeight: 900, color: '#0f172a', margin: 0 }, children: "⚡ Department Command Hub" }),
                                _jsx("p", { style: { fontSize: 11.5, color: '#64748b', margin: '2px 0 0 0' }, children: "Access official academic tools, document repositories, and campus utilities" })
                            ] }),
                            _jsxs("span", { style: { fontSize: 11, fontWeight: 800, color: '#0052cc', background: 'rgba(0,82,204,0.08)', padding: '4px 10px', borderRadius: 99 }, children: [filteredModules.length, " Modules Available"] })
                        ] }),

                        _jsx("div", { 
                            style: { 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(5, 1fr)', 
                                gap: 14 
                            }, 
                            children: filteredModules.map(m => (
                                _jsxs("button", {
                                    key: m.key,
                                    onClick: () => onOpenTab(m.key),
                                    style: {
                                        background: '#f8fafc',
                                        border: `1.5px solid ${m.color}25`,
                                        borderRadius: 20,
                                        padding: '16px 14px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        textAlign: 'left',
                                        gap: 8,
                                        cursor: 'pointer',
                                        transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    },
                                    onMouseEnter: e => {
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                        e.currentTarget.style.boxShadow = `0 10px 24px ${m.color}20`;
                                        e.currentTarget.style.borderColor = m.color;
                                    },
                                    onMouseLeave: e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.borderColor = `${m.color}25`;
                                    },
                                    children: [
                                        _jsx("div", { style: { width: 38, height: 38, borderRadius: 12, background: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: m.icon }),
                                        _jsxs("div", { children: [
                                            _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a', display: 'block' }, children: m.label }),
                                            _jsx("span", { style: { fontSize: 10.5, color: '#64748b', fontWeight: 600 }, children: m.desc })
                                        ] })
                                    ]
                                }, m.key)
                            )) 
                        })
                    ]
                }),

                // ── 5. DESKTOP ACCREDITATION & DEVELOPER FOOTER ──
                _jsxs("div", { 
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px 8px',
                        borderTop: '1px solid #e2e8f0',
                        fontSize: 11.5,
                        color: '#64748b'
                    },
                    children: [
                        _jsx("span", { children: "\u00A9 2026 Tutor Ward App \u00B7 Sri Ramakrishna Engineering College \u00B7 Department of EEE" }),
                        _jsxs("span", { children: [
                            "Lead Developer: ",
                            _jsx("strong", { style: { color: '#0f172a' }, children: "Nithin Annamalai R" }),
                            " (",
                            _jsx("a", { href: "mailto:tutorwardapp@gmail.com", style: { color: '#0052cc', fontWeight: 800 }, children: "tutorwardapp@gmail.com" }),
                            ")"
                        ] })
                    ]
                })
            ] 
        })
    );
};
