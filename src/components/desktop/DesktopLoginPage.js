import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff, Sparkles, UserCheck, User, ArrowLeft, ShieldCheck, ArrowRight, UserPlus, LogIn, KeyRound, Building2 } from 'lucide-react';
import { authService } from '../../services/auth';
import appLogo from '../../assets/app-logo.png';

export const DesktopLoginPage = ({ onClose, onLoginSuccess, initialIsSignUp = false }) => {
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
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleQuickFill = (targetEmail, targetPass) => {
        setEmail(targetEmail);
        setPassword(targetPass);
        setIsSignUp(false);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
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
            setError(res.error || 'Authentication failed. Please verify credentials.');
        }
        setLoading(false);
    };

    return (
        _jsx("div", { 
            className: "cosmic-login-fullscreen",
            style: {
                backgroundImage: "linear-gradient(180deg, rgba(3,5,12,0.72) 0%, rgba(3,5,12,0.88) 100%), url('/explorescape/bac-4.png')"
            },
            children: _jsxs("div", { className: "cosmic-login-card", children: [
                _jsxs("div", { className: "cosmic-login-left", children: [
                    _jsxs("button", { className: "cosmic-back-btn", onClick: onClose, children: [
                        _jsx(ArrowLeft, { size: 16 }),
                        " Back to ExploreScape Landing"
                    ] }),
                    _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 16, margin: '28px 0 20px' }, children: [
                        _jsx("div", { className: "cosmic-login-logo", children: [
                            _jsx("img", { src: appLogo, alt: "Tutor Ward App Logo", style: { width: '100%', height: '100%', objectFit: 'cover' } })
                        ] }),
                        _jsxs("div", { children: [
                            _jsx("h2", { style: { fontSize: 24, fontWeight: 900, color: '#ffffff', margin: 0 }, children: "Tutor Ward App" }),
                            _jsx("p", { style: { fontSize: 13, color: '#38bdf8', margin: 0, fontWeight: 700 }, children: "Sri Ramakrishna Eng. College \u00B7 Dept of EEE" })
                        ] })
                    ] }),
                    _jsxs("div", { className: "cosmic-quote-box", style: { background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: '16px 20px', border: '1px solid rgba(255,255,255,0.12)' }, children: [
                        _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 8 }, children: [
                            _jsx(Sparkles, { size: 14 }),
                            " REGISTERED REAL ACCOUNTS"
                        ] }),
                        _jsx("p", { style: { fontSize: 12, color: 'rgba(255,255,255,0.85)', margin: '0 0 12px 0', lineHeight: 1.5 }, children: "Use your personal registered college credentials, or sign in with the verified institutional accounts below:" }),
                        _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [
                            _jsxs("div", { 
                                onClick: () => handleQuickFill('nithin@srec.ac.in', 'Password@123'),
                                style: { background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.4)', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', transition: 'all 0.2s ease' },
                                children: [
                                    _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [
                                        _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#93c5fd' }, children: "\uD83C\uDF93 Student: Nithin Annamalai R" }),
                                        _jsx("span", { style: { fontSize: 9, fontWeight: 800, background: '#2563eb', color: '#fff', padding: '1px 6px', borderRadius: 4 }, children: "AUTOFILL" })
                                    ] }),
                                    _jsx("span", { style: { fontSize: 10, color: 'rgba(255,255,255,0.65)' }, children: "nithin@srec.ac.in \u00B7 Pass: Password@123" })
                                ]
                            }),
                            _jsxs("div", { 
                                onClick: () => handleQuickFill('hod.eee@srec.ac.in', 'Faculty@123'),
                                style: { background: 'rgba(234,88,12,0.2)', border: '1px solid rgba(234,88,12,0.4)', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', transition: 'all 0.2s ease' },
                                children: [
                                    _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [
                                        _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#fdba74' }, children: "\uD83D\uDC68\u200D\uD83C\uDFEB Faculty: Dr. M. Ezhilarasi (HOD)" }),
                                        _jsx("span", { style: { fontSize: 9, fontWeight: 800, background: '#ea580c', color: '#fff', padding: '1px 6px', borderRadius: 4 }, children: "AUTOFILL" })
                                    ] }),
                                    _jsx("span", { style: { fontSize: 10, color: 'rgba(255,255,255,0.65)' }, children: "hod.eee@srec.ac.in \u00B7 Pass: Faculty@123" })
                                ]
                            })
                        ] })
                    ] }),
                    _jsxs("div", { style: { display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }, children: [
                        _jsxs("span", { className: "cosmic-pill-badge", children: [_jsx(ShieldCheck, { size: 13, style: { color: '#4ade80' } }), " NAAC A+ Grade"] }),
                        _jsxs("span", { className: "cosmic-pill-badge", children: [_jsx(ShieldCheck, { size: 13, style: { color: '#60a5fa' } }), " NBA Accredited"] }),
                        _jsxs("span", { className: "cosmic-pill-badge", children: [_jsx(Building2, { size: 13, style: { color: '#c084fc' } }), " Anna University"] })
                    ] })
                ] }),
                _jsxs("div", { className: "cosmic-login-right", children: [
                    _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }, children: [
                        _jsxs("div", { children: [
                            _jsx("h2", { style: { fontSize: 24, fontWeight: 900, color: '#ffffff', margin: 0 }, children: isSignUp ? 'Create Real Account' : 'Portal Sign In' }),
                            _jsx("p", { style: { fontSize: 12, color: '#94a3b8', margin: '4px 0 0 0' }, children: isSignUp ? 'Register as student or faculty member' : 'Access your academic dashboard & dossiers' })
                        ] }),
                        _jsx("button", { onClick: onClose, className: "cosmic-close-icon", children: _jsx(X, { size: 18 }) })
                    ] }),
                    _jsxs("div", { className: "cosmic-auth-toggle", children: [
                        _jsxs("button", { 
                            className: `cosmic-toggle-btn ${!isSignUp ? 'active' : ''}`, 
                            onClick: () => { setIsSignUp(false); setError(''); },
                            children: [_jsx(LogIn, { size: 14 }), " Sign In"] 
                        }),
                        _jsxs("button", { 
                            className: `cosmic-toggle-btn ${isSignUp ? 'active' : ''}`, 
                            onClick: () => { setIsSignUp(true); setError(''); },
                            children: [_jsx(UserPlus, { size: 14 }), " Register / Sign Up"] 
                        })
                    ] }),
                    error && (
                        _jsxs("div", { style: { background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px 14px', borderRadius: 12, fontSize: 12, fontWeight: 700, marginBottom: 14 }, children: [
                            "\u26A0\uFE0F ", error
                        ] })
                    ),
                    successMsg && (
                        _jsxs("div", { style: { background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#86efac', padding: '10px 14px', borderRadius: 12, fontSize: 12, fontWeight: 700, marginBottom: 14 }, children: [
                            "\u2705 ", successMsg
                        ] })
                    ),
                    _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: [
                        isSignUp && (
                            _jsxs(_Fragment, { children: [
                                _jsxs("div", { className: "cosmic-field-group", children: [
                                    _jsx("label", { children: "Role / Account Type" }),
                                    _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 4 }, children: [
                                        _jsxs("button", {
                                            type: "button",
                                            onClick: () => setRole('student'),
                                            style: {
                                                padding: '8px 12px',
                                                borderRadius: 10,
                                                border: `1.5px solid ${role === 'student' ? '#38bdf8' : 'rgba(255,255,255,0.15)'}`,
                                                background: role === 'student' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.05)',
                                                color: '#ffffff',
                                                fontSize: 12,
                                                fontWeight: 800,
                                                cursor: 'pointer'
                                            },
                                            children: ["\uD83C\uDF93 Student"]
                                        }),
                                        _jsxs("button", {
                                            type: "button",
                                            onClick: () => setRole('teacher'),
                                            style: {
                                                padding: '8px 12px',
                                                borderRadius: 10,
                                                border: `1.5px solid ${role === 'teacher' ? '#fb923c' : 'rgba(255,255,255,0.15)'}`,
                                                background: role === 'teacher' ? 'rgba(251, 146, 60, 0.15)' : 'rgba(255,255,255,0.05)',
                                                color: '#ffffff',
                                                fontSize: 12,
                                                fontWeight: 800,
                                                cursor: 'pointer'
                                            },
                                            children: ["\uD83D\uDC68\u200D\uD83C\uDFEB Faculty"]
                                        })
                                    ] })
                                ] }),
                                _jsxs("div", { className: "cosmic-field-group", children: [
                                    _jsx("label", { children: "Full Name *" }),
                                    _jsxs("div", { className: "cosmic-input-wrapper", children: [
                                        _jsx(User, { size: 16, className: "cosmic-input-icon" }),
                                        _jsx("input", { type: "text", className: "cosmic-input", placeholder: "e.g. Nithin Annamalai R", value: name, onChange: e => setName(e.target.value), required: true })
                                    ] })
                                ] }),
                                _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10 }, children: [
                                    _jsxs("div", { className: "cosmic-field-group", children: [
                                        _jsx("label", { children: role === 'teacher' ? "Staff ID *" : "Roll Number *" }),
                                        _jsxs("div", { className: "cosmic-input-wrapper", children: [
                                            _jsx(UserCheck, { size: 16, className: "cosmic-input-icon" }),
                                            _jsx("input", { type: "text", className: "cosmic-input", placeholder: role === 'teacher' ? "e.g. FAC-EEE-001" : "e.g. 71812503104", value: rollNo, onChange: e => setRollNo(e.target.value), required: true })
                                        ] })
                                    ] }),
                                    _jsxs("div", { className: "cosmic-field-group", children: [
                                        _jsx("label", { children: "Class / Section" }),
                                        _jsx("input", { type: "text", className: "cosmic-input", placeholder: "II EEE-B", value: className, onChange: e => setClassName(e.target.value) })
                                    ] })
                                ] })
                            ] })
                        ),
                        _jsxs("div", { className: "cosmic-field-group", children: [
                            _jsx("label", { children: "Email Address *" }),
                            _jsxs("div", { className: "cosmic-input-wrapper", children: [
                                _jsx(Mail, { size: 16, className: "cosmic-input-icon" }),
                                _jsx("input", { type: "email", className: "cosmic-input", placeholder: role === 'teacher' ? "hod.eee@srec.ac.in" : "nithin@srec.ac.in", value: email, onChange: e => setEmail(e.target.value), required: true })
                            ] })
                        ] }),
                        _jsxs("div", { className: "cosmic-field-group", children: [
                            _jsx("label", { children: "Password *" }),
                            _jsxs("div", { className: "cosmic-input-wrapper", children: [
                                _jsx(Lock, { size: 16, className: "cosmic-input-icon" }),
                                _jsx("input", { type: showPassword ? 'text' : 'password', className: "cosmic-input", placeholder: "Min. 6 characters", value: password, onChange: e => setPassword(e.target.value), required: true }),
                                _jsx("button", { type: "button", className: "cosmic-eye-btn", onClick: () => setShowPassword(!showPassword), children: showPassword ? _jsx(EyeOff, { size: 16 }) : _jsx(Eye, { size: 16 }) })
                            ] })
                        ] }),
                        isSignUp && (
                            _jsxs("div", { className: "cosmic-field-group", children: [
                                _jsx("label", { children: "Confirm Password *" }),
                                _jsxs("div", { className: "cosmic-input-wrapper", children: [
                                    _jsx(KeyRound, { size: 16, className: "cosmic-input-icon" }),
                                    _jsx("input", { type: showPassword ? 'text' : 'password', className: "cosmic-input", placeholder: "Re-enter password", value: confirmPassword, onChange: e => setConfirmPassword(e.target.value), required: true })
                                ] })
                            ] })
                        ),
                        _jsxs("button", { type: "submit", className: "cosmic-login-submit-btn", disabled: loading, style: { marginTop: 6 }, children: [
                            loading ? 'Authenticating...' : isSignUp ? 'Create My Account' : 'Sign In to Portal',
                            " ",
                            _jsx(ArrowRight, { size: 16 })
                        ] })
                    ] }),
                    _jsxs("div", { style: { marginTop: 14, textAlign: 'center' }, children: [
                        _jsx("button", {
                            type: "button",
                            onClick: () => { setIsSignUp(!isSignUp); setError(''); },
                            style: { background: 'none', border: 'none', color: '#38bdf8', fontSize: 12, fontWeight: 700, cursor: 'pointer' },
                            children: isSignUp ? 'Already have an account? Sign In' : 'Need an account? Create one here'
                        })
                    ] })
                ] })
            ] })
        })
    );
};
