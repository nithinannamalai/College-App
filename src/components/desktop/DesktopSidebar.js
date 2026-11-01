import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { 
    Home, Bell, Sparkles, BookOpen, Calendar, GraduationCap, Award, 
    FileText, UserCheck, Map, Inbox, Zap, Shield, Phone, User, LogOut, 
    LogIn, ChevronRight, Gamepad2, Bug, Compass, Clock, ShieldCheck
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
    const initials = userName.charAt(0).toUpperCase();

    return (
        _jsxs("aside", { 
            className: "desktop-permanent-sidebar",
            style: {
                width: 270,
                minWidth: 270,
                height: '100vh',
                position: 'sticky',
                top: 0,
                background: '#ffffff',
                borderRight: '1px solid rgba(0, 82, 204, 0.08)',
                boxShadow: '4px 0 24px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 200,
                overflowY: 'auto'
            },
            children: [
                // Top section: Brand & User profile
                _jsxs("div", { children: [
                    // Brand Header
                    _jsxs("div", { 
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '24px 20px 20px',
                            borderBottom: '1px solid rgba(0, 82, 204, 0.06)'
                        },
                        children: [
                            _jsx("div", { 
                                style: { 
                                    width: 42, 
                                    height: 42, 
                                    borderRadius: 12, 
                                    overflow: 'hidden', 
                                    border: '1.5px solid rgba(0, 82, 204, 0.2)',
                                    boxShadow: '0 4px 12px rgba(0, 82, 204, 0.15)',
                                    flexShrink: 0
                                }, 
                                children: _jsx("img", { src: appLogo, alt: "Logo", style: { width: '100%', height: '100%', objectFit: 'cover' } }) 
                            }),
                            _jsxs("div", { children: [
                                _jsx("h2", { style: { fontSize: 16, fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: -0.3 }, children: "Tutor Ward App" }),
                                _jsx("span", { style: { fontSize: 10, fontWeight: 800, color: '#0052cc', textTransform: 'uppercase', letterSpacing: 0.5 }, children: "SREC \u00B7 DEPT OF EEE" })
                            ] })
                        ] 
                    }),

                    // User Profile Card
                    _jsxs("div", { 
                        onClick: () => isAuthenticated ? onSelectTab('profile-details') : onOpenSignIn(),
                        style: {
                            margin: '14px 16px',
                            padding: '12px 14px',
                            borderRadius: 16,
                            background: 'linear-gradient(135deg, rgba(0, 82, 204, 0.05) 0%, rgba(37, 99, 235, 0.08) 100%)',
                            border: '1px solid rgba(0, 82, 204, 0.12)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
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
                                        background: 'linear-gradient(135deg, #0052cc 0%, #2563eb 100%)', 
                                        color: '#ffffff', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        fontWeight: 900, 
                                        fontSize: 15,
                                        boxShadow: '0 4px 10px rgba(0, 82, 204, 0.3)'
                                    }, 
                                    children: isAuthenticated ? initials : 'G' 
                                }),
                                _jsx("div", { style: { position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#10b981', border: '1.5px solid #ffffff' } })
                            ] }),
                            _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                                _jsx("div", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: isAuthenticated ? userName : 'Guest User' }),
                                _jsx("div", { style: { fontSize: 10.5, color: '#64748b', fontWeight: 600 }, children: isAuthenticated ? `Roll: ${rollNo}` : 'Tap to Sign In' })
                            ] }),
                            _jsx(ChevronRight, { size: 14, style: { color: '#94a3b8' } })
                        ] 
                    }),

                    // Navigation Menu Links
                    _jsxs("div", { 
                        style: { 
                            padding: '8px 14px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: 4 
                        },
                        children: [
                            _jsx("div", { style: { fontSize: 9.5, fontWeight: 900, color: '#94a3b8', letterSpacing: 0.8, textTransform: 'uppercase', padding: '8px 10px 4px' }, children: "WORKSPACE" }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === null ? 'active' : ''}`,
                                onClick: () => onSelectTab(null),
                                children: [_jsx(Home, { size: 16 }), _jsx("span", { children: "Home Dashboard" })]
                            }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === 'profile-details' ? 'active' : ''}`,
                                onClick: () => onSelectTab('profile-details'),
                                children: [_jsx(ShieldCheck, { size: 16, style: { color: '#0284c7' } }), _jsx("span", { children: "Smart ID & Pass" })]
                            }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === 'announcements' ? 'active' : ''}`,
                                onClick: () => onSelectTab('announcements'),
                                children: [_jsx(Bell, { size: 16, style: { color: '#d97706' } }), _jsx("span", { children: "Notice Board & Events" })]
                            }),

                            _jsx("div", { style: { fontSize: 9.5, fontWeight: 900, color: '#94a3b8', letterSpacing: 0.8, textTransform: 'uppercase', padding: '14px 10px 4px' }, children: "ACADEMICS & SERVICES" }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === 'academics' ? 'active' : ''}`,
                                onClick: () => onSelectTab('academics'),
                                children: [_jsx(BookOpen, { size: 16, style: { color: '#0052cc' } }), _jsx("span", { children: "Curriculum & Syllabi" })]
                            }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === 'attendance' ? 'active' : ''}`,
                                onClick: () => onSelectTab('attendance'),
                                children: [_jsx(UserCheck, { size: 16, style: { color: '#059669' } }), _jsx("span", { children: "Attendance Radar" })]
                            }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === 'timetable' ? 'active' : ''}`,
                                onClick: () => onSelectTab('timetable'),
                                children: [_jsx(Clock, { size: 16, style: { color: '#ea580c' } }), _jsx("span", { children: "Class Timetable" })]
                            }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === 'cgpa-calc' ? 'active' : ''}`,
                                onClick: () => onSelectTab('cgpa-calc'),
                                children: [_jsx(Award, { size: 16, style: { color: '#d97706' } }), _jsx("span", { children: "Target GPA Simulator" })]
                            }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === 'request-letters' ? 'active' : ''}`,
                                onClick: () => onSelectTab('request-letters'),
                                children: [_jsx(FileText, { size: 16, style: { color: '#0891b2' } }), _jsx("span", { children: "OD & Letter Requests" })]
                            }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === 'lab-finder' ? 'active' : ''}`,
                                onClick: () => onSelectTab('lab-finder'),
                                children: [_jsx(Compass, { size: 16, style: { color: '#4f46e5' } }), _jsx("span", { children: "Lab Seat Finder" })]
                            }),

                            _jsx("div", { style: { fontSize: 9.5, fontWeight: 900, color: '#94a3b8', letterSpacing: 0.8, textTransform: 'uppercase', padding: '14px 10px 4px' }, children: "INTELLIGENCE & CAMPUS" }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === 'ai' ? 'active' : ''}`,
                                onClick: () => onSelectTab('ai'),
                                children: [_jsx(Sparkles, { size: 16, style: { color: '#8b5cf6' } }), _jsx("span", { children: "24/7 AI Neural Tutor" })]
                            }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === 'career' ? 'active' : ''}`,
                                onClick: () => onSelectTab('career'),
                                children: [_jsx(Zap, { size: 16, style: { color: '#db2777' } }), _jsx("span", { children: "Career Hub & GATE" })]
                            }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === 'puzzle-games' ? 'active' : ''}`,
                                onClick: () => onSelectTab('puzzle-games'),
                                children: [_jsx(Gamepad2, { size: 16, style: { color: '#9333ea' } }), _jsx("span", { children: "Mind & Brain Games" })]
                            }),
                            _jsxs("button", {
                                className: `sidebar-nav-item ${currentTab === 'bug-report' ? 'active' : ''}`,
                                onClick: () => onSelectTab('bug-report'),
                                children: [_jsx(Bug, { size: 16, style: { color: '#dc2626' } }), _jsx("span", { children: "Report an Issue" })]
                            }),

                            isAdmin && (
                                _jsxs(_Fragment, { children: [
                                    _jsx("div", { style: { fontSize: 9.5, fontWeight: 900, color: '#0052cc', letterSpacing: 0.8, textTransform: 'uppercase', padding: '14px 10px 4px' }, children: "FACULTY CONTROLS" }),
                                    _jsxs("button", {
                                        className: `sidebar-nav-item ${currentTab === 'student-manager' ? 'active' : ''}`,
                                        onClick: () => onSelectTab('student-manager'),
                                        children: [_jsx(UserCheck, { size: 16, style: { color: '#0052cc' } }), _jsx("span", { children: "Student Management DB" })]
                                    })
                                ] })
                            )
                        ]
                    })
                ] }),

                // Bottom section: Sign out & developer info
                _jsxs("div", { 
                    style: { 
                        padding: '16px', 
                        borderTop: '1px solid rgba(0, 82, 204, 0.08)',
                        background: '#fafafa'
                    },
                    children: [
                        _jsxs("div", { style: { fontSize: 10, color: '#64748b', lineHeight: 1.4, marginBottom: 12 }, children: [
                            _jsx("div", { style: { fontWeight: 900, color: '#0f172a' }, children: "Tutor Ward App v2.5" }),
                            _jsxs("div", { children: ["Developer: ", _jsx("strong", { children: "Nithin Annamalai R" })] }),
                            _jsx("a", { href: "mailto:tutorwardapp@gmail.com", style: { color: '#0052cc', textDecoration: 'none', fontWeight: 700 }, children: "tutorwardapp@gmail.com" })
                        ] }),

                        isAuthenticated ? (
                            _jsxs("button", {
                                onClick: onLogout,
                                style: {
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: 12,
                                    border: '1.5px solid #fee2e2',
                                    background: '#fef2f2',
                                    color: '#dc2626',
                                    fontSize: 12,
                                    fontWeight: 800,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 6,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                },
                                children: [_jsx(LogOut, { size: 14 }), " Sign Out"]
                            })
                        ) : (
                            _jsxs("button", {
                                onClick: onOpenSignIn,
                                style: {
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: 12,
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #0052cc 0%, #2563eb 100%)',
                                    color: '#ffffff',
                                    fontSize: 12,
                                    fontWeight: 800,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 6,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(0, 82, 204, 0.3)'
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
