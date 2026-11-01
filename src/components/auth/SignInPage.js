import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff, UserCheck, CheckCircle2, User, Download, KeyRound, Building2 } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { authService } from '../../services/auth';
import appLogo from '../../assets/app-logo.png';

export const SignInPage = ({ onClose, onLoginSuccess, initialIsSignUp = false }) => {
    const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [role, setRole] = useState('student');
    const [className, setClassName] = useState('II EEE-B');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [forgotSent, setForgotSent] = useState(false);
    const isNative = Capacitor.isNativePlatform();

    const handleQuickFill = (targetEmail, targetPass) => {
        setEmail(targetEmail);
        setPassword(targetPass);
        setIsSignUp(false);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (isSignUp) {
            if (!name.trim() || !email.trim() || !password.trim()) {
                setError('Please fill in all required fields.');
                setLoading(false);
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match. Please verify.');
                setLoading(false);
                return;
            }
            const res = await authService.signUp({
                name,
                email,
                rollNo: rollNo || (role === 'teacher' ? 'FAC-EEE-NEW' : '71812503999'),
                role,
                className: role === 'teacher' ? 'Staff Portal' : className,
                yearOfStudy: role === 'teacher' ? 'Faculty' : '2nd Year',
                password
            });
            if (res.success) {
                onLoginSuccess(res.user);
            } else {
                setError(res.error || 'Failed to register account.');
            }
            setLoading(false);
            return;
        }

        // SIGN IN
        if (!email.trim() || !password.trim()) {
            setError('Please enter your email and password.');
            setLoading(false);
            return;
        }

        const res = await authService.signIn(email, password);
        if (res.success) {
            onLoginSuccess(res.user);
        } else {
            setError(res.error || 'Invalid credentials. Please verify your email & password.');
        }
        setLoading(false);
    };

    return (
        _jsxs("div", { className: "signin-page-overlay", children: [
            _jsxs("div", { className: "mobile-curved-header", children: [
                _jsxs("div", { className: "mobile-header-nav", children: [
                    onClose && (
                        _jsx("button", { className: "signin-back-btn", onClick: onClose, children: _jsx(X, { size: 18 }) })
                    ),
                    !isNative && (
                        _jsxs("a", { href: "/download.html", className: "signin-get-started-btn", title: "Download Android APK", children: [
                            _jsx(Download, { size: 13 }),
                            _jsx("span", { children: "Get APK" })
                        ] })
                    )
                ] }),
                _jsxs("div", { className: "mobile-header-title-wrap", children: [
                    _jsx("div", { style: { width: 52, height: 52, borderRadius: 16, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.4)', marginBottom: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }, children: [
                        _jsx("img", { src: appLogo, alt: "Tutor Ward App Logo", style: { width: '100%', height: '100%', objectFit: 'cover' } })
                    ] }),
                    _jsx("h1", { className: "mobile-header-h1", children: isSignUp ? 'Create Account' : 'Portal Sign In' }),
                    _jsx("p", { className: "mobile-header-p", children: "Tutor Ward App \u00B7 EEE SREC Academic Portal" })
                ] }),
                _jsx("div", { className: "mobile-wave-mask", children: [
                    _jsx("svg", { viewBox: "0 0 500 120", preserveAspectRatio: "none", children: [
                        _jsx("path", { d: "M 0 0 C 150 100 350 -20 500 60 L 500 120 L 0 120 Z", fill: "#ffffff" })
                    ] })
                ] })
            ] }),
            _jsxs("div", { className: "mobile-form-sheet", children: [
                _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16, background: '#f1f5f9', padding: 4, borderRadius: 12 }, children: [
                    _jsx("button", {
                        type: "button",
                        onClick: () => { setIsSignUp(false); setError(''); },
                        style: {
                            padding: '8px 12px',
                            borderRadius: 10,
                            border: 'none',
                            fontSize: 12,
                            fontWeight: 800,
                            cursor: 'pointer',
                            background: !isSignUp ? '#ffffff' : 'transparent',
                            color: !isSignUp ? '#0052cc' : '#64748b',
                            boxShadow: !isSignUp ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                        },
                        children: "Sign In"
                    }),
                    _jsx("button", {
                        type: "button",
                        onClick: () => { setIsSignUp(true); setError(''); },
                        style: {
                            padding: '8px 12px',
                            borderRadius: 10,
                            border: 'none',
                            fontSize: 12,
                            fontWeight: 800,
                            cursor: 'pointer',
                            background: isSignUp ? '#ffffff' : 'transparent',
                            color: isSignUp ? '#0052cc' : '#64748b',
                            boxShadow: isSignUp ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                        },
                        children: "Sign Up"
                    })
                ] }),

                error && (
                    _jsx("div", { className: "signin-error-banner", children: [
                        _jsxs("span", { children: ["\u26A0\uFE0F ", error] })
                    ] })
                ),
                forgotSent && (
                    _jsxs("div", { className: "signin-success-banner", children: [
                        _jsx(CheckCircle2, { size: 16 }),
                        _jsx("span", { children: "Password reset link sent to registered email!" })
                    ] })
                ),

                _jsxs("form", { onSubmit: handleSubmit, className: "mobile-underlined-form", children: [
                    isSignUp && (
                        _jsxs(_Fragment, { children: [
                            _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }, children: [
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => setRole('student'),
                                    style: {
                                        padding: '7px 10px',
                                        borderRadius: 8,
                                        border: `1.5px solid ${role === 'student' ? '#0052cc' : '#e2e8f0'}`,
                                        background: role === 'student' ? 'rgba(0,82,204,0.08)' : '#ffffff',
                                        fontSize: 11,
                                        fontWeight: 800,
                                        color: role === 'student' ? '#0052cc' : '#64748b'
                                    },
                                    children: ["\uD83C\uDF93 Student"]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => setRole('teacher'),
                                    style: {
                                        padding: '7px 10px',
                                        borderRadius: 8,
                                        border: `1.5px solid ${role === 'teacher' ? '#ea580c' : '#e2e8f0'}`,
                                        background: role === 'teacher' ? 'rgba(234,88,12,0.08)' : '#ffffff',
                                        fontSize: 11,
                                        fontWeight: 800,
                                        color: role === 'teacher' ? '#ea580c' : '#64748b'
                                    },
                                    children: ["\uD83D\uDC68\u200D\uD83C\uDFEB Faculty"]
                                })
                            ] }),
                            _jsxs("div", { className: "mobile-field-row", children: [
                                _jsx(User, { size: 18, className: "field-row-icon" }),
                                _jsx("input", { type: "text", placeholder: "Full Name", value: name, onChange: e => setName(e.target.value), className: "mobile-underlined-input", required: true })
                            ] }),
                            _jsxs("div", { className: "mobile-field-row", children: [
                                _jsx(UserCheck, { size: 18, className: "field-row-icon" }),
                                _jsx("input", { type: "text", placeholder: role === 'teacher' ? "Staff ID (e.g. FAC-EEE-001)" : "Roll Number (e.g. 71812503104)", value: rollNo, onChange: e => setRollNo(e.target.value), className: "mobile-underlined-input", required: true })
                            ] })
                        ] })
                    ),
                    _jsxs("div", { className: "mobile-field-row", children: [
                        _jsx(Mail, { size: 18, className: "field-row-icon" }),
                        _jsx("input", { type: "email", placeholder: "College Email Address", value: email, onChange: e => setEmail(e.target.value), className: "mobile-underlined-input", required: true }),
                        email.includes('@') && _jsx(CheckCircle2, { size: 16, className: "field-check-icon" })
                    ] }),
                    _jsxs("div", { className: "mobile-field-row", children: [
                        _jsx(Lock, { size: 18, className: "field-row-icon" }),
                        _jsx("input", { type: showPassword ? 'text' : 'password', placeholder: "Password", value: password, onChange: e => setPassword(e.target.value), className: "mobile-underlined-input", required: true }),
                        _jsx("button", { type: "button", className: "field-eye-btn", onClick: () => setShowPassword(!showPassword), children: showPassword ? _jsx(EyeOff, { size: 16 }) : _jsx(Eye, { size: 16 }) })
                    ] }),
                    isSignUp && (
                        _jsxs("div", { className: "mobile-field-row", children: [
                            _jsx(KeyRound, { size: 18, className: "field-row-icon" }),
                            _jsx("input", { type: showPassword ? 'text' : 'password', placeholder: "Confirm Password", value: confirmPassword, onChange: e => setConfirmPassword(e.target.value), className: "mobile-underlined-input", required: true })
                        ] })
                    ),
                    !isSignUp && (
                        _jsx("div", { style: { textAlign: 'right', marginTop: -4, marginBottom: 8 }, children: [
                            _jsx("button", { type: "button", className: "signin-forgot-btn", onClick: () => setForgotSent(true), children: "Forgot password?" })
                        ] })
                    ),
                    _jsx("button", { type: "submit", className: "mobile-blue-pill-btn", disabled: loading, children: loading ? 'Authenticating...' : isSignUp ? 'Create My Account' : 'Sign In to Portal' }),
                    _jsx("button", { type: "button", className: "mobile-outline-pill-btn", onClick: () => { setIsSignUp(!isSignUp); setError(''); }, children: isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up' })
                ] }),

                _jsxs("div", { style: { marginTop: 18, paddingTop: 14, borderTop: '1px solid #f1f5f9' }, children: [
                    _jsx("div", { style: { fontSize: 10, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8, textAlign: 'center' }, children: "Verified Institutional Accounts" }),
                    _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }, children: [
                        _jsxs("button", {
                            type: "button",
                            onClick: () => handleQuickFill('nithin@srec.ac.in', 'Password@123'),
                            style: {
                                background: '#eff6ff',
                                border: '1px solid #bfdbfe',
                                borderRadius: 10,
                                padding: '8px 10px',
                                textAlign: 'left',
                                cursor: 'pointer'
                            },
                            children: [
                                _jsx("div", { style: { fontSize: 11, fontWeight: 800, color: '#1d4ed8' }, children: "🎓 Student Login" }),
                                _jsx("div", { style: { fontSize: 9.5, color: '#64748b', marginTop: 2 }, children: "nithin@srec.ac.in" })
                            ]
                        }),
                        _jsxs("button", {
                            type: "button",
                            onClick: () => handleQuickFill('hod.eee@srec.ac.in', 'Faculty@123'),
                            style: {
                                background: '#fff7ed',
                                border: '1px solid #fed7aa',
                                borderRadius: 10,
                                padding: '8px 10px',
                                textAlign: 'left',
                                cursor: 'pointer'
                            },
                            children: [
                                _jsx("div", { style: { fontSize: 11, fontWeight: 800, color: '#c2410c' }, children: "👨‍🏫 Faculty Login" }),
                                _jsx("div", { style: { fontSize: 9.5, color: '#64748b', marginTop: 2 }, children: "hod.eee@srec.ac.in" })
                            ]
                        })
                    ] })
                ] })
            ] })
        ] })
    );
};
