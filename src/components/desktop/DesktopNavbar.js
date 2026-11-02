import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { 
    Home, Search, Bell, User, BookOpen, Clock, UserCheck, 
    Sparkles, Plus, ShieldCheck, ChevronDown, LogOut, FileText,
    Bot, Award, Compass, ExternalLink, Calendar, Zap, CheckCircle2,
    Command, Layers
} from 'lucide-react';

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
    const [currentTime, setCurrentTime] = useState('');
    const profileMenuRef = useRef(null);

    const userName = currentUser?.name || 'Nithin Annamalai R';
    const rollNo = currentUser?.rollNo || '71812503104';
    const className = currentUser?.className || 'II EEE-B';
    const initials = userName.charAt(0).toUpperCase();

    // Live clock for academic period precision
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateClock();
        const timer = setInterval(updateClock, 30000);
        return () => clearInterval(timer);
    }, []);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
                setIsProfileMenuOpen(false);
            }
        };
        if (isProfileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileMenuOpen]);

    // Primary executive navigation items
    const navLinks = [
        { key: null, label: 'Dashboard', icon: _jsx(Home, { size: 14 }) },
        { key: 'attendance', label: 'Attendance', icon: _jsx(UserCheck, { size: 14 }) },
        { key: 'academics', label: 'Curriculum', icon: _jsx(BookOpen, { size: 14 }) },
        { key: 'timetable', label: 'Timetable', icon: _jsx(Clock, { size: 14 }) },
        { key: 'request-letters', label: 'OD Requests', icon: _jsx(FileText, { size: 14 }) },
        { 
            key: 'ai', 
            label: 'AI Trainer', 
            icon: _jsx(Sparkles, { size: 14, style: { color: currentTab === 'ai' ? '#7c3aed' : '#8b5cf6' } }), 
            badge: 'DeepTutor' 
        },
    ];

    return (
        _jsxs("header", {
            className: "desktop-top-navbar",
            style: {
                position: 'sticky',
                top: 0,
                zIndex: 200,
                width: '100%',
                height: 64,
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: '1px solid rgba(226, 232, 240, 0.85)',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 4px 16px -4px rgba(15, 23, 42, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 28px',
                boxSizing: 'border-box',
                transition: 'all 0.2s ease'
            },
            children: [
                // ── LEFT: INSTITUTION BRAND & ACADEMIC CONTEXT ──
                _jsxs("div", {
                    style: { display: 'flex', alignItems: 'center', gap: 14 },
                    children: [
                        // Institution / Department Context Pill
                        _jsxs("div", {
                            onClick: () => onSelectTab(null),
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                cursor: 'pointer',
                                padding: '5px 10px',
                                borderRadius: 10,
                                transition: 'background 0.15s ease'
                            },
                            onMouseEnter: e => e.currentTarget.style.background = 'rgba(241, 245, 249, 0.8)',
                            onMouseLeave: e => e.currentTarget.style.background = 'transparent',
                            children: [
                                _jsx("div", {
                                    style: {
                                        width: 32,
                                        height: 32,
                                        borderRadius: 9,
                                        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#ffffff',
                                        fontWeight: 900,
                                        fontSize: 13,
                                        boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)',
                                        flexShrink: 0
                                    },
                                    children: _jsx(Zap, { size: 17 })
                                }),
                                _jsxs("div", {
                                    style: { display: 'flex', flexDirection: 'column' },
                                    children: [
                                        _jsxs("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                fontSize: 13,
                                                fontWeight: 800,
                                                color: '#0f172a',
                                                letterSpacing: -0.2
                                            },
                                            children: [
                                                _jsx("span", { children: "Department of EEE" }),
                                                _jsx("span", { style: { fontSize: 10, color: '#94a3b8', fontWeight: 600 }, children: "/" }),
                                                _jsx("span", { style: { fontSize: 11.5, color: '#0284c7', fontWeight: 700 }, children: "SREC" })
                                            ]
                                        }),
                                        _jsx("span", {
                                            style: { fontSize: 10, color: '#64748b', fontWeight: 600, letterSpacing: 0.1 },
                                            children: "Autonomous Academic Portal"
                                        })
                                    ]
                                })
                            ]
                        }),

                        // Vertical Hairline Divider
                        _jsx("div", {
                            style: { width: 1, height: 22, background: '#e2e8f0' }
                        }),

                        // Live Academic Period Status Pill
                        _jsxs("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 7,
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                padding: '5px 12px',
                                borderRadius: 8,
                                fontSize: 11.5,
                                fontWeight: 700,
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
                                        boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
                                    }
                                }),
                                _jsx("span", { children: "Sem IV · Period 3 Active" }),
                                currentTime && (
                                    _jsxs(_Fragment, {
                                        children: [
                                            _jsx("span", { style: { color: '#cbd5e1' }, children: "·" }),
                                            _jsx("span", { style: { color: '#64748b', fontWeight: 600 }, children: currentTime })
                                        ]
                                    })
                                )
                            ]
                        })
                    ]
                }),

                // ── CENTER: SLEEK SEGMENTED NAVIGATION CONTROL ──
                _jsx("nav", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: '#f1f5f9',
                        padding: '4px',
                        borderRadius: 12,
                        border: '1px solid rgba(226, 232, 240, 0.9)'
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
                                    padding: '7px 14px',
                                    borderRadius: 9,
                                    border: 'none',
                                    background: isActive ? '#ffffff' : 'transparent',
                                    color: isActive ? '#0284c7' : '#475569',
                                    fontSize: 12.5,
                                    fontWeight: isActive ? 800 : 600,
                                    cursor: 'pointer',
                                    boxShadow: isActive ? '0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02)' : 'none',
                                    transition: 'all 0.16s cubic-bezier(0.16, 1, 0.3, 1)'
                                },
                                onMouseEnter: (e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.color = '#0f172a';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                                    }
                                },
                                onMouseLeave: (e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.color = '#475569';
                                        e.currentTarget.style.background = 'transparent';
                                    }
                                },
                                children: [
                                    link.icon,
                                    _jsx("span", { children: link.label }),
                                    link.badge && (
                                        _jsx("span", {
                                            style: {
                                                fontSize: 9.5,
                                                fontWeight: 900,
                                                padding: '2px 6px',
                                                borderRadius: 6,
                                                background: isActive 
                                                    ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' 
                                                    : 'rgba(124, 58, 237, 0.12)',
                                                color: isActive ? '#ffffff' : '#7c3aed',
                                                letterSpacing: 0.2
                                            },
                                            children: link.badge
                                        })
                                    )
                                ]
                            }, link.label)
                        );
                    })
                }),

                // ── RIGHT: SEARCH, ACTION PILL, NOTIFICATIONS & PROFILE ──
                _jsxs("div", {
                    style: { display: 'flex', alignItems: 'center', gap: 10 },
                    children: [
                        // Minimalist Omnisearch Bar Trigger
                        _jsxs("button", {
                            type: "button",
                            onClick: onOpenSearch,
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 9,
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: 10,
                                padding: '6px 13px',
                                color: '#64748b',
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            },
                            onMouseEnter: (e) => { 
                                e.currentTarget.style.borderColor = '#0284c7';
                                e.currentTarget.style.background = '#ffffff';
                            },
                            onMouseLeave: (e) => { 
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.background = '#f8fafc';
                            },
                            children: [
                                _jsx(Search, { size: 14, style: { color: '#0284c7' } }),
                                _jsx("span", { children: "Search..." }),
                                _jsxs("kbd", {
                                    style: {
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        background: '#ffffff',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: 5,
                                        padding: '1px 5px',
                                        fontSize: 9.5,
                                        fontWeight: 800,
                                        color: '#475569',
                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)'
                                    },
                                    children: [
                                        _jsx(Command, { size: 9 }),
                                        "K"
                                    ]
                                })
                            ]
                        }),

                        // Quick OD Action Button
                        _jsxs("button", {
                            type: "button",
                            onClick: () => onSelectTab('request-letters'),
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                border: 'none',
                                borderRadius: 10,
                                padding: '7px 14px',
                                color: '#ffffff',
                                fontSize: 12,
                                fontWeight: 800,
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.28)',
                                transition: 'all 0.18s ease'
                            },
                            onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-1px)',
                            onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
                            children: [
                                _jsx(Plus, { size: 13, style: { strokeWidth: 3 } }),
                                "Apply OD"
                            ]
                        }),

                        // Notifications Icon Trigger
                        _jsxs("button", {
                            type: "button",
                            onClick: () => onSelectTab('announcements'),
                            "aria-label": "Official Circulars & Notifications",
                            style: {
                                position: 'relative',
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                border: '1px solid #e2e8f0',
                                background: '#f8fafc',
                                color: '#475569',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            },
                            onMouseEnter: e => {
                                e.currentTarget.style.background = '#ffffff';
                                e.currentTarget.style.borderColor = '#cbd5e1';
                            },
                            onMouseLeave: e => {
                                e.currentTarget.style.background = '#f8fafc';
                                e.currentTarget.style.borderColor = '#e2e8f0';
                            },
                            children: [
                                _jsx(Bell, { size: 16 }),
                                _jsx("span", {
                                    style: {
                                        position: 'absolute',
                                        top: 7,
                                        right: 7,
                                        width: 7,
                                        height: 7,
                                        borderRadius: '50%',
                                        background: '#ef4444',
                                        boxShadow: '0 0 6px rgba(239, 68, 68, 0.7)'
                                    }
                                })
                            ]
                        }),

                        // User Profile Capsule & Dropdown Menu
                        _jsxs("div", {
                            ref: profileMenuRef,
                            style: { position: 'relative' },
                            children: [
                                _jsxs("div", {
                                    onClick: () => setIsProfileMenuOpen(!isProfileMenuOpen),
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 9,
                                        padding: '4px 10px 4px 4px',
                                        borderRadius: 10,
                                        background: isProfileMenuOpen ? '#ffffff' : '#f8fafc',
                                        border: '1px solid',
                                        borderColor: isProfileMenuOpen ? '#0284c7' : '#e2e8f0',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        boxShadow: isProfileMenuOpen ? '0 0 0 2px rgba(2, 132, 199, 0.15)' : 'none'
                                    },
                                    onMouseEnter: e => {
                                        if (!isProfileMenuOpen) {
                                            e.currentTarget.style.background = '#ffffff';
                                            e.currentTarget.style.borderColor = '#cbd5e1';
                                        }
                                    },
                                    onMouseLeave: e => {
                                        if (!isProfileMenuOpen) {
                                            e.currentTarget.style.background = '#f8fafc';
                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                        }
                                    },
                                    children: [
                                        _jsx("div", {
                                            style: {
                                                width: 28,
                                                height: 28,
                                                borderRadius: 7,
                                                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                                                color: '#ffffff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: 12.5,
                                                fontWeight: 900,
                                                flexShrink: 0
                                            },
                                            children: initials
                                        }),
                                        _jsxs("div", {
                                            style: { textAlign: 'left', lineHeight: 1.15 },
                                            children: [
                                                _jsx("div", {
                                                    style: { fontSize: 12, fontWeight: 800, color: '#0f172a' },
                                                    children: userName.split(' ')[0]
                                                }),
                                                _jsx("div", {
                                                    style: { fontSize: 9.5, color: '#64748b', fontWeight: 600 },
                                                    children: className
                                                })
                                            ]
                                        }),
                                        _jsx(ChevronDown, { 
                                            size: 13, 
                                            style: { 
                                                color: '#94a3b8', 
                                                transform: isProfileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.18s ease'
                                            } 
                                        })
                                    ]
                                }),

                                // Executive Profile Dropdown Panel
                                isProfileMenuOpen && (
                                    _jsxs("div", {
                                        style: {
                                            position: 'absolute',
                                            top: 'calc(100% + 8px)',
                                            right: 0,
                                            width: 250,
                                            background: '#ffffff',
                                            borderRadius: 14,
                                            border: '1px solid #e2e8f0',
                                            boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.03)',
                                            padding: '8px',
                                            zIndex: 250,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4,
                                            animation: 'pageSlideUpFluid 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                                        },
                                        children: [
                                            // User Dossier Header
                                            _jsxs("div", {
                                                style: { 
                                                    padding: '10px 12px', 
                                                    background: '#f8fafc',
                                                    borderRadius: 10,
                                                    border: '1px solid #e2e8f0',
                                                    marginBottom: 4
                                                },
                                                children: [
                                                    _jsx("div", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a' }, children: userName }),
                                                    _jsx("div", { style: { fontSize: 11, color: '#64748b', marginTop: 2, fontWeight: 600 }, children: `Roll: ${rollNo}` }),
                                                    _jsxs("div", { 
                                                        style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 },
                                                        children: [
                                                            _jsx("span", { 
                                                                style: { 
                                                                    fontSize: 9.5, 
                                                                    color: '#0284c7', 
                                                                    background: '#e0f2fe',
                                                                    padding: '2px 6px',
                                                                    borderRadius: 4,
                                                                    fontWeight: 800 
                                                                }, 
                                                                children: "EEE · AUTONOMOUS" 
                                                            }),
                                                            _jsx("span", {
                                                                style: {
                                                                    fontSize: 9.5,
                                                                    color: '#15803d',
                                                                    background: '#dcfce7',
                                                                    padding: '2px 6px',
                                                                    borderRadius: 4,
                                                                    fontWeight: 800
                                                                },
                                                                children: "VERIFIED"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),

                                            // Links
                                            [
                                                { label: 'Smart Pass & ID', icon: _jsx(ShieldCheck, { size: 15, style: { color: '#0284c7' } }), tab: 'profile-details' },
                                                { label: 'Document Vault', icon: _jsx(FileText, { size: 15, style: { color: '#059669' } }), tab: 'profile' },
                                                { label: 'Verified Credentials', icon: _jsx(Award, { size: 15, style: { color: '#d97706' } }), tab: 'certificates' },
                                                { label: 'Autonomous Regulations', icon: _jsx(BookOpen, { size: 15, style: { color: '#7c3aed' } }), tab: 'college-rules' },
                                            ].map((item, idx) => (
                                                _jsxs("button", {
                                                    key: idx,
                                                    type: "button",
                                                    onClick: () => {
                                                        onSelectTab(item.tab);
                                                        setIsProfileMenuOpen(false);
                                                    },
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 10,
                                                        padding: '8px 12px',
                                                        borderRadius: 8,
                                                        border: 'none',
                                                        background: 'transparent',
                                                        color: '#334155',
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                        textAlign: 'left',
                                                        transition: 'background 0.12s ease'
                                                    },
                                                    onMouseEnter: e => {
                                                        e.currentTarget.style.background = '#f8fafc';
                                                        e.currentTarget.style.color = '#0f172a';
                                                    },
                                                    onMouseLeave: e => {
                                                        e.currentTarget.style.background = 'transparent';
                                                        e.currentTarget.style.color = '#334155';
                                                    },
                                                    children: [
                                                        item.icon,
                                                        item.label
                                                    ]
                                                })
                                            )),

                                            _jsx("div", {
                                                style: { height: 1, background: '#f1f5f9', margin: '4px 0' }
                                            }),

                                            // Sign Out Button
                                            _jsxs("button", {
                                                type: "button",
                                                onClick: () => {
                                                    setIsProfileMenuOpen(false);
                                                    if (onLogout) onLogout();
                                                },
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 10,
                                                    padding: '8px 12px',
                                                    borderRadius: 8,
                                                    border: 'none',
                                                    background: 'transparent',
                                                    color: '#ef4444',
                                                    fontSize: 12,
                                                    fontWeight: 800,
                                                    cursor: 'pointer',
                                                    textAlign: 'left',
                                                    transition: 'background 0.12s ease'
                                                },
                                                onMouseEnter: e => e.currentTarget.style.background = '#fef2f2',
                                                onMouseLeave: e => e.currentTarget.style.background = 'transparent',
                                                children: [
                                                    _jsx(LogOut, { size: 15 }),
                                                    "Sign Out Session"
                                                ]
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

export default DesktopNavbar;
