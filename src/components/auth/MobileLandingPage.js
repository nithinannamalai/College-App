import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight, ShieldCheck, Award, GraduationCap, Zap, UserCheck, FileText, BookOpen, UserPlus, LogIn } from 'lucide-react';
import appLogo from '../../assets/app-logo.png';

export const MobileLandingPage = ({ onOpenSignIn }) => {
    return (
        _jsxs("div", { className: "mobile-landing-wrapper", children: [
            _jsxs("div", { className: "mobile-landing-hero", children: [
                _jsxs("div", { className: "mobile-landing-brand-badge", children: [
                    _jsx("div", { className: "mobile-landing-logo-box", children: [
                        _jsx("img", { src: appLogo, alt: "Tutor Ward App Logo", className: "mobile-landing-logo-img" })
                    ] }),
                    _jsx("span", { className: "mobile-landing-tag", children: "DEPT OF EEE \u00B7 SREC" })
                ] }),
                _jsx("h1", { className: "mobile-landing-title", children: "Tutor Ward App" }),
                _jsx("p", { className: "mobile-landing-subtitle", children: "LEARN \u00B7 INNOVATE \u00B7 SUCCEED" }),
                _jsx("p", { className: "mobile-landing-desc", children: "Official Academic, Attendance & Dossier Management Portal for Electrical & Electronics Engineering." }),
                _jsxs("div", { className: "mobile-landing-cta-group", children: [
                    _jsxs("button", { className: "mobile-primary-pill-btn", onClick: () => onOpenSignIn(false), children: [
                        _jsx(LogIn, { size: 16 }),
                        " Sign In ",
                        _jsx(ArrowRight, { size: 16 })
                    ] }),
                    _jsxs("button", { className: "mobile-secondary-pill-btn", onClick: () => onOpenSignIn(true), children: [
                        _jsx(UserPlus, { size: 16 }),
                        " Create Account"
                    ] })
                ] }),
                _jsx("div", { className: "mobile-landing-wave", children: [
                    _jsx("svg", { viewBox: "0 0 500 120", preserveAspectRatio: "none", children: [
                        _jsx("path", { d: "M 0 0 C 150 100 350 -20 500 60 L 500 120 L 0 120 Z", fill: "#ffffff" })
                    ] })
                ] })
            ] }),
            _jsxs("div", { className: "mobile-landing-body", children: [
                _jsxs("div", { className: "mobile-accreditation-row", children: [
                    _jsxs("div", { className: "accreditation-pill", children: [_jsx(Award, { size: 13 }), " NAAC A+ Grade"] }),
                    _jsxs("div", { className: "accreditation-pill", children: [_jsx(ShieldCheck, { size: 13 }), " NBA Accredited"] }),
                    _jsxs("div", { className: "accreditation-pill", children: [_jsx(GraduationCap, { size: 13 }), " Anna University"] })
                ] }),
                _jsx("div", { className: "mobile-landing-section-title", children: [
                    _jsx("h2", { children: "Core Academic Features" })
                ] }),
                _jsxs("div", { className: "mobile-features-grid", children: [
                    _jsxs("div", { className: "mobile-feature-card glass-hover-card", onClick: () => onOpenSignIn(false), children: [
                        _jsx("div", { className: "feature-icon-box", style: { background: '#e0e7ff', color: '#4338ca' }, children: _jsx(Zap, { size: 22 }) }),
                        _jsx("h3", { children: "AI Tutor Assistant" }),
                        _jsx("p", { children: "24/7 intelligent AI tutoring for circuit analysis, power systems, and exam prep." })
                    ] }),
                    _jsxs("div", { className: "mobile-feature-card glass-hover-card", onClick: () => onOpenSignIn(false), children: [
                        _jsx("div", { className: "feature-icon-box", style: { background: '#dcfce7', color: '#16a34a' }, children: _jsx(UserCheck, { size: 22 }) }),
                        _jsx("h3", { children: "Live Attendance Logs" }),
                        _jsx("p", { children: "Real-time subject-wise attendance tracking with shortfall warning alerts." })
                    ] }),
                    _jsxs("div", { className: "mobile-feature-card glass-hover-card", onClick: () => onOpenSignIn(false), children: [
                        _jsx("div", { className: "feature-icon-box", style: { background: '#fef3c7', color: '#d97706' }, children: _jsx(FileText, { size: 22 }) }),
                        _jsx("h3", { children: "Instant OD Request Form" }),
                        _jsx("p", { children: "Submit On-Duty requests with automated PDF generation for tutor approvals." })
                    ] }),
                    _jsxs("div", { className: "mobile-feature-card glass-hover-card", onClick: () => onOpenSignIn(false), children: [
                        _jsx("div", { className: "feature-icon-box", style: { background: '#fae8ff', color: '#c084fc' }, children: _jsx(BookOpen, { size: 22 }) }),
                        _jsx("h3", { children: "CGPA & Grade Vault" }),
                        _jsx("p", { children: "Calculate current semester GPAs and simulate target internal marks." })
                    ] })
                ] }),
                _jsxs("div", { className: "mobile-landing-footer", children: [
                    _jsx("p", { children: "\u00A9 2026 Tutor Ward App \u00B7 Sri Ramakrishna Engineering College" }),
                    _jsx("p", { style: { fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }, children: "Developed by Nithin Annamalai R (tutorwardapp@gmail.com)" })
                ] })
            ] })
        ] })
    );
};
