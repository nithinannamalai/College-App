import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { 
    FileText, Clock, CheckCircle2, XCircle, Upload, Download, 
    Trash2, Plus, ChevronDown, ChevronUp, Search, Sparkles, Filter, Check
} from 'lucide-react';

const LETTER_TYPES = [
    'Bonafide',
    'NOC',
    'Internship Request',
    'Course Completion'
];

const STATUS_CONFIG = {
    Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: _jsx(Clock, { size: 14 }) },
    Approved: { color: '#16a34a', bg: 'rgba(22,163,74,0.12)', icon: _jsx(CheckCircle2, { size: 14 }) },
    Rejected: { color: '#dc2626', bg: 'rgba(220,38,38,0.12)', icon: _jsx(XCircle, { size: 14 }) }
};

export const DesktopRequestLetters = ({
    currentEmail = 'student@eee.com',
    currentName = 'Nithin Annamalai R',
    currentRollNo = '71812503104',
    isAdmin = false
}) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    // Form state
    const [showForm, setShowForm] = useState(false);
    const [letterType, setLetterType] = useState('Bonafide');
    const [purpose, setPurpose] = useState('');
    const [details, setDetails] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Admin state
    const [adminRemarks, setAdminRemarks] = useState({});
    const [uploadingFor, setUploadingFor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        loadRequests();
    }, [currentEmail, isAdmin]);

    const loadRequests = async () => {
        setLoading(true);
        try {
            const list = isAdmin
                ? await dbService.getLetterRequests()
                : await dbService.getLetterRequests(currentEmail);
            setRequests((list || []).sort((a, b) => (b.requestedAt || '').localeCompare(a.requestedAt || '')));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitRequest = async (e) => {
        e.preventDefault();
        if (!purpose.trim() || !details.trim()) return;
        setSubmitting(true);
        setStatusMsg('');
        const newReq = {
            id: `lr-${Date.now()}`,
            studentEmail: currentEmail,
            studentName: currentName,
            rollNo: currentRollNo,
            letterType,
            purpose: purpose.trim(),
            details: details.trim(),
            status: 'Pending',
            requestedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
        try {
            await dbService.saveLetterRequest(newReq);
            setStatusMsg('✅ Letter request successfully submitted to HOD office!');
            setTimeout(() => setStatusMsg(''), 3000);
            setPurpose('');
            setDetails('');
            setShowForm(false);
            loadRequests();
        } catch (err) {
            console.error(err);
            setStatusMsg('❌ Error submitting request.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateStatus = async (req, status) => {
        const remarks = adminRemarks[req.id] || '';
        const updated = { ...req, status, adminRemarks: remarks };
        try {
            await dbService.saveLetterRequest(updated);
            setStatusMsg(`Request ${status.toLowerCase()}!`);
            setTimeout(() => setStatusMsg(''), 2500);
            loadRequests();
        } catch (err) {
            console.error(err);
            setStatusMsg('Error updating status.');
        }
    };

    const handleUploadSignedLetter = (e, req) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'application/pdf') {
            setStatusMsg('Only PDF documents are supported.');
            return;
        }
        setUploadingFor(req.id);
        setStatusMsg('');
        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64 = event.target?.result;
            const updated = { ...req, status: 'Approved', pdfUrl: base64, adminRemarks: adminRemarks[req.id] || req.adminRemarks || '' };
            try {
                await dbService.saveLetterRequest(updated);
                setStatusMsg('Signed letter uploaded & request approved!');
                setTimeout(() => setStatusMsg(''), 3000);
                loadRequests();
            } catch (err) {
                console.error(err);
                setStatusMsg('Error uploading letter.');
            } finally {
                setUploadingFor(null);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleDownloadLetter = (req) => {
        if (!req.pdfUrl) return;
        const link = document.createElement('a');
        link.href = req.pdfUrl;
        link.download = `${req.letterType.replace(/\s+/g, '_')}_Letter_${req.rollNo}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDeleteRequest = async (id) => {
        if (!window.confirm('Delete this letter request?')) return;
        try {
            await dbService.deleteLetterRequest(id);
            setStatusMsg('Request deleted.');
            setTimeout(() => setStatusMsg(''), 2500);
            loadRequests();
        } catch (err) {
            console.error(err);
            setStatusMsg('Error deleting request.');
        }
    };

    const pendingCount = requests.filter(r => r.status === 'Pending').length;
    const approvedCount = requests.filter(r => r.status === 'Approved').length;
    const rejectedCount = requests.filter(r => r.status === 'Rejected').length;

    const filteredRequests = requests.filter(r => {
        const q = searchQuery.toLowerCase();
        const matchesQ = (r.studentName || '').toLowerCase().includes(q) || (r.rollNo || '').toLowerCase().includes(q) || (r.letterType || '').toLowerCase().includes(q) || (r.purpose || '').toLowerCase().includes(q);
        const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
        return matchesQ && matchesStatus;
    });

    return (
        _jsxs("div", {
            className: "desktop-request-letters-view",
            style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 20 },
            children: [
                statusMsg && (
                    _jsx("div", {
                        style: {
                            padding: '12px 18px',
                            background: '#eff6ff',
                            border: '1.5px solid #bfdbfe',
                            borderRadius: 14,
                            fontSize: 13,
                            textAlign: 'center',
                            color: '#1d4ed8',
                            fontWeight: 800
                        },
                        children: statusMsg
                    })
                ),

                // ── KPI Summary Cards ──
                _jsxs("div", {
                    style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 },
                    children: [
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 18, padding: '16px 20px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
                            children: [
                                _jsx("div", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Total Requests" }),
                                _jsx("div", { style: { fontSize: 26, fontWeight: 950, color: '#0f172a', marginTop: 4 }, children: requests.length })
                            ]
                        }),
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 18, padding: '16px 20px', border: '1.5px solid #fef3c7', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
                            children: [
                                _jsx("div", { style: { fontSize: 11, fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }, children: "Awaiting Approval" }),
                                _jsx("div", { style: { fontSize: 26, fontWeight: 950, color: '#b45309', marginTop: 4 }, children: pendingCount })
                            ]
                        }),
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 18, padding: '16px 20px', border: '1.5px solid #bbf7d0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
                            children: [
                                _jsx("div", { style: { fontSize: 11, fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }, children: "Approved & Signed" }),
                                _jsx("div", { style: { fontSize: 26, fontWeight: 950, color: '#15803d', marginTop: 4 }, children: approvedCount })
                            ]
                        }),
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 18, padding: '16px 20px', border: '1.5px solid #fecaca', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
                            children: [
                                _jsx("div", { style: { fontSize: 11, fontWeight: 800, color: '#dc2626', textTransform: 'uppercase' }, children: "Rejected / Incomplete" }),
                                _jsx("div", { style: { fontSize: 26, fontWeight: 950, color: '#b91c1c', marginTop: 4 }, children: rejectedCount })
                            ]
                        })
                    ]
                }),

                // ── Main Workspace: 2-Column Desktop Grid ──
                _jsxs("div", {
                    style: { display: 'grid', gridTemplateColumns: showForm || !isAdmin ? '420px 1fr' : '1fr', gap: 22, alignItems: 'start' },
                    children: [
                        // Left Column: Submit New Letter Request Form (for students or admin toggle)
                        (!isAdmin || showForm) && (
                            _jsxs("div", {
                                style: { background: '#ffffff', borderRadius: 22, padding: '24px 22px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
                                children: [
                                    _jsxs("h3", { style: { fontSize: 16, fontWeight: 950, color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }, children: [
                                        _jsx(Plus, { size: 18, color: "#0284c7" }),
                                        "New Official Letter Application"
                                    ] }),
                                    _jsxs("form", {
                                        onSubmit: handleSubmitRequest,
                                        style: { display: 'flex', flexDirection: 'column', gap: 14 },
                                        children: [
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#475569', display: 'block', marginBottom: 4 }, children: "Document Type" }),
                                                    _jsx("select", {
                                                        value: letterType,
                                                        onChange: e => setLetterType(e.target.value),
                                                        style: { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 12.5, fontWeight: 700, background: '#f8fafc', boxSizing: 'border-box' },
                                                        children: LETTER_TYPES.map(t => (
                                                            _jsxs("option", { value: t, children: [t, " Certificate / Letter"] }, t)
                                                        ))
                                                    })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#475569', display: 'block', marginBottom: 4 }, children: "Purpose of Request" }),
                                                    _jsx("input", {
                                                        type: "text",
                                                        value: purpose,
                                                        onChange: e => setPurpose(e.target.value),
                                                        placeholder: "e.g. Passport Application / Internship at Siemens",
                                                        required: true,
                                                        style: { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' }
                                                    })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#475569', display: 'block', marginBottom: 4 }, children: "Detailed Description / Submission Notes" }),
                                                    _jsx("textarea", {
                                                        value: details,
                                                        onChange: e => setDetails(e.target.value),
                                                        placeholder: "Any specific reference number or details for HOD office...",
                                                        required: true,
                                                        rows: 4,
                                                        style: { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 12.5, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }
                                                    })
                                                ]
                                            }),
                                            _jsxs("button", {
                                                type: "submit",
                                                disabled: submitting,
                                                style: {
                                                    padding: '12px',
                                                    borderRadius: 12,
                                                    border: 'none',
                                                    background: '#0284c7',
                                                    color: '#ffffff',
                                                    fontWeight: 900,
                                                    fontSize: 13,
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)',
                                                    marginTop: 6
                                                },
                                                children: [submitting ? "Submitting to HOD Office..." : "Submit Application"]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ),

                        // Right Column: Requests Database Table / Feed
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 22, padding: '24px 26px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap', gap: 12 },
                                    children: [
                                        _jsxs("div", {
                                            children: [
                                                _jsx("h3", { style: { fontSize: 16, fontWeight: 950, color: '#0f172a', margin: 0 }, children: isAdmin ? "Student Letter Requests Console" : "My Submitted Requests" }),
                                                _jsx("span", { style: { fontSize: 11.5, color: '#64748b', fontWeight: 600 }, children: "Review official approval status and download signed PDFs" })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'flex', gap: 8 },
                                            children: [
                                                _jsxs("div", {
                                                    style: { position: 'relative' },
                                                    children: [
                                                        _jsx(Search, { size: 14, style: { position: 'absolute', left: 10, top: 10, color: '#94a3b8' } }),
                                                        _jsx("input", {
                                                            type: "text",
                                                            value: searchQuery,
                                                            onChange: e => setSearchQuery(e.target.value),
                                                            placeholder: "Search...",
                                                            style: { padding: '7px 10px 7px 30px', borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 12, outline: 'none' }
                                                        })
                                                    ]
                                                }),
                                                _jsxs("select", {
                                                    value: filterStatus,
                                                    onChange: e => setFilterStatus(e.target.value),
                                                    style: { padding: '7px 12px', borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 12, background: '#f8fafc', fontWeight: 700 },
                                                    children: [
                                                        _jsx("option", { value: "all", children: "All Status" }),
                                                        _jsx("option", { value: "Pending", children: "Pending" }),
                                                        _jsx("option", { value: "Approved", children: "Approved" }),
                                                        _jsx("option", { value: "Rejected", children: "Rejected" })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),

                                loading ? (
                                    _jsx("div", { style: { padding: 40, textAlign: 'center', color: '#64748b', fontSize: 13 }, children: "Loading letter requests..." })
                                ) : filteredRequests.length === 0 ? (
                                    _jsxs("div", {
                                        style: { padding: '40px 20px', textAlign: 'center', color: '#94a3b8' },
                                        children: [
                                            _jsx(FileText, { size: 36, style: { opacity: 0.3, margin: '0 auto 8px' } }),
                                            _jsx("p", { style: { margin: 0, fontSize: 13, fontWeight: 700 }, children: "No letter requests found matching filters." })
                                        ]
                                    })
                                ) : (
                                    _jsx("div", {
                                        style: { display: 'flex', flexDirection: 'column', gap: 12 },
                                        children: filteredRequests.map(req => {
                                            const cfg = STATUS_CONFIG[req.status] || STATUS_CONFIG.Pending;
                                            const isExpanded = expandedId === req.id;

                                            return (
                                                _jsxs("div", {
                                                    style: {
                                                        background: '#f8fafc',
                                                        borderRadius: 16,
                                                        border: '1.5px solid',
                                                        borderColor: req.status === 'Pending' ? '#fed7aa' : '#e2e8f0',
                                                        overflow: 'hidden'
                                                    },
                                                    children: [
                                                        _jsxs("div", {
                                                            onClick: () => setExpandedId(isExpanded ? null : req.id),
                                                            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', cursor: 'pointer' },
                                                            children: [
                                                                _jsxs("div", {
                                                                    style: { display: 'flex', alignItems: 'center', gap: 12 },
                                                                    children: [
                                                                        _jsx("div", {
                                                                            style: {
                                                                                width: 38,
                                                                                height: 38,
                                                                                borderRadius: 10,
                                                                                background: cfg.bg,
                                                                                color: cfg.color,
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                fontWeight: 900
                                                                            },
                                                                            children: _jsx(FileText, { size: 18 })
                                                                        }),
                                                                        _jsxs("div", {
                                                                            children: [
                                                                                _jsxs("div", { style: { fontSize: 13.5, fontWeight: 950, color: '#0f172a' }, children: [req.letterType, " Letter • ", req.studentName || 'Student'] }),
                                                                                _jsxs("div", { style: { fontSize: 11, color: '#64748b', marginTop: 2 }, children: ["Roll: ", req.rollNo, " • Purpose: ", req.purpose, " • Submitted: ", req.requestedAt] })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                _jsxs("div", {
                                                                    style: { display: 'flex', alignItems: 'center', gap: 10 },
                                                                    children: [
                                                                        _jsxs("span", {
                                                                            style: { fontSize: 11, fontWeight: 900, padding: '4px 10px', borderRadius: 8, background: cfg.bg, color: cfg.color, display: 'flex', alignItems: 'center', gap: 4 },
                                                                            children: [cfg.icon, req.status]
                                                                        }),
                                                                        isExpanded ? _jsx(ChevronUp, { size: 16, style: { color: '#94a3b8' } }) : _jsx(ChevronDown, { size: 16, style: { color: '#94a3b8' } })
                                                                    ]
                                                                })
                                                            ]
                                                        }),

                                                        isExpanded && (
                                                            _jsxs("div", {
                                                                style: { padding: '0 18px 18px', borderTop: '1px solid #e2e8f0', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 12 },
                                                                children: [
                                                                    _jsxs("div", {
                                                                        style: { background: '#ffffff', padding: 12, borderRadius: 12, border: '1px solid #e2e8f0' },
                                                                        children: [
                                                                            _jsx("div", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }, children: "Full Application Details" }),
                                                                            _jsx("p", { style: { fontSize: 12.5, color: '#334155', margin: 0, lineHeight: 1.5 }, children: req.details })
                                                                        ]
                                                                    }),

                                                                    req.adminRemarks && (
                                                                        _jsxs("div", {
                                                                            style: { background: '#eff6ff', padding: 12, borderRadius: 12, border: '1px solid #bfdbfe' },
                                                                            children: [
                                                                                _jsx("div", { style: { fontSize: 10.5, fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase', marginBottom: 2 }, children: "HOD Office Remarks" }),
                                                                                _jsx("div", { style: { fontSize: 12, color: '#1e3a8a' }, children: req.adminRemarks })
                                                                            ]
                                                                        })
                                                                    ),

                                                                    // Signed PDF Download (if available)
                                                                    req.pdfUrl && (
                                                                        _jsxs("button", {
                                                                            onClick: () => handleDownloadLetter(req),
                                                                            style: {
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                gap: 8,
                                                                                padding: '10px 18px',
                                                                                borderRadius: 12,
                                                                                background: '#059669',
                                                                                color: '#ffffff',
                                                                                fontSize: 12.5,
                                                                                fontWeight: 900,
                                                                                border: 'none',
                                                                                cursor: 'pointer'
                                                                            },
                                                                            children: [_jsx(Download, { size: 15 }), "Download Official Signed PDF"]
                                                                        })
                                                                    ),

                                                                    // Faculty Admin Actions
                                                                    isAdmin && (
                                                                        _jsxs("div", {
                                                                            style: { display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 6 },
                                                                            children: [
                                                                                _jsxs("div", {
                                                                                    children: [
                                                                                        _jsx("label", { style: { fontSize: 10.5, fontWeight: 800, color: '#475569', display: 'block', marginBottom: 4 }, children: "Admin Remarks" }),
                                                                                        _jsx("textarea", {
                                                                                            value: adminRemarks[req.id] ?? (req.adminRemarks || ''),
                                                                                            onChange: e => setAdminRemarks(prev => ({ ...prev, [req.id]: e.target.value })),
                                                                                            placeholder: "Add instructions or approval conditions...",
                                                                                            rows: 2,
                                                                                            style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, boxSizing: 'border-box' }
                                                                                        })
                                                                                    ]
                                                                                }),
                                                                                _jsxs("div", {
                                                                                    style: { display: 'flex', gap: 8, alignItems: 'center' },
                                                                                    children: [
                                                                                        req.status !== 'Approved' && (
                                                                                            _jsxs("button", {
                                                                                                onClick: () => handleUpdateStatus(req, 'Approved'),
                                                                                                style: { padding: '8px 16px', borderRadius: 8, border: 'none', background: '#10b981', color: '#fff', fontWeight: 800, fontSize: 11.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 },
                                                                                                children: [_jsx(CheckCircle2, { size: 14 }), "Approve Request"]
                                                                                            })
                                                                                        ),
                                                                                        req.status !== 'Rejected' && (
                                                                                            _jsxs("button", {
                                                                                                onClick: () => handleUpdateStatus(req, 'Rejected'),
                                                                                                style: { padding: '8px 16px', borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', fontWeight: 800, fontSize: 11.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 },
                                                                                                children: [_jsx(XCircle, { size: 14 }), "Reject Request"]
                                                                                            })
                                                                                        ),
                                                                                        _jsxs("label", {
                                                                                            style: { padding: '8px 14px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#ffffff', color: '#334155', fontWeight: 800, fontSize: 11.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 },
                                                                                            children: [
                                                                                                _jsx(Upload, { size: 14 }),
                                                                                                uploadingFor === req.id ? "Uploading..." : "Upload Signed PDF",
                                                                                                _jsx("input", { type: "file", accept: "application/pdf", onChange: e => handleUploadSignedLetter(e, req), style: { display: 'none' } })
                                                                                            ]
                                                                                        }),
                                                                                        _jsx("button", {
                                                                                            onClick: () => handleDeleteRequest(req.id),
                                                                                            style: { marginLeft: 'auto', padding: '8px 12px', borderRadius: 8, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', cursor: 'pointer' },
                                                                                            children: _jsx(Trash2, { size: 14 })
                                                                                        })
                                                                                    ]
                                                                                })
                                                                            ]
                                                                        })
                                                                    )
                                                                ]
                                                            })
                                                        )
                                                    ]
                                                }, req.id)
                                            );
                                        })
                                    })
                                )
                            ]
                        })
                    ]
                })
            ]
        })
    );
};
