import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { 
    Zap, Sparkles, CheckCircle2, Circle, Trophy, BookOpen, 
    Briefcase, Target, Award, Compass, ArrowRight, ExternalLink,
    Clock, Check, Flame, ChevronRight, Layers, FileText
} from 'lucide-react';

const CAREER_DATA = {
    gate: {
        title: 'GATE · Graduate Aptitude Test in Engineering',
        badge: 'PSU Recruitment & IITs',
        color: '#2563eb',
        bg: 'rgba(37, 99, 235, 0.08)',
        intro: 'Qualifying GATE opens recruitment doors to premier Public Sector Undertakings (PSUs) like IOCL, NTPC, ONGC, HPCL, and admissions to M.Tech/Ph.D. programs in IITs/IISc with monthly stipends.',
        avgPackage: '₹14.5 – ₹22 LPA',
        timeline: '10–12 Months',
        examMonth: 'February 2027',
        syllabus: [
            { subject: 'Electric Circuits', topics: 'KCL, KVL, Node/Mesh, Network Theorems, Transients, 3-Phase', weight: '9–11%' },
            { subject: 'Electrical Machines', topics: 'Transformers, DC Machines, Induction Motors, Synchronous Machines', weight: '11–13%' },
            { subject: 'Power Systems', topics: 'Transmission Models, Load Flow, Fault Analysis, Relays & Breakers', weight: '10–12%' },
            { subject: 'Power Electronics', topics: 'Choppers, Rectifiers, Inverters, Cycloconverters, SCR & IGBTs', weight: '9–11%' },
            { subject: 'Control Systems', topics: 'Routh-Hurwitz, Nyquist, Bode Plots, State-Space Models', weight: '8–10%' },
            { subject: 'Electromagnetic Fields', topics: 'Maxwell Equations, Gauss & Ampere Laws, Wave Propagation', weight: '5–6%' },
            { subject: 'Engineering Math', topics: 'Linear Algebra, Calculus, Differential Equations, Probability', weight: '15%' },
            { subject: 'General Aptitude', topics: 'Verbal Ability, Numerical Reasoning, Data Interpretation', weight: '15%' }
        ],
        preparation: [
            'Start 10–12 months early. Devote the first 6 months to master core concepts before attempting mocks.',
            'Focus heavily on Electrical Machines, Power Systems, and Power Electronics (together they carry ~35% weightage).',
            'Solve 25+ years of GATE PYQs repeatedly to build intuition for numerical answer type (NAT) questions.',
            'Take full-length mock tests using the official virtual calculator starting 3 months before the exam.'
        ],
        books: [
            { name: 'Electrical Machinery', author: 'Dr. P.S. Bimbhra', role: 'Machines Bible' },
            { name: 'Electrical Power Systems', author: 'C.L. Wadhwa', role: 'Power Systems' },
            { name: 'Power Electronics', author: 'Dr. P.S. Bimbhra', role: 'Power Converters' },
            { name: 'Engineering Circuit Analysis', author: 'Hayt & Kemmerly', role: 'Network Theory' }
        ],
        roadmap: [
            {
                phase: 'Phase 01',
                title: 'Foundation & Math Speed',
                timeline: 'Months 1–3',
                desc: 'Master Engineering Math, Network Theory, and Electromagnetic Fields. Establish core calculation speed.',
                tasks: [
                    'Complete Linear Algebra, Calculus & Differential Equations',
                    'Practice 200+ Network Theorems & Transient PYQs',
                    'Derive Maxwell Equations & Boundary Condition problems'
                ],
                icon: '🌱'
            },
            {
                phase: 'Phase 02',
                title: 'Heavy Core EEE Mastery',
                timeline: 'Months 4–7',
                desc: 'Study Electrical Machines, Power Systems, Control Systems, and Power Electronics in-depth.',
                tasks: [
                    'Master Transformers, Induction & Synchronous Machines',
                    'Complete Load Flow, Fault & Stability Analysis in Power Systems',
                    'Plot Nyquist, Bode & Root Locus in Control Systems',
                    'Design Buck/Boost Choppers, Inverters & Commutation Circuits'
                ],
                icon: '⚡'
            },
            {
                phase: 'Phase 03',
                title: 'Analog, Digital & Formula Bible',
                timeline: 'Months 8–9',
                desc: 'Complete secondary subjects and summarize all formulas into a quick-revision handbook.',
                tasks: [
                    'Build Op-Amp and Digital Logic flashcards',
                    'Practice AC Bridge measurement & error analysis',
                    'Compile 60-page Pocket Formula Handbook for daily revision'
                ],
                icon: '🔬'
            },
            {
                phase: 'Phase 04',
                title: 'Full-Length Mocks & PYQ Blitz',
                timeline: 'Months 10–12',
                desc: 'Solve 20+ years of past papers and sit 15+ simulated full 3-hour tests with virtual calculator.',
                tasks: [
                    'Solve 2000–2025 All Subject GATE PYQs',
                    'Complete 15 Full-Length Online Mock Tests',
                    'Refine 3-hour test strategy and eliminate negative marking errors'
                ],
                icon: '🎯'
            }
        ],
        recruiters: [
            { name: 'Power Grid Corp (PGCIL)', role: 'Executive Trainee', pay: '₹18.0 LPA' },
            { name: 'NTPC Limited', role: 'Assistant Executive', pay: '₹16.5 LPA' },
            { name: 'IOCL / ONGC', role: 'Graduate Engineer', pay: '₹19.2 LPA' },
            { name: 'BARC / ISRO', role: 'Scientific Officer', pay: '₹14.0 LPA' },
            { name: 'BHEL', role: 'Engineer Trainee', pay: '₹13.5 LPA' }
        ]
    },
    upsc: {
        title: 'UPSC · ESE (IES) & Civil Services Examination',
        badge: 'Class-I Gazetted Officers',
        color: '#d97706',
        bg: 'rgba(217, 119, 6, 0.08)',
        intro: 'UPSC conducts the Engineering Services Examination (ESE) to recruit Class-I Gazetted officers for Indian Railway Service, Central Power Engineering Service, and Defense Corps.',
        avgPackage: 'Group-A Govt Cadre',
        timeline: '12–15 Months',
        examMonth: 'Prelims: Feb / Mains: June',
        syllabus: [
            { subject: 'ESE Prelims Paper 1', topics: 'General Studies, Project Management, Ethics, Environment', weight: '200 Marks' },
            { subject: 'ESE Prelims Paper 2', topics: 'Complete Electrical Engineering Core Objective', weight: '300 Marks' },
            { subject: 'ESE Mains Paper 1', topics: 'Descriptive: Circuits, Fields, Materials, Machines, Measurements', weight: '300 Marks' },
            { subject: 'ESE Mains Paper 2', topics: 'Descriptive: Power Systems, Control, Microprocessors, Power Electronics', weight: '300 Marks' }
        ],
        preparation: [
            'ESE requires both high-speed objective solving for Prelims and structured derivation writing for Mains.',
            'Regularly revise General Studies (current affairs, renewable energy policies, ethics, standards).',
            'Practice drawing neat, labeled circuit diagrams and clean mathematical steps for descriptive Mains papers.',
            'Solve the last 25 years of ESE Prelims & Mains solved papers.'
        ],
        books: [
            { name: 'General Studies & Engg Aptitude', author: 'Made Easy / ACE Publications', role: 'Prelims Paper 1' },
            { name: 'Electrical Engineering Materials', author: 'S.P. Seth', role: 'Material Science' },
            { name: 'Modern Control Engineering', author: 'Katsuhiko Ogata', role: 'Control Theory' },
            { name: 'Microprocessor Architecture 8085', author: 'Ramesh Gaonkar', role: 'Embedded Core' }
        ],
        roadmap: [
            {
                phase: 'Phase 01',
                title: 'Technical Depth & Descriptive Notes',
                timeline: 'Months 1–6',
                desc: 'Cover all technical subjects to descriptive standard. Write proofs and complete derivations.',
                tasks: [
                    'Complete Circuit Theory & EM Fields full derivations',
                    'Study Material Science & Electrical Machines phasor proofs',
                    'Practice 10-mark descriptive question templates'
                ],
                icon: '🏛️'
            },
            {
                phase: 'Phase 02',
                title: 'General Studies & Ethics Drill',
                timeline: 'Months 7–9',
                desc: 'Master Prelims Paper 1 syllabus including environment, energy policy, and engineering ethics.',
                tasks: [
                    'Study Project Management & Quality Control standards',
                    'Read Environmental Ecology & Renewable energy reports',
                    'Solve 600+ General Studies MCQs'
                ],
                icon: '📖'
            },
            {
                phase: 'Phase 03',
                title: 'Prelims Speed Marathon',
                timeline: 'Months 10–11',
                desc: 'Intensive practice of objective questions and simulated 3-hour speed test papers.',
                tasks: [
                    'Take 20 Prelims Sectional Speed Tests',
                    'Solve 15 Years of ESE Prelims Papers',
                    'Master question elimination techniques'
                ],
                icon: '⚡'
            },
            {
                phase: 'Phase 04',
                title: 'Mains Descriptive Answer Writing',
                timeline: 'Post-Prelims',
                desc: 'Practice 3-hour conventional answer papers with neat diagrams and step-by-step calculations.',
                tasks: [
                    'Write 30 Full-Length Descriptive Mains Papers',
                    'Attend Mock Technical Personality Interviews',
                    'Finalize UPSC Central Service Cadre Preferences'
                ],
                icon: '🏆'
            }
        ],
        recruiters: [
            { name: 'Indian Railway Service of Electrical Engineers (IRSEE)', role: 'Assistant Divisional Engineer', pay: 'Level-10 Pay Matrix' },
            { name: 'Central Power Engineering Service (CPES)', role: 'Assistant Director', pay: 'Level-10 Pay Matrix' },
            { name: 'Indian Naval Armament Service', role: 'Executive Officer', pay: 'Level-10 Pay Matrix' },
            { name: 'Central Public Works Dept (CPWD)', role: 'Executive Electrical Engineer', pay: 'Level-10 Pay Matrix' }
        ]
    },
    placement: {
        title: 'Campus Placements · Core Electrical & IT Streams',
        badge: 'Tier-1 Corporates & Core MNCs',
        color: '#059669',
        bg: 'rgba(5, 150, 105, 0.08)',
        intro: 'EEE graduates possess dual eligibility for Tier-1 Core Electrical Engineering corporations as well as High-Paying Software Product & Consulting firms.',
        avgPackage: '₹8.0 – ₹24 LPA',
        timeline: 'Semesters 5–8',
        examMonth: 'Day-1 Drives: Aug–Nov',
        syllabus: [
            { subject: 'Core Electrical', topics: 'Circuit Design, Electric Drives, Power Converters, PLC/SCADA, PCB Design', weight: 'High' },
            { subject: 'Embedded & IoT', topics: 'Microcontroller (8051, STM32, Arduino), C/C++, RTOS, CAN Protocol', weight: 'High' },
            { subject: 'Data Structures & Algorithms', topics: 'Arrays, Strings, Linked Lists, Trees, Graphs, Dynamic Programming', weight: 'Tier-1 IT' },
            { subject: 'Quantitative Aptitude', topics: 'Speed Math, Permutations, Probability, Syllogisms, Reading Comprehension', weight: 'Screening' }
        ],
        preparation: [
            'For Core: Build demonstrable hardware prototypes in Electric Vehicles (EV), BMS, or solar power.',
            'For Software: Solve 200+ LeetCode problems (Arrays, Hashing, Two Pointers, Trees).',
            'Prepare a verified ATS-friendly 1-page PDF resume highlighting GitHub repositories and lab projects.',
            'Conduct mock peer interviews covering both technical design and behavioral HR situations.'
        ],
        books: [
            { name: 'Cracking the Coding Interview', author: 'Gayle Laakmann McDowell', role: 'Technical Rounds' },
            { name: 'Quantitative Aptitude for Competitive Exams', author: 'Dr. R.S. Aggarwal', role: 'Aptitude Tests' },
            { name: 'Embedded Systems Architecture', author: 'Tammy Noergaard', role: 'Embedded Core' },
            { name: 'Electric Motor Drives: Modeling & Analysis', author: 'R. Krishnan', role: 'EV Systems' }
        ],
        roadmap: [
            {
                phase: 'Phase 01',
                title: 'Skill Stacking & Capstone Projects',
                timeline: 'Semester 5–6',
                desc: 'Master programming (C++/Python) or embedded hardware. Build a flagship hardware project.',
                tasks: [
                    'Master C++/Python OOPs and Data Structures basics',
                    'Build an IoT Telemetry / Electric Vehicle BMS prototype',
                    'Complete NPTEL / IIT Online Certification in Core Elective'
                ],
                icon: '🛠️'
            },
            {
                phase: 'Phase 02',
                title: 'Industrial Internship & Vaulting',
                timeline: 'Summer Break',
                desc: 'Secure hands-on industrial training at a core factory or software engineering internship.',
                tasks: [
                    'Complete 4-week In-Plant / Core Industrial Internship',
                    'Obtain verified Industry Certificate & Employer Recommendation',
                    'Upload internship credentials to Tutor Ward Document Vault'
                ],
                icon: '💼'
            },
            {
                phase: 'Phase 03',
                title: 'Aptitude & Technical HR Drills',
                timeline: 'Semester 7',
                desc: 'Practice aptitude test sets, participate in group discussions and mock technical HR rounds.',
                tasks: [
                    'Solve 50+ Timed Quantitative & Logical Aptitude Tests',
                    'Participate in 5 Department Mock GD & HR Interview Sessions',
                    'Refine 1-Page ATS-Optimized Technical Resume with College Placement Cell'
                ],
                icon: '🎯'
            },
            {
                phase: 'Phase 04',
                title: 'On-Campus Recruitment Drives',
                timeline: 'Semester 7–8',
                desc: 'Apply to visiting corporate firms, clear technical assessments and secure dream offer letter.',
                tasks: [
                    'Clear Day-1 Mass & Core Recruiter Online Assessments',
                    'Crack Super-Dream Core / IT Technical Interviews',
                    'Receive and celebrate official SREC Autonomous Placement Offer'
                ],
                icon: '🚀'
            }
        ],
        recruiters: [
            { name: 'Siemens / ABB / Schneider', role: 'Power Automation Engineer', pay: '₹10.5 – ₹16.0 LPA' },
            { name: 'Tesla / Ather Energy / Ola Electric', role: 'EV Powertrain Engineer', pay: '₹12.0 – ₹18.5 LPA' },
            { name: 'L&T Technology Services', role: 'Embedded Systems Engineer', pay: '₹8.5 – ₹12.0 LPA' },
            { name: 'Zoho / Freshworks', role: 'Software Development Engineer', pay: '₹9.0 – ₹15.0 LPA' },
            { name: 'Amazon / Microsoft', role: 'SDE-1', pay: '₹22.0 – ₹34.0 LPA' }
        ]
    }
};

export const DesktopCareerHub = () => {
    const [activeTab, setActiveTab] = useState('gate');
    const [completedSteps, setCompletedSteps] = useState({});

    useEffect(() => {
        try {
            const stepsStored = localStorage.getItem('eee_completed_tree_steps');
            if (stepsStored) {
                setCompletedSteps(JSON.parse(stepsStored));
            }
        } catch (e) {
            console.error('Failed to load career steps:', e);
        }
    }, []);

    const toggleStep = (stepKey) => {
        const next = { ...completedSteps, [stepKey]: !completedSteps[stepKey] };
        setCompletedSteps(next);
        try {
            localStorage.setItem('eee_completed_tree_steps', JSON.stringify(next));
        } catch (e) {
            console.error(e);
        }
    };

    const activeData = CAREER_DATA[activeTab];

    // Compute progress
    const totalTasks = activeData.roadmap.reduce((acc, s) => acc + (s.tasks?.length || 1), 0);
    const completedCount = activeData.roadmap.reduce((acc, s, sIdx) => {
        const tasks = s.tasks || [s.title];
        return acc + tasks.filter((_, tIdx) => completedSteps[`${activeTab}-${sIdx}-${tIdx}`]).length;
    }, 0);
    const masteryPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

    return (
        _jsxs("div", {
            className: "desktop-career-hub-view",
            style: {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                animation: 'pageSlideUpFluid 0.3s ease'
            },
            children: [
                // ── Top Stream Switcher Bar ──
                _jsxs("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 14,
                        background: '#ffffff',
                        padding: '12px 18px',
                        borderRadius: 20,
                        border: '1.5px solid #e2e8f0',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                    },
                    children: [
                        // Left: Stream Pills
                        _jsxs("div", {
                            style: { display: 'flex', alignItems: 'center', gap: 8 },
                            children: [
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => setActiveTab('gate'),
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '10px 18px',
                                        borderRadius: 14,
                                        border: activeTab === 'gate' ? '1.5px solid #2563eb' : '1.5px solid transparent',
                                        background: activeTab === 'gate' ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' : '#f8fafc',
                                        color: activeTab === 'gate' ? '#1d4ed8' : '#64748b',
                                        fontWeight: 900,
                                        fontSize: 13,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    },
                                    children: [
                                        _jsx(Zap, { size: 15, style: { color: activeTab === 'gate' ? '#2563eb' : '#94a3b8' } }),
                                        "GATE (PSUs & IITs)"
                                    ]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => setActiveTab('upsc'),
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '10px 18px',
                                        borderRadius: 14,
                                        border: activeTab === 'upsc' ? '1.5px solid #d97706' : '1.5px solid transparent',
                                        background: activeTab === 'upsc' ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' : '#f8fafc',
                                        color: activeTab === 'upsc' ? '#b45309' : '#64748b',
                                        fontWeight: 900,
                                        fontSize: 13,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    },
                                    children: [
                                        _jsx(Trophy, { size: 15, style: { color: activeTab === 'upsc' ? '#d97706' : '#94a3b8' } }),
                                        "UPSC (ESE & Civil Services)"
                                    ]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => setActiveTab('placement'),
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '10px 18px',
                                        borderRadius: 14,
                                        border: activeTab === 'placement' ? '1.5px solid #059669' : '1.5px solid transparent',
                                        background: activeTab === 'placement' ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' : '#f8fafc',
                                        color: activeTab === 'placement' ? '#047857' : '#64748b',
                                        fontWeight: 900,
                                        fontSize: 13,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    },
                                    children: [
                                        _jsx(Briefcase, { size: 15, style: { color: activeTab === 'placement' ? '#059669' : '#94a3b8' } }),
                                        "Campus Placements (Core & IT)"
                                    ]
                                })
                            ]
                        }),

                        // Right: Global Mastery Counter
                        _jsxs("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                padding: '6px 14px',
                                borderRadius: 14
                            },
                            children: [
                                _jsxs("div", {
                                    style: { textAlign: 'right' },
                                    children: [
                                        _jsx("div", { style: { fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Track Mastery" }),
                                        _jsxs("div", { style: { fontSize: 13, fontWeight: 950, color: '#0f172a' }, children: [completedCount, " / ", totalTasks, " Tasks"] })
                                    ]
                                }),
                                _jsxs("div", {
                                    style: {
                                        width: 42,
                                        height: 42,
                                        borderRadius: '50%',
                                        background: activeData.color,
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 950,
                                        fontSize: 12,
                                        boxShadow: `0 4px 12px ${activeData.color}40`
                                    },
                                    children: [masteryPercentage, "%"]
                                })
                            ]
                        })
                    ]
                }),

                // ── Stream Hero Banner ──
                _jsxs("div", {
                    style: {
                        background: `linear-gradient(135deg, ${activeData.color} 0%, #0f172a 100%)`,
                        borderRadius: 24,
                        padding: '28px 32px',
                        color: '#ffffff',
                        boxShadow: `0 12px 32px ${activeData.color}25`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 20
                    },
                    children: [
                        _jsxs("div", {
                            style: { flex: 1, minWidth: 320 },
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 },
                                    children: [
                                        _jsx("span", {
                                            style: {
                                                fontSize: 11,
                                                fontWeight: 800,
                                                letterSpacing: 0.6,
                                                textTransform: 'uppercase',
                                                background: 'rgba(255,255,255,0.18)',
                                                padding: '4px 10px',
                                                borderRadius: 8
                                            },
                                            children: activeData.badge
                                        }),
                                        _jsxs("span", {
                                            style: { fontSize: 12, opacity: 0.85, fontWeight: 600 },
                                            children: ["Target Cycle: ", activeData.examMonth]
                                        })
                                    ]
                                }),
                                _jsx("h2", {
                                    style: { fontSize: 24, fontWeight: 950, margin: '0 0 8px 0', letterSpacing: -0.4 },
                                    children: activeData.title
                                }),
                                _jsx("p", {
                                    style: { fontSize: 13.5, opacity: 0.9, lineHeight: 1.5, margin: 0, maxWidth: 840 },
                                    children: activeData.intro
                                })
                            ]
                        }),

                        // Live Quick Metrics
                        _jsxs("div", {
                            style: {
                                display: 'flex',
                                gap: 12,
                                background: 'rgba(255, 255, 255, 0.12)',
                                backdropFilter: 'blur(10px)',
                                padding: '16px 20px',
                                borderRadius: 18,
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            },
                            children: [
                                _jsxs("div", {
                                    children: [
                                        _jsx("span", { style: { fontSize: 10, opacity: 0.8, textTransform: 'uppercase', fontWeight: 800, display: 'block' }, children: "Expected CTC" }),
                                        _jsx("span", { style: { fontSize: 16, fontWeight: 950 }, children: activeData.avgPackage })
                                    ]
                                }),
                                _jsx("div", { style: { width: 1, background: 'rgba(255,255,255,0.25)', margin: '0 4px' } }),
                                _jsxs("div", {
                                    children: [
                                        _jsx("span", { style: { fontSize: 10, opacity: 0.8, textTransform: 'uppercase', fontWeight: 800, display: 'block' }, children: "Prep Timeline" }),
                                        _jsx("span", { style: { fontSize: 16, fontWeight: 950 }, children: activeData.timeline })
                                    ]
                                })
                            ]
                        })
                    ]
                }),

                // ── 2-COLUMN DESKTOP BENTO GRID ──
                _jsxs("div", {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: '1fr 380px',
                        gap: 22,
                        alignItems: 'start'
                    },
                    children: [
                        // ── MAIN COLUMN (Interactive Roadmap & Syllabus) ──
                        _jsxs("div", {
                            style: { display: 'flex', flexDirection: 'column', gap: 20 },
                            children: [
                                // Interactive Milestone Skill Tree Card
                                _jsxs("div", {
                                    style: {
                                        background: '#ffffff',
                                        borderRadius: 22,
                                        padding: '24px 26px',
                                        border: '1.5px solid #e2e8f0',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                                    },
                                    children: [
                                        _jsxs("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: 20,
                                                paddingBottom: 14,
                                                borderBottom: '1px solid #f1f5f9'
                                            },
                                            children: [
                                                _jsxs("div", {
                                                    children: [
                                                        _jsxs("h3", {
                                                            style: { fontSize: 16, fontWeight: 950, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 8 },
                                                            children: [
                                                                _jsx(Target, { size: 18, style: { color: activeData.color } }),
                                                                "Interactive Milestone Roadmap"
                                                            ]
                                                        }),
                                                        _jsx("span", {
                                                            style: { fontSize: 11.5, color: '#64748b', fontWeight: 600 },
                                                            children: "Check off milestones as you study to track pathway completion"
                                                        })
                                                    ]
                                                }),
                                                _jsxs("span", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 800,
                                                        color: activeData.color,
                                                        background: activeData.bg,
                                                        padding: '4px 10px',
                                                        borderRadius: 8
                                                    },
                                                    children: ["4 Strategic Phases"]
                                                })
                                            ]
                                        }),

                                        // Phases list
                                        _jsx("div", {
                                            style: { display: 'flex', flexDirection: 'column', gap: 16 },
                                            children: activeData.roadmap.map((phase, pIdx) => {
                                                const phaseTasks = phase.tasks || [];
                                                const phaseDoneCount = phaseTasks.filter((_, tIdx) => completedSteps[`${activeTab}-${pIdx}-${tIdx}`]).length;
                                                const isPhaseComplete = phaseTasks.length > 0 && phaseDoneCount === phaseTasks.length;

                                                return (
                                                    _jsxs("div", {
                                                        style: {
                                                            background: isPhaseComplete ? '#f0fdf4' : '#f8fafc',
                                                            borderRadius: 18,
                                                            border: '1.5px solid',
                                                            borderColor: isPhaseComplete ? '#86efac' : '#e2e8f0',
                                                            padding: '18px 20px',
                                                            transition: 'all 0.2s ease'
                                                        },
                                                        children: [
                                                            _jsxs("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'flex-start',
                                                                    marginBottom: 10
                                                                },
                                                                children: [
                                                                    _jsxs("div", {
                                                                        style: { display: 'flex', alignItems: 'center', gap: 10 },
                                                                        children: [
                                                                            _jsx("span", { style: { fontSize: 20 }, children: phase.icon }),
                                                                            _jsxs("div", {
                                                                                children: [
                                                                                    _jsxs("div", {
                                                                                        style: { display: 'flex', alignItems: 'center', gap: 8 },
                                                                                        children: [
                                                                                            _jsx("span", { style: { fontSize: 10, fontWeight: 900, color: activeData.color, textTransform: 'uppercase' }, children: phase.phase }),
                                                                                            _jsx("h4", { style: { fontSize: 14, fontWeight: 900, color: '#0f172a', margin: 0 }, children: phase.title })
                                                                                        ]
                                                                                    }),
                                                                                    _jsx("p", { style: { fontSize: 11.5, color: '#64748b', margin: '2px 0 0', fontWeight: 600 }, children: phase.desc })
                                                                                ]
                                                                            })
                                                                        ]
                                                                    }),
                                                                    _jsxs("span", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            fontWeight: 800,
                                                                            color: isPhaseComplete ? '#166534' : '#475569',
                                                                            background: isPhaseComplete ? '#dcfce7' : '#ffffff',
                                                                            border: '1px solid',
                                                                            borderColor: isPhaseComplete ? '#86efac' : '#e2e8f0',
                                                                            padding: '3px 9px',
                                                                            borderRadius: 8,
                                                                            flexShrink: 0
                                                                        },
                                                                        children: [phaseDoneCount, " / ", phaseTasks.length, " Done"]
                                                                    })
                                                                ]
                                                            }),

                                                            // Subtasks checklist
                                                            _jsx("div", {
                                                                style: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, paddingLeft: 30 },
                                                                children: phaseTasks.map((task, tIdx) => {
                                                                    const stepKey = `${activeTab}-${pIdx}-${tIdx}`;
                                                                    const isChecked = !!completedSteps[stepKey];

                                                                    return (
                                                                        _jsxs("div", {
                                                                            onClick: () => toggleStep(stepKey),
                                                                            style: {
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: 10,
                                                                                padding: '8px 12px',
                                                                                borderRadius: 10,
                                                                                background: '#ffffff',
                                                                                border: '1px solid',
                                                                                borderColor: isChecked ? '#bbf7d0' : '#e2e8f0',
                                                                                cursor: 'pointer',
                                                                                transition: 'all 0.15s ease'
                                                                            },
                                                                            children: [
                                                                                isChecked ? (
                                                                                    _jsx(CheckCircle2, { size: 16, style: { color: '#16a34a', flexShrink: 0 } })
                                                                                ) : (
                                                                                    _jsx(Circle, { size: 16, style: { color: '#cbd5e1', flexShrink: 0 } })
                                                                                ),
                                                                                _jsx("span", {
                                                                                    style: {
                                                                                        fontSize: 12.5,
                                                                                        fontWeight: isChecked ? 600 : 700,
                                                                                        color: isChecked ? '#94a3b8' : '#334155',
                                                                                        textDecoration: isChecked ? 'line-through' : 'none'
                                                                                    },
                                                                                    children: task
                                                                                })
                                                                            ]
                                                                        }, tIdx)
                                                                    );
                                                                })
                                                            })
                                                        ]
                                                    }, pIdx)
                                                );
                                            })
                                        })
                                    ]
                                }),

                                // Official Syllabus Breakdown Card
                                _jsxs("div", {
                                    style: {
                                        background: '#ffffff',
                                        borderRadius: 22,
                                        padding: '24px 26px',
                                        border: '1.5px solid #e2e8f0',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                                    },
                                    children: [
                                        _jsxs("h3", {
                                            style: { fontSize: 15, fontWeight: 950, color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 },
                                            children: [
                                                _jsx(BookOpen, { size: 17, style: { color: activeData.color } }),
                                                "Syllabus & Topic Weightage Breakdown"
                                            ]
                                        }),
                                        _jsx("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                                gap: 12
                                            },
                                            children: activeData.syllabus.map((syl, sIdx) => (
                                                _jsxs("div", {
                                                    style: {
                                                        background: '#f8fafc',
                                                        borderRadius: 14,
                                                        padding: '14px 16px',
                                                        border: '1.5px solid #e2e8f0',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        gap: 8
                                                    },
                                                    children: [
                                                        _jsxs("div", {
                                                            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
                                                            children: [
                                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a' }, children: syl.subject }),
                                                                _jsx("span", {
                                                                    style: {
                                                                        fontSize: 10.5,
                                                                        fontWeight: 800,
                                                                        color: activeData.color,
                                                                        background: activeData.bg,
                                                                        padding: '2px 8px',
                                                                        borderRadius: 6
                                                                    },
                                                                    children: syl.weight
                                                                })
                                                            ]
                                                        }),
                                                        _jsx("span", { style: { fontSize: 11.5, color: '#64748b', lineHeight: 1.4 }, children: syl.topics })
                                                    ]
                                                }, sIdx)
                                            ))
                                        })
                                    ]
                                })
                            ]
                        }),

                        // ── SIDEBAR COLUMN (Recruiters, Strategy & Resources) ──
                        _jsxs("div", {
                            style: { display: 'flex', flexDirection: 'column', gap: 20 },
                            children: [
                                // Top Recruiters & Cadres
                                _jsxs("div", {
                                    style: {
                                        background: '#ffffff',
                                        borderRadius: 22,
                                        padding: '22px 20px',
                                        border: '1.5px solid #e2e8f0',
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                                    },
                                    children: [
                                        _jsxs("h4", {
                                            style: { fontSize: 14, fontWeight: 950, color: '#0f172a', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: 6 },
                                            children: [
                                                _jsx(Briefcase, { size: 16, style: { color: activeData.color } }),
                                                "Target Employers & Cadres"
                                            ]
                                        }),
                                        _jsx("div", {
                                            style: { display: 'flex', flexDirection: 'column', gap: 10 },
                                            children: activeData.recruiters.map((rec, rIdx) => (
                                                _jsxs("div", {
                                                    style: {
                                                        padding: '10px 14px',
                                                        borderRadius: 12,
                                                        background: '#f8fafc',
                                                        border: '1px solid #e2e8f0',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    },
                                                    children: [
                                                        _jsxs("div", {
                                                            children: [
                                                                _jsx("div", { style: { fontSize: 12.5, fontWeight: 800, color: '#0f172a' }, children: rec.name }),
                                                                _jsx("div", { style: { fontSize: 10.5, color: '#64748b' }, children: rec.role })
                                                            ]
                                                        }),
                                                        _jsx("span", {
                                                            style: { fontSize: 11, fontWeight: 900, color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: 6 },
                                                            children: rec.pay
                                                        })
                                                    ]
                                                }, rIdx)
                                            ))
                                        })
                                    ]
                                }),

                                // Recommended Author Reference Books
                                _jsxs("div", {
                                    style: {
                                        background: '#ffffff',
                                        borderRadius: 22,
                                        padding: '22px 20px',
                                        border: '1.5px solid #e2e8f0',
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                                    },
                                    children: [
                                        _jsxs("h4", {
                                            style: { fontSize: 14, fontWeight: 950, color: '#0f172a', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: 6 },
                                            children: [
                                                _jsx(BookOpen, { size: 16, style: { color: activeData.color } }),
                                                "Core Reference Books"
                                            ]
                                        }),
                                        _jsx("div", {
                                            style: { display: 'flex', flexDirection: 'column', gap: 9 },
                                            children: activeData.books.map((bk, bIdx) => (
                                                _jsxs("div", {
                                                    style: {
                                                        padding: '10px 12px',
                                                        borderRadius: 12,
                                                        background: '#f8fafc',
                                                        border: '1px solid #e2e8f0'
                                                    },
                                                    children: [
                                                        _jsxs("div", {
                                                            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
                                                            children: [
                                                                _jsx("div", { style: { fontSize: 12, fontWeight: 800, color: '#0f172a' }, children: bk.name }),
                                                                _jsx("span", { style: { fontSize: 9.5, fontWeight: 800, color: '#64748b', background: '#e2e8f0', padding: '1px 6px', borderRadius: 4 }, children: bk.role })
                                                            ]
                                                        }),
                                                        _jsx("div", { style: { fontSize: 11, color: '#64748b', marginTop: 2 }, children: `Author: ${bk.author}` })
                                                    ]
                                                }, bIdx)
                                            ))
                                        })
                                    ]
                                }),

                                // High-Scoring Preparation Guidelines
                                _jsxs("div", {
                                    style: {
                                        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.05) 0%, rgba(37, 99, 235, 0.08) 100%)',
                                        borderRadius: 22,
                                        padding: '20px',
                                        border: '1.5px solid rgba(2, 132, 199, 0.18)'
                                    },
                                    children: [
                                        _jsxs("h4", {
                                            style: { fontSize: 13.5, fontWeight: 950, color: '#0369a1', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: 6 },
                                            children: [
                                                _jsx(Sparkles, { size: 15, style: { color: '#0284c7' } }),
                                                "Strategic Execution Playbook"
                                            ]
                                        }),
                                        _jsx("div", {
                                            style: { display: 'flex', flexDirection: 'column', gap: 8 },
                                            children: activeData.preparation.map((tip, tIdx) => (
                                                _jsxs("div", {
                                                    style: { display: 'flex', alignItems: 'flex-start', gap: 8 },
                                                    children: [
                                                        _jsx("span", { style: { width: 6, height: 6, borderRadius: '50%', background: '#0284c7', marginTop: 6, flexShrink: 0 } }),
                                                        _jsx("span", { style: { fontSize: 11.5, color: '#334155', lineHeight: 1.45, fontWeight: 600 }, children: tip })
                                                    ]
                                                }, tIdx)
                                            ))
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    );
};
