import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { 
    ArrowLeft, Check, X, ClipboardCheck, ShieldCheck, AlertTriangle, 
    Calendar, Search, Clock, Award, CheckCircle2, AlertCircle, Sparkles, Filter 
} from 'lucide-react';

export const AttendanceTracker = ({ currentStudentRollNo, currentUserName, isAdmin, onBack }) => {
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [logs, setLogs] = useState([]);

    // Teacher view states
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [period, setPeriod] = useState(1);
    const [students, setStudents] = useState([]);
    const [markedStatus, setMarkedStatus] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

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
            setSuccessMsg('✅ Period attendance recorded and locked in database!');
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
    const percentage = totalPeriods > 0 ? Math.round((presentPeriods / totalPeriods) * 100) : 100;

    // Safe buffer calculation (Target 75%)
    const safeBuffer = totalPeriods > 0 ? Math.max(0, Math.floor((presentPeriods - 0.75 * totalPeriods) / 0.75)) : 0;
    const requiredToAttend = percentage < 75 ? Math.ceil((0.75 * totalPeriods - presentPeriods) / 0.25) : 0;

    const periodStats = [
        { period: 1, time: '08:30 – 09:30', name: 'Electrical Machines', code: 'EE8301', room: 'LH-301' },
        { period: 2, time: '09:30 – 10:30', name: 'Power Systems I', code: 'EE8302', room: 'LH-301' },
        { period: 3, time: '10:45 – 11:45', name: 'Control Systems', code: 'EE8303', room: 'LH-302' },
        { period: 4, time: '11:45 – 12:45', name: 'Power Electronics', code: 'EE8304', room: 'LH-302' },
        { period: 5, time: '01:45 – 02:45', name: 'Renewable Energy', code: 'EE8305', room: 'LH-301' },
        { period: 6, time: '02:45 – 03:45', name: 'Microcontrollers Lab', code: 'EE8311', room: 'Embedded Lab' },
        { period: 7, time: '03:45 – 04:45', name: 'Tutor Ward / Library', code: 'TW8320', room: 'EEE Library' },
    ].map(item => {
        const pLogs = logs.filter(l => l.period === item.period);
        const pTotal = pLogs.length;
        const pPresent = pLogs.filter(l => l.status === 'present').length;
        const pPct = pTotal > 0 ? Math.round((pPresent / pTotal) * 100) : 100;
        return { ...item, pct: pPct, total: pTotal, attended: pPresent };
    });

    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        _jsxs("div", { 
            className: "dedicated-page-view page-slide-enter", 
            style: { 
                background: '#f8fafc', 
                minHeight: '100vh', 
                width: '100%',
                paddingBottom: 88 
            }, 
            children: [
                // ── HEADER: FLUID FULL WIDTH RESPONSIVE BAR ──
                _jsxs("div", { 
                    className: "dedicated-page-header",
                    style: {
                        maxWidth: 1440,
                        margin: '0 auto 20px',
                        width: '100%'
                    },
                    children: [
                        _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12 }, children: [
                            _jsx("button", { 
                                className: "page-back-btn", 
                                onClick: onBack, 
                                title: "Return to Dashboard", 
                                children: _jsx(ArrowLeft, { size: 16 }) 
                            }),
                            _jsxs("div", { children: [
                                _jsxs("h2", { 
                                    className: "dedicated-page-title", 
                                    style: { display: 'flex', alignItems: 'center', gap: 8, margin: 0, fontSize: 18, fontWeight: 900 }, 
                                    children: [
                                        "📊 Academic Attendance Radar"
                                    ] 
                                }),
                                _jsx("span", { 
                                    style: { fontSize: 11.5, color: '#64748b', fontWeight: 600 }, 
                                    children: isAdmin ? 'Faculty Attendance Management Portal · SREC Dept of EEE' : `Student ID: ${currentStudentRollNo || '71812503104'} · Section II EEE-B` 
                                })
                            ] })
                        ] }),
                        _jsxs("div", { 
                            style: {
                                padding: '6px 14px',
                                borderRadius: 99,
                                background: percentage >= 75 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                                border: `1px solid ${percentage >= 75 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                                color: percentage >= 75 ? '#059669' : '#dc2626',
                                fontWeight: 800,
                                fontSize: 12,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6
                            }, 
                            children: [
                                percentage >= 75 ? _jsx(ShieldCheck, { size: 15 }) : _jsx(AlertTriangle, { size: 15 }),
                                percentage >= 75 ? 'Eligibility Safe' : 'Condonation Alert'
                            ] 
                        })
                    ] 
                }),

                // ── FLUID AUTO-ADJUSTING RESPONSIVE CONTAINER ──
                _jsxs("div", { 
                    style: { 
                        maxWidth: 1440, 
                        width: '100%', 
                        margin: '0 auto', 
                        padding: '0 24px',
                        boxSizing: 'border-box'
                    }, 
                    children: [
                        successMsg && (
                            _jsx("div", { 
                                style: { 
                                    padding: '12px 18px', 
                                    background: '#f0fdf4', 
                                    color: '#166534', 
                                    border: '1.5px solid #86efac', 
                                    borderRadius: 16, 
                                    fontSize: 13, 
                                    fontWeight: 800, 
                                    textAlign: 'center', 
                                    boxShadow: '0 4px 12px rgba(22, 101, 52, 0.08)',
                                    marginBottom: 18
                                }, 
                                children: successMsg 
                            })
                        ),

                        // ── ADMIN VIEW: FULL RESPONSIVE MANAGEMENT GRID ──
                        isAdmin ? (
                            _jsxs("div", { 
                                style: { display: 'flex', flexDirection: 'column', gap: 16 }, 
                                children: [
                                    _jsxs("div", { 
                                        style: { 
                                            background: '#ffffff', 
                                            borderRadius: 24, 
                                            padding: 22, 
                                            border: '1.5px solid rgba(0,82,204,0.12)', 
                                            boxShadow: '0 8px 24px rgba(0,82,204,0.04)' 
                                        }, 
                                        children: [
                                            _jsxs("div", { 
                                                style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 14 }, 
                                                children: [
                                                    _jsxs("div", { children: [
                                                        _jsx("label", { className: "form-label", style: { fontSize: 11, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4, display: 'block' }, children: "Date" }),
                                                        _jsx("input", { type: "date", value: date, onChange: e => setDate(e.target.value), className: "form-input", style: { fontSize: 12.5, padding: '10px 14px', borderRadius: 14, width: '100%' } })
                                                    ] }),
                                                    _jsxs("div", { children: [
                                                        _jsx("label", { className: "form-label", style: { fontSize: 11, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4, display: 'block' }, children: "Period Slot" }),
                                                        _jsx("select", { value: period, onChange: e => setPeriod(Number(e.target.value)), className: "modern-cert-select", style: { padding: '10px 14px', borderRadius: 14, fontSize: 12.5, width: '100%' }, children: [1, 2, 3, 4, 5, 6, 7].map(p => (
                                                            _jsxs("option", { value: p, children: ["Period ", p, " (", p === 1 ? '08:30-09:30' : p === 2 ? '09:30-10:30' : p === 3 ? '10:45-11:45' : p === 4 ? '11:45-12:45' : p === 5 ? '01:45-02:45' : p === 6 ? '02:45-03:45' : '03:45-04:45', ")"] }, p)
                                                        )) })
                                                    ] })
                                                ] 
                                            }),
                                            _jsxs("div", { 
                                                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid rgba(0,82,204,0.08)' }, 
                                                children: [
                                                    _jsxs("div", { style: { position: 'relative', flex: 1, minWidth: 260 }, children: [
                                                        _jsx(Search, { size: 15, style: { position: 'absolute', left: 12, top: 12, color: '#94a3b8' } }),
                                                        _jsx("input", { type: "text", value: searchQuery, onChange: e => setSearchQuery(e.target.value), placeholder: "Search student by name or roll number...", style: { width: '100%', padding: '9px 12px 9px 36px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 12, outline: 'none', background: '#f8fafc' } })
                                                    ] }),
                                                    _jsxs("div", { style: { display: 'flex', gap: 8 }, children: [
                                                        _jsx("button", { type: "button", onClick: () => handleMarkAll('present'), style: { padding: '8px 16px', borderRadius: 12, background: 'rgba(16, 185, 129, 0.12)', color: '#059669', border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: 800, fontSize: 11.5, cursor: 'pointer' }, children: "All Present" }),
                                                        _jsx("button", { type: "button", onClick: () => handleMarkAll('absent'), style: { padding: '8px 16px', borderRadius: 12, background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626', border: '1px solid rgba(239, 68, 68, 0.3)', fontWeight: 800, fontSize: 11.5, cursor: 'pointer' }, children: "All Absent" })
                                                    ] })
                                                ] 
                                            })
                                        ] 
                                    }),

                                    // Multi-column responsive student grid
                                    _jsx("div", { 
                                        style: { 
                                            display: 'grid', 
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                                            gap: 12 
                                        }, 
                                        children: filteredStudents.map(s => {
                                            const isPresent = markedStatus[s.rollNo] === 'present';
                                            return (
                                                _jsxs("div", { 
                                                    style: {
                                                        background: '#ffffff',
                                                        borderRadius: 18,
                                                        padding: '12px 16px',
                                                        border: '1.5px solid',
                                                        borderColor: isPresent ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                                                    }, 
                                                    children: [
                                                        _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12 }, children: [
                                                            _jsx("div", { 
                                                                style: {
                                                                    width: 38,
                                                                    height: 38,
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
                                                            _jsxs("div", { children: [
                                                                _jsx("h4", { style: { margin: 0, fontSize: 13, fontWeight: 800, color: 'var(--text-main)' }, children: s.name }),
                                                                _jsxs("span", { style: { fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 600 }, children: ["Roll: ", s.rollNo, " \u00B7 Sec ", s.className || 'II EEE-B'] })
                                                            ] })
                                                        ] }),
                                                        _jsxs("div", { style: { display: 'flex', gap: 6, background: '#f1f5f9', padding: 4, borderRadius: 14 }, children: [
                                                            _jsx("button", { 
                                                                type: "button", 
                                                                onClick: () => handleStatusChange(s.rollNo, 'present'), 
                                                                style: {
                                                                    padding: '6px 12px',
                                                                    borderRadius: 10,
                                                                    border: 'none',
                                                                    background: isPresent ? '#10b981' : 'transparent',
                                                                    color: isPresent ? '#ffffff' : '#64748b',
                                                                    fontWeight: 800,
                                                                    fontSize: 11.5,
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.2s ease'
                                                                }, 
                                                                children: "Present" 
                                                            }),
                                                            _jsx("button", { 
                                                                type: "button", 
                                                                onClick: () => handleStatusChange(s.rollNo, 'absent'), 
                                                                style: {
                                                                    padding: '6px 12px',
                                                                    borderRadius: 10,
                                                                    border: 'none',
                                                                    background: !isPresent ? '#ef4444' : 'transparent',
                                                                    color: !isPresent ? '#ffffff' : '#64748b',
                                                                    fontWeight: 800,
                                                                    fontSize: 11.5,
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.2s ease'
                                                                }, 
                                                                children: "Absent" 
                                                            })
                                                        ] })
                                                    ] 
                                                }, s.rollNo)
                                            );
                                        }) 
                                    }),

                                    _jsxs("button", { 
                                        onClick: handleSaveAttendance, 
                                        disabled: loading || students.length === 0, 
                                        className: "btn-primary", 
                                        style: {
                                            padding: '14px',
                                            borderRadius: 18,
                                            fontSize: 14,
                                            fontWeight: 900,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 8,
                                            boxShadow: '0 8px 24px rgba(0,82,204,0.35)',
                                            marginTop: 8
                                        }, 
                                        children: [
                                            _jsx(ClipboardCheck, { size: 18 }), 
                                            loading ? 'Submitting Records...' : 'Save & Lock Attendance'
                                        ] 
                                    })
                                ] 
                            })
                        ) : (
                            // ── STUDENT VIEW: 2-COLUMN ADAPTIVE BENTO GRID ──
                            _jsxs("div", { 
                                className: "attendance-adaptive-grid",
                                style: { 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', 
                                    gap: 24,
                                    alignItems: 'start'
                                }, 
                                children: [
                                    // ── COLUMN 1: OVERALL ATTENDANCE RADAR & ELIGIBILITY ──
                                    _jsxs("div", { 
                                        style: { display: 'flex', flexDirection: 'column', gap: 16 }, 
                                        children: [
                                            _jsxs("div", { 
                                                style: {
                                                    background: 'linear-gradient(135deg, #0052cc 0%, #1e40af 100%)',
                                                    borderRadius: 28,
                                                    padding: '28px 24px',
                                                    color: '#ffffff',
                                                    boxShadow: '0 16px 36px rgba(0, 82, 204, 0.25)',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }, 
                                                children: [
                                                    _jsx("div", { style: { position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)' } }),
                                                    _jsxs("div", { 
                                                        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }, 
                                                        children: [
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
                                                                            _jsxs("span", { style: { fontSize: 24, fontWeight: 900, letterSpacing: -0.5 }, children: [percentage, "%"] }),
                                                                            _jsx("span", { style: { fontSize: 10, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }, children: "Overall" })
                                                                        ] 
                                                                    })
                                                                ] 
                                                            }),
                                                            _jsxs("div", { 
                                                                style: { display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }, 
                                                                children: [
                                                                    _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.12)', padding: '9px 14px', borderRadius: 12 }, children: [
                                                                        _jsx("span", { style: { fontSize: 12, opacity: 0.88, fontWeight: 600 }, children: "Attended Periods" }),
                                                                        _jsxs("span", { style: { fontSize: 13, fontWeight: 900 }, children: [presentPeriods, " hrs"] })
                                                                    ] }),
                                                                    _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.12)', padding: '9px 14px', borderRadius: 12 }, children: [
                                                                        _jsx("span", { style: { fontSize: 12, opacity: 0.88, fontWeight: 600 }, children: "Missed / OD" }),
                                                                        _jsxs("span", { style: { fontSize: 13, fontWeight: 900, color: '#fca5a5' }, children: [missedPeriods, " hrs"] })
                                                                    ] }),
                                                                    _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.12)', padding: '9px 14px', borderRadius: 12 }, children: [
                                                                        _jsx("span", { style: { fontSize: 12, opacity: 0.88, fontWeight: 600 }, children: "Total Logged" }),
                                                                        _jsxs("span", { style: { fontSize: 13, fontWeight: 900 }, children: [totalPeriods, " hrs"] })
                                                                    ] })
                                                                ] 
                                                            })
                                                        ] 
                                                    }),

                                                    _jsxs("div", { 
                                                        style: { marginTop: 18, background: 'rgba(0,0,0,0.22)', padding: '12px 16px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10 }, 
                                                        children: [
                                                            _jsx("span", { style: { fontSize: 20 }, children: percentage >= 75 ? '🎉' : '⚠️' }),
                                                            _jsx("p", { 
                                                                style: { margin: 0, fontSize: 12, fontWeight: 700, lineHeight: 1.4 }, 
                                                                children: percentage >= 75
                                                                    ? `Eligible for Anna University semester examinations. You currently have a buffer of ${safeBuffer} periods without dropping below the 75% threshold.`
                                                                    : `Attendance shortage! You must attend ${requiredToAttend} consecutive classes to reach the 75% exam cutoff.` 
                                                            })
                                                        ] 
                                                    })
                                                ] 
                                            }),

                                            // Quick Regulations Card
                                            _jsxs("div", { 
                                                style: { background: '#ffffff', borderRadius: 24, padding: 20, border: '1.5px solid rgba(0,82,204,0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
                                                children: [
                                                    _jsxs("h4", { style: { fontSize: 13.5, fontWeight: 900, color: 'var(--text-main)', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }, children: [
                                                        _jsx(Sparkles, { size: 16, color: "#0052cc" }),
                                                        "Official Attendance Policy"
                                                    ] }),
                                                    _jsxs("ul", { style: { margin: 0, paddingLeft: 18, fontSize: 12, color: '#475569', lineHeight: 1.6 }, children: [
                                                        _jsx("li", { children: "Minimum 75% attendance mandatory to sit for Semester Examinations." }),
                                                        _jsx("li", { children: "65% – 74% requires Medical / Condonation approval by Principal." }),
                                                        _jsx("li", { children: "Approved On-Duty (OD) forms auto-credited into logged attendance." })
                                                    ] })
                                                ]
                                            })
                                        ] 
                                    }),

                                    // ── COLUMN 2: DAILY PERIOD SLOT MASTERY (EXPANDED) ──
                                    _jsxs("div", { 
                                        style: { 
                                            background: '#ffffff', 
                                            borderRadius: 28, 
                                            padding: 24, 
                                            border: '1.5px solid rgba(0,82,204,0.12)', 
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)' 
                                        }, 
                                        children: [
                                            _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, children: [
                                                _jsxs("h4", { style: { fontSize: 15, fontWeight: 900, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }, children: [
                                                    _jsx(Clock, { size: 16, color: "#0052cc" }),
                                                    "Daily Period Slot Mastery (Periods 1 – 7)"
                                                ] }),
                                                _jsx("span", { style: { fontSize: 11, fontWeight: 800, background: '#eff6ff', color: '#1d4ed8', padding: '3px 10px', borderRadius: 99 }, children: "Regulation 2022" })
                                            ] }),

                                            _jsx("div", { 
                                                style: { display: 'flex', flexDirection: 'column', gap: 10 }, 
                                                children: periodStats.map(stat => (
                                                    _jsxs("div", { 
                                                        style: {
                                                            background: '#f8fafc',
                                                            borderRadius: 16,
                                                            padding: '12px 16px',
                                                            border: '1px solid rgba(0,82,204,0.08)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            gap: 14,
                                                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                                        }, 
                                                        onMouseEnter: e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,82,204,0.08)',
                                                        onMouseLeave: e => e.currentTarget.style.boxShadow = 'none',
                                                        children: [
                                                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12 }, children: [
                                                                _jsxs("div", { 
                                                                    style: { 
                                                                        width: 38, 
                                                                        height: 38, 
                                                                        borderRadius: 10, 
                                                                        background: stat.pct >= 75 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', 
                                                                        color: stat.pct >= 75 ? '#059669' : '#dc2626', 
                                                                        display: 'flex', 
                                                                        alignItems: 'center', 
                                                                        justifyContent: 'center', 
                                                                        fontWeight: 900, 
                                                                        fontSize: 13,
                                                                        flexShrink: 0 
                                                                    }, 
                                                                    children: [`P${stat.period}`] 
                                                                }),
                                                                _jsxs("div", { children: [
                                                                    _jsx("span", { style: { fontSize: 13.5, fontWeight: 800, color: 'var(--text-main)', display: 'block' }, children: stat.name }),
                                                                    _jsxs("span", { style: { fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }, children: [`${stat.code} \u00B7 ${stat.time} \u00B7 ${stat.room}`] })
                                                                ] })
                                                            ] }),

                                                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12 }, children: [
                                                                _jsx("div", { 
                                                                    style: { width: 90, height: 7, borderRadius: 99, background: '#e2e8f0', overflow: 'hidden' }, 
                                                                    children: _jsx("div", { 
                                                                        style: { 
                                                                            width: `${stat.pct}%`, 
                                                                            height: '100%', 
                                                                            borderRadius: 99, 
                                                                            background: stat.pct >= 75 ? '#10b981' : '#ef4444', 
                                                                            transition: 'width 0.4s ease' 
                                                                        } 
                                                                    }) 
                                                                }),
                                                                _jsxs("span", { 
                                                                    style: { 
                                                                        fontSize: 12, 
                                                                        fontWeight: 900, 
                                                                        color: stat.pct >= 75 ? '#059669' : '#dc2626', 
                                                                        minWidth: 42, 
                                                                        textAlign: 'right' 
                                                                    }, 
                                                                    children: [`${stat.pct}%`] 
                                                                })
                                                            ] })
                                                        ] 
                                                    }, stat.period)
                                                )) 
                                            })
                                        ] 
                                    })
                                ] 
                            })
                        )
                    ] 
                })
            ] 
        })
    );
};