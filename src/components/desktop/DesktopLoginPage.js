import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff, Sparkles, User, ShieldCheck, ArrowRight, CheckCircle2, GraduationCap, Building2, KeyRound } from 'lucide-react';
import { authService } from '../../services/auth';
import appLogo from '../../assets/app-logo.png';
export const DesktopLoginPage = ({ onClose, onLoginSuccess, initialIsSignUp = false }) => {
    const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
    const [role, setRole] = useState('student'); // 'student' | 'teacher'
    // Form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [className, setClassName] = useState('II EEE-B');
    const [showPassword, setShowPassword] = useState(false);
    // Status states
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    // 1-Tap Autofill
    const handleQuickFill = (targetEmail, targetPass, targetRole = 'student') => {
        setEmail(targetEmail);
        setPassword(targetPass);
        setRole(targetRole);
        setIsSignUp(false);
        setError('');
        setSuccessMsg(`Autofilled ${targetEmail}`);
        setTimeout(() => setSuccessMsg(''), 2200);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        if (isSignUp) {
            if (!name.trim()) {
                setError('Please provide your full legal name.');
                return;
            }
            if (!email.trim() || !password.trim()) {
                setError('Please provide institutional email and password.');
                return;
            }
            if (password.length < 6) {
                setError('Password must be at least 6 characters.');
                return;
            }
            setLoading(true);
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
            }
            else {
                setError(res.error || 'Failed to register account.');
            }
            setLoading(false);
            return;
        }
        // SIGN IN
        if (!email.trim() || !password.trim()) {
            setError('Please enter your institutional email and password.');
            return;
        }
        setLoading(true);
        const res = await authService.signIn(email, password);
        if (res.success) {
            onLoginSuccess(res.user);
        }
        else {
            setError(res.error || 'Invalid credentials. Please verify your email & password.');
        }
        setLoading(false);
    };
    return (_jsxs_1("div", { style: {
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'radial-gradient(ellipse at 50% 20%, #0b192c 0%, #030712 65%, #000000 100%)',
            overflowY: 'auto',
            fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif"
        }, children: [_jsx_1("div", { style: {
                    position: 'absolute',
                    top: '15%',
                    left: '20%',
                    width: 460,
                    height: 460,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none'
                } }), _jsx_1("div", { style: {
                    position: 'absolute',
                    bottom: '15%',
                    right: '20%',
                    width: 480,
                    height: 480,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none'
                } }), _jsxs_1("div", { style: {
                    position: 'relative',
                    width: '100%',
                    maxWidth: 480,
                    borderRadius: 28,
                    background: 'rgba(15, 23, 42, 0.78)',
                    backdropFilter: 'blur(30px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.16)',
                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(37, 99, 235, 0.15)',
                    padding: '40px 36px',
                    color: '#ffffff',
                    boxSizing: 'border-box'
                }, children: [_jsx_1("button", { onClick: onClose, "aria-label": "Close", style: {
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            color: 'rgba(255, 255, 255, 0.75)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }, onMouseEnter: (e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.color = '#ffffff'; }, onMouseLeave: (e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'; }, children: _jsx_1(X, { size: 17 }) }), _jsxs_1("div", { style: { textAlign: 'center', marginBottom: 28 }, children: [_jsx_1("div", { style: {
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 52,
                                    height: 52,
                                    borderRadius: 16,
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                    boxShadow: '0 8px 24px rgba(37, 99, 235, 0.45)',
                                    marginBottom: 14
                                }, children: _jsx_1("img", { src: appLogo, alt: "Logo", style: { width: 32, height: 32, objectFit: 'cover', borderRadius: 8 } }) }), _jsx_1("h2", { style: { fontSize: 24, fontWeight: 900, margin: '0 0 6px 0', letterSpacing: '-0.4px', color: '#ffffff' }, children: isSignUp ? 'Create Scholar Account' : 'Welcome to TutorWard' }), _jsx_1("p", { style: { fontSize: 13, color: 'rgba(255, 255, 255, 0.65)', margin: 0, fontWeight: 500 }, children: isSignUp
                                    ? 'Register your academic dossier · Department of EEE'
                                    : 'Sign in to access your attendance, mentoring & marks' })] }), _jsxs_1("div", { style: {
                            display: 'flex',
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: 99,
                            padding: 4,
                            marginBottom: 24,
                            border: '1px solid rgba(255, 255, 255, 0.12)'
                        }, children: [_jsx_1("button", { type: "button", onClick: () => { setIsSignUp(false); setError(''); }, style: {
                                    flex: 1,
                                    padding: '9px 0',
                                    borderRadius: 99,
                                    border: 'none',
                                    background: !isSignUp ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'transparent',
                                    color: !isSignUp ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                                    fontSize: 13,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: !isSignUp ? '0 4px 14px rgba(37, 99, 235, 0.4)' : 'none',
                                    transition: 'all 0.25s ease'
                                }, children: "Sign In" }), _jsx_1("button", { type: "button", onClick: () => { setIsSignUp(true); setError(''); }, style: {
                                    flex: 1,
                                    padding: '9px 0',
                                    borderRadius: 99,
                                    border: 'none',
                                    background: isSignUp ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'transparent',
                                    color: isSignUp ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                                    fontSize: 13,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: isSignUp ? '0 4px 14px rgba(37, 99, 235, 0.4)' : 'none',
                                    transition: 'all 0.25s ease'
                                }, children: "Sign Up" })] }), _jsxs_1("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 22 }, children: [_jsxs_1("button", { type: "button", onClick: () => setRole('student'), style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 8,
                                    padding: '10px 14px',
                                    borderRadius: 14,
                                    border: `1.5px solid ${role === 'student' ? '#38bdf8' : 'rgba(255, 255, 255, 0.12)'}`,
                                    background: role === 'student' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                                    color: role === 'student' ? '#38bdf8' : 'rgba(255, 255, 255, 0.7)',
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }, children: [_jsx_1(GraduationCap, { size: 16 }), "Student"] }), _jsxs_1("button", { type: "button", onClick: () => setRole('teacher'), style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 8,
                                    padding: '10px 14px',
                                    borderRadius: 14,
                                    border: `1.5px solid ${role === 'teacher' ? '#c084fc' : 'rgba(255, 255, 255, 0.12)'}`,
                                    background: role === 'teacher' ? 'rgba(192, 132, 252, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                                    color: role === 'teacher' ? '#c084fc' : 'rgba(255, 255, 255, 0.7)',
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }, children: [_jsx_1(Building2, { size: 16 }), "Faculty / HOD"] })] }), error && (_jsxs_1("div", { style: {
                            padding: '10px 14px',
                            background: 'rgba(239, 68, 68, 0.18)',
                            border: '1px solid rgba(239, 68, 68, 0.45)',
                            borderRadius: 12,
                            color: '#fca5a5',
                            fontSize: 12.5,
                            fontWeight: 600,
                            marginBottom: 18,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        }, children: [_jsx_1("span", { children: "\u26A0\uFE0F" }), _jsx_1("span", { children: error })] })), successMsg && (_jsxs_1("div", { style: {
                            padding: '10px 14px',
                            background: 'rgba(16, 185, 129, 0.18)',
                            border: '1px solid rgba(16, 185, 129, 0.45)',
                            borderRadius: 12,
                            color: '#86efac',
                            fontSize: 12.5,
                            fontWeight: 600,
                            marginBottom: 18,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        }, children: [_jsx_1(CheckCircle2, { size: 15 }), _jsx_1("span", { children: successMsg })] })), _jsxs_1("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: 14 }, children: [isSignUp && (_jsxs_1(_Fragment_1, { children: [_jsxs_1("div", { children: [_jsx_1("label", { style: { display: 'block', fontSize: 11.5, fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)', marginBottom: 6 }, children: "Full Name" }), _jsxs_1("div", { style: { position: 'relative' }, children: [_jsx_1(User, { size: 16, style: { position: 'absolute', left: 14, top: 12, color: 'rgba(255, 255, 255, 0.45)' } }), _jsx_1("input", { type: "text", placeholder: "e.g. Nithin Annamalai R", value: name, onChange: (e) => setName(e.target.value), required: true, style: {
                                                            width: '100%',
                                                            padding: '10px 14px 10px 40px',
                                                            borderRadius: 12,
                                                            border: '1px solid rgba(255, 255, 255, 0.18)',
                                                            background: 'rgba(0, 0, 0, 0.3)',
                                                            color: '#ffffff',
                                                            fontSize: 13,
                                                            outline: 'none',
                                                            boxSizing: 'border-box'
                                                        } })] })] }), role === 'student' && (_jsxs_1("div", { children: [_jsx_1("label", { style: { display: 'block', fontSize: 11.5, fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)', marginBottom: 6 }, children: "Roll Number" }), _jsxs_1("div", { style: { position: 'relative' }, children: [_jsx_1(KeyRound, { size: 16, style: { position: 'absolute', left: 14, top: 12, color: 'rgba(255, 255, 255, 0.45)' } }), _jsx_1("input", { type: "text", placeholder: "e.g. 71812503104", value: rollNo, onChange: (e) => setRollNo(e.target.value), style: {
                                                            width: '100%',
                                                            padding: '10px 14px 10px 40px',
                                                            borderRadius: 12,
                                                            border: '1px solid rgba(255, 255, 255, 0.18)',
                                                            background: 'rgba(0, 0, 0, 0.3)',
                                                            color: '#ffffff',
                                                            fontSize: 13,
                                                            outline: 'none',
                                                            boxSizing: 'border-box'
                                                        } })] })] }))] })), _jsxs_1("div", { children: [_jsx_1("label", { style: { display: 'block', fontSize: 11.5, fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)', marginBottom: 6 }, children: "Institutional Email" }), _jsxs_1("div", { style: { position: 'relative' }, children: [_jsx_1(Mail, { size: 16, style: { position: 'absolute', left: 14, top: 12, color: 'rgba(255, 255, 255, 0.45)' } }), _jsx_1("input", { type: "email", placeholder: role === 'teacher' ? 'hod.eee@srec.ac.in' : 'student@srec.ac.in', value: email, onChange: (e) => setEmail(e.target.value), required: true, style: {
                                                    width: '100%',
                                                    padding: '10px 14px 10px 40px',
                                                    borderRadius: 12,
                                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                                    background: 'rgba(0, 0, 0, 0.3)',
                                                    color: '#ffffff',
                                                    fontSize: 13,
                                                    outline: 'none',
                                                    boxSizing: 'border-box'
                                                } })] })] }), _jsxs_1("div", { children: [_jsxs_1("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 }, children: [_jsx_1("label", { style: { fontSize: 11.5, fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)' }, children: "Password" }), !isSignUp && (_jsx_1("button", { type: "button", onClick: () => handleQuickFill('nithin@srec.ac.in', 'Password@123'), style: {
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#38bdf8',
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    padding: 0
                                                }, children: "Use Default Demo?" }))] }), _jsxs_1("div", { style: { position: 'relative' }, children: [_jsx_1(Lock, { size: 16, style: { position: 'absolute', left: 14, top: 12, color: 'rgba(255, 255, 255, 0.45)' } }), _jsx_1("input", { type: showPassword ? 'text' : 'password', placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: (e) => setPassword(e.target.value), required: true, style: {
                                                    width: '100%',
                                                    padding: '10px 40px 10px 40px',
                                                    borderRadius: 12,
                                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                                    background: 'rgba(0, 0, 0, 0.3)',
                                                    color: '#ffffff',
                                                    fontSize: 13,
                                                    outline: 'none',
                                                    boxSizing: 'border-box'
                                                } }), _jsx_1("button", { type: "button", onClick: () => setShowPassword(!showPassword), style: {
                                                    position: 'absolute',
                                                    right: 12,
                                                    top: 10,
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'rgba(255, 255, 255, 0.45)',
                                                    cursor: 'pointer'
                                                }, children: showPassword ? _jsx_1(EyeOff, { size: 16 }) : _jsx_1(Eye, { size: 16 }) })] })] }), _jsx_1("button", { type: "submit", disabled: loading, style: {
                                    marginTop: 10,
                                    padding: '12px',
                                    borderRadius: 14,
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                    color: '#ffffff',
                                    fontSize: 14,
                                    fontWeight: 700,
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 8,
                                    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.45)',
                                    transition: 'all 0.2s ease',
                                    opacity: loading ? 0.75 : 1
                                }, children: loading ? 'Authenticating...' : (isSignUp ? 'Complete Registration →' : 'Sign In to Portal →') })] }), _jsxs_1("div", { style: { marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }, children: [_jsxs_1("div", { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }, children: [_jsx_1(Sparkles, { size: 12, style: { color: '#38bdf8' } }), _jsx_1("span", { style: { fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: '#38bdf8' }, children: "1-Tap Instant Demo Access" })] }), _jsxs_1("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }, children: [_jsxs_1("button", { type: "button", onClick: () => handleQuickFill('nithin@srec.ac.in', 'Password@123', 'student'), style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            padding: '8px 12px',
                                            borderRadius: 12,
                                            background: 'rgba(37, 99, 235, 0.16)',
                                            border: '1px solid rgba(59, 130, 246, 0.4)',
                                            color: '#ffffff',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s ease'
                                        }, onMouseEnter: (e) => e.currentTarget.style.transform = 'translateY(-2px)', onMouseLeave: (e) => e.currentTarget.style.transform = 'translateY(0)', children: [_jsx_1("span", { style: { fontSize: 11, fontWeight: 800, color: '#93c5fd' }, children: "\uD83C\uDF93 Student: Nithin" }), _jsx_1("span", { style: { fontSize: 9.5, color: 'rgba(255, 255, 255, 0.6)' }, children: "71812503104" })] }), _jsxs_1("button", { type: "button", onClick: () => handleQuickFill('hod.eee@srec.ac.in', 'Faculty@123', 'teacher'), style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            padding: '8px 12px',
                                            borderRadius: 12,
                                            background: 'rgba(192, 132, 252, 0.16)',
                                            border: '1px solid rgba(192, 132, 252, 0.4)',
                                            color: '#ffffff',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s ease'
                                        }, onMouseEnter: (e) => e.currentTarget.style.transform = 'translateY(-2px)', onMouseLeave: (e) => e.currentTarget.style.transform = 'translateY(0)', children: [_jsx_1("span", { style: { fontSize: 11, fontWeight: 800, color: '#d8b4fe' }, children: "\uD83D\uDC68\u200D\uD83C\uDFEB Faculty: HOD" }), _jsx_1("span", { style: { fontSize: 9.5, color: 'rgba(255, 255, 255, 0.6)' }, children: "Dr. Ezhilarasi" })] })] })] }), _jsxs_1("div", { style: { marginTop: 22, textAlign: 'center' }, children: [_jsx_1("p", { style: { margin: 0, fontSize: 10.5, color: 'rgba(255, 255, 255, 0.45)' }, children: "Department of EEE \u00B7 Sri Ramakrishna Engineering College" }), _jsx_1("p", { style: { margin: '3px 0 0 0', fontSize: 10, color: 'rgba(255, 255, 255, 0.35)' }, children: "Developer: Nithin Annamalai R \u00B7 tutorwardapp@gmail.com" })] })] })] }));
};
