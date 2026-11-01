import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { 
    Award, Plus, Trash2, BookOpen, Clock, CheckCircle2, 
    Upload, Download, Sparkles, ExternalLink, Check
} from 'lucide-react';

const STATUS_CONFIG = {
    registered: { label: 'Registered', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.1)', icon: Clock },
    'in-progress': { label: 'In Progress', color: '#d97706', bg: 'rgba(217, 119, 6, 0.1)', icon: BookOpen },
    completed: { label: 'Completed & Certified', color: '#16a34a', bg: 'rgba(22, 163, 74, 0.1)', icon: CheckCircle2 },
};

export const DesktopNptelTracker = ({ currentEmail = 'student@eee.com', isAdmin = false }) => {
    const [student, setStudent] = useState(null);
    const [exams, setExams] = useState([]);
    const [newExamName, setNewExamName] = useState('');
    const [newStatus, setNewStatus] = useState('registered');
    const [saving, setSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        loadData();
    }, [currentEmail]);

    const loadData = async () => {
        try {
            const p = await dbService.getStudentProfile(currentEmail);
            if (p) {
                setStudent(p);
                setExams(p.nptelExams || ['Electric Vehicles', 'Power Electronics']);
            } else {
                setExams(['Electric Vehicles & Battery Tech', 'Power Electronics Principles']);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        if (!newExamName.trim()) return;
        setSaving(true);
        const updated = [...exams, newExamName.trim()];
        setExams(updated);
        if (student) {
            await dbService.updateStudentProfile({ ...student, nptelExams: updated });
        }
        setNewExamName('');
        setSaving(false);
        setStatusMessage('✅ NPTEL certification course added to dossier!');
        setTimeout(() => setStatusMessage(''), 3000);
    };

    const handleDeleteCourse = async (idx) => {
        if (!window.confirm('Remove this course from NPTEL list?')) return;
        const updated = exams.filter((_, i) => i !== idx);
        setExams(updated);
        if (student) {
            await dbService.updateStudentProfile({ ...student, nptelExams: updated });
        }
    };

    return (
        _jsxs("div", {
            className: "desktop-nptel-tracker-view",
            style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 20 },
            children: [
                statusMessage && (
                    _jsx("div", {
                        style: { padding: '12px 18px', background: '#f0fdf4', color: '#166534', border: '1.5px solid #86efac', borderRadius: 14, fontSize: 13, fontWeight: 800, textAlign: 'center' },
                        children: statusMessage
                    })
                ),

                // Hero Banner
                _jsxs("div", {
                    style: {
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
                        borderRadius: 22,
                        padding: '26px 30px',
                        color: '#ffffff',
                        boxShadow: '0 8px 28px rgba(15, 23, 42, 0.25)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 16
                    },
                    children: [
                        _jsxs("div", {
                            children: [
                                _jsx("div", { style: { fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 4 }, children: "IIT & IISc National Certification" }),
                                _jsx("h2", { style: { margin: '0 0 6px', fontSize: 22, fontWeight: 950 }, children: "NPTEL & SWAYAM Honor Credit Tracker" }),
                                _jsx("p", { style: { margin: 0, fontSize: 13, opacity: 0.85, maxWidth: 680 }, children: "Track verified 8-week and 12-week NPTEL courses eligible for autonomous degree honors and credit transfers." })
                            ]
                        }),
                        _jsxs("div", {
                            style: { background: 'rgba(255,255,255,0.12)', padding: '12px 20px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.2)', textAlign: 'right' },
                            children: [
                                _jsx("div", { style: { fontSize: 10.5, opacity: 0.8, textTransform: 'uppercase', fontWeight: 800 }, children: "Enrolled Courses" }),
                                _jsxs("div", { style: { fontSize: 24, fontWeight: 950 }, children: [exams.length, " Subjects"] })
                            ]
                        })
                    ]
                }),

                // 2-Column Grid
                _jsxs("div", {
                    style: { display: 'grid', gridTemplateColumns: '400px 1fr', gap: 22, alignItems: 'start' },
                    children: [
                        // Left: Add Course Form
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 22, padding: '24px 22px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
                            children: [
                                _jsxs("h3", { style: { margin: '0 0 16px', fontSize: 15, fontWeight: 950, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }, children: [
                                    _jsx(Plus, { size: 16, color: "#0284c7" }),
                                    "Enroll / Log NPTEL Course"
                                ] }),
                                _jsxs("form", {
                                    onSubmit: handleAddCourse,
                                    style: { display: 'flex', flexDirection: 'column', gap: 14 },
                                    children: [
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Course Title" }),
                                                _jsx("input", { type: "text", required: true, value: newExamName, onChange: e => setNewExamName(e.target.value), placeholder: "e.g. Fundamental of Electric Vehicles", style: { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Course Status" }),
                                                _jsxs("select", { value: newStatus, onChange: e => setNewStatus(e.target.value), style: { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 12, fontWeight: 700, background: '#f8fafc', boxSizing: 'border-box' }, children: [
                                                    _jsx("option", { value: "registered", children: "Registered & Ongoing" }),
                                                    _jsx("option", { value: "in-progress", children: "In Progress / Assignments Submitted" }),
                                                    _jsx("option", { value: "completed", children: "Completed & Exam Cleared" })
                                                ] })
                                            ]
                                        }),
                                        _jsx("button", {
                                            type: "submit",
                                            disabled: saving,
                                            style: { padding: '12px', borderRadius: 12, border: 'none', background: '#0284c7', color: '#fff', fontWeight: 900, fontSize: 13, cursor: 'pointer', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)', marginTop: 6 },
                                            children: saving ? "Saving..." : "Add to Academic Dossier"
                                        })
                                    ]
                                })
                            ]
                        }),

                        // Right: Courses List Cards
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 22, padding: '24px 26px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
                            children: [
                                _jsxs("h3", { style: { margin: '0 0 16px', fontSize: 16, fontWeight: 950, color: '#0f172a' }, children: "My Enrolled NPTEL Certifications" }),
                                _jsx("div", {
                                    style: { display: 'flex', flexDirection: 'column', gap: 12 },
                                    children: exams.map((cName, idx) => (
                                        _jsxs("div", {
                                            style: {
                                                background: '#f8fafc',
                                                borderRadius: 16,
                                                padding: '16px 20px',
                                                border: '1.5px solid #e2e8f0',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                _jsxs("div", {
                                                    style: { display: 'flex', alignItems: 'center', gap: 12 },
                                                    children: [
                                                        _jsx("div", {
                                                            style: { width: 40, height: 40, borderRadius: 12, background: '#eff6ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' },
                                                            children: _jsx(Award, { size: 20 })
                                                        }),
                                                        _jsxs("div", {
                                                            children: [
                                                                _jsx("div", { style: { fontSize: 14, fontWeight: 950, color: '#0f172a' }, children: cName }),
                                                                _jsx("div", { style: { fontSize: 11, color: '#64748b', marginTop: 2 }, children: "IIT Madras / IISc Bangalore • 3 Credits Transfer" })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                _jsxs("div", {
                                                    style: { display: 'flex', alignItems: 'center', gap: 10 },
                                                    children: [
                                                        _jsx("span", { style: { fontSize: 11, fontWeight: 900, color: '#16a34a', background: '#dcfce7', padding: '4px 10px', borderRadius: 8 }, children: "Verified" }),
                                                        _jsx("button", {
                                                            onClick: () => handleDeleteCourse(idx),
                                                            style: { padding: '6px 10px', borderRadius: 8, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', cursor: 'pointer' },
                                                            children: _jsx(Trash2, { size: 14 })
                                                        })
                                                    ]
                                                })
                                            ]
                                        }, idx)
                                    ))
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    );
};
