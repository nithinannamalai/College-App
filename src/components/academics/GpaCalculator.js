import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { GraduationCap, Sparkles, Pencil, Check, Plus, Trash2, ArrowLeft, RotateCcw, BookOpen, Target, Award } from 'lucide-react';

const DEFAULT_SUBJECTS = [
    { id: '1', code: 'EE8601', name: 'Power System Operation and Control', credits: 3, gradePoint: 9 },
    { id: '2', code: 'EE8602', name: 'Transmission and Distribution', credits: 4, gradePoint: 8 },
    { id: '3', code: 'EE8603', name: 'Digital Logic Circuits', credits: 3, gradePoint: 9 },
    { id: '4', code: 'EE8691', name: 'Embedded Systems', credits: 3, gradePoint: 10 },
    { id: '5', code: 'EE8611', name: 'Power Electronics Lab', credits: 2, gradePoint: 10 },
    { id: '6', code: 'EE8612', name: 'Renewable Energy Systems Lab', credits: 2, gradePoint: 10 },
];

const GRADE_OPTIONS = [
    { label: 'O (10 Pts)', value: 10 },
    { label: 'A+ (9 Pts)', value: 9 },
    { label: 'A (8 Pts)', value: 8 },
    { label: 'B+ (7 Pts)', value: 7 },
    { label: 'B (6 Pts)', value: 6 },
    { label: 'U (0 Pts - Arrear)', value: 0 },
];

export const GpaCalculator = ({ onBack }) => {
    const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentCgpa, setCurrentCgpa] = useState('8.6');
    const [completedSemesters, setCompletedSemesters] = useState('5');
    const [targetCgpa, setTargetCgpa] = useState('9.0');
    const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 992);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 992);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculations
    const totalCredits = subjects.reduce((sum, s) => sum + (Number(s.credits) || 0), 0);
    const earnedPoints = subjects.reduce((sum, s) => sum + (s.gradePoint * (Number(s.credits) || 0)), 0);
    const calculatedGpa = totalCredits > 0 ? (earnedPoints / totalCredits).toFixed(2) : '0.00';

    // Target required GPA calculation
    const curCgpaNum = parseFloat(currentCgpa) || 8.6;
    const compSemsNum = parseInt(completedSemesters) || 5;
    const tgtCgpaNum = parseFloat(targetCgpa) || 9.0;
    const remSems = Math.max(1, 8 - compSemsNum);
    const reqGpaForTarget = (((tgtCgpaNum * 8) - (curCgpaNum * compSemsNum)) / remSems).toFixed(2);

    // Projected Cumulative CGPA including this semester
    const projectedCgpa = (((curCgpaNum * compSemsNum) + parseFloat(calculatedGpa)) / (compSemsNum + 1)).toFixed(2);

    const handleUpdateGrade = (id, newPoint) => {
        setSubjects(prev => prev.map(s => s.id === id ? { ...s, gradePoint: newPoint } : s));
    };

    const handleUpdateSubjectField = (id, field, value) => {
        setSubjects(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleAddSubject = () => {
        const newId = `sub-${Date.now()}`;
        setSubjects(prev => [
            ...prev,
            {
                id: newId,
                code: `EE86${prev.length + 10}`,
                name: 'New Elective / Subject',
                credits: 3,
                gradePoint: 9
            }
        ]);
    };

    const handleDeleteSubject = (id) => {
        if (subjects.length <= 1)
            return;
        setSubjects(prev => prev.filter(s => s.id !== id));
    };

    const handleSetAllGrades = (point) => {
        setSubjects(prev => prev.map(s => ({ ...s, gradePoint: point })));
    };

    const handleResetDefaults = () => {
        setSubjects(DEFAULT_SUBJECTS);
        setIsEditMode(false);
    };

    // Simulated Result Component
    const resultBox = (
        _jsxs("div", {
            style: {
                background: 'linear-gradient(135deg, #0052cc 0%, #1d4ed8 100%)',
                borderRadius: 22,
                padding: '24px',
                color: '#fff',
                boxShadow: '0 12px 32px rgba(0,82,204,0.22)',
                border: '1px solid rgba(255,255,255,0.18)',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                position: isDesktop ? 'sticky' : 'static',
                top: 88
            },
            children: [
                _jsxs("div", {
                    children: [
                        _jsxs("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                fontSize: 11.5,
                                opacity: 0.9,
                                fontWeight: 800,
                                letterSpacing: 0.5,
                                marginBottom: 6,
                                textTransform: 'uppercase'
                            },
                            children: [
                                _jsx(GraduationCap, { size: 18 }),
                                "Simulated Semester GPA"
                            ]
                        }),
                        _jsxs("div", {
                            style: { display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 },
                            children: [
                                _jsx("span", {
                                    style: { fontSize: 48, fontWeight: 950, lineHeight: 1, letterSpacing: -1 },
                                    children: calculatedGpa
                                }),
                                _jsx("span", {
                                    style: { fontSize: 18, opacity: 0.8, fontWeight: 700 },
                                    children: "/ 10.00"
                                })
                            ]
                        })
                    ]
                }),

                _jsxs("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        background: 'rgba(255,255,255,0.12)',
                        padding: '14px 16px',
                        borderRadius: 16
                    },
                    children: [
                        _jsxs("div", {
                            style: { display: 'flex', justifyContent: 'space-between', fontSize: 12 },
                            children: [
                                _jsx("span", { style: { opacity: 0.85 }, children: "Total Courses:" }),
                                _jsx("span", { style: { fontWeight: 800 }, children: subjects.length })
                            ]
                        }),
                        _jsxs("div", {
                            style: { display: 'flex', justifyContent: 'space-between', fontSize: 12 },
                            children: [
                                _jsx("span", { style: { opacity: 0.85 }, children: "Total Credits:" }),
                                _jsxs("span", { style: { fontWeight: 800 }, children: [totalCredits, " Credits"] })
                            ]
                        }),
                        _jsxs("div", {
                            style: { display: 'flex', justifyContent: 'space-between', fontSize: 12 },
                            children: [
                                _jsx("span", { style: { opacity: 0.85 }, children: "Earned Grade Points:" }),
                                _jsxs("span", { style: { fontWeight: 800 }, children: [earnedPoints, " / ", totalCredits * 10] })
                            ]
                        }),
                        _jsx("div", { style: { height: 1, background: 'rgba(255,255,255,0.2)', margin: '4px 0' } }),
                        _jsxs("div", {
                            style: { display: 'flex', justifyContent: 'space-between', fontSize: 12.5 },
                            children: [
                                _jsx("span", { style: { opacity: 0.95, fontWeight: 700 }, children: "Projected New CGPA:" }),
                                _jsx("span", { style: { fontWeight: 950, color: '#fef08a' }, children: projectedCgpa })
                            ]
                        })
                    ]
                }),

                _jsxs("div", {
                    style: {
                        background: 'rgba(0,0,0,0.18)',
                        padding: '12px 14px',
                        borderRadius: 14,
                        fontSize: 11.5,
                        lineHeight: 1.5,
                        color: 'rgba(255,255,255,0.92)'
                    },
                    children: [
                        _jsxs("strong", { children: ["Goal Feasibility: "] }),
                        parseFloat(reqGpaForTarget) > 10
                            ? "Target requires an average > 10.00 GPA in remaining semesters. Consider adjusting target."
                            : `Maintaining ${reqGpaForTarget} GPA will achieve your ${targetCgpa} CGPA graduation milestone.`
                    ]
                })
            ]
        })
    );

    return (
        _jsxs("div", {
            style: {
                width: '100%',
                maxWidth: isDesktop ? 1380 : 720,
                margin: '0 auto',
                paddingBottom: 40
            },
            children: [
                // ── MOBILE-ONLY HEADER (Hidden on Desktop) ──
                !isDesktop && (
                    _jsxs("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 18,
                            flexWrap: 'wrap',
                            gap: 10
                        },
                        children: [
                            _jsxs("div", {
                                style: { display: 'flex', alignItems: 'center', gap: 12 },
                                children: [
                                    _jsx("button", {
                                        onClick: onBack,
                                        style: {
                                            background: 'var(--bg-secondary)',
                                            border: '1px solid var(--card-border)',
                                            borderRadius: '50%',
                                            width: 36,
                                            height: 36,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            color: 'var(--text-primary)'
                                        },
                                        children: _jsx(ArrowLeft, { size: 18 })
                                    }),
                                    _jsxs("div", {
                                        children: [
                                            _jsx("h2", {
                                                style: { fontSize: 18, fontWeight: 800, margin: 0, color: 'var(--text-main)' },
                                                children: "Target CGPA & GPA Calculator"
                                            }),
                                            _jsx("p", {
                                                style: { fontSize: 11, color: 'var(--text-muted)', margin: 0 },
                                                children: "Simulate semester grades, edit courses & calculate target CGPA"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            _jsx("div", {
                                style: { display: 'flex', gap: 8 },
                                children: _jsx("button", {
                                    onClick: () => setIsEditMode(!isEditMode),
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        padding: '8px 14px',
                                        borderRadius: 10,
                                        fontSize: 12,
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        background: isEditMode ? 'var(--accent-blue, #0052cc)' : 'var(--bg-secondary)',
                                        color: isEditMode ? '#fff' : 'var(--text-primary)',
                                        border: isEditMode ? 'none' : '1px solid var(--card-border)',
                                        transition: 'all 0.2s'
                                    },
                                    children: isEditMode
                                        ? _jsxs(_Fragment, { children: [_jsx(Check, { size: 14 }), " Done Editing"] })
                                        : _jsxs(_Fragment, { children: [_jsx(Pencil, { size: 14 }), " Edit Courses"] })
                                })
                            })
                        ]
                    })
                ),

                // ── DESKTOP TOOLBAR (Clean, Single Line) ──
                isDesktop && (
                    _jsxs("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 18,
                            padding: '12px 18px',
                            background: '#ffffff',
                            borderRadius: 16,
                            border: '1.5px solid #e2e8f0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                        },
                        children: [
                            _jsxs("div", {
                                style: { display: 'flex', alignItems: 'center', gap: 10 },
                                children: [
                                    _jsx("span", {
                                        style: {
                                            fontSize: 11.5,
                                            fontWeight: 800,
                                            color: '#0284c7',
                                            background: 'rgba(2, 132, 199, 0.08)',
                                            padding: '4px 10px',
                                            borderRadius: 8
                                        },
                                        children: "Semester Simulation"
                                    }),
                                    _jsxs("span", {
                                        style: { fontSize: 12.5, fontWeight: 700, color: '#475569' },
                                        children: [subjects.length, " Enrolled Courses • ", totalCredits, " Total Credits"]
                                    })
                                ]
                            }),
                            _jsxs("div", {
                                style: { display: 'flex', alignItems: 'center', gap: 10 },
                                children: [
                                    _jsxs("button", {
                                        type: "button",
                                        onClick: handleResetDefaults,
                                        style: {
                                            background: '#f8fafc',
                                            border: '1.5px solid #e2e8f0',
                                            color: '#64748b',
                                            fontSize: 12,
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            padding: '7px 14px',
                                            borderRadius: 10,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6
                                        },
                                        children: [_jsx(RotateCcw, { size: 13 }), " Reset to Defaults"]
                                    }),
                                    _jsx("button", {
                                        onClick: () => setIsEditMode(!isEditMode),
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            padding: '7px 16px',
                                            borderRadius: 10,
                                            fontSize: 12,
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            background: isEditMode ? '#10b981' : '#0284c7',
                                            color: '#ffffff',
                                            border: 'none',
                                            boxShadow: isEditMode ? '0 2px 8px rgba(16, 185, 129, 0.25)' : '0 2px 8px rgba(2, 132, 199, 0.25)',
                                            transition: 'all 0.2s'
                                        },
                                        children: isEditMode
                                            ? _jsxs(_Fragment, { children: [_jsx(Check, { size: 14 }), " Done Editing"] })
                                            : _jsxs(_Fragment, { children: [_jsx(Pencil, { size: 14 }), " Edit Courses & Credits"] })
                                    })
                                ]
                            })
                        ]
                    })
                ),

                // ── RESPONSIVE 2-COLUMN GRID ──
                _jsxs("div", {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: isDesktop ? '1fr 360px' : '1fr',
                        gap: 20,
                        alignItems: 'start'
                    },
                    children: [
                        // ── MAIN COLUMN: PLANNER & COURSES ──
                        _jsxs("div", {
                            style: { display: 'flex', flexDirection: 'column', gap: 18 },
                            children: [
                                // Target CGPA Goal Planner
                                _jsxs("div", {
                                    style: {
                                        background: '#ffffff',
                                        borderRadius: 20,
                                        padding: '20px 22px',
                                        border: '1.5px solid #e2e8f0',
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                                    },
                                    children: [
                                        _jsxs("div", {
                                            style: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 900, color: '#0284c7', marginBottom: 14 },
                                            children: [_jsx(Sparkles, { size: 16 }), " TARGET CGPA GOAL PLANNER"]
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 14 },
                                            children: [
                                                _jsxs("div", {
                                                    children: [
                                                        _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 5 }, children: "Current CGPA" }),
                                                        _jsx("input", { type: "number", step: "0.01", value: currentCgpa, onChange: e => setCurrentCgpa(e.target.value), className: "form-input", style: { fontSize: 13, fontWeight: 800, padding: '10px 12px', borderRadius: 10, width: '100%', boxSizing: 'border-box' } })
                                                    ]
                                                }),
                                                _jsxs("div", {
                                                    children: [
                                                        _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 5 }, children: "Completed Sems" }),
                                                        _jsx("input", { type: "number", min: "1", max: "7", value: completedSemesters, onChange: e => setCompletedSemesters(e.target.value), className: "form-input", style: { fontSize: 13, fontWeight: 800, padding: '10px 12px', borderRadius: 10, width: '100%', boxSizing: 'border-box' } })
                                                    ]
                                                }),
                                                _jsxs("div", {
                                                    children: [
                                                        _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 5 }, children: "Target Goal CGPA" }),
                                                        _jsx("input", { type: "number", step: "0.01", value: targetCgpa, onChange: e => setTargetCgpa(e.target.value), className: "form-input", style: { fontSize: 13, fontWeight: 800, padding: '10px 12px', borderRadius: 10, width: '100%', boxSizing: 'border-box' } })
                                                    ]
                                                })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            style: {
                                                background: 'rgba(2, 132, 199, 0.06)',
                                                padding: '12px 16px',
                                                borderRadius: 14,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                border: '1.5px solid rgba(2, 132, 199, 0.15)'
                                            },
                                            children: [
                                                _jsxs("span", {
                                                    style: { fontSize: 12, fontWeight: 700, color: '#0f172a' },
                                                    children: ["Required Avg GPA / Remaining Semesters (", remSems, "):"]
                                                }),
                                                _jsx("span", {
                                                    style: { fontSize: 15, fontWeight: 950, color: parseFloat(reqGpaForTarget) > 10 ? '#ef4444' : '#0284c7' },
                                                    children: parseFloat(reqGpaForTarget) > 10 ? 'Requires > 10.00' : `${reqGpaForTarget} GPA`
                                                })
                                            ]
                                        })
                                    ]
                                }),

                                // Semester Subject Grades Card
                                _jsxs("div", {
                                    style: {
                                        background: '#ffffff',
                                        borderRadius: 20,
                                        padding: '22px',
                                        border: '1.5px solid #e2e8f0',
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                                    },
                                    children: [
                                        _jsxs("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: 16,
                                                flexWrap: 'wrap',
                                                gap: 10
                                            },
                                            children: [
                                                _jsxs("div", {
                                                    style: { display: 'flex', alignItems: 'center', gap: 8 },
                                                    children: [
                                                        _jsx(BookOpen, { size: 18, color: "#0284c7" }),
                                                        _jsxs("h3", {
                                                            style: { fontSize: 14, fontWeight: 900, margin: 0, color: '#0f172a' },
                                                            children: ["Semester Subject Grades (", subjects.length, " Courses \u00B7 ", totalCredits, " Credits)"]
                                                        })
                                                    ]
                                                }),
                                                _jsx("div", {
                                                    style: { display: 'flex', alignItems: 'center', gap: 8 },
                                                    children: isEditMode ? (
                                                        _jsxs("button", {
                                                            type: "button",
                                                            onClick: handleAddSubject,
                                                            style: {
                                                                background: 'rgba(2, 132, 199, 0.1)',
                                                                border: '1.5px solid rgba(2, 132, 199, 0.25)',
                                                                color: '#0284c7',
                                                                borderRadius: 10,
                                                                padding: '6px 12px',
                                                                fontSize: 11.5,
                                                                fontWeight: 800,
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 5
                                                            },
                                                            children: [_jsx(Plus, { size: 13 }), " Add Course"]
                                                        })
                                                    ) : (
                                                        _jsxs("div", {
                                                            style: { display: 'flex', alignItems: 'center', gap: 5 },
                                                            children: [
                                                                _jsx("span", { style: { fontSize: 10.5, color: '#64748b', fontWeight: 700 }, children: "Quick:" }),
                                                                _jsx("button", { type: "button", onClick: () => handleSetAllGrades(10), style: { background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8, padding: '4px 8px', fontSize: 10.5, fontWeight: 800, cursor: 'pointer' }, children: "All O" }),
                                                                _jsx("button", { type: "button", onClick: () => handleSetAllGrades(9), style: { background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8, padding: '4px 8px', fontSize: 10.5, fontWeight: 800, cursor: 'pointer' }, children: "All A+" }),
                                                                _jsx("button", { type: "button", onClick: () => handleSetAllGrades(8), style: { background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8, padding: '4px 8px', fontSize: 10.5, fontWeight: 800, cursor: 'pointer' }, children: "All A" })
                                                            ]
                                                        })
                                                    )
                                                })
                                            ]
                                        }),

                                        _jsx("div", {
                                            style: { display: 'flex', flexDirection: 'column', gap: 10 },
                                            children: subjects.map((sub, idx) => (
                                                _jsx("div", {
                                                    style: {
                                                        background: '#f8fafc',
                                                        borderRadius: 14,
                                                        padding: '12px 16px',
                                                        border: '1.5px solid #e2e8f0',
                                                        display: 'flex',
                                                        flexDirection: isEditMode ? 'column' : 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: isEditMode ? 'stretch' : 'center',
                                                        gap: 12
                                                    },
                                                    children: isEditMode ? (
                                                        _jsxs("div", {
                                                            style: { display: 'flex', flexDirection: 'column', gap: 8 },
                                                            children: [
                                                                _jsxs("div", {
                                                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
                                                                    children: [
                                                                        _jsxs("span", { style: { fontSize: 11.5, fontWeight: 800, color: '#0284c7' }, children: ["Course #", idx + 1] }),
                                                                        subjects.length > 1 && (
                                                                            _jsxs("button", {
                                                                                type: "button",
                                                                                onClick: () => handleDeleteSubject(sub.id),
                                                                                style: {
                                                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                                                                    color: '#ef4444',
                                                                                    borderRadius: 6,
                                                                                    padding: '3px 8px',
                                                                                    fontSize: 10.5,
                                                                                    fontWeight: 800,
                                                                                    cursor: 'pointer',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: 4
                                                                                },
                                                                                children: [_jsx(Trash2, { size: 12 }), " Remove"]
                                                                            })
                                                                        )
                                                                    ]
                                                                }),
                                                                _jsxs("div", {
                                                                    style: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 8 },
                                                                    children: [
                                                                        _jsxs("div", {
                                                                            children: [
                                                                                _jsx("label", { style: { fontSize: 9.5, fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Course Name" }),
                                                                                _jsx("input", { type: "text", value: sub.name, onChange: e => handleUpdateSubjectField(sub.id, 'name', e.target.value), placeholder: "Course Name", className: "form-input", style: { fontSize: 11.5, padding: '7px 10px', width: '100%', boxSizing: 'border-box' } })
                                                                            ]
                                                                        }),
                                                                        _jsxs("div", {
                                                                            children: [
                                                                                _jsx("label", { style: { fontSize: 9.5, fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Code" }),
                                                                                _jsx("input", { type: "text", value: sub.code, onChange: e => handleUpdateSubjectField(sub.id, 'code', e.target.value), placeholder: "EE8601", className: "form-input", style: { fontSize: 11.5, padding: '7px 10px', width: '100%', boxSizing: 'border-box' } })
                                                                            ]
                                                                        }),
                                                                        _jsxs("div", {
                                                                            children: [
                                                                                _jsx("label", { style: { fontSize: 9.5, fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Credits" }),
                                                                                _jsx("input", { type: "number", min: "1", max: "12", value: sub.credits, onChange: e => handleUpdateSubjectField(sub.id, 'credits', Math.max(1, parseInt(e.target.value) || 1)), className: "form-input", style: { fontSize: 11.5, padding: '7px 10px', width: '100%', boxSizing: 'border-box' } })
                                                                            ]
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ) : (
                                                        _jsxs(_Fragment, {
                                                            children: [
                                                                _jsxs("div", {
                                                                    style: { flex: 1, minWidth: 0, paddingRight: 8 },
                                                                    children: [
                                                                        _jsx("div", { style: { fontSize: 13, fontWeight: 800, color: '#0f172a', marginBottom: 3 }, children: sub.name }),
                                                                        _jsxs("div", {
                                                                            style: { fontSize: 11, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 },
                                                                            children: [
                                                                                _jsxs("span", { children: ["Code: ", sub.code] }),
                                                                                _jsx("span", { children: "•" }),
                                                                                _jsxs("span", { style: { background: 'rgba(2, 132, 199, 0.08)', color: '#0284c7', padding: '1px 6px', borderRadius: 4, fontWeight: 800 }, children: [sub.credits, " Credits"] })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                _jsxs("div", {
                                                                    style: { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 },
                                                                    children: [
                                                                        _jsx("select", {
                                                                            value: sub.gradePoint,
                                                                            onChange: e => handleUpdateGrade(sub.id, parseInt(e.target.value)),
                                                                            style: {
                                                                                padding: '8px 12px',
                                                                                borderRadius: 10,
                                                                                fontSize: 12.5,
                                                                                fontWeight: 800,
                                                                                background: '#ffffff',
                                                                                border: '1.5px solid #0284c7',
                                                                                color: '#0284c7',
                                                                                outline: 'none',
                                                                                cursor: 'pointer'
                                                                            },
                                                                            children: GRADE_OPTIONS.map(opt => (
                                                                                _jsx("option", { value: opt.value, children: opt.label }, opt.value)
                                                                            ))
                                                                        }),
                                                                        _jsx("button", {
                                                                            type: "button",
                                                                            onClick: () => setIsEditMode(true),
                                                                            title: "Edit Course Name & Credits",
                                                                            style: {
                                                                                background: '#ffffff',
                                                                                border: '1px solid #cbd5e1',
                                                                                borderRadius: 8,
                                                                                padding: '7px',
                                                                                cursor: 'pointer',
                                                                                color: '#64748b',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center'
                                                                            },
                                                                            children: _jsx(Pencil, { size: 13 })
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    )
                                                }, sub.id)
                                            ))
                                        })
                                    ]
                                })
                            ]
                        }),

                        // ── SIDEBAR COLUMN (Result Box) ──
                        _jsx("div", {
                            children: resultBox
                        })
                    ]
                })
            ]
        })
    );
};
