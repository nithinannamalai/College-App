import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Mail, Lock, User, X, Check, Eye, EyeOff, Sparkles, KeyRound } from 'lucide-react';
import { authService } from '../../services/auth';

// High-resolution clean purple mountain landscape background matching design spec
import loginBg from '../../assets/login-bg.png';

export const DesktopLoginPage = ({ onClose, onLoginSuccess, initialIsSignUp = false }) => {
    const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
    const [role, setRole] = useState('student'); // 'student' | 'teacher'

    // Form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // Status states
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    // 1-Tap Demo Quickfill
    const handleQuickFill = (targetEmail, targetPass, targetRole = 'student') => {
        setEmail(targetEmail);
        setPassword(targetPass);
        setRole(targetRole);
        setIsSignUp(false);
        setError('');
        setSuccessMsg(`Autofilled ${targetEmail}`);
        setTimeout(() => setSuccessMsg(''), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (isSignUp) {
            if (!name.trim()) {
                setError('Please provide your name.');
                return;
            }
            if (!email.trim() || !password.trim()) {
                setError('Please provide email and password.');
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
                className: role === 'teacher' ? 'Staff Portal' : 'II EEE-B',
                yearOfStudy: role === 'teacher' ? 'Faculty' : '2nd Year',
                password
            });
            if (res.success) {
                onLoginSuccess(res.user);
            } else {
                setError(res.error || 'Registration failed.');
            }
            setLoading(false);
            return;
        }

        // SIGN IN
        if (!email.trim() || !password.trim()) {
            setError('Please enter your email and password.');
            return;
        }

        setLoading(true);
        const res = await authService.signIn(email, password);
        if (res.success) {
            onLoginSuccess(res.user);
        } else {
            setError(res.error || 'Invalid email or password.');
        }
        setLoading(false);
    };

    return (
        _jsxs("div", {
            style: {
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #2e1065 0%, #3b0764 40%, #1e1b4b 70%, #0f172a 100%)',
                fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
                color: '#ffffff'
            },
            children: [
                // ── HIGH-RESOLUTION SERENE PURPLE MOUNTAIN LANDSCAPE BACKGROUND ──
                _jsx("img", {
                    src: loginBg,
                    alt: "Serene Purple Mountain Landscape",
                    style: {
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        zIndex: 1
                    }
                }),

                // Subtle atmospheric depth overlay
                _jsx("div", {
                    style: {
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at 50% 50%, rgba(30, 27, 75, 0.1) 0%, rgba(15, 23, 42, 0.35) 100%)',
                        zIndex: 2,
                        pointerEvents: 'none'
                    }
                }),

                // Close Button to return to landing page
                _jsx("button", {
                    onClick: onClose,
                    "aria-label": "Close",
                    style: {
                        position: 'absolute',
                        top: 24,
                        right: 28,
                        zIndex: 30,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.15)',
                        border: '1.5px solid rgba(255, 255, 255, 0.35)',
                        backdropFilter: 'blur(10px)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
                    },
                    onMouseEnter: (e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#1e1b4b'; },
                    onMouseLeave: (e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; e.currentTarget.style.color = '#ffffff'; },
                    children: _jsx(X, { size: 18 })
                }),

                // ── ULTRA-FROSTED GLASSMORPHIC CARD (Exact match to reference image) ──
                _jsxs("div", {
                    style: {
                        position: 'relative',
                        zIndex: 20,
                        width: '100%',
                        maxWidth: 420,
                        borderRadius: 26,
                        background: 'rgba(255, 255, 255, 0.14)',
                        backdropFilter: 'blur(25px)',
                        WebkitBackdropFilter: 'blur(25px)',
                        border: '1.5px solid rgba(255, 255, 255, 0.45)',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.6)',
                        padding: '42px 36px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    },
                    children: [
                        // Card Header Title: Login or Register
                        _jsx("h2", {
                            style: {
                                fontSize: 32,
                                fontWeight: 800,
                                color: '#ffffff',
                                margin: '0 0 26px 0',
                                textAlign: 'center',
                                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                                letterSpacing: '-0.5px'
                            },
                            children: isSignUp ? "Register" : "Login"
                        }),

                        // Error / Success Messages
                        error && _jsx("div", {
                            style: {
                                width: '100%',
                                padding: '9px 16px',
                                borderRadius: 99,
                                background: 'rgba(239, 68, 68, 0.3)',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                color: '#ffffff',
                                fontSize: 12,
                                fontWeight: 600,
                                marginBottom: 16,
                                textAlign: 'center'
                            },
                            children: error
                        }),
                        successMsg && _jsx("div", {
                            style: {
                                width: '100%',
                                padding: '9px 16px',
                                borderRadius: 99,
                                background: 'rgba(16, 185, 129, 0.35)',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                color: '#ffffff',
                                fontSize: 12,
                                fontWeight: 600,
                                marginBottom: 16,
                                textAlign: 'center'
                            },
                            children: successMsg
                        }),

                        // Form Fields
                        _jsxs("form", {
                            onSubmit: handleSubmit,
                            style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 16 },
                            children: [
                                // Full Name (Only on Sign Up)
                                isSignUp && _jsxs("div", {
                                    style: {
                                        position: 'relative',
                                        width: '100%'
                                    },
                                    children: [
                                        _jsx("input", {
                                            type: "text",
                                            placeholder: "Full Name",
                                            value: name,
                                            onChange: (e) => setName(e.target.value),
                                            required: true,
                                            style: {
                                                width: '100%',
                                                height: 48,
                                                padding: '0 48px 0 20px',
                                                borderRadius: 99,
                                                background: 'rgba(255, 255, 255, 0.15)',
                                                border: '1.5px solid rgba(255, 255, 255, 0.45)',
                                                color: '#ffffff',
                                                fontSize: 14,
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                                backdropFilter: 'blur(5px)',
                                                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                                            }
                                        }),
                                        _jsx(User, {
                                            size: 17,
                                            style: {
                                                position: 'absolute',
                                                right: 18,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: 'rgba(255, 255, 255, 0.85)',
                                                pointerEvents: 'none'
                                            }
                                        })
                                    ]
                                }),

                                // Email ID Field (Exact match: pill shape + envelope icon on the right)
                                _jsxs("div", {
                                    style: {
                                        position: 'relative',
                                        width: '100%'
                                    },
                                    children: [
                                        _jsx("input", {
                                            type: "email",
                                            placeholder: "Email ID",
                                            value: email,
                                            onChange: (e) => setEmail(e.target.value),
                                            required: true,
                                            style: {
                                                width: '100%',
                                                height: 48,
                                                padding: '0 48px 0 20px',
                                                borderRadius: 99,
                                                background: 'rgba(255, 255, 255, 0.15)',
                                                border: '1.5px solid rgba(255, 255, 255, 0.45)',
                                                color: '#ffffff',
                                                fontSize: 14,
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                                backdropFilter: 'blur(5px)',
                                                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                                            }
                                        }),
                                        _jsx(Mail, {
                                            size: 17,
                                            style: {
                                                position: 'absolute',
                                                right: 18,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: 'rgba(255, 255, 255, 0.85)',
                                                pointerEvents: 'none'
                                            }
                                        })
                                    ]
                                }),

                                // Password Field (Exact match: pill shape + lock icon on the right)
                                _jsxs("div", {
                                    style: {
                                        position: 'relative',
                                        width: '100%'
                                    },
                                    children: [
                                        _jsx("input", {
                                            type: showPassword ? "text" : "password",
                                            placeholder: "Password",
                                            value: password,
                                            onChange: (e) => setPassword(e.target.value),
                                            required: true,
                                            style: {
                                                width: '100%',
                                                height: 48,
                                                padding: '0 48px 0 20px',
                                                borderRadius: 99,
                                                background: 'rgba(255, 255, 255, 0.15)',
                                                border: '1.5px solid rgba(255, 255, 255, 0.45)',
                                                color: '#ffffff',
                                                fontSize: 14,
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                                backdropFilter: 'blur(5px)',
                                                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                                            }
                                        }),
                                        _jsx("button", {
                                            type: "button",
                                            onClick: () => setShowPassword(!showPassword),
                                            style: {
                                                position: 'absolute',
                                                right: 18,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                color: 'rgba(255, 255, 255, 0.85)',
                                                cursor: 'pointer',
                                                padding: 0,
                                                display: 'flex',
                                                alignItems: 'center'
                                            },
                                            children: showPassword ? _jsx(EyeOff, { size: 17 }) : _jsx(Lock, { size: 17 })
                                        })
                                    ]
                                }),

                                // Remember Me Checkbox & Forgot Password Row (Exact match to image)
                                _jsxs("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        fontSize: 12,
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        padding: '0 4px',
                                        marginTop: -2
                                    },
                                    children: [
                                        _jsxs("label", {
                                            style: { display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', userSelect: 'none' },
                                            children: [
                                                _jsx("input", {
                                                    type: "checkbox",
                                                    checked: rememberMe,
                                                    onChange: (e) => setRememberMe(e.target.checked),
                                                    style: { accentColor: '#ffffff', cursor: 'pointer' }
                                                }),
                                                _jsx("span", { children: "Remember me" })
                                            ]
                                        }),
                                        _jsx("button", {
                                            type: "button",
                                            onClick: () => handleQuickFill('nithin@srec.ac.in', 'Password@123', 'student'),
                                            style: {
                                                background: 'none',
                                                border: 'none',
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                fontSize: 12,
                                                cursor: 'pointer',
                                                padding: 0,
                                                textDecoration: 'none'
                                            },
                                            onMouseEnter: (e) => e.currentTarget.style.textDecoration = 'underline',
                                            onMouseLeave: (e) => e.currentTarget.style.textDecoration = 'none',
                                            children: "Forgot Password?"
                                        })
                                    ]
                                }),

                                // Solid White Pill Action Button (Exact match to image)
                                _jsx("button", {
                                    type: "submit",
                                    disabled: loading,
                                    style: {
                                        width: '100%',
                                        height: 48,
                                        borderRadius: 99,
                                        border: 'none',
                                        background: '#ffffff',
                                        color: '#1e1b4b',
                                        fontSize: 15,
                                        fontWeight: 700,
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                                        marginTop: 6,
                                        transition: 'all 0.2s ease',
                                        opacity: loading ? 0.75 : 1
                                    },
                                    onMouseEnter: (e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.35)';
                                    },
                                    onMouseLeave: (e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
                                    },
                                    children: loading ? "Please wait..." : (isSignUp ? "Register" : "Login")
                                })
                            ]
                        }),

                        // Bottom Switch Link: "Don't have an account? Register" / "Already have an account? Login" (Exact match)
                        _jsx("div", {
                            style: { marginTop: 20, textAlign: 'center' },
                            children: _jsxs("button", {
                                type: "button",
                                onClick: () => { setIsSignUp(!isSignUp); setError(''); },
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    fontSize: 12.5,
                                    cursor: 'pointer',
                                    padding: 0
                                },
                                children: isSignUp ? [
                                    "Already have an account? ",
                                    _jsx("strong", { style: { textDecoration: 'underline' }, children: "Login" })
                                ] : [
                                    "Don't have an account? ",
                                    _jsx("strong", { style: { textDecoration: 'underline' }, children: "Register" })
                                ]
                            })
                        }),

                        // 1-Tap Quick Fill Demo Account Pills
                        _jsxs("div", {
                            style: {
                                display: 'flex',
                                gap: 8,
                                marginTop: 18,
                                paddingTop: 14,
                                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                                width: '100%',
                                justifyContent: 'center'
                            },
                            children: [
                                _jsx("button", {
                                    type: "button",
                                    onClick: () => handleQuickFill('nithin@srec.ac.in', 'Password@123', 'student'),
                                    style: {
                                        background: 'rgba(255, 255, 255, 0.12)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: 99,
                                        padding: '4px 12px',
                                        color: '#ffffff',
                                        fontSize: 10.5,
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    },
                                    children: "Demo Student"
                                }),
                                _jsx("button", {
                                    type: "button",
                                    onClick: () => handleQuickFill('hod.eee@srec.ac.in', 'Faculty@123', 'teacher'),
                                    style: {
                                        background: 'rgba(255, 255, 255, 0.12)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: 99,
                                        padding: '4px 12px',
                                        color: '#ffffff',
                                        fontSize: 10.5,
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    },
                                    children: "Demo Faculty"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    );
};
