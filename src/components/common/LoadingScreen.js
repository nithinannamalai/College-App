import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import appLogo from '../../assets/app-logo.png';

export const LoadingScreen = ({ message = 'Synchronizing Academic Workspace...', fullScreen = true }) => {
    return (
        _jsxs("div", { 
            className: fullScreen ? "luxury-loading-fullscreen" : "luxury-loading-inline",
            children: [
                _jsxs("div", { className: "luxury-loading-glass-card", children: [
                    _jsxs("div", { className: "loading-spinner-ring-wrap", children: [
                        _jsx("div", { className: "loading-outer-glow-ring" }),
                        _jsx("div", { className: "loading-inner-core-logo", children: [
                            _jsx("img", { src: appLogo, alt: "Tutor Ward App Logo" })
                        ] })
                    ] }),
                    _jsx("h3", { className: "loading-title", children: "Tutor Ward App" }),
                    _jsx("p", { className: "loading-message", children: message }),
                    _jsx("div", { className: "loading-progress-bar-wrap", children: [
                        _jsx("div", { className: "loading-progress-bar-fill" })
                    ] }),
                    _jsx("span", { className: "loading-department-sub", children: "Sri Ramakrishna Engineering College \u00B7 Dept of EEE" })
                ] })
            ] 
        })
    );
};

