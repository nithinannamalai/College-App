import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { dbService } from '../../services/db';
import { 
    Clock, Calendar, User, ChevronLeft, ChevronRight, 
    Pencil, X, Check, Coffee, FileImage, ZoomIn, 
    Layers, Sparkles, MapPin, Download, Eye
} from 'lucide-react';

const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const PERIOD_TIMES = {
    1: '08:45 – 09:35',
    2: '09:35 – 10:25',
    3: '10:45 – 11:35',
    4: '11:35 – 12:25',
    5: '01:10 – 02:00',
    6: '02:00 – 02:50',
    7: '03:00 – 03:50',
    8: '03:50 – 04:40',
};

const COURSE_TITLES = {
    '25EE2200': 'Electric Circuit Theory',
    '25EE2200(T)': 'Electric Circuit Theory (Tutorial)',
    '25EE2106': 'Electromagnetic Fields',
    '25EE2201': 'Electrical Machines - I',
    '25EE2201(L)': 'Electrical Machines Lab',
    '25EE2250': 'DC Machines & Transformers Lab',
    '25EE2250 (L)': 'DC Machines & Transformers Lab',
    '25MA2114': 'Transforms & Partial Differential Eq.',
    '25CS2261': 'Python Programming & Data Structures',
    '25CS2261(L)': 'Python Programming Lab',
    '25EE2270 / 25CS2261': 'Circuits & Python Lab',
    '25BA1E53': 'Professional Ethics & Human Values',
    '25AD2125': 'Artificial Intelligence Basics',
    'AEC': 'Ability Enhancement Course',
    'GATE': 'GATE Coaching / Training',
    'LIB': 'Library / Self Study',
    'TWM': 'Tutor Ward Meeting',
    'BYOD / Skill Lab': 'BYOD & Skill Lab',
    'Library / Self Study': 'Library & Reference',
    'GATE Problem Solving': 'GATE Problem Solving',
    'Project Work / NPTEL': 'Project Work / NPTEL Mentoring',
};

export const DesktopTimetable = ({ isAdmin = false, semester = 3 }) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeDay, setActiveDay] = useState('Wednesday');
    const [viewMode, setViewMode] = useState('weekly'); // 'weekly' matrix or 'daily'
    const [editMode, setEditMode] = useState(false);
    const [editCell, setEditCell] = useState(null);
    const [ttFile, setTtFile] = useState(null);
    const [showTtPreview, setShowTtPreview] = useState(false);

    // Edit fields
    const [editCourseCode, setEditCourseCode] = useState('');
    const [editTeacher, setEditTeacher] = useState('');
    const [editRoom, setEditRoom] = useState('');

    useEffect(() => {
        loadTimetable();
    }, [semester]);

    const loadTimetable = async () => {
        setLoading(true);
        try {
            const data = await dbService.getTimetable(semester);
            setEntries(data || []);
            const file = await dbService.getTimetableFile(semester);
            setTtFile(file || null);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const getEntry = (day, period) => {
        return entries.find(e => e.day?.toLowerCase() === day.toLowerCase() && e.period === period);
    };

    const handleSaveCell = async () => {
        if (!editCell) return;
        const updated = entries.filter(e => !(e.day?.toLowerCase() === editCell.day.toLowerCase() && e.period === editCell.period));
        const newEntry = {
            day: editCell.day,
            period: editCell.period,
            subject: editCourseCode,
            teacher: editTeacher,
            room: editRoom || 'LH-301'
        };
        const nextList = [...updated, newEntry];
        setEntries(nextList);
        await dbService.saveTimetable(semester, nextList);
        setEditCell(null);
    };

    return (
        _jsxs("div", {
            className: "desktop-timetable-view",
            style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 20 },
            children: [
                // ── Controls & Mode Toolbar ──
                _jsxs("div", {
                    style: {
                        background: '#ffffff',
                        borderRadius: 20,
                        padding: '16px 22px',
                        border: '1.5px solid #e2e8f0',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 14
                    },
                    children: [
                        // Left: View Mode Switcher
                        _jsxs("div", {
                            style: { display: 'flex', alignItems: 'center', gap: 10 },
                            children: [
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => setViewMode('weekly'),
                                    style: {
                                        padding: '8px 16px',
                                        borderRadius: 12,
                                        border: viewMode === 'weekly' ? '1.5px solid #0284c7' : '1.5px solid transparent',
                                        background: viewMode === 'weekly' ? '#eff6ff' : '#f8fafc',
                                        color: viewMode === 'weekly' ? '#0284c7' : '#64748b',
                                        fontWeight: 900,
                                        fontSize: 12.5,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [_jsx(Layers, { size: 15 }), "Full 5-Day Weekly Matrix"]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => setViewMode('daily'),
                                    style: {
                                        padding: '8px 16px',
                                        borderRadius: 12,
                                        border: viewMode === 'daily' ? '1.5px solid #0284c7' : '1.5px solid transparent',
                                        background: viewMode === 'daily' ? '#eff6ff' : '#f8fafc',
                                        color: viewMode === 'daily' ? '#0284c7' : '#64748b',
                                        fontWeight: 900,
                                        fontSize: 12.5,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [_jsx(Calendar, { size: 15 }), "Single Day View"]
                                }),
                                _jsxs("span", {
                                    style: {
                                        fontSize: 11.5,
                                        fontWeight: 800,
                                        color: '#0284c7',
                                        background: 'rgba(2, 132, 199, 0.08)',
                                        padding: '6px 12px',
                                        borderRadius: 10,
                                        marginLeft: 6
                                    },
                                    children: [`Semester `, semester, ` • Section II EEE-B`]
                                })
                            ]
                        }),

                        // Right: Actions (Official Image / Admin Edit)
                        _jsxs("div", {
                            style: { display: 'flex', alignItems: 'center', gap: 10 },
                            children: [
                                ttFile && (
                                    _jsxs("button", {
                                        type: "button",
                                        onClick: () => setShowTtPreview(true),
                                        style: {
                                            padding: '8px 14px',
                                            borderRadius: 12,
                                            border: '1.5px solid #cbd5e1',
                                            background: '#ffffff',
                                            color: '#334155',
                                            fontWeight: 800,
                                            fontSize: 12,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6
                                        },
                                        children: [_jsx(Eye, { size: 14 }), "View HOD Timetable Scan"]
                                    })
                                ),
                                isAdmin && (
                                    _jsxs("button", {
                                        type: "button",
                                        onClick: () => setEditMode(!editMode),
                                        style: {
                                            padding: '8px 16px',
                                            borderRadius: 12,
                                            border: 'none',
                                            background: editMode ? '#10b981' : '#0284c7',
                                            color: '#ffffff',
                                            fontWeight: 900,
                                            fontSize: 12,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6
                                        },
                                        children: [
                                            editMode ? _jsx(Check, { size: 14 }) : _jsx(Pencil, { size: 14 }),
                                            editMode ? "Done Editing" : "Edit Period Cells"
                                        ]
                                    })
                                )
                            ]
                        })
                    ]
                }),

                // ── FULL 5-DAY WEEKLY MATRIX VIEW (Desktop Powerhouse) ──
                viewMode === 'weekly' ? (
                    _jsxs("div", {
                        style: {
                            background: '#ffffff',
                            borderRadius: 22,
                            padding: '24px',
                            border: '1.5px solid #e2e8f0',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                            overflowX: 'auto'
                        },
                        children: [
                            // Timing Headers Row
                            _jsxs("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '120px repeat(8, 1fr)',
                                    gap: 8,
                                    marginBottom: 10,
                                    paddingBottom: 10,
                                    borderBottom: '1.5px solid #e2e8f0'
                                },
                                children: [
                                    _jsx("div", { style: { fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', display: 'flex', alignItems: 'center' }, children: "Day / Period" }),
                                    ...PERIODS.map(p => (
                                        _jsxs("div", {
                                            style: { textAlign: 'center' },
                                            children: [
                                                _jsxs("div", { style: { fontSize: 12, fontWeight: 950, color: '#0f172a' }, children: ["P", p] }),
                                                _jsx("div", { style: { fontSize: 9.5, color: '#64748b', fontWeight: 700 }, children: PERIOD_TIMES[p] })
                                            ]
                                        }, p)
                                    ))
                                ]
                            }),

                            // Day Rows
                            _jsx("div", {
                                style: { display: 'flex', flexDirection: 'column', gap: 8 },
                                children: DAYS.map(day => (
                                    _jsxs("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: '120px repeat(8, 1fr)',
                                            gap: 8,
                                            alignItems: 'stretch'
                                        },
                                        children: [
                                            _jsxs("div", {
                                                style: {
                                                    background: '#f8fafc',
                                                    borderRadius: 12,
                                                    border: '1px solid #e2e8f0',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 900,
                                                    fontSize: 13,
                                                    color: '#0f172a'
                                                },
                                                children: [
                                                    _jsx("span", { children: day.substring(0, 3).toUpperCase() }),
                                                    _jsx("span", { style: { fontSize: 10, color: '#64748b', fontWeight: 600 }, children: day })
                                                ]
                                            }),
                                            ...PERIODS.map(p => {
                                                const entry = getEntry(day, p);
                                                const code = entry?.subject || '—';
                                                const title = COURSE_TITLES[code] || code;
                                                const isLab = code.includes('(L)') || code.includes('Lab');

                                                return (
                                                    _jsxs("div", {
                                                        onClick: () => {
                                                            if (editMode) {
                                                                setEditCell({ day, period: p });
                                                                setEditCourseCode(entry?.subject || '');
                                                                setEditTeacher(entry?.teacher || '');
                                                                setEditRoom(entry?.room || '');
                                                            }
                                                        },
                                                        style: {
                                                            background: code === '—' ? '#fafafa' : isLab ? '#ecfdf5' : '#eff6ff',
                                                            borderRadius: 12,
                                                            border: '1.5px solid',
                                                            borderColor: code === '—' ? '#f1f5f9' : isLab ? '#a7f3d0' : '#bfdbfe',
                                                            padding: '10px 8px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-between',
                                                            minHeight: 80,
                                                            cursor: editMode ? 'pointer' : 'default',
                                                            transition: 'all 0.15s ease'
                                                        },
                                                        children: [
                                                            _jsxs("div", {
                                                                children: [
                                                                    _jsx("div", { style: { fontSize: 11, fontWeight: 950, color: isLab ? '#065f46' : '#1e40af' }, children: code }),
                                                                    _jsx("div", { style: { fontSize: 10, color: '#475569', fontWeight: 600, lineHeight: 1.25, marginTop: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }, children: title })
                                                                ]
                                                            }),
                                                            entry?.room && (
                                                                _jsxs("div", { style: { fontSize: 9.5, color: '#64748b', fontWeight: 700, marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }, children: [
                                                                    _jsx(MapPin, { size: 10 }),
                                                                    entry.room
                                                                ] })
                                                            )
                                                        ]
                                                    }, p)
                                                );
                                            })
                                        ]
                                    }, day)))
                            })
                        ]
                    })
                ) : (
                    // ── SINGLE DAY VIEW ──
                    _jsxs("div", {
                        style: {
                            background: '#ffffff',
                            borderRadius: 22,
                            padding: '24px 26px',
                            border: '1.5px solid #e2e8f0',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                        },
                        children: [
                            // Day tabs
                            _jsx("div", {
                                style: { display: 'flex', gap: 8, marginBottom: 20 },
                                children: DAYS.map(d => (
                                    _jsx("button", {
                                        type: "button",
                                        onClick: () => setActiveDay(d),
                                        style: {
                                            padding: '8px 18px',
                                            borderRadius: 10,
                                            border: activeDay === d ? '1.5px solid #0284c7' : '1px solid #cbd5e1',
                                            background: activeDay === d ? '#0284c7' : '#ffffff',
                                            color: activeDay === d ? '#ffffff' : '#334155',
                                            fontWeight: 800,
                                            fontSize: 12,
                                            cursor: 'pointer'
                                        },
                                        children: d
                                    }, d)))
                            }),

                            // Day periods list
                            _jsx("div", {
                                style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 },
                                children: PERIODS.map(p => {
                                    const entry = getEntry(activeDay, p);
                                    const code = entry?.subject || '—';
                                    const title = COURSE_TITLES[code] || code;
                                    const isLab = code.includes('(L)') || code.includes('Lab');

                                    return (
                                        _jsxs("div", {
                                            style: {
                                                background: isLab ? '#ecfdf5' : '#f8fafc',
                                                borderRadius: 16,
                                                padding: '16px 18px',
                                                border: '1.5px solid',
                                                borderColor: isLab ? '#a7f3d0' : '#e2e8f0',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                gap: 12
                                            },
                                            children: [
                                                _jsxs("div", {
                                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
                                                    children: [
                                                        _jsxs("span", { style: { fontSize: 11, fontWeight: 900, color: '#0284c7', background: 'rgba(2, 132, 199, 0.1)', padding: '2px 8px', borderRadius: 6 }, children: ["Period ", p] }),
                                                        _jsx("span", { style: { fontSize: 11, fontWeight: 700, color: '#64748b' }, children: PERIOD_TIMES[p] })
                                                    ]
                                                }),
                                                _jsxs("div", {
                                                    children: [
                                                        _jsx("div", { style: { fontSize: 14, fontWeight: 900, color: '#0f172a' }, children: code }),
                                                        _jsx("div", { style: { fontSize: 12, color: '#475569', fontWeight: 600, marginTop: 2 }, children: title })
                                                    ]
                                                }),
                                                _jsxs("div", {
                                                    style: { display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', fontWeight: 700, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.06)' },
                                                    children: [
                                                        _jsxs("span", { children: ["Room: ", entry?.room || 'LH-301'] }),
                                                        _jsxs("span", { children: ["Faculty: ", entry?.teacher || 'Dept Faculty'] })
                                                    ]
                                                })
                                            ]
                                        }, p)
                                    );
                                })
                            })
                        ]
                    })
                ),

                // Edit Cell Modal
                editCell && (
                    _jsx("div", {
                        style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
                        children: _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 20, padding: 24, maxWidth: 440, width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' },
                            children: [
                                _jsxs("h3", { style: { margin: '0 0 16px', fontSize: 16, fontWeight: 950 }, children: [`Edit Cell: ${editCell.day} - Period ${editCell.period}`] }),
                                _jsxs("div", {
                                    style: { display: 'flex', flexDirection: 'column', gap: 12 },
                                    children: [
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Course Code / Subject" }),
                                                _jsx("input", { type: "text", value: editCourseCode, onChange: e => setEditCourseCode(e.target.value), placeholder: "e.g. 25EE2200", style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Faculty Name" }),
                                                _jsx("input", { type: "text", value: editTeacher, onChange: e => setEditTeacher(e.target.value), placeholder: "e.g. Dr. C. Kathirvel", style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Classroom / Lab Room" }),
                                                _jsx("input", { type: "text", value: editRoom, onChange: e => setEditRoom(e.target.value), placeholder: "LH-301", style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'flex', gap: 8, marginTop: 10 },
                                            children: [
                                                _jsx("button", { onClick: handleSaveCell, style: { flex: 1, padding: '10px', borderRadius: 10, background: '#0284c7', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer' }, children: "Save Cell" }),
                                                _jsx("button", { onClick: () => setEditCell(null), style: { padding: '10px 16px', borderRadius: 10, background: '#f8fafc', color: '#475569', fontWeight: 700, border: '1px solid #cbd5e1', cursor: 'pointer' }, children: "Cancel" })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ),

                // Timetable Image Preview Modal
                showTtPreview && ttFile && (
                    _jsx("div", {
                        style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
                        children: _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 20, padding: 20, maxWidth: 900, width: '100%', maxHeight: '90vh', overflowY: 'auto' },
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
                                    children: [
                                        _jsx("h3", { style: { margin: 0, fontSize: 16, fontWeight: 950 }, children: "Official Department Timetable Document" }),
                                        _jsx("button", { onClick: () => setShowTtPreview(false), style: { background: 'none', border: 'none', cursor: 'pointer' }, children: _jsx(X, { size: 20 }) })
                                    ]
                                }),
                                _jsx("img", { src: ttFile.dataUrl, alt: "Timetable Preview", style: { width: '100%', borderRadius: 12, border: '1px solid #e2e8f0' } })
                            ]
                        })
                    })
                )
            ]
        })
    );
};
