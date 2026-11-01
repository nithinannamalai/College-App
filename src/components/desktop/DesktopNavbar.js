import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { 
    Home, Search, Bell, User, BookOpen, Clock, UserCheck, 
    Sparkles, Plus, ShieldCheck, ChevronDown, LogOut, FileText,
    Bot, Award, Compass, ExternalLink, Calendar, Zap
} from 'lucide-react';
import appLogo from '../../assets/app-logo.png';

export const DesktopNavbar = ({ 
    currentTab, 
    activeBottomNav, 
    onSelectTab, 
    onOpenSearch, 
    currentUser, 
    isAuthenticated, 
    onOpenSignIn, 
    onLogout 
}) => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const userName = currentUser?.name || 'Nithin Annamalai R';
    const rollNo = currentUser?.rollNo || '71812503104';
    const className = currentUser?.className || 'II EEE-B';
    const initials = userName.charAt(0).toUpperCase();

    const navLinks = [
        { key: null, label: 'Dashboard', icon: _jsx(Home, { size: 14 }) },
        { key: 'attendance', label: 'Attendance', icon: _jsx(UserCheck, { size: 14 }) },
        { key: 'academics', label: 'Curriculum', icon: _jsx(BookOpen, { size: 14 }) },
        { key: 'timetable', label: 'Timetable', icon: _jsx(Clock, { size: 14 }) },
        { key: 'request-letters', label: 'OD Requests', icon: _jsx(FileText, { size: 14 }) },
        { key: 'ai', label: 'AI Tutor', icon: _jsx(Bot, { size: 14 }), badge: '2.0' },
    ];

    return (
        _jsxs("header", {
            className: "desktop-top-navbar",
            style: {
                position: 'sticky',
                top: 0,
                zIndex: 150,
                width: '100%',
                height: 68,
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1.5px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 32px',
                boxSizing: 'border-box'
            },
            children: [
                // ── LEFT: PORTAL CONTEXT & ACTIVE SESSION ──
                _jsxs("div", {
                    style: { display: 'flex', alignItems: 'center', gap: 14 },
                    children: [
                        _jsxs("div", {
                            onClick: () => onSelectTab(null),
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '7px 14px',
                                borderRadius: 99,
                                background: 'rgba(2, 132, 199, 0.08)',
                                border: '1.5px solid rgba(2, 132, 199, 0.2)',
                                color: '#0284c7',
                                fontWeight: 800,
                                fontSize: 12.5,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            },
                            children: [
                                _jsx(Sparkles, { size: 14, style: { color: '#0284c7' } }),
                                _jsx("span", { children: "Department of EEE" }),
                                _jsx("span", { style: { color: '#94a3b8' }, children: "•" }),
                                _jsx("span", { style: { color: '#0f172a' }, children: "Autonomous Portal" })
                            ]
                        }),

                        // Live Academic Status Pill
                        _jsxs("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                padding: '6px 12px',
                                borderRadius: 99,
                                fontSize: 11.5,
                                fontWeight: 800,
                                color: '#475569'
                            },
                            children: [
                                _jsx("span", {
                                    style: {
                                        width: 7,
                                        height: 7,
                                        borderRadius: '50%',
                                        background: '#10b981',
                                        display: 'inline-block',
                                        boxShadow: '0 0 8px #10b981'
                                    }
                                }),
                                "Sem IV · Period 3 Active"
                            ]
                        })
                    ]
                }),

                // ── CENTER: NAVIGATION LINKS PILL ROW ──
                _jsx("nav", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        background: '#f1f5f9',
                        padding: '4px',
                        borderRadius: 99,
                        border: '1px solid #e2e8f0'
                    },
                    children: navLinks.map(link => {
                        const isActive = (link.key === null && currentTab === null) || (link.key !== null && currentTab === link.key);
                        return (
                            _jsxs("button", {
                                type: "button",
                                onClick: () => onSelectTab(link.key),
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 7,
                                    padding: '7px 16px',
                                    borderRadius: 99,
                                    border: 'none',
                                    background: isActive ? '#ffffff' : 'transparent',
                                    color: isActive ? '#0284c7' : '#64748b',
                                    fontSize: 12.5,
                                    fontWeight: isActive ? 900 : 700,
                                    cursor: 'pointer',
                                    boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                                    transition: 'all 0.18s ease'
                                },
                                onMouseEnter: (e) => {
                                    if (!isActive) e.currentTarget.style.color = '#0f172a';
                                },
                                onMouseLeave: (e) => {
                                    if (!isActive) e.currentTarget.style.color = '#64748b';
                                },
                                children: [
                                    link.icon,
                                    link.label,
                                    link.badge && (
                                        _jsx("span", {
                                            style: {
                                                fontSize: 9,
                                                fontWeight: 900,
                                                padding: '1px 5px',
                                                borderRadius: 99,
                                                background: isActive ? '#0284c7' : 'rgba(2, 132, 199, 0.15)',
                                                color: isActive ? '#ffffff' : '#0284c7'
                                            },
                                            children: link.badge
                                        })
                                    )
                                ]
                            }, link.label)
                        );
                    })
                }),

                // ── RIGHT: SEARCH, QUICK ACTIONS, NOTICES, PROFILE ──
                _jsxs("div", {
                    style: { display: 'flex', alignItems: 'center', gap: 12 },
                    children: [
                        // Quick Search Palette Button
                        _jsxs("button", {
                            type: "button",
                            onClick: onOpenSearch,
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                background: '#f8fafc',
                                border: '1px solid #cbd5e1',
                                borderRadius: 99,
                                padding: '7px 16px',
                                color: '#64748b',
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.02)'
                            },
                            onMouseEnter: (e) => { e.currentTarget.style.borderColor = '#0284c7'; },
                            onMouseLeave: (e) => { e.currentTarget.style.borderColor = '#cbd5e1'; },
                            children: [
                                _jsx(Search, { size: 14, style: { color: '#0284c7' } }),
                                _jsx("span", { children: "Quick Search" }),
                                _jsx("kbd", {
                                    style: {
                                        background: '#ffffff',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: 6,
                                        padding: '1px 6px',
                                        fontSize: 10,
                                        fontWeight: 900,
                                        color: '#334155'
                                    },
                                    children: "Ctrl K"
                                })
                            ]
                        }),

                        // Apply OD Fast Pill
                        _jsxs("button", {
                            type: "button",
                            onClick: () => onSelectTab('request-letters'),
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                                border: 'none',
                                borderRadius: 99,
                                padding: '8px 16px',
                                color: '#ffffff',
                                fontSize: 12,
                                fontWeight: 800,
                                cursor: 'pointer',
                                boxShadow: '0 3px 12px rgba(2, 132, 199, 0.35)',
                                transition: 'all 0.2s ease'
                            },
                            children: [
                                _jsx(Plus, { size: 14 }),
                                "Apply OD"
                            ]
                        }),

                        // Notice Bell
                        _jsxs("button", {
                            type: "button",
                            onClick: () => onSelectTab('announcements'),
                            "aria-label": "Notifications",
                            style: {
                                position: 'relative',
                                width: 38,
                                height: 38,
                                borderRadius: '50%',
                                border: '1px solid #e2e8f0',
                                background: '#ffffff',
                                color: '#475569',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            },
                            children: [
                                _jsx(Bell, { size: 17 }),
                                _jsx("span", {
                                    style: {
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        background: '#dc2626',
                                        boxShadow: '0 0 8px #dc2626'
                                    }
                                })
                            ]
                        }),

                        // User Profile Capsule & Dropdown
                        _jsxs("div", {
                            style: { position: 'relative' },
                            children: [
                                _jsxs("div", {
                                    onClick: () => setIsProfileMenuOpen(!isProfileMenuOpen),
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        padding: '4px 12px 4px 6px',
                                        borderRadius: 99,
                                        background: '#f8fafc',
                                        border: '1.5px solid #e2e8f0',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    },
                                    children: [
                                        _jsx("div", {
                                            style: {
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                                                color: '#ffffff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: 13,
                                                fontWeight: 900,
                                                boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
                                            },
                                            children: initials
                                        }),
                                        _jsxs("div", {
                                            style: { textAlign: 'left' },
                                            children: [
                                                _jsx("div", {
                                                    style: { fontSize: 12.5, fontWeight: 900, color: '#0f172a', lineHeight: 1.1 },
                                                    children: userName.split(' ')[0]
                                                }),
                                                _jsx("div", {
                                                    style: { fontSize: 10, color: '#64748b', fontWeight: 700 },
                                                    children: className
                                                })
                                            ]
                                        }),
                                        _jsx(ChevronDown, { size: 14, style: { color: '#94a3b8' } })
                                    ]
                                }),

                                // Dropdown menu
                                isProfileMenuOpen && (
                                    _jsxs("div", {
                                        style: {
                                            position: 'absolute',
                                            top: '120%',
                                            right: 0,
                                            width: 240,
                                            background: '#ffffff',
                                            borderRadius: 18,
                                            border: '1.5px solid #e2e8f0',
                                            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
                                            padding: '12px',
                                            zIndex: 200,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4
                                        },
                                        children: [
                                            _jsxs("div", {
                                                style: { padding: '8px 12px 12px', borderBottom: '1px solid #f1f5f9' },
                                                children: [
                                                    _jsx("div", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a' }, children: userName }),
                                                    _jsx("div", { style: { fontSize: 11, color: '#64748b', marginTop: 2 }, children: `Roll No: ${rollNo}` }),
                                                    _jsx("div", { style: { fontSize: 10, color: '#0284c7', fontWeight: 800, marginTop: 4 }, children: "Sri Ramakrishna Eng College" })
                                                ]
                                            }),
                                            _jsxs("button", {
                                                type: "button",
                                                onClick: () => { onSelectTab('profile-details'); setIsProfileMenuOpen(false); },
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 10,
                                                    padding: '9px 12px',
                                                    borderRadius: 10,
                                                    border: 'none',
                                                    background: 'transparent',
                                                    color: '#0f172a',
                                                    fontSize: 12.5,
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    textAlign: 'left'
                                                },
                                                onMouseEnter: e => e.currentTarget.style.background = '#f8fafc',
                                                onMouseLeave: e => e.currentTarget.style.background = 'transparent',
                                                children: [_jsx(ShieldCheck, { size: 16, style: { color: '#0284c7' } }), "Smart Pass & ID"]
                                            }),
                                            _jsxs("button", {
                                                type: "button",
                                                onClick: () => { onSelectTab('profile'); setIsProfileMenuOpen(false); },
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 10,
                                                    padding: '9px 12px',
                                                    borderRadius: 10,
                                                    border: 'none',
                                                    background: 'transparent',
                                                    color: '#0f172a',
                                                    fontSize: 12.5,
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    textAlign: 'left'
                                                },
                                                onMouseEnter: e => e.currentTarget.style.background = '#f8fafc',
                                                onMouseLeave: e => e.currentTarget.style.background = 'transparent',
                                                children: [_jsx(FileText, { size: 16, style: { color: '#059669' } }), "Document Vault"]
                                            }),
                                            _jsxs("button", {
                                                type: "button",
                                                onClick: () => { onSelectTab('cgpa-calc'); setIsProfileMenuOpen(false); },
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 10,
                                                    padding: '9px 12px',
                                                    borderRadius: 10,
                                                    border: 'none',
                                                    background: 'transparent',
                                                    color: '#0f172a',
                                                    fontSize: 12.5,
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    textAlign: 'left'
                                                },
                                                onMouseEnter: e => e.currentTarget.style.background = '#f8fafc',
                                                onMouseLeave: e => e.currentTarget.style.background = 'transparent',
                                                children: [_jsx(Award, { size: 16, style: { color: '#d97706' } }), "GPA Calculator"]
                                            }),
                                            _jsxs("button", {
                                                type: "button",
                                                onClick: () => { onLogout(); setIsProfileMenuOpen(false); },
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 10,
                                                    padding: '9px 12px',
                                                    borderRadius: 10,
                                                    border: 'none',
                                                    background: '#fef2f2',
                                                    color: '#dc2626',
                                                    fontSize: 12.5,
                                                    fontWeight: 800,
                                                    cursor: 'pointer',
                                                    textAlign: 'left',
                                                    marginTop: 4
                                                },
                                                children: [_jsx(LogOut, { size: 15 }), "Sign Out"]
                                            })
                                        ]
                                    })
                                )
                            ]
                        })
                    ]
                })
            ]
        })
    );
};

