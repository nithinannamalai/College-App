import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { 
    UserCheck, ShieldCheck, AlertTriangle, Calendar, Search, 
    Clock, Award, CheckCircle2, AlertCircle, Sparkles, Filter,
    Check, X, ChevronRight, BarChart3, Users, Zap
} from 'lucide-react';

export const DesktopAttendance = ({ currentStudentRollNo = '71812503104', currentUserName = 'Nithin Annamalai R', isAdmin = false }) => {
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [logs, setLogs] = useState([]);

    // Teacher / Admin states
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [period, setPeriod] = useState(1);
    const [students, setStudents] = useState([]);
    const [markedStatus, setMarkedStatus] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        loadData();
    }, [currentStudentRollNo, isAdmin, date, period]);

    const loadData = async () => {
        setLoading(true);
        if (isAdmin) {
            const list = await dbService.fetchAllStudents();
            setStudents(list);
            const initial = {};
            list.forEach(s => {
                initial[s.rollNo] = 'present';
            });
            setMarkedStatus(initial);
        } else {
            const studentLogs = await dbService.getAttendanceForStudent(currentStudentRollNo);
            setLogs(studentLogs);
        }
        setLoading(false);
    };

    const handleStatusChange = (rollNo, status) => {
        setMarkedStatus(prev => ({
            ...prev,
            [rollNo]: status
        }));
    };

    const handleMarkAll = (status) => {
        const updated = {};
        students.forEach(s => {
            updated[s.rollNo] = status;
        });
        setMarkedStatus(updated);
    };

    const handleSaveAttendance = async () => {
        setLoading(true);
        setSuccessMsg('');
        const logsToSave = students.map(s => ({
            date,
            period,
            studentRollNo: s.rollNo,
            studentName: s.name,
            status: markedStatus[s.rollNo] || 'present',
            markedBy: currentUserName
        }));
        try {
            await dbService.saveAttendanceLogs(date, period, logsToSave);
            setSuccessMsg('✅ Period attendance successfully locked in college database!');
            setTimeout(() => setSuccessMsg(''), 3500);
        } catch (err) {
            console.error(err);
            setSuccessMsg('❌ Error saving attendance.');
        } finally {
            setLoading(false);
        }
    };

    // Calculations
    const totalPeriods = logs.length;
    const presentPeriods = logs.filter(l => l.status === 'present').length;
    const missedPeriods = totalPeriods - presentPeriods;
    const percentage = totalPeriods > 0 ? Math.round((presentPeriods / totalPeriods) * 100) : 94;

    const safeBuffer = totalPeriods > 0 ? Math.max(0, Math.floor((presentPeriods - 0.75 * totalPeriods) / 0.75)) : 14;
    const requiredToAttend = percentage < 75 ? Math.ceil((0.75 * totalPeriods - presentPeriods) / 0.25) : 0;

    const periodSchedule = [
        { period: 1, time: '08:30 – 09:30', name: 'Electrical Machines - II', code: 'EE8301', room: 'LH-301', teacher: 'Dr. C. Kathirvel' },
        { period: 2, time: '09:30 – 10:30', name: 'Power System Operation & Control', code: 'EE8302', room: 'LH-301', teacher: 'Prof. R. Mohanraj' },
        { period: 3, time: '10:45 – 11:45', name: 'Digital Logic & Microcontrollers', code: 'EE8303', room: 'LH-302', teacher: 'Dr. K. Senthil' },
        { period: 4, time: '11:45 – 12:45', name: 'Power Electronics & Drives', code: 'EE8304', room: 'LH-302', teacher: 'Dr. N. Saravanan' },
        { period: 5, time: '01:45 – 02:45', name: 'Renewable Energy Technologies', code: 'EE8305', room: 'LH-301', teacher: 'Prof. M. Selvam' },
        { period: 6, time: '02:45 – 03:45', name: 'Power Electronics Simulation Lab', code: 'EE8311', room: 'Power Sim Lab', teacher: 'Lab Staff Team' },
        { period: 7, time: '03:45 – 04:45', name: 'Tutor Ward Counseling & Library', code: 'TW8320', room: 'EEE Department', teacher: 'Faculty Advisor' },
    ];

    const filteredStudents = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
        const status = markedStatus[s.rollNo] || 'present';
        const matchesStatus = filterStatus === 'all' || status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const presentCount = Object.values(markedStatus).filter(v => v === 'present').length;
    const absentCount = Object.values(markedStatus).filter(v => v === 'absent').length;

    return (
        _jsxs("div", {
            className: "desktop-attendance-view",
            style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 20 },
            children: [
                successMsg && (
                    _jsx("div", {
                        style: {
                            padding: '14px 20px',
                            background: '#f0fdf4',
                            color: '#166534',
                            border: '1.5px solid #86efac',
                            borderRadius: 16,
                            fontSize: 13.5,
                            fontWeight: 800,
                            textAlign: 'center',
                            boxShadow: '0 4px 12px rgba(22, 101, 52, 0.08)'
                        },
                        children: successMsg
                    })
                ),

                // ── ADMIN VIEW: FACULTY ATTENDANCE RECORDING CONSOLE ──
                isAdmin ? (
                    _jsxs("div", {
                        style: { display: 'flex', flexDirection: 'column', gap: 20 },
                        children: [
                            // Faculty Controls Bar
                            _jsxs("div", {
                                style: {
                                    background: '#ffffff',
                                    borderRadius: 22,
                                    padding: '22px 26px',
                                    border: '1.5px solid #e2e8f0',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 16
                                },
                                children: [
                                    _jsxs("div", {
                                        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 },
                                        children: [
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("h3", { style: { fontSize: 16, fontWeight: 950, color: '#0f172a', margin: 0 }, children: "Faculty Period Attendance Console" }),
                                                    _jsx("span", { style: { fontSize: 12, color: '#64748b', fontWeight: 600 }, children: "Lock attendance records per session into college database" })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                style: { display: 'flex', gap: 10 },
                                                children: [
                                                    _jsxs("button", {
                                                        type: "button",
                                                        onClick: () => handleMarkAll('present'),
                                                        style: { padding: '8px 16px', borderRadius: 12, background: 'rgba(16, 185, 129, 0.12)', color: '#059669', border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: 800, fontSize: 12, cursor: 'pointer' },
                                                        children: ["✓ Mark All Present (", students.length, ")"]
                                                    }),
                                                    _jsx("button", {
                                                        type: "button",
                                                        onClick: () => handleMarkAll('absent'),
                                                        style: { padding: '8px 16px', borderRadius: 12, background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626', border: '1px solid rgba(239, 68, 68, 0.3)', fontWeight: 800, fontSize: 12, cursor: 'pointer' },
                                                        children: "Mark All Absent"
                                                    }),
                                                    _jsx("button", {
                                                        type: "button",
                                                        onClick: handleSaveAttendance,
                                                        disabled: loading,
                                                        style: { padding: '8px 20px', borderRadius: 12, background: '#0284c7', color: '#ffffff', border: 'none', fontWeight: 900, fontSize: 12.5, cursor: 'pointer', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' },
                                                        children: loading ? "Saving..." : "Lock & Save Period"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),

                                    _jsxs("div", {
                                        style: { display: 'grid', gridTemplateColumns: '180px 240px 1fr 180px', gap: 12, alignItems: 'center' },
                                        children: [
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Date" }),
                                                    _jsx("input", { type: "date", value: date, onChange: e => setDate(e.target.value), className: "form-input", style: { padding: '8px 12px', borderRadius: 10, fontSize: 12, width: '100%', boxSizing: 'border-box' } })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Period Slot" }),
                                                    _jsx("select", { value: period, onChange: e => setPeriod(Number(e.target.value)), style: { padding: '8px 12px', borderRadius: 10, fontSize: 12, width: '100%', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 700 }, children: [1, 2, 3, 4, 5, 6, 7].map(p => (
                                                        _jsxs("option", { value: p, children: ["Period ", p, " (", p === 1 ? '08:30-09:30' : p === 2 ? '09:30-10:30' : p === 3 ? '10:45-11:45' : p === 4 ? '11:45-12:45' : p === 5 ? '01:45-02:45' : p === 6 ? '02:45-03:45' : '03:45-04:45', ")"] }, p)
                                                    )) })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Search Student" }),
                                                    _jsxs("div", {
                                                        style: { position: 'relative' },
                                                        children: [
                                                            _jsx(Search, { size: 14, style: { position: 'absolute', left: 12, top: 11, color: '#94a3b8' } }),
                                                            _jsx("input", { type: "text", value: searchQuery, onChange: e => setSearchQuery(e.target.value), placeholder: "Filter by name or roll number...", style: { padding: '8px 12px 8px 34px', borderRadius: 10, fontSize: 12, width: '100%', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' } })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Filter Status" }),
                                                    _jsxs("select", { value: filterStatus, onChange: e => setFilterStatus(e.target.value), style: { padding: '8px 12px', borderRadius: 10, fontSize: 12, width: '100%', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 700 }, children: [
                                                        _jsx("option", { value: "all", children: "All Students" }),
                                                        _jsxs("option", { value: "present", children: ["Present Only (", presentCount, ")"] }),
                                                        _jsxs("option", { value: "absent", children: ["Absent Only (", absentCount, ")"] })
                                                    ] })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),

                            // Student Attendance Grid
                            _jsx("div", {
                                style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 },
                                children: filteredStudents.map(s => {
                                    const isPresent = markedStatus[s.rollNo] === 'present';
                                    return (
                                        _jsxs("div", {
                                            style: {
                                                background: '#ffffff',
                                                borderRadius: 16,
                                                padding: '14px 18px',
                                                border: '1.5px solid',
                                                borderColor: isPresent ? '#bbf7d0' : '#fecaca',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                                            },
                                            children: [
                                                _jsxs("div", {
                                                    style: { display: 'flex', alignItems: 'center', gap: 12 },
                                                    children: [
                                                        _jsx("div", {
                                                            style: {
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: '50%',
                                                                background: isPresent ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                                                color: '#ffffff',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontWeight: 900,
                                                                fontSize: 14
                                                            },
                                                            children: s.name.charAt(0)
                                                        }),
                                                        _jsxs("div", {
                                                            children: [
                                                                _jsx("div", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a' }, children: s.name }),
                                                                _jsxs("div", { style: { fontSize: 11, color: '#64748b' }, children: ["Roll: ", s.rollNo, " • ", s.className || 'II EEE-B'] })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                _jsxs("div", {
                                                    style: { display: 'flex', gap: 4, background: '#f1f5f9', padding: 3, borderRadius: 12 },
                                                    children: [
                                                        _jsx("button", {
                                                            type: "button",
                                                            onClick: () => handleStatusChange(s.rollNo, 'present'),
                                                            style: {
                                                                padding: '6px 12px',
                                                                borderRadius: 9,
                                                                border: 'none',
                                                                background: isPresent ? '#10b981' : 'transparent',
                                                                color: isPresent ? '#ffffff' : '#64748b',
                                                                fontWeight: 800,
                                                                fontSize: 11,
                                                                cursor: 'pointer'
                                                            },
                                                            children: "Present"
                                                        }),
                                                        _jsx("button", {
                                                            type: "button",
                                                            onClick: () => handleStatusChange(s.rollNo, 'absent'),
                                                            style: {
                                                                padding: '6px 12px',
                                                                borderRadius: 9,
                                                                border: 'none',
                                                                background: !isPresent ? '#ef4444' : 'transparent',
                                                                color: !isPresent ? '#ffffff' : '#64748b',
                                                                fontWeight: 800,
                                                                fontSize: 11,
                                                                cursor: 'pointer'
                                                            },
                                                            children: "Absent"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }, s.rollNo)
                                    );
                                })
                            })
                        ]
                    })
                ) : (
                    // ── STUDENT VIEW: 2-COLUMN LUXURY DASHBOARD ──
                    _jsxs("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '380px 1fr',
                            gap: 22,
                            alignItems: 'start'
                        },
                        children: [
                            // ── LEFT COLUMN (KPI Cards & Radar Ring) ──
                            _jsxs("div", {
                                style: { display: 'flex', flexDirection: 'column', gap: 18 },
                                children: [
                                    // Main Ring Card
                                    _jsxs("div", {
                                        style: {
                                            background: 'linear-gradient(135deg, #0052cc 0%, #1e40af 100%)',
                                            borderRadius: 24,
                                            padding: '28px 24px',
                                            color: '#ffffff',
                                            boxShadow: '0 16px 36px rgba(0, 82, 204, 0.22)',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        },
                                        children: [
                                            _jsxs("div", {
                                                style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 },
                                                children: [
                                                    // SVG Radial Ring
                                                    _jsxs("div", {
                                                        style: { position: 'relative', width: 120, height: 120, flexShrink: 0 },
                                                        children: [
                                                            _jsxs("svg", { width: "120", height: "120", viewBox: "0 0 100 100", children: [
                                                                _jsx("circle", { cx: "50", cy: "50", r: "40", fill: "transparent", stroke: "rgba(255,255,255,0.15)", strokeWidth: "10" }),
                                                                _jsx("circle", { cx: "50", cy: "50", r: "40", fill: "transparent", stroke: "#38bdf8", strokeWidth: "10", strokeDasharray: `${2 * Math.PI * 40}`, strokeDashoffset: `${2 * Math.PI * 40 * (1 - percentage / 100)}`, strokeLinecap: "round", transform: "rotate(-90 50 50)", style: { transition: 'stroke-dashoffset 0.8s ease' } })
                                                            ] }),
                                                            _jsxs("div", {
                                                                style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
                                                                children: [
                                                                    _jsxs("span", { style: { fontSize: 26, fontWeight: 950, letterSpacing: -0.5 }, children: [percentage, "%"] }),
                                                                    _jsx("span", { style: { fontSize: 10, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 800 }, children: "Logged" })
                                                                ]
                                                            })
                                                        ]
                                                    }),

                                                    _jsxs("div", {
                                                        style: { display: 'flex', flexDirection: 'column', gap: 8, flex: 1 },
                                                        children: [
                                                            _jsxs("div", {
                                                                style: { display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.14)', padding: '8px 12px', borderRadius: 10, fontSize: 12 },
                                                                children: [
                                                                    _jsx("span", { style: { opacity: 0.9 }, children: "Attended Periods" }),
                                                                    _jsxs("span", { style: { fontWeight: 900 }, children: [presentPeriods || 242, " hrs"] })
                                                                ]
                                                            }),
                                                            _jsxs("div", {
                                                                style: { display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.14)', padding: '8px 12px', borderRadius: 10, fontSize: 12 },
                                                                children: [
                                                                    _jsx("span", { style: { opacity: 0.9 }, children: "Missed / OD" }),
                                                                    _jsxs("span", { style: { fontWeight: 900, color: '#fca5a5' }, children: [missedPeriods || 16, " hrs"] })
                                                                ]
                                                            }),
                                                            _jsxs("div", {
                                                                style: { display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.14)', padding: '8px 12px', borderRadius: 10, fontSize: 12 },
                                                                children: [
                                                                    _jsx("span", { style: { opacity: 0.9 }, children: "Buffer Periods" }),
                                                                    _jsxs("span", { style: { fontWeight: 950, color: '#fef08a' }, children: ["+", safeBuffer, " Safe"] })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),

                                            _jsxs("div", {
                                                style: { marginTop: 18, background: 'rgba(0,0,0,0.22)', padding: '12px 14px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10 },
                                                children: [
                                                    _jsx("span", { style: { fontSize: 20 }, children: percentage >= 75 ? '🎉' : '⚠️' }),
                                                    _jsx("p", {
                                                        style: { margin: 0, fontSize: 12, fontWeight: 700, lineHeight: 1.4 },
                                                        children: percentage >= 75
                                                            ? `Eligible for semester examinations. You have a safe cushion of ${safeBuffer} periods without breaching the 75% cutoff.`
                                                            : `Attendance shortage! You must attend ${requiredToAttend} consecutive classes to reach the 75% exam cutoff.`
                                                    })
                                                ]
                                            })
                                        ]
                                    }),

                                    // Official Attendance Regulations Card
                                    _jsxs("div", {
                                        style: { background: '#ffffff', borderRadius: 22, padding: '20px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
                                        children: [
                                            _jsxs("h4", {
                                                style: { fontSize: 14, fontWeight: 900, color: '#0f172a', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 },
                                                children: [
                                                    _jsx(Sparkles, { size: 16, style: { color: '#0052cc' } }),
                                                    "Official Autonomous Policy"
                                                ]
                                            }),
                                            _jsxs("ul", {
                                                style: { margin: 0, paddingLeft: 18, fontSize: 12, color: '#475569', lineHeight: 1.6 },
                                                children: [
                                                    _jsx("li", { children: "Minimum 75% attendance mandatory to sit for End-Semester Examinations." }),
                                                    _jsx("li", { children: "65% – 74% requires Medical Condonation approval by Principal." }),
                                                    _jsx("li", { children: "Approved On-Duty (OD) forms auto-credited into logged attendance." })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),

                            // ── RIGHT COLUMN (Period-by-Period Timeline) ──
                            _jsxs("div", {
                                style: { background: '#ffffff', borderRadius: 22, padding: '24px 26px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
                                children: [
                                    _jsxs("div", {
                                        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #f1f5f9' },
                                        children: [
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("h3", { style: { fontSize: 16, fontWeight: 950, color: '#0f172a', margin: 0 }, children: "Today's Period Schedule & Log" }),
                                                    _jsx("span", { style: { fontSize: 12, color: '#64748b', fontWeight: 600 }, children: "Active Academic Day · 7 Lecture & Lab Periods" })
                                                ]
                                            }),
                                            _jsx("span", { style: { fontSize: 11, fontWeight: 800, background: '#eff6ff', color: '#1d4ed8', padding: '4px 10px', borderRadius: 8 }, children: "Live Session Active" })
                                        ]
                                    }),

                                    _jsx("div", {
                                        style: { display: 'flex', flexDirection: 'column', gap: 12 },
                                        children: periodSchedule.map(item => (
                                            _jsxs("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '14px 18px',
                                                    borderRadius: 16,
                                                    background: '#f8fafc',
                                                    border: '1.5px solid #e2e8f0',
                                                    transition: 'all 0.15s ease'
                                                },
                                                children: [
                                                    _jsxs("div", {
                                                        style: { display: 'flex', alignItems: 'center', gap: 14 },
                                                        children: [
                                                            _jsxs("div", {
                                                                style: {
                                                                    width: 44,
                                                                    height: 44,
                                                                    borderRadius: 12,
                                                                    background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1) 0%, rgba(37, 99, 235, 0.15) 100%)',
                                                                    color: '#0284c7',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontWeight: 950,
                                                                    flexShrink: 0
                                                                },
                                                                children: [
                                                                    _jsx("span", { style: { fontSize: 9, opacity: 0.7, textTransform: 'uppercase' }, children: "Slot" }),
                                                                    _jsx("span", { style: { fontSize: 16, lineHeight: 1 }, children: item.period })
                                                                ]
                                                            }),
                                                            _jsxs("div", {
                                                                children: [
                                                                    _jsx("div", { style: { fontSize: 13.5, fontWeight: 900, color: '#0f172a' }, children: item.name }),
                                                                    _jsxs("div", {
                                                                        style: { fontSize: 11, color: '#64748b', display: 'flex', gap: 8, marginTop: 2 },
                                                                        children: [
                                                                            _jsxs("span", { children: ["Code: ", item.code] }),
                                                                            _jsx("span", { children: "•" }),
                                                                            _jsx("span", { children: item.room }),
                                                                            _jsx("span", { children: "•" }),
                                                                            _jsx("span", { children: item.teacher })
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    _jsxs("div", {
                                                        style: { textAlign: 'right' },
                                                        children: [
                                                            _jsx("span", { style: { fontSize: 11.5, fontWeight: 800, color: '#0f172a' }, children: item.time }),
                                                            _jsx("div", { style: { fontSize: 10.5, fontWeight: 800, color: '#059669', marginTop: 2 }, children: "✓ Attended" })
                                                        ]
                                                    })
                                                ]
                                            }, item.period)
                                        ))
                                    })
                                ]
                            })
                        ]
                    })
                )
            ]
        })
    );
};
