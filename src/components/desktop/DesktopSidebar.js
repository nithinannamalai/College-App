import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { 
    Home, Bell, Sparkles, BookOpen, Calendar, GraduationCap, Award, 
    FileText, UserCheck, Map, Inbox, Zap, Shield, Phone, User, LogOut, 
    LogIn, ChevronRight, Gamepad2, Bug, Compass, Clock, ShieldCheck,
    Layers, Cpu, BookMarked
} from 'lucide-react';
import appLogo from '../../assets/app-logo.png';

export const DesktopSidebar = ({ 
    currentTab, 
    onSelectTab, 
    isAuthenticated, 
    currentUser, 
    isAdmin = false, 
    onOpenSignIn, 
    onLogout 
}) => {
    const userName = currentUser?.name || 'Nithin Annamalai R';
    const rollNo = currentUser?.rollNo || '71812503104';
    const className = currentUser?.className || 'II EEE-B';
    const initials = userName.charAt(0).toUpperCase();

    const navItem = (tabKey, icon, label, badge = null, color = '#0284c7') => {
        const isActive = (tabKey === null && currentTab === null) || (tabKey !== null && currentTab === tabKey);
        return (
            _jsxs("button", {
                type: "button",
                onClick: () => onSelectTab(tabKey),
                style: {
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 14,
                    border: isActive ? '1.5px solid rgba(2, 132, 199, 0.35)' : '1.5px solid transparent',
                    background: isActive ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(37, 99, 235, 0.08) 100%)' : 'transparent',
                    color: isActive ? '#0284c7' : '#334155',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: 13,
                    cursor: 'pointer',
                    transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                    textAlign: 'left'
                },
                onMouseEnter: (e) => {
                    if (!isActive) {
                        e.currentTarget.style.background = 'rgba(241, 245, 249, 0.8)';
                        e.currentTarget.style.color = '#0f172a';
                        e.currentTarget.style.transform = 'translateX(3px)';
                    }
                },
                onMouseLeave: (e) => {
                    if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#334155';
                        e.currentTarget.style.transform = 'translateX(0)';
                    }
                },
                children: [
                    _jsxs("div", {
                        style: { display: 'flex', alignItems: 'center', gap: 11 },
                        children: [
                            _jsx("div", {
                                style: {
                                    width: 28,
                                    height: 28,
                                    borderRadius: 8,
                                    background: isActive ? 'rgba(2, 132, 199, 0.15)' : 'rgba(241, 245, 249, 0.9)',
                                    color: isActive ? '#0284c7' : color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease'
                                },
                                children: icon
                            }),
                            _jsx("span", { children: label })
                        ]
                    }),
                    badge && (
                        _jsx("span", {
                            style: {
                                fontSize: 9.5,
                                fontWeight: 900,
                                padding: '2px 7px',
                                borderRadius: 99,
                                background: isActive ? '#0284c7' : 'rgba(2, 132, 199, 0.12)',
                                color: isActive ? '#ffffff' : '#0284c7',
                                letterSpacing: 0.3
                            },
                            children: badge
                        })
                    )
                ]
            }, tabKey || 'home')
        );
    };

    return (
        _jsxs("aside", { 
            className: "desktop-permanent-sidebar",
            style: {
                width: 280,
                minWidth: 280,
                height: '100vh',
                position: 'sticky',
                top: 0,
                background: '#ffffff',
                borderRight: '1px solid #e2e8f0',
                boxShadow: '4px 0 24px rgba(15, 23, 42, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 200,
                overflowY: 'auto',
                boxSizing: 'border-box'
            },
            children: [
                _jsxs("div", { children: [
                    // Brand Header
                    _jsxs("div", { 
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '24px 20px 20px',
                            borderBottom: '1px solid #f1f5f9'
                        },
                        children: [
                            _jsx("div", { 
                                style: { 
                                    width: 44, 
                                    height: 44, 
                                    borderRadius: 14, 
                                    overflow: 'hidden', 
                                    border: '1.5px solid rgba(2, 132, 199, 0.25)',
                                    boxShadow: '0 4px 14px rgba(2, 132, 199, 0.15)',
                                    flexShrink: 0
                                }, 
                                children: _jsx("img", { src: appLogo, alt: "Logo", style: { width: '100%', height: '100%', objectFit: 'cover' } }) 
                            }),
                            _jsxs("div", { children: [
                                _jsx("h2", { style: { fontSize: 16, fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: -0.3 }, children: "Tutor Ward App" }),
                                _jsx("span", { style: { fontSize: 10, fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: 0.6 }, children: "SREC · DEPT OF EEE" })
                            ] })
                        ] 
                    }),

                    // User Identity Capsule
                    _jsxs("div", { 
                        onClick: () => isAuthenticated ? onSelectTab('profile-details') : onOpenSignIn(),
                        style: {
                            margin: '14px 16px',
                            padding: '12px 14px',
                            borderRadius: 18,
                            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.05) 0%, rgba(37, 99, 235, 0.08) 100%)',
                            border: '1.5px solid rgba(2, 132, 199, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                        },
                        onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-1px)',
                        onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                        children: [
                            _jsxs("div", { style: { position: 'relative' }, children: [
                                _jsx("div", { 
                                    style: { 
                                        width: 38, 
                                        height: 38, 
                                        borderRadius: '50%', 
                                        background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', 
                                        color: '#ffffff', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        fontWeight: 900, 
                                        fontSize: 15,
                                        boxShadow: '0 4px 10px rgba(2, 132, 199, 0.3)'
                                    }, 
                                    children: isAuthenticated ? initials : 'G' 
                                }),
                                _jsx("div", { style: { position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#10b981', border: '1.5px solid #ffffff' } })
                            ] }),
                            _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                                _jsx("div", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: isAuthenticated ? userName : 'Guest User' }),
                                _jsx("div", { style: { fontSize: 10.5, color: '#64748b', fontWeight: 700 }, children: isAuthenticated ? `${className} · ${rollNo}` : 'Tap to Sign In' })
                            ] }),
                            _jsx(ChevronRight, { size: 14, style: { color: '#94a3b8' } })
                        ] 
                    }),

                    // Navigation Category Sections
                    _jsxs("div", { 
                        style: { 
                            padding: '6px 14px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: 2 
                        },
                        children: [
                            // ── OVERVIEW ──
                            _jsx("div", { style: { fontSize: 9.5, fontWeight: 900, color: '#94a3b8', letterSpacing: 0.8, textTransform: 'uppercase', padding: '10px 10px 4px' }, children: "OVERVIEW" }),
                            navItem(null, _jsx(Home, { size: 16 }), "Dashboard Hub"),
                            navItem('profile-details', _jsx(ShieldCheck, { size: 16 }), "Smart Pass & ID", "ACTIVE"),
                            navItem('announcements', _jsx(Bell, { size: 16 }), "Notice Board & Events"),

                            // ── ACADEMICS & TRACKING ──
                            _jsx("div", { style: { fontSize: 9.5, fontWeight: 900, color: '#94a3b8', letterSpacing: 0.8, textTransform: 'uppercase', padding: '14px 10px 4px' }, children: "ACADEMICS" }),
                            navItem('attendance', _jsx(UserCheck, { size: 16 }), "Attendance Radar", "94%"),
                            navItem('academics', _jsx(BookOpen, { size: 16 }), "Curriculum & Syllabi"),
                            navItem('timetable', _jsx(Clock, { size: 16 }), "Class Timetable"),
                            navItem('cgpa-calc', _jsx(Award, { size: 16 }), "Target GPA Simulator"),

                            // ── SERVICES & LABS ──
                            _jsx("div", { style: { fontSize: 9.5, fontWeight: 900, color: '#94a3b8', letterSpacing: 0.8, textTransform: 'uppercase', padding: '14px 10px 4px' }, children: "SERVICES & LABS" }),
                            navItem('request-letters', _jsx(FileText, { size: 16 }), "OD & Letter Requests"),
                            navItem('lab-finder', _jsx(Compass, { size: 16 }), "Lab Seat Finder"),
                            navItem('career', _jsx(Zap, { size: 16 }), "Career Hub & GATE"),

                            // ── INTELLIGENCE & CAMPUS ──
                            _jsx("div", { style: { fontSize: 9.5, fontWeight: 900, color: '#94a3b8', letterSpacing: 0.8, textTransform: 'uppercase', padding: '14px 10px 4px' }, children: "CAMPUS & AI" }),
                            navItem('ai', _jsx(Sparkles, { size: 16 }), "Personal AI Trainer", "DeepTutor"),
                            navItem('puzzle-games', _jsx(Gamepad2, { size: 16 }), "Mind & Brain Games"),
                            navItem('college-rules', _jsx(Shield, { size: 16 }), "College Regulations"),
                            navItem('campus-map', _jsx(Map, { size: 16 }), "Interactive Campus Map"),
                            navItem('bug-report', _jsx(Bug, { size: 16 }), "Report an Issue"),

                            // ── FACULTY CONTROLS ──
                            isAdmin && (
                                _jsxs(_Fragment, { children: [
                                    _jsx("div", { style: { fontSize: 9.5, fontWeight: 900, color: '#0284c7', letterSpacing: 0.8, textTransform: 'uppercase', padding: '14px 10px 4px' }, children: "FACULTY MANAGEMENT" }),
                                    navItem('student-manager', _jsx(UserCheck, { size: 16 }), "Student Database Dossiers", "VIP")
                                ] })
                            )
                        ]
                    })
                ] }),

                // Footer section
                _jsxs("div", { 
                    style: { 
                        padding: '16px 20px', 
                        borderTop: '1px solid #f1f5f9',
                        background: '#f8fafc'
                    },
                    children: [
                        _jsxs("div", { style: { fontSize: 10.5, color: '#64748b', lineHeight: 1.5, marginBottom: 12 }, children: [
                            _jsx("div", { style: { fontWeight: 900, color: '#0f172a' }, children: "Tutor Ward App · v2.6 Desktop" }),
                            _jsxs("div", { children: ["Developer: ", _jsx("strong", { children: "Nithin Annamalai R" })] }),
                            _jsx("a", { href: "mailto:tutorwardapp@gmail.com", style: { color: '#0284c7', textDecoration: 'none', fontWeight: 700 }, children: "tutorwardapp@gmail.com" })
                        ] }),

                        isAuthenticated ? (
                            _jsxs("button", {
                                type: "button",
                                onClick: onLogout,
                                style: {
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: 12,
                                    border: '1.5px solid #fee2e2',
                                    background: '#ffffff',
                                    color: '#dc2626',
                                    fontSize: 12.5,
                                    fontWeight: 800,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 6,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 6px rgba(220, 38, 38, 0.06)'
                                },
                                onMouseEnter: e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#ffffff'; },
                                onMouseLeave: e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#dc2626'; },
                                children: [_jsx(LogOut, { size: 14 }), " Sign Out"]
                            })
                        ) : (
                            _jsxs("button", {
                                type: "button",
                                onClick: onOpenSignIn,
                                style: {
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: 12,
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                                    color: '#ffffff',
                                    fontSize: 12.5,
                                    fontWeight: 800,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 6,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
                                },
                                children: [_jsx(LogIn, { size: 14 }), " Sign In"]
                            })
                        )
                    ]
                })
            ]
        })
    );
};
