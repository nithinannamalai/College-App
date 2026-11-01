import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { 
    GraduationCap, TrendingUp, Sparkles, Search, UserCheck, 
    ShieldCheck, ChevronDown, ChevronUp, Save, Award, CheckCircle2,
    BookOpen, Layers
} from 'lucide-react';

export const DesktopAcademics = ({ currentEmail = 'student@eee.com', isAdmin = false }) => {
    const [student, setStudent] = useState(null);
    const [cgpaRecords, setCgpaRecords] = useState({});
    const [arrears, setArrears] = useState(0);

    // Admin states
    const [allStudents, setAllStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudentEmail, setSelectedStudentEmail] = useState(null);
    const [sortBy, setSortBy] = useState('name');
    const [expandedSem, setExpandedSem] = useState(null);

    // Input / Edit states
    const [saving, setSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        loadData();
    }, [currentEmail, selectedStudentEmail, isAdmin]);

    const loadData = async () => {
        if (isAdmin) {
            const list = await dbService.fetchAllStudents();
            setAllStudents(list || []);
            if (selectedStudentEmail) {
                const p = await dbService.getStudentProfile(selectedStudentEmail);
                if (p) {
                    setStudent(p);
                    setCgpaRecords(p.cgpa || {});
                    setArrears(p.arrears || 0);
                }
            } else {
                setStudent(null);
            }
        } else {
            const p = await dbService.getStudentProfile(currentEmail);
            if (p) {
                setStudent(p);
                setCgpaRecords(p.cgpa || {});
                setArrears(p.arrears || 0);
            } else {
                const fallbackStudent = {
                    id: currentEmail || 'student@eee.com',
                    rollNo: '71812503104',
                    name: 'Nithin Annamalai R',
                    email: currentEmail || 'student@eee.com',
                    cgpa: {
                        1: { internal1: 85, internal2: 88, semMarks: 86, gpa: 8.5 },
                        2: { internal1: 82, internal2: 84, semMarks: 83, gpa: 8.3 },
                        3: { internal1: 86, internal2: 87, semMarks: 86, gpa: 8.6 },
                        4: { internal1: 88, internal2: 90, semMarks: 87, gpa: 8.7 },
                        5: { internal1: 84, internal2: 85, semMarks: 84, gpa: 8.4 },
                        6: { internal1: 85, internal2: 86, semMarks: 85, gpa: 8.5 }
                    },
                    arrears: 0
                };
                setStudent(fallbackStudent);
                setCgpaRecords(fallbackStudent.cgpa);
                setArrears(0);
            }
        }
    };

    const getGpa = (grades) => {
        if (!grades) return 0;
        if (typeof grades === 'number') return grades;
        return grades.gpa || 0;
    };

    const calculateCgpa = (records) => {
        const gpas = Object.values(records).map(g => getGpa(g)).filter(v => v > 0);
        if (gpas.length === 0) return 0;
        const sum = gpas.reduce((acc, curr) => acc + curr, 0);
        return parseFloat((sum / gpas.length).toFixed(2));
    };

    const currentCgpa = calculateCgpa(cgpaRecords);

    const handleSaveGrades = async () => {
        if (!student) return;
        setSaving(true);
        setStatusMessage('');
        try {
            const updated = {
                ...student,
                cgpa: cgpaRecords,
                arrears: Number(arrears) || 0
            };
            await dbService.updateStudentProfile(updated);
            setStudent(updated);
            setStatusMessage('✅ Academic records saved to database!');
            setTimeout(() => setStatusMessage(''), 3000);
        } catch (e) {
            console.error(e);
            setStatusMessage('❌ Error updating academic records.');
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateSemester = (sem, field, val) => {
        const numVal = parseFloat(val) || 0;
        setCgpaRecords(prev => ({
            ...prev,
            [sem]: {
                ...(prev[sem] || {}),
                [field]: numVal
            }
        }));
    };

    return (
        _jsxs("div", {
            className: "desktop-academics-view",
            style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 20 },
            children: [
                statusMessage && (
                    _jsx("div", {
                        style: { padding: '12px 18px', background: '#f0fdf4', color: '#166534', border: '1.5px solid #86efac', borderRadius: 14, fontSize: 13, fontWeight: 800, textAlign: 'center' },
                        children: statusMessage
                    })
                ),

                // ── KPI Summary Strip ──
                _jsxs("div", {
                    style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 },
                    children: [
                        _jsxs("div", {
                            style: { background: 'linear-gradient(135deg, #0052cc 0%, #1e40af 100%)', borderRadius: 20, padding: '20px 22px', color: '#ffffff', boxShadow: '0 8px 24px rgba(0,82,204,0.2)' },
                            children: [
                                _jsx("div", { style: { fontSize: 11, fontWeight: 800, opacity: 0.85, textTransform: 'uppercase' }, children: "Cumulative CGPA" }),
                                _jsxs("div", { style: { display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }, children: [
                                    _jsx("span", { style: { fontSize: 36, fontWeight: 950 }, children: currentCgpa }),
                                    _jsx("span", { style: { fontSize: 16, opacity: 0.8 }, children: "/ 10.00" })
                                ] })
                            ]
                        }),
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 20, padding: '20px 22px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
                            children: [
                                _jsx("div", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Standing Arrears" }),
                                _jsx("div", { style: { fontSize: 32, fontWeight: 950, color: arrears === 0 ? '#16a34a' : '#dc2626', marginTop: 4 }, children: arrears === 0 ? "0 (All Clear)" : `${arrears} Standing` })
                            ]
                        }),
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 20, padding: '20px 22px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
                            children: [
                                _jsx("div", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Completed Semesters" }),
                                _jsx("div", { style: { fontSize: 32, fontWeight: 950, color: '#0f172a', marginTop: 4 }, children: `${Object.keys(cgpaRecords).length} / 8` })
                            ]
                        }),
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 20, padding: '20px 22px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
                            children: [
                                _jsx("div", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Graduation Classification" }),
                                _jsx("div", { style: { fontSize: 18, fontWeight: 950, color: currentCgpa >= 8.5 ? '#d97706' : '#0284c7', marginTop: 8 }, children: currentCgpa >= 8.5 ? "First Class with Distinction" : "First Class" })
                            ]
                        })
                    ]
                }),

                // ── Semester Cards Grid (1 to 8) ──
                _jsxs("div", {
                    style: { background: '#ffffff', borderRadius: 22, padding: '24px 26px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
                    children: [
                        _jsxs("div", {
                            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #f1f5f9' },
                            children: [
                                _jsxs("div", {
                                    children: [
                                        _jsx("h3", { style: { fontSize: 16, fontWeight: 950, color: '#0f172a', margin: 0 }, children: "Semester GPA & Continuous Assessment Scorecard" }),
                                        _jsx("span", { style: { fontSize: 12, color: '#64748b', fontWeight: 600 }, children: "Autonomous Regulation 2024–2028 · 8 Semesters Performance Breakup" })
                                    ]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: handleSaveGrades,
                                    disabled: saving,
                                    style: { padding: '9px 20px', borderRadius: 12, background: '#0284c7', color: '#fff', border: 'none', fontWeight: 900, fontSize: 12.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)' },
                                    children: [_jsx(Save, { size: 15 }), saving ? "Saving..." : "Save Grade Changes"]
                                })
                            ]
                        }),

                        _jsx("div", {
                            style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 },
                            children: [1, 2, 3, 4, 5, 6, 7, 8].map(sem => {
                                const rec = cgpaRecords[sem] || {};
                                const gpa = rec.gpa || '';
                                const int1 = rec.internal1 || '';
                                const int2 = rec.internal2 || '';
                                const semMarks = rec.semMarks || '';

                                return (
                                    _jsxs("div", {
                                        style: {
                                            background: '#f8fafc',
                                            borderRadius: 16,
                                            padding: '16px',
                                            border: '1.5px solid #e2e8f0',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 12
                                        },
                                        children: [
                                            _jsxs("div", {
                                                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
                                                children: [
                                                    _jsxs("span", { style: { fontSize: 13, fontWeight: 950, color: '#0052cc' }, children: ["Semester ", sem] }),
                                                    _jsx("span", { style: { fontSize: 10, fontWeight: 800, background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: 6 }, children: gpa ? `${gpa} GPA` : 'Pending' })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
                                                children: [
                                                    _jsxs("div", {
                                                        children: [
                                                            _jsx("label", { style: { fontSize: 10, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 2 }, children: "GPA (0–10)" }),
                                                            _jsx("input", { type: "number", step: "0.01", min: "0", max: "10", value: gpa, onChange: e => handleUpdateSemester(sem, 'gpa', e.target.value), style: { width: '100%', padding: '6px 8px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, fontWeight: 800, boxSizing: 'border-box' } })
                                                        ]
                                                    }),
                                                    _jsxs("div", {
                                                        children: [
                                                            _jsx("label", { style: { fontSize: 10, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Sem Exam %" }),
                                                            _jsx("input", { type: "number", min: "0", max: "100", value: semMarks, onChange: e => handleUpdateSemester(sem, 'semMarks', e.target.value), style: { width: '100%', padding: '6px 8px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, fontWeight: 800, boxSizing: 'border-box' } })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
                                                children: [
                                                    _jsxs("div", {
                                                        children: [
                                                            _jsx("label", { style: { fontSize: 10, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Internal 1" }),
                                                            _jsx("input", { type: "number", min: "0", max: "100", value: int1, onChange: e => handleUpdateSemester(sem, 'internal1', e.target.value), style: { width: '100%', padding: '6px 8px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, boxSizing: 'border-box' } })
                                                        ]
                                                    }),
                                                    _jsxs("div", {
                                                        children: [
                                                            _jsx("label", { style: { fontSize: 10, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Internal 2" }),
                                                            _jsx("input", { type: "number", min: "0", max: "100", value: int2, onChange: e => handleUpdateSemester(sem, 'internal2', e.target.value), style: { width: '100%', padding: '6px 8px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, boxSizing: 'border-box' } })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, sem)
                                );
                            })
                        })
                    ]
                })
            ]
        })
    );
};
