import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { 
    ShieldCheck, Award, FileText, Download, Upload, Trash2, 
    Printer, Edit3, User, Sparkles, QrCode, Phone, MapPin, 
    Calendar, Droplets, BookOpen, Check, X, Search, ExternalLink
} from 'lucide-react';

const CERT_CATEGORY_CONFIG = [
    { label: 'NPTEL & Swayam Certifications', icon: '🎓', color: '#0052cc', bg: '#eff6ff' },
    { label: 'Internship & Industry Training', icon: '💼', color: '#059669', bg: '#ecfdf5' },
    { label: 'Workshops & Seminars', icon: '🛠️', color: '#d97706', bg: '#fffbeb' },
    { label: 'Sports & Co-Curricular', icon: '🏆', color: '#dc2626', bg: '#fef2f2' },
    { label: 'Academic Degrees & Marksheets', icon: '📜', color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'Other Certificates', icon: '📑', color: '#475569', bg: '#f8fafc' },
];

export const DesktopProfileDocs = ({
    currentEmail = 'student@eee.com',
    isAdmin = false,
    mode = 'profile', // 'profile' | 'documents' | 'certificates'
    currentUser,
    onUpdateUser
}) => {
    const [activeMode, setActiveMode] = useState(mode);
    const [student, setStudent] = useState(null);
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    // Document upload
    const [selectedCategory, setSelectedCategory] = useState(CERT_CATEGORY_CONFIG[0].label);
    const [customDocName, setCustomDocName] = useState('');
    const [uploading, setUploading] = useState(false);

    // Profile Edit
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editBlood, setEditBlood] = useState('');
    const [editAddress, setEditAddress] = useState('');

    useEffect(() => {
        setActiveMode(mode);
    }, [mode]);

    useEffect(() => {
        loadData();
    }, [currentEmail, isAdmin]);

    const loadData = async () => {
        setLoading(true);
        try {
            const p = await dbService.getStudentProfile(currentEmail);
            if (p) {
                setStudent(p);
                setEditName(p.name || '');
                setEditPhone(p.phone || '');
                setEditBlood(p.bloodGroup || 'O+');
                setEditAddress(p.address || '');
                setDocs(p.documents || []);
            } else {
                const fallback = {
                    name: currentUser?.name || 'Nithin Annamalai R',
                    rollNo: currentUser?.rollNo || '71812503104',
                    className: currentUser?.className || 'II EEE-B',
                    email: currentEmail,
                    department: 'Dept of EEE',
                    yearOfStudy: '2nd Year',
                    semester: 'Semester IV',
                    phone: '+91 98421 55678',
                    dob: '2004-05-14',
                    bloodGroup: 'O+',
                    address: 'Coimbatore, Tamil Nadu',
                    parentName: 'R. Annamalai',
                    parentPhone: '+91 94432 11223',
                    documents: []
                };
                setStudent(fallback);
                setEditName(fallback.name);
                setEditPhone(fallback.phone);
                setEditBlood(fallback.bloodGroup);
                setEditAddress(fallback.address);
                setDocs([]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        setStatusMessage('');
        const reader = new FileReader();
        reader.onload = async (ev) => {
            const dataUrl = ev.target?.result;
            const newDoc = {
                id: `doc-${Date.now()}`,
                name: customDocName.trim() || file.name,
                category: selectedCategory,
                size: `${(file.size / 1024).toFixed(1)} KB`,
                type: file.type,
                dataUrl,
                uploadedAt: new Date().toISOString().substring(0, 10)
            };
            const updatedDocs = [...docs, newDoc];
            setDocs(updatedDocs);
            if (student) {
                const updatedStudent = { ...student, documents: updatedDocs };
                await dbService.updateStudentProfile(updatedStudent);
            }
            setCustomDocName('');
            setUploading(false);
            setStatusMessage('✅ Document uploaded to secure vault!');
            setTimeout(() => setStatusMessage(''), 3000);
        };
        reader.readAsDataURL(file);
    };

    const handleDeleteDoc = async (id) => {
        if (!window.confirm('Delete this document from vault?')) return;
        const next = docs.filter(d => d.id !== id);
        setDocs(next);
        if (student) {
            await dbService.updateStudentProfile({ ...student, documents: next });
        }
        setStatusMessage('Document deleted.');
        setTimeout(() => setStatusMessage(''), 2500);
    };

    const handleSaveBio = async (e) => {
        e.preventDefault();
        const updated = {
            ...student,
            name: editName,
            phone: editPhone,
            bloodGroup: editBlood,
            address: editAddress
        };
        await dbService.updateStudentProfile(updated);
        setStudent(updated);
        if (onUpdateUser) onUpdateUser(updated);
        setShowEditModal(false);
        setStatusMessage('✅ Student profile updated!');
        setTimeout(() => setStatusMessage(''), 3000);
    };

    return (
        _jsxs("div", {
            className: "desktop-profile-docs-view",
            style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 20 },
            children: [
                statusMessage && (
                    _jsx("div", {
                        style: { padding: '12px 18px', background: '#f0fdf4', color: '#166534', border: '1.5px solid #86efac', borderRadius: 14, fontSize: 13, fontWeight: 800, textAlign: 'center' },
                        children: statusMessage
                    })
                ),

                // ── Top Sub-Nav Pills ──
                _jsxs("div", {
                    style: {
                        background: '#ffffff',
                        borderRadius: 20,
                        padding: '12px 18px',
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
                                    onClick: () => setActiveMode('profile'),
                                    style: {
                                        padding: '9px 18px',
                                        borderRadius: 12,
                                        border: activeMode === 'profile' ? '1.5px solid #0284c7' : '1px solid transparent',
                                        background: activeMode === 'profile' ? '#eff6ff' : '#f8fafc',
                                        color: activeMode === 'profile' ? '#0284c7' : '#64748b',
                                        fontWeight: 900,
                                        fontSize: 12.5,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [_jsx(ShieldCheck, { size: 16 }), "Smart Pass & ID Dossier"]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => setActiveMode('documents'),
                                    style: {
                                        padding: '9px 18px',
                                        borderRadius: 12,
                                        border: activeMode === 'documents' ? '1.5px solid #0284c7' : '1px solid transparent',
                                        background: activeMode === 'documents' ? '#eff6ff' : '#f8fafc',
                                        color: activeMode === 'documents' ? '#0284c7' : '#64748b',
                                        fontWeight: 900,
                                        fontSize: 12.5,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [_jsx(FileText, { size: 16 }), "Student Document Vault"]
                                }),
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => setActiveMode('certificates'),
                                    style: {
                                        padding: '9px 18px',
                                        borderRadius: 12,
                                        border: activeMode === 'certificates' ? '1.5px solid #0284c7' : '1px solid transparent',
                                        background: activeMode === 'certificates' ? '#eff6ff' : '#f8fafc',
                                        color: activeMode === 'certificates' ? '#0284c7' : '#64748b',
                                        fontWeight: 900,
                                        fontSize: 12.5,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [_jsx(Award, { size: 16 }), "Verified Credentials"]
                                })
                            ]
                        }),

                        activeMode === 'profile' && (
                            _jsxs("div", {
                                style: { display: 'flex', gap: 10 },
                                children: [
                                    _jsxs("button", {
                                        type: "button",
                                        onClick: () => window.print(),
                                        style: { padding: '8px 16px', borderRadius: 10, border: '1.5px solid #cbd5e1', background: '#fff', color: '#334155', fontWeight: 800, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 },
                                        children: [_jsx(Printer, { size: 14 }), "Print Smart Pass"]
                                    }),
                                    _jsxs("button", {
                                        type: "button",
                                        onClick: () => setShowEditModal(true),
                                        style: { padding: '8px 18px', borderRadius: 10, border: 'none', background: '#0284c7', color: '#fff', fontWeight: 900, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 },
                                        children: [_jsx(Edit3, { size: 14 }), "Edit Bio Data"]
                                    })
                                ]
                            })
                        )
                    ]
                }),

                // ── SMART PASS / ID DOSSIER VIEW ──
                activeMode === 'profile' && (
                    _jsxs("div", {
                        style: { display: 'grid', gridTemplateColumns: '460px 1fr', gap: 22, alignItems: 'start' },
                        children: [
                            // Left: Holographic Smart Pass Card
                            _jsxs("div", {
                                style: {
                                    background: 'linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #0052cc 100%)',
                                    borderRadius: 24,
                                    padding: '28px 24px',
                                    color: '#ffffff',
                                    boxShadow: '0 20px 40px rgba(11, 19, 43, 0.3)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 20,
                                    position: 'relative',
                                    overflow: 'hidden'
                                },
                                children: [
                                    _jsxs("div", {
                                        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
                                        children: [
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("div", { style: { fontSize: 11, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: '#38bdf8' }, children: "Sri Ramakrishna Eng. College" }),
                                                    _jsx("div", { style: { fontSize: 9.5, opacity: 0.75, textTransform: 'uppercase', marginTop: 2 }, children: "Autonomous • Dept of EEE" })
                                                ]
                                            }),
                                            _jsxs("span", {
                                                style: { fontSize: 9.5, fontWeight: 900, background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(56, 189, 248, 0.4)' },
                                                children: ["SMART PASS 2026"]
                                            })
                                        ]
                                    }),

                                    _jsxs("div", {
                                        style: { display: 'flex', alignItems: 'center', gap: 18 },
                                        children: [
                                            _jsx("div", {
                                                style: {
                                                    width: 72,
                                                    height: 72,
                                                    borderRadius: 20,
                                                    background: 'linear-gradient(135deg, #ff5f1f 0%, #ea580c 100%)',
                                                    color: '#ffffff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: 30,
                                                    fontWeight: 950,
                                                    border: '3px solid rgba(255,255,255,0.4)',
                                                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                                                },
                                                children: student?.name ? student.name.charAt(0) : 'N'
                                            }),
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("h3", { style: { margin: 0, fontSize: 18, fontWeight: 950 }, children: student?.name || 'Nithin Annamalai R' }),
                                                    _jsxs("div", { style: { fontSize: 12, color: '#93c5fd', marginTop: 4, fontWeight: 800 }, children: ["Roll: ", student?.rollNo || '71812503104'] }),
                                                    _jsxs("div", { style: { fontSize: 11, opacity: 0.8, marginTop: 2 }, children: [student?.className || 'II EEE-B', " • ", student?.department || 'Dept of EEE'] })
                                                ]
                                            })
                                        ]
                                    }),

                                    _jsxs("div", {
                                        style: { background: 'rgba(255,255,255,0.1)', padding: '14px 16px', borderRadius: 16, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, fontSize: 11.5 },
                                        children: [
                                            _jsxs("div", { children: [_jsx("span", { style: { opacity: 0.7, display: 'block' }, children: "Academic Year" }), _jsx("strong", { children: student?.yearOfStudy || '2nd Year' })] }),
                                            _jsxs("div", { children: [_jsx("span", { style: { opacity: 0.7, display: 'block' }, children: "Semester" }), _jsx("strong", { children: student?.semester || 'Semester IV' })] }),
                                            _jsxs("div", { children: [_jsx("span", { style: { opacity: 0.7, display: 'block' }, children: "Blood Group" }), _jsx("strong", { style: { color: '#fca5a5' }, children: student?.bloodGroup || 'O+' })] }),
                                            _jsxs("div", { children: [_jsx("span", { style: { opacity: 0.7, display: 'block' }, children: "Student Phone" }), _jsx("strong", { children: student?.phone || '+91 98421 55678' })] })
                                        ]
                                    }),

                                    _jsxs("div", {
                                        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.15)' },
                                        children: [
                                            _jsx("div", { style: { fontSize: 10, opacity: 0.75 }, children: "Verified Digital Student ID • Anna University" }),
                                            _jsx(QrCode, { size: 36, style: { opacity: 0.9 } })
                                        ]
                                    })
                                ]
                            }),

                            // Right: Extended Institutional Bio Dossier
                            _jsxs("div", {
                                style: { background: '#ffffff', borderRadius: 24, padding: '26px 28px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: 18 },
                                children: [
                                    _jsxs("h4", { style: { margin: 0, fontSize: 15, fontWeight: 950, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }, children: [
                                        _jsx(User, { size: 18, color: "#0284c7" }),
                                        "Institutional Guardian & Demographic Records"
                                    ] }),
                                    _jsxs("div", {
                                        style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 },
                                        children: [
                                            _jsxs("div", { style: { background: '#f8fafc', padding: 14, borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Father / Guardian" }),
                                                _jsx("div", { style: { fontSize: 13.5, fontWeight: 900, color: '#0f172a', marginTop: 4 }, children: student?.parentName || 'R. Annamalai' })
                                            ] }),
                                            _jsxs("div", { style: { background: '#f8fafc', padding: 14, borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Parent Phone" }),
                                                _jsx("div", { style: { fontSize: 13.5, fontWeight: 900, color: '#0f172a', marginTop: 4 }, children: student?.parentPhone || '+91 94432 11223' })
                                            ] }),
                                            _jsxs("div", { style: { gridColumn: 'span 2', background: '#f8fafc', padding: 14, borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Permanent Residential Address" }),
                                                _jsx("div", { style: { fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 4 }, children: student?.address || 'Coimbatore, Tamil Nadu, India' })
                                            ] }),
                                            _jsxs("div", { style: { background: '#f8fafc', padding: 14, borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Institutional Email" }),
                                                _jsx("div", { style: { fontSize: 13, fontWeight: 700, color: '#0284c7', marginTop: 4 }, children: student?.email || currentEmail })
                                            ] }),
                                            _jsxs("div", { style: { background: '#f8fafc', padding: 14, borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Date of Birth" }),
                                                _jsx("div", { style: { fontSize: 13, fontWeight: 800, color: '#0f172a', marginTop: 4 }, children: student?.dob || '14 May 2004' })
                                            ] })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ),

                // ── DOCUMENT VAULT & VERIFIED CREDENTIALS VIEW ──
                (activeMode === 'documents' || activeMode === 'certificates') && (
                    _jsxs("div", {
                        style: { display: 'grid', gridTemplateColumns: '360px 1fr', gap: 22, alignItems: 'start' },
                        children: [
                            // Upload Box
                            _jsxs("div", {
                                style: { background: '#ffffff', borderRadius: 22, padding: '24px 22px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: 14 },
                                children: [
                                    _jsxs("h4", { style: { margin: 0, fontSize: 15, fontWeight: 950, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }, children: [
                                        _jsx(Upload, { size: 16, color: "#0284c7" }),
                                        "Secure File Upload"
                                    ] }),
                                    _jsxs("div", {
                                        children: [
                                            _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Document Category" }),
                                            _jsx("select", {
                                                value: selectedCategory,
                                                onChange: e => setSelectedCategory(e.target.value),
                                                style: { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 12, fontWeight: 700, background: '#f8fafc', boxSizing: 'border-box' },
                                                children: CERT_CATEGORY_CONFIG.map(c => (
                                                    _jsxs("option", { value: c.label, children: [c.icon, " ", c.label] }, c.label)
                                                ))
                                            })
                                        ]
                                    }),
                                    _jsxs("div", {
                                        children: [
                                            _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Custom Document Label" }),
                                            _jsx("input", {
                                                type: "text",
                                                value: customDocName,
                                                onChange: e => setCustomDocName(e.target.value),
                                                placeholder: "e.g. NPTEL Electric Vehicles Certificate",
                                                style: { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 12, boxSizing: 'border-box' }
                                            })
                                        ]
                                    }),
                                    _jsxs("label", {
                                        style: {
                                            padding: '16px',
                                            borderRadius: 14,
                                            border: '2px dashed #0284c7',
                                            background: '#eff6ff',
                                            color: '#0284c7',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 8,
                                            cursor: 'pointer',
                                            marginTop: 6
                                        },
                                        children: [
                                            _jsx(Upload, { size: 24 }),
                                            _jsx("span", { style: { fontSize: 12.5, fontWeight: 800 }, children: uploading ? "Encrypting & Uploading..." : "Choose PDF / Image File" }),
                                            _jsx("span", { style: { fontSize: 10.5, color: '#64748b' }, children: "PDF, PNG, JPG up to 10MB" }),
                                            _jsx("input", { type: "file", onChange: handleFileUpload, style: { display: 'none' } })
                                        ]
                                    })
                                ]
                            }),

                            // Documents List
                            _jsxs("div", {
                                style: { background: '#ffffff', borderRadius: 22, padding: '24px 26px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
                                children: [
                                    _jsxs("div", {
                                        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #f1f5f9' },
                                        children: [
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("h3", { style: { margin: 0, fontSize: 16, fontWeight: 950, color: '#0f172a' }, children: "Stored Credentials & Certified Documents" }),
                                                    _jsx("span", { style: { fontSize: 12, color: '#64748b', fontWeight: 600 }, children: "Instant encrypted access to marksheets and certificates" })
                                                ]
                                            }),
                                            _jsxs("span", { style: { fontSize: 11.5, fontWeight: 900, background: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: 8 }, children: [docs.length, " Stored Files"] })
                                        ]
                                    }),

                                    docs.length === 0 ? (
                                        _jsxs("div", {
                                            style: { padding: '40px 20px', textAlign: 'center', color: '#94a3b8' },
                                            children: [
                                                _jsx(FileText, { size: 40, style: { opacity: 0.3, margin: '0 auto 10px' } }),
                                                _jsx("p", { style: { margin: 0, fontSize: 13, fontWeight: 700 }, children: "No documents stored in vault yet. Upload your first document above!" })
                                            ]
                                        })
                                    ) : (
                                        _jsx("div", {
                                            style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 },
                                            children: docs.map(doc => (
                                                _jsxs("div", {
                                                    style: {
                                                        background: '#f8fafc',
                                                        borderRadius: 16,
                                                        padding: '16px',
                                                        border: '1.5px solid #e2e8f0',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        gap: 12
                                                    },
                                                    children: [
                                                        _jsxs("div", {
                                                            style: { display: 'flex', alignItems: 'flex-start', gap: 10 },
                                                            children: [
                                                                _jsx("div", {
                                                                    style: { width: 36, height: 36, borderRadius: 10, background: '#eff6ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
                                                                    children: _jsx(FileText, { size: 18 })
                                                                }),
                                                                _jsxs("div", {
                                                                    style: { minWidth: 0, flex: 1 },
                                                                    children: [
                                                                        _jsx("div", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: doc.name }),
                                                                        _jsxs("div", { style: { fontSize: 10.5, color: '#64748b', marginTop: 2 }, children: [doc.category, " • ", doc.size] })
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        _jsxs("div", {
                                                            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid #e2e8f0' },
                                                            children: [
                                                                _jsx("span", { style: { fontSize: 10, color: '#94a3b8' }, children: doc.uploadedAt }),
                                                                _jsxs("div", {
                                                                    style: { display: 'flex', gap: 6 },
                                                                    children: [
                                                                        doc.dataUrl && (
                                                                            _jsx("a", {
                                                                                href: doc.dataUrl,
                                                                                download: doc.name,
                                                                                style: { padding: '4px 8px', borderRadius: 6, background: '#0284c7', color: '#fff', fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 },
                                                                                children: [_jsx(Download, { size: 12 }), "Get"]
                                                                            })
                                                                        ),
                                                                        _jsx("button", {
                                                                            onClick: () => handleDeleteDoc(doc.id),
                                                                            style: { padding: '4px 8px', borderRadius: 6, background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', cursor: 'pointer' },
                                                                            children: _jsx(Trash2, { size: 12 })
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }, doc.id)
                                            ))
                                        })
                                    )
                                ]
                            })
                        ]
                    })
                ),

                // Edit Bio Modal
                showEditModal && (
                    _jsx("div", {
                        style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
                        children: _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 20, padding: 24, maxWidth: 480, width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' },
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
                                    children: [
                                        _jsx("h3", { style: { margin: 0, fontSize: 16, fontWeight: 950 }, children: "Edit Student Bio Information" }),
                                        _jsx("button", { onClick: () => setShowEditModal(false), style: { background: 'none', border: 'none', cursor: 'pointer' }, children: _jsx(X, { size: 18 }) })
                                    ]
                                }),
                                _jsxs("form", {
                                    onSubmit: handleSaveBio,
                                    style: { display: 'flex', flexDirection: 'column', gap: 12 },
                                    children: [
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Full Name" }),
                                                _jsx("input", { type: "text", value: editName, onChange: e => setEditName(e.target.value), style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Phone Number" }),
                                                _jsx("input", { type: "text", value: editPhone, onChange: e => setEditPhone(e.target.value), style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Blood Group" }),
                                                _jsx("input", { type: "text", value: editBlood, onChange: e => setEditBlood(e.target.value), style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Residential Address" }),
                                                _jsx("textarea", { value: editAddress, onChange: e => setEditAddress(e.target.value), rows: 3, style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box', fontFamily: 'inherit' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'flex', gap: 8, marginTop: 10 },
                                            children: [
                                                _jsx("button", { type: "submit", style: { flex: 1, padding: '10px', borderRadius: 10, background: '#0284c7', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer' }, children: "Save Changes" }),
                                                _jsx("button", { type: "button", onClick: () => setShowEditModal(false), style: { padding: '10px 16px', borderRadius: 10, background: '#f8fafc', color: '#475569', fontWeight: 700, border: '1px solid #cbd5e1', cursor: 'pointer' }, children: "Cancel" })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                )
            ]
        })
    );
};
