import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ArrowLeft, Home, ChevronRight, Sparkles } from 'lucide-react';

export const DesktopPageWrapper = ({ 
    title, 
    subtitle, 
    category = "Academics", 
    icon, 
    onBack, 
    children 
}) => {
    return (
        _jsxs("div", {
            className: "desktop-page-wrapper",
            style: {
                width: '100%',
                maxWidth: 1440,
                margin: '0 auto',
                padding: '28px 40px 60px',
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                boxSizing: 'border-box',
                animation: 'pageSlideUpFluid 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            },
            children: [
                // ── Top Action & Breadcrumb Bar ──
                _jsxs("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 16,
                        paddingBottom: 16,
                        borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
                    },
                    children: [
                        // Left: Back button + Breadcrumb
                        _jsxs("div", {
                            style: { display: 'flex', alignItems: 'center', gap: 14 },
                            children: [
                                _jsxs("button", {
                                    onClick: onBack,
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '8px 16px',
                                        borderRadius: 99,
                                        border: '1.5px solid #cbd5e1',
                                        background: '#ffffff',
                                        color: '#0f172a',
                                        fontSize: 12.5,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                                        transition: 'all 0.2s ease'
                                    },
                                    onMouseEnter: (e) => {
                                        e.currentTarget.style.background = '#0284c7';
                                        e.currentTarget.style.color = '#ffffff';
                                        e.currentTarget.style.borderColor = '#0284c7';
                                        e.currentTarget.style.transform = 'translateX(-2px)';
                                    },
                                    onMouseLeave: (e) => {
                                        e.currentTarget.style.background = '#ffffff';
                                        e.currentTarget.style.color = '#0f172a';
                                        e.currentTarget.style.borderColor = '#cbd5e1';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    },
                                    children: [
                                        _jsx(ArrowLeft, { size: 15 }),
                                        "Back to Dashboard"
                                    ]
                                }),

                                // Breadcrumb
                                _jsxs("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: '#64748b'
                                    },
                                    children: [
                                        _jsx(Home, { size: 14, style: { color: '#94a3b8' } }),
                                        _jsx("span", { children: "Department Hub" }),
                                        _jsx(ChevronRight, { size: 12, style: { color: '#cbd5e1' } }),
                                        _jsx("span", { style: { color: '#0284c7' }, children: category }),
                                        _jsx(ChevronRight, { size: 12, style: { color: '#cbd5e1' } }),
                                        _jsx("span", { style: { color: '#0f172a' }, children: title })
                                    ]
                                })
                            ]
                        }),

                        // Right: Live System Status Badge
                        _jsxs("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                background: '#f8fafc',
                                padding: '6px 14px',
                                borderRadius: 99,
                                border: '1px solid #e2e8f0',
                                fontSize: 11.5,
                                fontWeight: 700,
                                color: '#475569'
                            },
                            children: [
                                _jsx("span", {
                                    style: {
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        background: '#10b981',
                                        display: 'inline-block',
                                        boxShadow: '0 0 8px #10b981'
                                    }
                                }),
                                "SREC Autonomous Portal • Spring 2026"
                            ]
                        })
                    ]
                }),

                // ── Page Header Banner ──
                _jsxs("div", {
                    style: {
                        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.04) 0%, rgba(37, 99, 235, 0.08) 100%)',
                        borderRadius: 22,
                        border: '1.5px solid rgba(2, 132, 199, 0.15)',
                        padding: '24px 30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 16
                    },
                    children: [
                        _jsxs("div", {
                            style: { display: 'flex', alignItems: 'center', gap: 18 },
                            children: [
                                icon && (
                                    _jsx("div", {
                                        style: {
                                            width: 50,
                                            height: 50,
                                            borderRadius: 16,
                                            background: '#ffffff',
                                            border: '1.5px solid rgba(2, 132, 199, 0.25)',
                                            color: '#0284c7',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.15)',
                                            flexShrink: 0
                                        },
                                        children: icon
                                    })
                                ),
                                _jsxs("div", {
                                    children: [
                                        _jsx("h1", {
                                            style: {
                                                fontSize: 24,
                                                fontWeight: 950,
                                                color: '#0f172a',
                                                margin: 0,
                                                letterSpacing: -0.4
                                            },
                                            children: title
                                        }),
                                        subtitle && (
                                            _jsx("p", {
                                                style: {
                                                    fontSize: 13,
                                                    color: '#64748b',
                                                    margin: '4px 0 0 0',
                                                    fontWeight: 600
                                                },
                                                children: subtitle
                                            })
                                        )
                                    ]
                                })
                            ]
                        }),
                        _jsxs("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                background: 'rgba(255, 255, 255, 0.85)',
                                padding: '6px 14px',
                                borderRadius: 12,
                                border: '1px solid rgba(2, 132, 199, 0.2)',
                                fontSize: 11.5,
                                fontWeight: 800,
                                color: '#0369a1'
                            },
                            children: [
                                _jsx(Sparkles, { size: 14, style: { color: '#0284c7' } }),
                                "Department of EEE"
                            ]
                        })
                    ]
                }),

                // ── Main Page Content ──
                _jsx("div", {
                    className: "desktop-tab-content-area",
                    style: {
                        background: '#ffffff',
                        borderRadius: 24,
                        border: '1.5px solid #e2e8f0',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                        padding: '30px',
                        minHeight: 500,
                        boxSizing: 'border-box'
                    },
                    children: children
                })
            ]
        })
    );
};
