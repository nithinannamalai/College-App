import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff, Sparkles } from 'lucide-react';
import { authService } from '../../services/auth';

export const AuthModal = ({ onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email.trim() || !password.trim()) {
            setError('Please fill in both email and password.');
            return;
        }
        setLoading(true);
        const res = await authService.signIn(email, password);
        if (res.success) {
            onLoginSuccess(res.user);
        } else {
            setError(res.error || 'Authentication failed. Please verify credentials.');
        }
        setLoading(false);
    };

    return (
        _jsx("div", { className: "auth-modal-overlay", children: [
            _jsxs("div", { className: "auth-card glass-luxury-card", children: [
                _jsxs("div", { className: "auth-card-header", children: [
                    _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: [
                        _jsx("div", { className: "auth-card-logo", children: [
                            _jsx(Sparkles, { size: 16, fill: "currentColor", style: { color: 'var(--accent-blue)' } })
                        ] }),
                        _jsxs("div", { children: [
                            _jsx("h3", { style: { fontSize: 16, fontWeight: 800, margin: 0 }, children: "Tutor Ward App" }),
                            _jsx("p", { style: { fontSize: 10, color: 'var(--text-muted)', margin: 0 }, children: "Student & Faculty Portal" })
                        ] })
                    ] }),
                    _jsx("button", { className: "auth-close-btn", onClick: onClose, "aria-label": "Close Login", children: _jsx(X, { size: 18 }) })
                ] }),
                _jsxs("div", { className: "auth-card-body", children: [
                    _jsx("h4", { style: { fontSize: 18, fontWeight: 700, marginBottom: 6 }, children: "Portal Sign In" }),
                    _jsx("p", { style: { fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }, children: "Please enter your college email and password to access your dashboard." }),
                    error && (
                        _jsx("div", { className: "auth-error-banner", children: _jsx("span", { children: error }) })
                    ),
                    _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: 14 }, children: [
                        _jsxs("div", { className: "form-group", children: [
                            _jsx("label", { className: "form-label", htmlFor: "email-input", children: "College Email Address" }),
                            _jsxs("div", { style: { position: 'relative' }, children: [
                                _jsx(Mail, { size: 16, className: "auth-input-icon" }),
                                _jsx("input", { id: "email-input", type: "email", placeholder: "nithin@srec.ac.in", value: email, onChange: (e) => setEmail(e.target.value), className: "form-input auth-input", disabled: loading, required: true })
                            ] })
                        ] }),
                        _jsxs("div", { className: "form-group", children: [
                            _jsx("label", { className: "form-label", htmlFor: "password-input", children: "Password" }),
                            _jsxs("div", { style: { position: 'relative' }, children: [
                                _jsx(Lock, { size: 16, className: "auth-input-icon" }),
                                _jsx("input", { id: "password-input", type: showPassword ? 'text' : 'password', placeholder: "••••••••", value: password, onChange: (e) => setPassword(e.target.value), className: "form-input auth-input", disabled: loading, required: true }),
                                _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "password-toggle-btn", tabIndex: -1, children: showPassword ? _jsx(EyeOff, { size: 16 }) : _jsx(Eye, { size: 16 }) })
                            ] })
                        ] }),
                        _jsx("button", { type: "submit", className: "btn-primary auth-submit-btn", disabled: loading, children: loading ? 'Authenticating...' : 'Sign In' })
                    ] })
                ] })
            ] })
        ] })
    );
};
