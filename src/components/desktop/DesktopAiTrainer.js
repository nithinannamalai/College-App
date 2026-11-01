import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { 
    Sparkles, Bot, Send, RotateCcw, ExternalLink, Play, 
    BookOpen, CheckCircle2, Award, Zap, Cpu, Terminal, 
    Volume2, Copy, Check, ChevronRight, HelpCircle, Layers,
    Maximize2, AlertCircle, RefreshCw, Minimize2
} from 'lucide-react';
import { DesktopPageWrapper } from './DesktopPageWrapper';

// Specialized EEE Knowledge Base & Socratic Responses
const QUICK_PROMPTS = [
    { title: "Induction Motor Torque-Slip", desc: "Derive torque-slip equation & starting torque conditions", subject: "Electrical Machines" },
    { title: "Bus Admittance Matrix [Ybus]", desc: "Step-by-step algorithm for power flow load dispatch", subject: "Power Systems" },
    { title: "Maxwell's Equations & Boundary", desc: "Differential & integral forms across dielectric interfaces", subject: "Electromagnetics" },
    { title: "Buck-Boost State-Space Averaging", desc: "Continuous conduction mode duty ratio & transfer function", subject: "Power Electronics" },
    { title: "Nyquist Stability Criterion", desc: "Encirclement of -1+j0 point & gain/phase margins", subject: "Control Systems" },
    { title: "Embedded STM32 PWM Timer", desc: "Configure CCR registers for 20kHz motor speed control", subject: "Embedded Systems" }
];

const PRACTICE_QUESTIONS = [
    {
        id: 1,
        subject: "Electrical Machines",
        question: "In a 3-phase squirrel cage induction motor, what happens to starting torque if rotor resistance is increased?",
        options: [
            "Starting torque increases up to a maximum when R2 = X2, then decreases",
            "Starting torque strictly decreases monotonically",
            "Starting torque remains unchanged while maximum torque decreases",
            "Maximum torque increases proportionally to rotor resistance"
        ],
        correct: 0,
        explanation: "Starting torque is directly proportional to rotor resistance R2 until R2 equals standstill rotor reactance X2, at which point starting torque equals maximum torque (Tst = Tmax). Beyond this point, torque decreases."
    },
    {
        id: 2,
        subject: "Power Systems",
        question: "Why is the diagonal element Y(i,i) of a bus admittance matrix equal to the sum of all admittances connected to bus i?",
        options: [
            "Due to applying Kirchhoff's Current Law (KCL) at node i with shunt branches included",
            "Because off-diagonal elements cancel out reactive power",
            "To maintain symmetry when mutual coupling is present",
            "Because transmission lines have negligible shunt susceptance"
        ],
        correct: 0,
        explanation: "By KCL at bus i: I_i = Σ y_ij (V_i - V_j) + y_i0 V_i = (Σ y_ij + y_i0) V_i - Σ y_ij V_j. Thus Y_ii = y_i0 + Σ y_ij (self-admittance)."
    },
    {
        id: 3,
        subject: "Power Electronics",
        question: "In a basic Buck converter operating in Continuous Conduction Mode (CCM), the output voltage Vo is related to input Vs and duty ratio D by:",
        options: [
            "Vo = D · Vs",
            "Vo = Vs / (1 - D)",
            "Vo = -D · Vs / (1 - D)",
            "Vo = Vs · (1 - D)"
        ],
        correct: 0,
        explanation: "By volt-second balance on the filter inductor over one switching period: (Vs - Vo) · D·T = Vo · (1 - D)·T  ⇒  Vo = D · Vs."
    }
];

export const DesktopAiTrainer = ({ currentUser, isAdmin = false, onBack }) => {
    // Default directly to the live DeepTutor App!
    const [activeSection, setActiveSection] = useState('app'); // 'app' | 'chat' | 'quiz' | 'library'
    const [iframeKey, setIframeKey] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            time: 'Just now',
            content: `**Welcome to your Personal AI Trainer powered by DeepTutor & Gemini!**\n\nI am your dedicated Electrical & Electronics Engineering Socratic mentor. I don't just give answers—I guide you step-by-step through derivations, circuit topologies, and GATE exam problem solving.\n\n*Choose a suggested topic below or type your engineering question to begin.*`
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('All Core EEE');
    const messagesEndRef = useRef(null);

    // Auto-scroll messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isGenerating]);

    // Socratic response generator
    const generateSocraticResponse = (query) => {
        const lower = query.toLowerCase();

        if (lower.includes('torque') || lower.includes('induction motor') || lower.includes('slip')) {
            return `### ⚡ Induction Motor Torque-Slip Socratic Breakdown\n\n` +
                   `**1. Fundamental Principle:**\n` +
                   `An induction motor produces electromagnetic torque through the interaction between the stator rotating magnetic field ($N_s = 120f/P$) and rotor induced currents.\n\n` +
                   `**2. Governing Torque Equation:**\n` +
                   `$$\\tau_d = \\frac{3}{\\omega_s} \\cdot \\frac{V^2 (R_2/s)}{(R_1 + R_2/s)^2 + (X_1 + X_2)^2}$$\n\n` +
                   `**3. Socratic Key Questions:**\n` +
                   `* **Low Slip Region ($s \\approx 0$):** Here $R_2/s \\gg (X_1 + X_2)$. The equation simplifies to $\\tau \\propto s$. Torque is linear with slip!\n` +
                   `* **High Slip Region ($s \\approx 1$):** Here $(X_1 + X_2) \\gg R_2/s$. The equation simplifies to $\\tau \\propto 1/s$.\n` +
                   `* **Maximum Torque Condition:** Occurs when $s_{max} = \\frac{R_2}{\\sqrt{R_1^2 + (X_1 + X_2)^2}} \\approx \\frac{R_2}{X_2}$. Notice that **maximum torque is independent of $R_2$**, but the slip at which it occurs shifts!\n\n` +
                   `**4. Practical Check:**\n` +
                   `Why do slip-ring induction motors add external rotor resistance during startup? *Because it maximizes starting torque while simultaneously damping heavy starting current spikes.*`;
        }

        if (lower.includes('ybus') || lower.includes('admittance') || lower.includes('power flow') || lower.includes('bus')) {
            return `### 🔌 Bus Admittance Matrix [Ybus] Formulation\n\n` +
                   `**1. Purpose in Power System Analysis:**\n` +
                   `The $[Y_{bus}]$ matrix relates injected bus currents to nodal voltages: $[I_{bus}] = [Y_{bus}] [V_{bus}]$. Unlike $[Z_{bus}]$, it is extremely sparse, making it the bedrock of Gauss-Seidel and Newton-Raphson load flow.\n\n` +
                   `**2. Formulation Rules:**\n` +
                   `* **Diagonal Elements ($Y_{ii}$):** Sum of all branch admittances connected directly to bus $i$, including transmission line charging susceptances ($jB/2$) and shunt capacitors/reactors:\n` +
                   `  $$Y_{ii} = y_{i0} + \\sum_{k \\neq i} y_{ik}$$\n` +
                   `* **Off-Diagonal Elements ($Y_{ij}$):** Negative of the mutual admittance between bus $i$ and bus $j$:\n` +
                   `  $$Y_{ij} = -y_{ij}$$\n\n` +
                   `**3. Code Snippet (Python Matrix Builder):**\n` +
                   `\`\`\`python\n` +
                   `import numpy as np\n` +
                   `# Line data: [from_bus, to_bus, R, X, B_half]\n` +
                   `lines = [(0, 1, 0.02, 0.08, 0.01), (1, 2, 0.04, 0.12, 0.015)]\n` +
                   `n_bus = 3\n` +
                   `Y_bus = np.zeros((n_bus, n_bus), dtype=complex)\n` +
                   `for fb, tb, r, x, b2 in lines:\n` +
                   `    y = 1.0 / complex(r, x)\n` +
                   `    Y_bus[fb, fb] += y + 1j*b2\n` +
                   `    Y_bus[tb, tb] += y + 1j*b2\n` +
                   `    Y_bus[fb, tb] -= y\n` +
                   `    Y_bus[tb, fb] -= y\n` +
                   `print("Y-Bus:\\n", Y_bus)\n` +
                   `\`\`\`\n\n` +
                   `Would you like to solve a 3-bus sample network together?`;
        }

        if (lower.includes('buck') || lower.includes('converter') || lower.includes('duty') || lower.includes('power electronics')) {
            return `### 💡 DC-DC Converter State-Space Analysis\n\n` +
                   `**1. Voltage Ratio Summary:**\n` +
                   `* **Buck:** $V_o = D \\cdot V_s$\n` +
                   `* **Boost:** $V_o = \\frac{V_s}{1 - D}$\n` +
                   `* **Buck-Boost:** $V_o = -\\frac{D}{1 - D} V_s$\n\n` +
                   `**2. Inductor Sizing Principle:**\n` +
                   `To ensure Continuous Conduction Mode (CCM), the inductor ripple current $\\Delta I_L$ must satisfy $\\Delta I_L < 2 I_o$. The critical minimum inductance is:\n` +
                   `$$L_{min} = \\frac{(1 - D) R}{2 f_s}$$\n\n` +
                   `Where $f_s$ is the switching frequency (typically 20 kHz – 500 kHz with modern GaN/SiC MOSFETs).`;
        }

        if (lower.includes('gate') || lower.includes('cheat') || lower.includes('formula')) {
            return `### 🎯 High-Yield GATE 2027 EEE Formula Cheat-Sheet\n\n` +
                   `* **Synchronous Machine Power-Angle:** $P = \\frac{E_f V_t}{X_s} \\sin \\delta + \\frac{V_t^2 (X_d - X_q)}{2 X_d X_q} \\sin 2\\delta$\n` +
                   `* **Surge Impedance Loading (SIL):** $\\text{SIL} = \\frac{V_{LL}^2}{Z_c}$ where $Z_c = \\sqrt{L/C} \\approx 400\\Omega$ for overhead lines\n` +
                   `* **Transformer All-Day Efficiency:** $\\eta_{\\text{all-day}} = \\frac{\\text{Energy Output (kWh)}}{\\text{Energy Output} + 24 P_i + \\sum (I^2 R t)}$\n` +
                   `* **Symmetrical Components:** $V_{012} = \\frac{1}{3} \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & a & a^2 \\\\ 1 & a^2 & a \\end{bmatrix} \\begin{bmatrix} V_a \\\\ V_b \\\\ V_c \\end{bmatrix}$ with $a = e^{j120^\\circ}$\n\n` +
                   `Which specific domain would you like to drill down into next?`;
        }

        return `### 🧠 DeepTutor Socratic Explanation for: "${query}"\n\n` +
               `**1. Core Concept Formulation:**\n` +
               `In electrical engineering analysis, we deconstruct every system into governing conservation laws (Kirchhoff's Laws, Maxwell's Field Equations, and Energy Conservation).\n\n` +
               `**2. Methodological Framework:**\n` +
               `* Identify independent state variables (inductor currents $i_L$, capacitor voltages $v_C$).\n` +
               `* Formulate the mathematical transfer function or differential equation in the $s$-domain (Laplace transform).\n` +
               `* Verify boundary conditions and steady-state operating points.\n\n` +
               `**3. Socratic Step for You:**\n` +
               `What constraints or initial values are given in your problem? Reply with the specific circuit parameters or problem statement, and we will solve it step-by-step together!`;
    };

    const handleSendMessage = () => {
        if (!inputText.trim() || isGenerating) return;
        const userPrompt = inputText.trim();
        setInputText('');

        const newMessages = [
            ...messages,
            { role: 'user', time: 'Just now', content: userPrompt }
        ];
        setMessages(newMessages);
        setIsGenerating(true);

        setTimeout(() => {
            const reply = generateSocraticResponse(userPrompt);
            setMessages(prev => [
                ...prev,
                { role: 'assistant', time: 'Just now', content: reply }
            ]);
            setIsGenerating(false);
        }, 700);
    };

    const handleCopy = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleQuizOptionSelect = (qId, optionIdx) => {
        if (quizSubmitted) return;
        setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    };

    const calculateQuizScore = () => {
        let score = 0;
        PRACTICE_QUESTIONS.forEach(q => {
            if (quizAnswers[q.id] === q.correct) score++;
        });
        return score;
    };

    return (
        _jsx(DesktopPageWrapper, {
            title: "Personal AI Trainer",
            subtitle: "DeepTutor Lifelong Socratic Learning Engine · SREC EEE 24/7 Neural Mentor",
            category: "Intelligence & Mentorship",
            icon: _jsx(Sparkles, { size: 22, style: { color: '#7c3aed' } }),
            onBack: onBack,
            children: _jsxs("div", {
                style: { display: 'flex', flexDirection: 'column', gap: 18 },
                children: [
                    // ── SECTION NAVIGATION TABS & ACTION STRIP ──
                    _jsxs("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: '#ffffff',
                            padding: '10px 16px',
                            borderRadius: 18,
                            border: '1.5px solid #e2e8f0',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                            flexWrap: 'wrap',
                            gap: 12
                        },
                        children: [
                            _jsxs("div", {
                                style: { display: 'flex', alignItems: 'center', gap: 8 },
                                children: [
                                    [
                                        { id: 'app', label: 'DeepTutor App (Live)', icon: _jsx(Sparkles, { size: 15, style: { color: activeSection === 'app' ? '#ffffff' : '#7c3aed' } }) },
                                        { id: 'chat', label: 'Socratic EEE Chatbot', icon: _jsx(Bot, { size: 15 }) },
                                        { id: 'quiz', label: 'Diagnostic Assessment', icon: _jsx(Award, { size: 15 }) },
                                        { id: 'library', label: 'Formula & Theory Vault', icon: _jsx(BookOpen, { size: 15 }) },
                                    ].map(tab => (
                                        _jsxs("button", {
                                            key: tab.id,
                                            type: "button",
                                            onClick: () => setActiveSection(tab.id),
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                padding: '9px 18px',
                                                borderRadius: 12,
                                                border: activeSection === tab.id ? '1.5px solid #7c3aed' : '1px solid transparent',
                                                background: activeSection === tab.id ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' : '#f8fafc',
                                                color: activeSection === tab.id ? '#ffffff' : '#475569',
                                                fontSize: 12.5,
                                                fontWeight: 800,
                                                cursor: 'pointer',
                                                boxShadow: activeSection === tab.id ? '0 4px 14px rgba(124, 58, 237, 0.25)' : 'none',
                                                transition: 'all 0.18s ease'
                                            },
                                            children: [
                                                tab.icon,
                                                tab.label
                                            ]
                                        })
                                    ))
                                ]
                            }),

                            // Right controls: DeepTutor Status & Direct Actions
                            _jsxs("div", {
                                style: { display: 'flex', alignItems: 'center', gap: 10 },
                                children: [
                                    _jsxs("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 7,
                                            padding: '6px 14px',
                                            borderRadius: 99,
                                            background: '#ecfdf5',
                                            border: '1px solid #a7f3d0',
                                            fontSize: 12,
                                            fontWeight: 800,
                                            color: '#065f46'
                                        },
                                        children: [
                                            _jsx("span", {
                                                style: { width: 8, height: 8, borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 8px #16a34a' }
                                            }),
                                            "DeepTutor Engine Live (Port 3782)"
                                        ]
                                    }),

                                    _jsxs("a", {
                                        href: "http://localhost:3782/chat",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            padding: '7px 14px',
                                            borderRadius: 10,
                                            border: '1.5px solid #cbd5e1',
                                            background: '#ffffff',
                                            color: '#0f172a',
                                            fontSize: 12,
                                            fontWeight: 800,
                                            textDecoration: 'none',
                                            cursor: 'pointer'
                                        },
                                        children: [
                                            _jsx(ExternalLink, { size: 13 }),
                                            "Open in New Window"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),

                    // ── VIEW 1: LIVE DEEPTUTOR EMBEDDED APP (PRIMARY) ──
                    activeSection === 'app' && (
                        _jsxs("div", {
                            style: {
                                background: '#ffffff',
                                borderRadius: 22,
                                border: '1.5px solid #e2e8f0',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: isFullscreen ? '100vh' : 820,
                                position: isFullscreen ? 'fixed' : 'relative',
                                top: isFullscreen ? 0 : 'auto',
                                left: isFullscreen ? 0 : 'auto',
                                right: isFullscreen ? 0 : 'auto',
                                bottom: isFullscreen ? 0 : 'auto',
                                zIndex: isFullscreen ? 99999 : 1
                            },
                            children: [
                                // Top App Toolbar
                                _jsxs("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 20px',
                                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                                        color: '#ffffff'
                                    },
                                    children: [
                                        _jsxs("div", {
                                            style: { display: 'flex', alignItems: 'center', gap: 12 },
                                            children: [
                                                _jsx("div", {
                                                    style: { width: 10, height: 10, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }
                                                }),
                                                _jsx("span", { style: { fontSize: 13.5, fontWeight: 950, color: '#f8fafc' }, children: "DeepTutor Interactive Workspace" }),
                                                _jsx("span", { style: { fontSize: 11, background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '2px 8px', borderRadius: 99, fontWeight: 800 }, children: "v1.7.1 · Socratic Model" })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'flex', alignItems: 'center', gap: 10 },
                                            children: [
                                                _jsxs("button", {
                                                    type: "button",
                                                    onClick: () => setIframeKey(k => k + 1),
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        padding: '6px 12px',
                                                        borderRadius: 8,
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        background: 'rgba(255,255,255,0.08)',
                                                        color: '#ffffff',
                                                        fontSize: 12,
                                                        fontWeight: 800,
                                                        cursor: 'pointer'
                                                    },
                                                    children: [
                                                        _jsx(RefreshCw, { size: 13 }),
                                                        "Reload App"
                                                    ]
                                                }),
                                                _jsxs("button", {
                                                    type: "button",
                                                    onClick: () => setIsFullscreen(f => !f),
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        padding: '6px 12px',
                                                        borderRadius: 8,
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        background: 'rgba(255,255,255,0.08)',
                                                        color: '#ffffff',
                                                        fontSize: 12,
                                                        fontWeight: 800,
                                                        cursor: 'pointer'
                                                    },
                                                    children: [
                                                        isFullscreen ? _jsx(Minimize2, { size: 13 }) : _jsx(Maximize2, { size: 13 }),
                                                        isFullscreen ? "Exit Fullscreen" : "Fullscreen"
                                                    ]
                                                }),
                                                _jsxs("a", {
                                                    href: "http://localhost:3782/chat",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        padding: '6px 14px',
                                                        borderRadius: 8,
                                                        border: 'none',
                                                        background: '#38bdf8',
                                                        color: '#0f172a',
                                                        fontSize: 12,
                                                        fontWeight: 900,
                                                        cursor: 'pointer',
                                                        textDecoration: 'none'
                                                    },
                                                    children: [
                                                        _jsx(ExternalLink, { size: 13 }),
                                                        "Pop-out"
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),

                                // Live DeepTutor Application Viewport
                                _jsx("iframe", {
                                    key: iframeKey,
                                    src: "http://localhost:3782/chat",
                                    title: "DeepTutor Application",
                                    style: {
                                        width: '100%',
                                        flex: 1,
                                        minHeight: isFullscreen ? 'calc(100vh - 54px)' : 760,
                                        border: 'none',
                                        background: '#ffffff'
                                    },
                                    allow: "clipboard-read; clipboard-write; microphone; camera"
                                })
                            ]
                        })
                    ),

                    // ── VIEW 2: SOCRATIC CHAT TRAINER ──
                    activeSection === 'chat' && (
                        _jsxs("div", {
                            style: {
                                display: 'grid',
                                gridTemplateColumns: '1fr 340px',
                                gap: 20,
                                alignItems: 'start'
                            },
                            children: [
                                // Left: Chat Window
                                _jsxs("div", {
                                    style: {
                                        background: '#ffffff',
                                        borderRadius: 22,
                                        border: '1.5px solid #e2e8f0',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 680,
                                        overflow: 'hidden'
                                    },
                                    children: [
                                        // Chat Header
                                        _jsxs("div", {
                                            style: {
                                                padding: '16px 22px',
                                                borderBottom: '1.5px solid #f1f5f9',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                background: '#fafafa'
                                            },
                                            children: [
                                                _jsxs("div", {
                                                    style: { display: 'flex', alignItems: 'center', gap: 10 },
                                                    children: [
                                                        _jsx("div", {
                                                            style: { width: 10, height: 10, borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 10px #16a34a' }
                                                        }),
                                                        _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a' }, children: "DeepTutor Neural Mentor Active" }),
                                                        _jsx("span", { style: { fontSize: 11, background: '#f5f3ff', color: '#7c3aed', padding: '2px 8px', borderRadius: 99, fontWeight: 800 }, children: selectedSubject })
                                                    ]
                                                }),
                                                _jsxs("button", {
                                                    type: "button",
                                                    onClick: () => setMessages([
                                                        { role: 'assistant', time: 'Just now', content: 'Conversation reset. Ask any question to resume your Socratic learning session!' }
                                                    ]),
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: '#64748b',
                                                        fontSize: 11.5,
                                                        fontWeight: 700,
                                                        cursor: 'pointer'
                                                    },
                                                    children: [
                                                        _jsx(RotateCcw, { size: 13 }),
                                                        "Reset Chat"
                                                    ]
                                                })
                                            ]
                                        }),

                                        // Message Stream
                                        _jsxs("div", {
                                            style: {
                                                flex: 1,
                                                padding: '20px 24px',
                                                overflowY: 'auto',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 16
                                            },
                                            children: [
                                                messages.map((msg, i) => {
                                                    const isUser = msg.role === 'user';
                                                    return (
                                                        _jsxs("div", {
                                                            style: {
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: isUser ? 'flex-end' : 'flex-start',
                                                                maxWidth: '85%',
                                                                alignSelf: isUser ? 'flex-end' : 'flex-start'
                                                            },
                                                            children: [
                                                                _jsxs("div", {
                                                                    style: {
                                                                        padding: '14px 18px',
                                                                        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                                                        background: isUser ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' : '#f8fafc',
                                                                        color: isUser ? '#ffffff' : '#1e293b',
                                                                        border: isUser ? 'none' : '1.5px solid #e2e8f0',
                                                                        fontSize: 13.5,
                                                                        lineHeight: 1.6,
                                                                        whiteSpace: 'pre-wrap',
                                                                        boxShadow: isUser ? '0 4px 14px rgba(124, 58, 237, 0.25)' : 'none'
                                                                    },
                                                                    children: [
                                                                        msg.content
                                                                    ]
                                                                }),
                                                                !isUser && (
                                                                    _jsxs("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: 10,
                                                                            marginTop: 6,
                                                                            fontSize: 10.5,
                                                                            color: '#94a3b8'
                                                                        },
                                                                        children: [
                                                                            _jsx("span", { children: msg.time }),
                                                                            _jsxs("button", {
                                                                                type: "button",
                                                                                onClick: () => handleCopy(msg.content, i),
                                                                                style: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 700 },
                                                                                children: [
                                                                                    copiedIndex === i ? _jsx(Check, { size: 11, style: { color: '#16a34a' } }) : _jsx(Copy, { size: 11 }),
                                                                                    copiedIndex === i ? "Copied" : "Copy"
                                                                                ]
                                                                            })
                                                                        ]
                                                                    })
                                                                )
                                                            ]
                                                        }, i)
                                                    );
                                                }),
                                                isGenerating && (
                                                    _jsxs("div", {
                                                        style: {
                                                            padding: '14px 18px',
                                                            borderRadius: '18px 18px 18px 4px',
                                                            background: '#f8fafc',
                                                            border: '1.5px solid #e2e8f0',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 10,
                                                            width: 'fit-content'
                                                        },
                                                        children: [
                                                            _jsx("div", {
                                                                style: { width: 16, height: 16, border: '2px solid #7c3aed', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }
                                                            }),
                                                            _jsx("span", { style: { fontSize: 12.5, color: '#64748b', fontWeight: 700 }, children: "DeepTutor is analyzing electrical equations & formulating Socratic step..." })
                                                        ]
                                                    })
                                                ),
                                                _jsx("div", { ref: messagesEndRef })
                                            ]
                                        }),

                                        // Chat Input Box
                                        _jsxs("div", {
                                            style: {
                                                padding: '14px 18px',
                                                borderTop: '1.5px solid #f1f5f9',
                                                background: '#ffffff',
                                                display: 'flex',
                                                gap: 12
                                            },
                                            children: [
                                                _jsx("input", {
                                                    type: "text",
                                                    value: inputText,
                                                    onChange: (e) => setInputText(e.target.value),
                                                    onKeyDown: (e) => {
                                                        if (e.key === 'Enter') handleSendMessage();
                                                    },
                                                    placeholder: `Ask DeepTutor about ${selectedSubject}, circuit proofs, or GATE numericals...`,
                                                    style: {
                                                        flex: 1,
                                                        padding: '12px 18px',
                                                        borderRadius: 14,
                                                        border: '1.5px solid #cbd5e1',
                                                        fontSize: 13.5,
                                                        color: '#0f172a',
                                                        outline: 'none'
                                                    }
                                                }),
                                                _jsxs("button", {
                                                    type: "button",
                                                    onClick: handleSendMessage,
                                                    disabled: !inputText.trim() || isGenerating,
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 8,
                                                        padding: '12px 22px',
                                                        borderRadius: 14,
                                                        border: 'none',
                                                        background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                                                        color: '#ffffff',
                                                        fontWeight: 900,
                                                        fontSize: 13,
                                                        cursor: (!inputText.trim() || isGenerating) ? 'not-allowed' : 'pointer',
                                                        opacity: (!inputText.trim() || isGenerating) ? 0.6 : 1,
                                                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                                                    },
                                                    children: [
                                                        _jsx(Send, { size: 15 }),
                                                        "Solve"
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),

                                // Right: Socratic Prompt Launcher & Quick Concepts
                                _jsxs("div", {
                                    style: { display: 'flex', flexDirection: 'column', gap: 16 },
                                    children: [
                                        _jsxs("div", {
                                            style: {
                                                background: '#ffffff',
                                                borderRadius: 20,
                                                padding: '20px',
                                                border: '1.5px solid #e2e8f0',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                                            },
                                            children: [
                                                _jsxs("div", {
                                                    style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 },
                                                    children: [
                                                        _jsx(Sparkles, { size: 16, style: { color: '#7c3aed' } }),
                                                        _jsx("span", { style: { fontSize: 13.5, fontWeight: 950, color: '#0f172a' }, children: "High-Yield Socratic Prompts" })
                                                    ]
                                                }),
                                                _jsx("div", {
                                                    style: { display: 'flex', flexDirection: 'column', gap: 8 },
                                                    children: QUICK_PROMPTS.map((qp, idx) => (
                                                        _jsxs("div", {
                                                            key: idx,
                                                            onClick: () => {
                                                                setInputText(`Explain ${qp.title} (${qp.subject}) step-by-step.`);
                                                            },
                                                            style: {
                                                                padding: '12px 14px',
                                                                borderRadius: 14,
                                                                background: '#f8fafc',
                                                                border: '1px solid #e2e8f0',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.15s ease'
                                                            },
                                                            onMouseEnter: (e) => {
                                                                e.currentTarget.style.borderColor = '#7c3aed';
                                                                e.currentTarget.style.background = '#f5f3ff';
                                                            },
                                                            onMouseLeave: (e) => {
                                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                                                e.currentTarget.style.background = '#f8fafc';
                                                            },
                                                            children: [
                                                                _jsxs("div", {
                                                                    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 },
                                                                    children: [
                                                                        _jsx("div", { style: { fontSize: 12.5, fontWeight: 900, color: '#0f172a' }, children: qp.title }),
                                                                        _jsx("span", { style: { fontSize: 9.5, fontWeight: 800, color: '#7c3aed', background: '#ede9fe', padding: '1px 6px', borderRadius: 99 }, children: qp.subject })
                                                                    ]
                                                                }),
                                                                _jsx("div", { style: { fontSize: 11, color: '#64748b', lineHeight: 1.3 }, children: qp.desc })
                                                            ]
                                                        })
                                                    ))
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ),

                    // ── VIEW 3: DIAGNOSTIC QUIZ TRAINER ──
                    activeSection === 'quiz' && (
                        _jsxs("div", {
                            style: {
                                background: '#ffffff',
                                borderRadius: 22,
                                padding: '26px 28px',
                                border: '1.5px solid #e2e8f0',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 20
                            },
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
                                    children: [
                                        _jsxs("div", {
                                            children: [
                                                _jsx("h3", { style: { fontSize: 18, fontWeight: 950, color: '#0f172a', margin: '0 0 4px 0' }, children: "Diagnostic Engineering Assessment" }),
                                                _jsx("p", { style: { fontSize: 12.5, color: '#64748b', margin: 0 }, children: "Adaptive question bank testing conceptual depth across Machines, Power Systems, and Drives." })
                                            ]
                                        }),
                                        quizSubmitted && (
                                            _jsxs("div", {
                                                style: {
                                                    padding: '8px 18px',
                                                    borderRadius: 12,
                                                    background: '#ecfdf5',
                                                    border: '1.5px solid #a7f3d0',
                                                    color: '#065f46',
                                                    fontWeight: 900,
                                                    fontSize: 13
                                                },
                                                children: [
                                                    `Your Score: ${calculateQuizScore()} / ${PRACTICE_QUESTIONS.length} (${Math.round((calculateQuizScore() / PRACTICE_QUESTIONS.length) * 100)}%)`
                                                ]
                                            })
                                        )
                                    ]
                                }),

                                // Question Cards
                                _jsx("div", {
                                    style: { display: 'flex', flexDirection: 'column', gap: 16 },
                                    children: PRACTICE_QUESTIONS.map((q, qIndex) => {
                                        const selected = quizAnswers[q.id];
                                        const isCorrect = selected === q.correct;
                                        return (
                                            _jsxs("div", {
                                                style: {
                                                    padding: '20px 22px',
                                                    borderRadius: 16,
                                                    background: '#f8fafc',
                                                    border: '1.5px solid #e2e8f0'
                                                },
                                                children: [
                                                    _jsxs("div", {
                                                        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
                                                        children: [
                                                            _jsxs("div", { style: { fontSize: 13, fontWeight: 900, color: '#7c3aed' }, children: ["Question ", qIndex + 1, " · ", q.subject] }),
                                                            quizSubmitted && (
                                                                _jsx("span", {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        fontWeight: 900,
                                                                        padding: '2px 10px',
                                                                        borderRadius: 99,
                                                                        background: isCorrect ? '#dcfce7' : '#fee2e2',
                                                                        color: isCorrect ? '#15803d' : '#b91c1c'
                                                                    },
                                                                    children: isCorrect ? "CORRECT (+1)" : "INCORRECT"
                                                                })
                                                            )
                                                        ]
                                                    }),
                                                    _jsx("div", { style: { fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 14, lineHeight: 1.4 }, children: q.question }),
                                                    _jsx("div", {
                                                        style: { display: 'flex', flexDirection: 'column', gap: 8 },
                                                        children: q.options.map((opt, optIdx) => {
                                                            const isThisSelected = selected === optIdx;
                                                            let optBg = '#ffffff';
                                                            let optBorder = '#cbd5e1';
                                                            if (isThisSelected) {
                                                                optBg = '#f5f3ff';
                                                                optBorder = '#7c3aed';
                                                            }
                                                            if (quizSubmitted) {
                                                                if (optIdx === q.correct) {
                                                                    optBg = '#ecfdf5';
                                                                    optBorder = '#16a34a';
                                                                } else if (isThisSelected && !isCorrect) {
                                                                    optBg = '#fef2f2';
                                                                    optBorder = '#dc2626';
                                                                }
                                                            }

                                                            return (
                                                                _jsxs("div", {
                                                                    key: optIdx,
                                                                    onClick: () => handleQuizOptionSelect(q.id, optIdx),
                                                                    style: {
                                                                        padding: '10px 14px',
                                                                        borderRadius: 12,
                                                                        border: `1.5px solid ${optBorder}`,
                                                                        background: optBg,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: 12,
                                                                        cursor: quizSubmitted ? 'default' : 'pointer',
                                                                        fontSize: 13,
                                                                        fontWeight: 700,
                                                                        color: '#1e293b'
                                                                    },
                                                                    children: [
                                                                        _jsx("div", {
                                                                            style: {
                                                                                width: 22,
                                                                                height: 22,
                                                                                borderRadius: '50%',
                                                                                border: `2px solid ${isThisSelected ? '#7c3aed' : '#cbd5e1'}`,
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                fontSize: 11,
                                                                                fontWeight: 900,
                                                                                color: isThisSelected ? '#7c3aed' : '#64748b'
                                                                            },
                                                                            children: String.fromCharCode(65 + optIdx)
                                                                        }),
                                                                        _jsx("span", { children: opt })
                                                                    ]
                                                                })
                                                            );
                                                        })
                                                    }),
                                                    quizSubmitted && (
                                                        _jsxs("div", {
                                                            style: { marginTop: 12, padding: '10px 14px', borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe', fontSize: 12, color: '#1e40af', lineHeight: 1.4 },
                                                            children: [
                                                                _jsx("strong", { children: "Socratic Rationale: " }),
                                                                q.explanation
                                                            ]
                                                        })
                                                    )
                                                ]
                                            }, q.id)
                                        );
                                    })
                                }),

                                // Submit Button
                                _jsxs("div", {
                                    style: { display: 'flex', justifyContent: 'flex-end', gap: 12 },
                                    children: [
                                        quizSubmitted && (
                                            _jsxs("button", {
                                                type: "button",
                                                onClick: () => {
                                                    setQuizAnswers({});
                                                    setQuizSubmitted(false);
                                                },
                                                style: {
                                                    padding: '10px 20px',
                                                    borderRadius: 12,
                                                    border: '1.5px solid #cbd5e1',
                                                    background: '#ffffff',
                                                    color: '#0f172a',
                                                    fontWeight: 800,
                                                    fontSize: 13,
                                                    cursor: 'pointer'
                                                },
                                                children: [
                                                    "Try Again"
                                                ]
                                            })
                                        ),
                                        _jsxs("button", {
                                            type: "button",
                                            onClick: () => setQuizSubmitted(true),
                                            disabled: quizSubmitted || Object.keys(quizAnswers).length === 0,
                                            style: {
                                                padding: '10px 24px',
                                                borderRadius: 12,
                                                border: 'none',
                                                background: '#7c3aed',
                                                color: '#ffffff',
                                                fontWeight: 900,
                                                fontSize: 13,
                                                cursor: (quizSubmitted || Object.keys(quizAnswers).length === 0) ? 'not-allowed' : 'pointer',
                                                opacity: (quizSubmitted || Object.keys(quizAnswers).length === 0) ? 0.6 : 1
                                            },
                                            children: [
                                                _jsx(CheckCircle2, { size: 15, style: { display: 'inline', marginRight: 6 } }),
                                                "Submit Evaluation"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ),

                    // ── VIEW 4: EEE FORMULA & THEORY VAULT ──
                    activeSection === 'library' && (
                        _jsxs("div", {
                            style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 20
                            },
                            children: [
                                [
                                    {
                                        title: "Transformer Induced EMF",
                                        subject: "Electrical Machines - I",
                                        formula: "E = 4.44 · f · N · Φm",
                                        desc: "Form factor 1.11 multiplied by 4 gives 4.44. Flux density Bm = Φm / A."
                                    },
                                    {
                                        title: "DC Motor Torque Equation",
                                        subject: "Electrical Machines - I",
                                        formula: "T = (1 / 2π) · (P·Z / A) · Φ · Ia",
                                        desc: "For a given motor geometry, T = k_t · Φ · Ia."
                                    },
                                    {
                                        title: "Transmission Line Surge Impedance Loading",
                                        subject: "Transmission & Distribution",
                                        formula: "SIL = V_LL² / Z_c,  where Z_c = √(L/C)",
                                        desc: "At SIL, the reactive power generated by shunt capacitance exactly equals that absorbed by series inductance."
                                    },
                                    {
                                        title: "Nyquist Stability Encirclement",
                                        subject: "Control Systems",
                                        formula: "N = P - Z",
                                        desc: "N: counter-clockwise encirclements of -1+j0. P: open-loop RHP poles. Z: closed-loop RHP poles."
                                    }
                                ].map((card, idx) => (
                                    _jsxs("div", {
                                        key: idx,
                                        style: {
                                            background: '#ffffff',
                                            borderRadius: 20,
                                            padding: '24px',
                                            border: '1.5px solid #e2e8f0',
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        },
                                        children: [
                                            _jsxs("div", {
                                                children: [
                                                    _jsxs("div", {
                                                        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
                                                        children: [
                                                            _jsx("h4", { style: { fontSize: 15, fontWeight: 950, color: '#0f172a', margin: 0 }, children: card.title }),
                                                            _jsx("span", { style: { fontSize: 10, fontWeight: 800, color: '#7c3aed', background: '#f5f3ff', padding: '2px 8px', borderRadius: 99 }, children: card.subject })
                                                        ]
                                                    }),
                                                    _jsx("p", { style: { fontSize: 12, color: '#64748b', lineHeight: 1.4, margin: '0 0 16px 0' }, children: card.desc })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                style: {
                                                    background: '#f8fafc',
                                                    borderRadius: 14,
                                                    padding: '14px 18px',
                                                    border: '1.5px solid #e2e8f0',
                                                    fontFamily: 'monospace',
                                                    fontSize: 14,
                                                    fontWeight: 900,
                                                    color: '#0f172a',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                },
                                                children: [
                                                    _jsx("span", { children: card.formula }),
                                                    _jsx("button", {
                                                        type: "button",
                                                        onClick: () => handleCopy(card.formula, `lib-${idx}`),
                                                        style: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' },
                                                        children: copiedIndex === `lib-${idx}` ? _jsx(Check, { size: 14, style: { color: '#16a34a' } }) : _jsx(Copy, { size: 14 })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ))
                            ]
                        })
                    )
                ]
            })
        })
    );
};

export default DesktopAiTrainer;
