import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { 
    Calendar, BookOpen, Clock, Download, ExternalLink, 
    Sparkles, Search, ChevronRight, Award, FileText, CheckCircle2
} from 'lucide-react';

const COURSES_CATALOG = [
    { code: '25EE2200', title: 'Electric Circuit Theory', credits: 4, type: 'Core Theory', sem: 3, syllabus: 'Mesh & Nodal Analysis, Thevenin/Norton Theorems, Transients in RLC, 3-Phase Balanced/Unbalanced Loads.', outcomes: 'Analyze complex multi-loop circuits and transient waveforms.' },
    { code: '25EE2106', title: 'Electromagnetic Fields', credits: 3, type: 'Core Theory', sem: 3, syllabus: 'Static Electric & Magnetic Fields, Laplace and Poisson Equations, Maxwell Equations, Plane Waves.', outcomes: 'Formulate boundary value problems in electrostatics.' },
    { code: '25EE2201', title: 'Electrical Machines - I', credits: 4, type: 'Core Theory', sem: 3, syllabus: 'Magnetic Circuits, Single & Three-Phase Transformers, DC Generators, DC Motor Speed Control & Testing.', outcomes: 'Evaluate performance parameters of rotating energy converters.' },
    { code: '25MA2114', title: 'Transforms & Partial Differential Equations', credits: 4, type: 'Math Core', sem: 3, syllabus: 'Fourier Series, Dirichlet Conditions, Half Range Expansions, PDE Solutions, Z-Transforms.', outcomes: 'Solve boundary value partial differential equations in engineering.' },
    { code: '25CS2261', title: 'Python Programming & Data Structures', credits: 3, type: 'Computing', sem: 3, syllabus: 'Python Syntax, OOP Concepts, Stacks, Queues, Linked Lists, Trees, Sorting & Searching Algorithms.', outcomes: 'Implement data structure algorithms for real-world automation.' },
    { code: '25EE2250', title: 'DC Machines & Transformers Lab', credits: 2, type: 'Laboratory', sem: 3, syllabus: 'Load test on DC Shunt Motor, Swinburne Test, OC & SC Test on 1-Phase Transformer, Sumpner Test.', outcomes: 'Experimentally determine regulation and efficiency curves.' },
    { code: '25CS2261(L)', title: 'Python Programming Lab', credits: 2, type: 'Laboratory', sem: 3, syllabus: 'Implementation of OOPs, Stack & Queue ADTs, Binary Search Trees, Matrix Operations in Python.', outcomes: 'Build functional Python tools for electrical engineering math.' }
];

const WORKING_DAYS_SCHEDULE = [
    { month: 'August 2026', workingDays: 22, events: 'Commencement of Classes · Orientation & Lab Batches Allocation' },
    { month: 'September 2026', workingDays: 23, events: 'Continuous Assessment Test 1 (CAT-1) · IEEE Symposium Paper Submissions' },
    { month: 'October 2026', workingDays: 21, events: 'CAT-2 Midterms · Diwali Holidays · Project Review 1' },
    { month: 'November 2026', workingDays: 24, events: 'CAT-3 Revision Tests · Model Practical Examinations · Attendance Locking' },
    { month: 'December 2026', workingDays: 14, events: 'Autonomous End-Semester Theory & Practical Examinations · Winter Vacation' }
];

export const DesktopCalendarCourses = ({ initialView = 'courses' }) => {
    const [viewMode, setViewMode] = useState(initialView);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSem, setSelectedSem] = useState('3');

    const filteredCourses = COURSES_CATALOG.filter(c => {
        const q = searchQuery.toLowerCase();
        return c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.type.toLowerCase().includes(q);
    });

    return (
        _jsxs("div", {
            className: "desktop-calendar-courses-view",
            style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 20 },
            children: [
                // Top View Switcher Toolbar
                _jsxs("div", {
                    style: {
                        background: '#ffffff',
                        borderRadius: 20,
                        padding: '14px 20px',
                        border: '1.5px solid #e2e8f0',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 12
                    },
                    children: [
                        _jsxs("div", {
                            style: { display: 'flex', gap: 8 },
                            children: [
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => setViewMode('courses'),
                                    style: {
                                        padding: '9px 18px',
                                        borderRadius: 12,
                                        border: viewMode === 'courses' ? '1.5px solid #0284c7' : '1px solid transparent',
                                        background: viewMode === 'courses' ? '#eff6ff' : '#f8fafc',
                                        color: viewMode === 'courses' ? '#0284c7' : '#64748b',
                                        fontWeight: 900,
                                        fontSize: 12.5,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [_jsx(BookOpen, { size: 15 }), "Department Course Catalog & Syllabi"]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => setViewMode('calendar'),
                                    style: {
                                        padding: '9px 18px',
                                        borderRadius: 12,
                                        border: viewMode === 'calendar' ? '1.5px solid #0284c7' : '1px solid transparent',
                                        background: viewMode === 'calendar' ? '#eff6ff' : '#f8fafc',
                                        color: viewMode === 'calendar' ? '#0284c7' : '#64748b',
                                        fontWeight: 900,
                                        fontSize: 12.5,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [_jsx(Calendar, { size: 15 }), "Academic Working Days & Exam Calendar"]
                                })
                            ]
                        }),

                        viewMode === 'courses' && (
                            _jsxs("div", {
                                style: { position: 'relative', width: 280 },
                                children: [
                                    _jsx(Search, { size: 14, style: { position: 'absolute', left: 12, top: 11, color: '#94a3b8' } }),
                                    _jsx("input", {
                                        type: "text",
                                        placeholder: "Search courses or codes...",
                                        value: searchQuery,
                                        onChange: e => setSearchQuery(e.target.value),
                                        style: { width: '100%', padding: '8px 12px 8px 34px', borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 12, outline: 'none', boxSizing: 'border-box' }
                                    })
                                ]
                            })
                        )
                    ]
                }),

                // ── COURSES CATALOG VIEW ──
                viewMode === 'courses' ? (
                    _jsxs("div", {
                        style: { display: 'flex', flexDirection: 'column', gap: 16 },
                        children: [
                            _jsxs("div", {
                                style: {
                                    background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
                                    borderRadius: 22,
                                    padding: '24px 28px',
                                    color: '#ffffff',
                                    boxShadow: '0 8px 24px rgba(2, 132, 199, 0.2)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 16
                                },
                                children: [
                                    _jsxs("div", {
                                        children: [
                                            _jsx("h2", { style: { margin: 0, fontSize: 20, fontWeight: 950 }, children: "Autonomous Regulation 2024–2028 Curriculum" }),
                                            _jsx("p", { style: { margin: '4px 0 0', fontSize: 13, opacity: 0.9 }, children: "Verified B.E. Electrical & Electronics Engineering Syllabi & Lecture Course Outcomes" })
                                        ]
                                    }),
                                    _jsxs("div", {
                                        style: { background: 'rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: 14, fontSize: 13, fontWeight: 900 },
                                        children: [filteredCourses.length, " Prescribed Courses • Sem III"]
                                    })
                                ]
                            }),

                            _jsx("div", {
                                style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 },
                                children: filteredCourses.map(course => (
                                    _jsxs("div", {
                                        style: {
                                            background: '#ffffff',
                                            borderRadius: 20,
                                            padding: '22px',
                                            border: '1.5px solid #e2e8f0',
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            gap: 14
                                        },
                                        children: [
                                            _jsxs("div", {
                                                children: [
                                                    _jsxs("div", {
                                                        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
                                                        children: [
                                                            _jsx("span", { style: { fontSize: 12, fontWeight: 950, color: '#0284c7', background: 'rgba(2, 132, 199, 0.08)', padding: '3px 8px', borderRadius: 6 }, children: course.code }),
                                                            _jsxs("span", { style: { fontSize: 11, fontWeight: 800, color: '#64748b' }, children: [course.credits, " Credits • ", course.type] })
                                                        ]
                                                    }),
                                                    _jsx("h4", { style: { fontSize: 15, fontWeight: 950, color: '#0f172a', margin: '0 0 8px 0' }, children: course.title }),
                                                    _jsx("p", { style: { fontSize: 12, color: '#475569', lineHeight: 1.5, margin: '0 0 10px 0' }, children: course.syllabus })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                style: { background: '#f8fafc', padding: '10px 14px', borderRadius: 12, border: '1px solid #e2e8f0' },
                                                children: [
                                                    _jsx("span", { style: { fontSize: 10, fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }, children: "Course Learning Outcome" }),
                                                    _jsx("div", { style: { fontSize: 11.5, color: '#334155', fontWeight: 600, marginTop: 2 }, children: course.outcomes })
                                                ]
                                            })
                                        ]
                                    }, course.code)
                                ))
                            })
                        ]
                    })
                ) : (
                    // ── ACADEMIC CALENDAR VIEW ──
                    _jsxs("div", {
                        style: { background: '#ffffff', borderRadius: 22, padding: '24px 26px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: 16 },
                        children: [
                            _jsxs("div", {
                                children: [
                                    _jsx("h3", { style: { margin: 0, fontSize: 16, fontWeight: 950, color: '#0f172a' }, children: "Academic Year 2026–2027 Schedule & Milestone Calendar" }),
                                    _jsx("span", { style: { fontSize: 12, color: '#64748b', fontWeight: 600 }, children: "Official working days, continuous assessment tests, and semester examination windows" })
                                ]
                            }),
                            _jsx("div", {
                                style: { display: 'flex', flexDirection: 'column', gap: 12 },
                                children: WORKING_DAYS_SCHEDULE.map((item, idx) => (
                                    _jsxs("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '16px 20px',
                                            borderRadius: 16,
                                            background: '#f8fafc',
                                            border: '1.5px solid #e2e8f0'
                                        },
                                        children: [
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("div", { style: { fontSize: 14, fontWeight: 950, color: '#0f172a' }, children: item.month }),
                                                    _jsx("div", { style: { fontSize: 12, color: '#475569', marginTop: 2 }, children: item.events })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                style: { textAlign: 'right' },
                                                children: [
                                                    _jsxs("span", { style: { fontSize: 13, fontWeight: 950, color: '#0284c7' }, children: [item.workingDays, " Working Days"] }),
                                                    _jsx("div", { style: { fontSize: 10.5, color: '#16a34a', fontWeight: 800, marginTop: 2 }, children: "SREC Approved" })
                                                ]
                                            })
                                        ]
                                    }, idx)
                                ))
                            })
                        ]
                    })
                )
            ]
        })
    );
};
