import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ArrowLeft, Home, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';

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
                padding: '24px 32px 60px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                boxSizing: 'border-box',
                animation: 'pageSlideUpFluid 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            },
            children: [
                // ── Integrated Unified Desktop Header ──
                _jsxs("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 22px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 249, 255, 0.85) 100%)',
                        borderRadius: 20,
                        border: '1.5px solid rgba(2, 132, 199, 0.16)',
                        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
                        flexWrap: 'wrap',
                        gap: 16
                    },
                    children: [
                        // Left: Back button + Icon + Title + Breadcrumbs
                        _jsxs("div", {
                            style: { display: 'flex', alignItems: 'center', gap: 14 },
                            children: [
                                _jsxs("button", {
                                    onClick: onBack,
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '9px 18px',
                                        borderRadius: 12,
                                        border: '1.5px solid #cbd5e1',
                                        background: '#ffffff',
                                        color: '#0f172a',
                                        fontSize: 12.5,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                                        transition: 'all 0.2s ease',
                                        flexShrink: 0
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

                                _jsx("div", { style: { width: 1, height: 32, background: '#e2e8f0' } }),

                                icon && (
                                    _jsx("div", {
                                        style: {
                                            width: 40,
                                            height: 40,
                                            borderRadius: 12,
                                            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1) 0%, rgba(37, 99, 235, 0.15) 100%)',
                                            border: '1.5px solid rgba(2, 132, 199, 0.2)',
                                            color: '#0284c7',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        },
                                        children: icon
                                    })
                                ),

                                _jsxs("div", {
                                    children: [
                                        _jsxs("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                fontSize: 11,
                                                fontWeight: 800,
                                                color: '#64748b',
                                                marginBottom: 2
                                            },
                                            children: [
                                                _jsx("span", { children: "Department Hub" }),
                                                _jsx(ChevronRight, { size: 11, style: { color: '#cbd5e1' } }),
                                                _jsx("span", { style: { color: '#0284c7' }, children: category })
                                            ]
                                        }),
                                        _jsx("h1", {
                                            style: {
                                                fontSize: 20,
                                                fontWeight: 950,
                                                color: '#0f172a',
                                                margin: 0,
                                                letterSpacing: -0.3,
                                                lineHeight: 1.2
                                            },
                                            children: title
                                        })
                                    ]
                                })
                            ]
                        }),

                        // Right: Department & Session Pill
                        _jsxs("div", {
                            style: { display: 'flex', alignItems: 'center', gap: 10 },
                            children: [
                                _jsxs("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        background: '#ffffff',
                                        padding: '7px 14px',
                                        borderRadius: 99,
                                        border: '1.5px solid #e2e8f0',
                                        fontSize: 11.5,
                                        fontWeight: 800,
                                        color: '#334155',
                                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
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
                                        "SREC Autonomous Portal • Spring 2026"
                                    ]
                                }),
                                _jsxs("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        background: 'rgba(2, 132, 199, 0.08)',
                                        padding: '7px 12px',
                                        borderRadius: 99,
                                        border: '1px solid rgba(2, 132, 199, 0.2)',
                                        fontSize: 11.5,
                                        fontWeight: 800,
                                        color: '#0369a1'
                                    },
                                    children: [
                                        _jsx(Sparkles, { size: 13, style: { color: '#0284c7' } }),
                                        "Dept of EEE"
                                    ]
                                })
                            ]
                        })
                    ]
                }),

                // ── Main Page Content (Fluid, Full Width Canvas) ──
                _jsx("div", {
                    className: "desktop-tab-content-area",
                    style: {
                        width: '100%',
                        minHeight: 500,
                        boxSizing: 'border-box'
                    },
                    children: children
                })
            ]
        })
    );
};
