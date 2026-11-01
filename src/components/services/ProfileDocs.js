import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { dbService } from '../../services/db';
import { 
    ArrowLeft, Upload, Download, Trash2, Search, UserCheck, Plus, X, User, 
    Phone, Calendar, Droplets, MapPin, BookOpen, Hash, Layers, CheckCircle, 
    Edit3, Award, FileText, Sparkles, CheckCircle2, ChevronDown, QrCode, 
    Copy, Check, Printer, Shield, ExternalLink, GraduationCap, ShieldCheck
} from 'lucide-react';
const CERT_CATEGORY_CONFIG = [
    { label: 'NPTEL & Swayam Certifications', icon: '🎓', color: '#0052cc', bg: '#eff6ff' },
    { label: 'Internship & Industry Training', icon: '💼', color: '#059669', bg: '#ecfdf5' },
    { label: 'Workshops & Seminars', icon: '🛠️', color: '#d97706', bg: '#fffbeb' },
    { label: 'Sports & Co-Curricular', icon: '🏆', color: '#dc2626', bg: '#fef2f2' },
    { label: 'Academic Degrees & Marksheets', icon: '📜', color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'Other Certificates', icon: '📑', color: '#475569', bg: '#f8fafc' },
];
const CERT_CATEGORIES = CERT_CATEGORY_CONFIG.map(c => c.label);
const DOC_CATEGORIES = [
    'Academic Marksheets',
    'Identity Proofs (Aadhar, ID, etc.)',
    'Resumes & CVs',
    'Recommendation & Permission Letters',
    'General Documents'
];
export const ProfileDocs = ({ currentEmail, isAdmin, onBack, mode = 'documents', currentUser, onUpdateUser }) => {
    const [student, setStudent] = useState(null);
    const [docs, setDocs] = useState([]);
    // Admin states
    const [allStudents, setAllStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudentEmail, setSelectedStudentEmail] = useState(null);
    // Add student modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [addName, setAddName] = useState('');
    const [addRollNo, setAddRollNo] = useState('');
    const [addEmail, setAddEmail] = useState('');
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [customDocName, setCustomDocName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    // ── Profile Edit States ──────────────────────────────
    const [profileName, setProfileName] = useState('');
    const [profileRollNo, setProfileRollNo] = useState('');
    const [profileClass, setProfileClass] = useState('');
    const [profileYear, setProfileYear] = useState('');
    const [profileSem, setProfileSem] = useState('');
    const [profileDept, setProfileDept] = useState('');
    const [profilePhone, setProfilePhone] = useState('');
    const [profileDob, setProfileDob] = useState('');
    const [profileBlood, setProfileBlood] = useState('');
    const [profileAddress, setProfileAddress] = useState('');
    const [profileParentName, setProfileParentName] = useState('');
    const [profileParentPhone, setProfileParentPhone] = useState('');
    const [showEditBioModal, setShowEditBioModal] = useState(false);
    const [activeProfileTab, setActiveProfileTab] = useState('pass');
    const [copiedRoll, setCopiedRoll] = useState(false);
    // Populate profile fields from currentUser
    useEffect(() => {
        if (mode === 'profile' && currentUser) {
            setProfileName(currentUser.name || '');
            setProfileRollNo(currentUser.rollNo || '');
            setProfileClass(currentUser.className || '');
            setProfileYear(currentUser.yearOfStudy || '');
            setProfileSem(currentUser.semester || '');
            setProfileDept(currentUser.department || '');
            setProfilePhone(currentUser.phone || '');
            setProfileDob(currentUser.dob || '');
            setProfileBlood(currentUser.bloodGroup || '');
            setProfileAddress(currentUser.address || '');
            setProfileParentName(currentUser.parentName || '');
            setProfileParentPhone(currentUser.parentPhone || '');
        }
    }, [mode, currentUser]);
    // Load student data
    useEffect(() => {
        if (mode !== 'profile')
            loadData();
    }, [currentEmail, selectedStudentEmail, isAdmin, mode]);
    const loadData = async () => {
        if (isAdmin) {
            const list = await dbService.fetchAllStudents();
            setAllStudents(list);
            if (selectedStudentEmail) {
                const p = await dbService.getStudentProfile(selectedStudentEmail);
                if (p) {
                    setStudent(p);
                    const d = await dbService.getStudentDocuments(p.email);
                    setDocs(d);
                }
            }
            else {
                setStudent(null);
                setDocs([]);
            }
        }
        else {
            const p = await dbService.getStudentProfile(currentEmail);
            if (p) {
                setStudent(p);
                const d = await dbService.getStudentDocuments(p.email);
                setDocs(d);
            }
            else {
                const fallbackStudent = {
                    id: currentEmail || 'student@eee.com',
                    rollNo: '71812503104',
                    name: 'Nithin Annamalai',
                    email: currentEmail || 'student@eee.com',
                    cgpa: {
                        1: { internal1: 85, internal2: 88, semMarks: 86, gpa: 8.5 },
                        2: { internal1: 82, internal2: 84, semMarks: 83, gpa: 8.3 },
                        3: { internal1: 86, internal2: 87, semMarks: 86, gpa: 8.6 },
                        4: { internal1: 88, internal2: 90, semMarks: 87, gpa: 8.7 },
                        5: { internal1: 84, internal2: 85, semMarks: 84, gpa: 8.4 },
                        6: { internal1: 85, internal2: 86, semMarks: 85, gpa: 8.5 }
                    },
                    arrears: 0,
                    nptelExams: [],
                    documents: []
                };
                setStudent(fallbackStudent);
                const d = await dbService.getStudentDocuments(fallbackStudent.email);
                setDocs(d);
            }
        }
    };
    // ── Save Profile Handler ─────────────────────────────
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const updated = {
                ...currentUser,
                name: profileName.trim() || currentUser?.name || '',
                rollNo: profileRollNo.trim() || currentUser?.rollNo || '',
                className: profileClass.trim(),
                yearOfStudy: profileYear.trim(),
                semester: profileSem.trim(),
                department: profileDept.trim(),
                phone: profilePhone.trim(),
                dob: profileDob.trim(),
                bloodGroup: profileBlood.trim(),
                address: profileAddress.trim(),
                parentName: profileParentName.trim(),
                parentPhone: profileParentPhone.trim(),
            };
            onUpdateUser?.(updated);
            // Persist to localStorage so it survives refresh
            localStorage.setItem('eee_profile_extra_' + (currentUser?.email || 'student'), JSON.stringify(updated));
        }
        finally {
            setSaving(false);
        }
    };
    const handleAddStudentSubmit = async (e) => {
        e.preventDefault();
        if (!addName.trim() || !addRollNo.trim() || !addEmail.trim())
            return;
        setSaving(true);
        setStatusMessage('');
        try {
            await dbService.createStudentProfile({
                id: addEmail.trim().toLowerCase(),
                rollNo: addRollNo.trim(),
                name: addName.trim(),
                email: addEmail.trim().toLowerCase(),
                cgpa: {},
                arrears: 0,
                nptelExams: []
            });
            setStatusMessage('Student profile created successfully!');
            setTimeout(() => setStatusMessage(''), 3000);
            setAddName('');
            setAddRollNo('');
            setAddEmail('');
            setShowAddModal(false);
            loadData();
        }
        catch (err) {
            console.error(err);
            setStatusMessage(err.message || 'Error creating student profile.');
        }
        finally {
            setSaving(false);
        }
    };
    const autoRecognizeDocName = (fileName) => {
        const baseName = fileName.replace(/\.[^/.]+$/, '');
        let cleanName = baseName.replace(/[_\-\.]+/g, ' ');
        const toTitleCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        const lower = cleanName.toLowerCase();
        if (lower.includes('sem 1') || lower.includes('sem1') || lower.includes('semester 1'))
            return 'Semester I Marksheet';
        if (lower.includes('sem 2') || lower.includes('sem2') || lower.includes('semester 2'))
            return 'Semester II Marksheet';
        if (lower.includes('sem 3') || lower.includes('sem3') || lower.includes('semester 3'))
            return 'Semester III Marksheet';
        if (lower.includes('sem 4') || lower.includes('sem4') || lower.includes('semester 4'))
            return 'Semester IV Marksheet';
        if (lower.includes('sem 5') || lower.includes('sem5') || lower.includes('semester 5'))
            return 'Semester V Marksheet';
        if (lower.includes('sem 6') || lower.includes('sem6') || lower.includes('semester 6'))
            return 'Semester III Marksheet';
        if (lower.includes('sem 7') || lower.includes('sem7') || lower.includes('semester 7'))
            return 'Semester IIII Marksheet';
        if (lower.includes('sem 8') || lower.includes('sem8') || lower.includes('semester 8'))
            return 'Semester IIIII Marksheet';
        if (lower.includes('nptel') || lower.includes('swayam')) {
            if (lower.includes('python'))
                return 'NPTEL Python Programming Certificate';
            if (lower.includes('java'))
                return 'NPTEL Java Programming Certificate';
            if (lower.includes('iot'))
                return 'NPTEL Internet of Things Certificate';
            return 'NPTEL Certification';
        }
        if (lower.includes('bonafide'))
            return 'Bonafide Certificate';
        if (lower.includes('noc'))
            return 'No Objection Certificate (NOC)';
        if (lower.includes('internship') || lower.includes('training'))
            return 'Internship Certificate';
        if (lower.includes('resume') || lower.includes('cv'))
            return 'Student Resume';
        if (lower.includes('aadhar') || lower.includes('adhaar') || lower.includes('aadhaar'))
            return 'Aadhar Card / Identity Proof';
        return toTitleCase(cleanName);
    };
    const handleOpenUploadModal = () => {
        setCustomDocName('');
        setSelectedFile(null);
        setSelectedCategory(mode === 'certificates' ? CERT_CATEGORIES[0] : DOC_CATEGORIES[0]);
        setShowUploadModal(true);
    };
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file || (mode !== 'documents' && !student))
            return;
        if (file.type !== 'application/pdf') {
            setStatusMessage('Only PDF documents are supported.');
            return;
        }
        setSelectedFile(file);
        setCustomDocName(autoRecognizeDocName(file.name));
        e.target.value = '';
    };
    const handleActualUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile || !customDocName.trim())
            return;
        const targetEmail = mode === 'documents'
            ? (student?.email || currentEmail)
            : (student?.email || currentEmail);
        if (!targetEmail)
            return;
        setUploading(true);
        setStatusMessage('');
        const file = selectedFile;
        const docName = customDocName.trim();
        const category = selectedCategory;
        setSelectedFile(null);
        setShowUploadModal(false);
        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64Data = event.target?.result;
            const sizeKB = Math.round(file.size / 1024);
            try {
                let nameToSave;
                if (mode === 'documents') {
                    // Simple: just prefix DOC_ + name
                    const finalName = docName.toLowerCase().endsWith('.pdf') ? docName : `${docName}.pdf`;
                    nameToSave = 'DOC_' + finalName;
                }
                else {
                    const prefix = 'CERT_';
                    const finalName = docName.toLowerCase().endsWith('.pdf') ? docName : `${docName}.pdf`;
                    nameToSave = prefix + category + '::' + finalName;
                }
                await dbService.uploadDocument(targetEmail, {
                    name: nameToSave,
                    size: `${sizeKB} KB`,
                    type: file.type,
                    dataUrl: base64Data
                });
                setStatusMessage(mode === 'certificates' ? 'Certificate uploaded!' : 'Document uploaded!');
                setTimeout(() => setStatusMessage(''), 3000);
                loadData();
            }
            catch (err) {
                console.error(err);
                setStatusMessage('Error uploading file.');
            }
            finally {
                setUploading(false);
            }
        };
        reader.readAsDataURL(file);
    };
    const filteredDocs = docs.filter(doc => {
        if (mode === 'certificates')
            return doc.name.startsWith('CERT_');
        return doc.name.startsWith('DOC_') || (!doc.name.startsWith('CERT_') && !doc.name.startsWith('NPTEL_'));
    });
    const getDisplayName = (docName) => {
        let n = docName;
        if (n.startsWith('CERT_'))
            n = n.substring(5);
        else if (n.startsWith('DOC_'))
            n = n.substring(4);
        if (n.includes('::'))
            return n.split('::')[1].replace(/\.pdf$/i, '');
        return n.replace(/\.pdf$/i, '');
    };
    const getDocCategory = (docName) => {
        let n = docName;
        if (n.startsWith('CERT_'))
            n = n.substring(5);
        else if (n.startsWith('DOC_'))
            n = n.substring(4);
        if (n.includes('::'))
            return n.split('::')[0];
        return mode === 'certificates' ? 'Other Certificates' : 'General Documents';
    };
    const handleDeleteDoc = async (id) => {
        if (!student)
            return;
        if (!window.confirm('Delete this document?'))
            return;
        try {
            await dbService.deleteDocument(student.email, id);
            setStatusMessage('Document deleted.');
            setTimeout(() => setStatusMessage(''), 3000);
            loadData();
        }
        catch (err) {
            console.error(err);
            setStatusMessage('Error deleting document.');
        }
    };
    const downloadDoc = (doc) => {
        const link = document.createElement('a');
        link.href = doc.dataUrl;
        link.download = doc.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const filteredStudents = allStudents.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()));
    // ─────────────────────────────────────────────────────
    // ── MODE: PROFILE ────────────────────────────────────
    // ─────────────────────────────────────────────────────
    if (mode === 'profile') {
        const initials = (profileName || currentUser?.name || 'N').charAt(0).toUpperCase();
        const displayRoll = profileRollNo || currentUser?.rollNo || '71812503104';
        const displayName = profileName || currentUser?.name || 'Nithin Annamalai R';

        const copyRollNumber = () => {
            navigator.clipboard?.writeText(displayRoll);
            setCopiedRoll(true);
            setTimeout(() => setCopiedRoll(false), 2000);
        };

        const handlePrintPass = () => {
            window.print();
        };

        return (
            _jsxs("div", { 
                className: "dedicated-page-view page-slide-enter", 
                style: { background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)', minHeight: '100vh', paddingBottom: 88 }, 
                children: [
                    // Header Bar
                    _jsxs("div", { className: "dedicated-page-header", style: { background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }, children: [
                        _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12 }, children: [
                            _jsx("button", { className: "page-back-btn", onClick: onBack, title: "Go Back", children: _jsx(ArrowLeft, { size: 16 }) }),
                            _jsxs("div", { children: [
                                _jsxs("h2", { className: "dedicated-page-title", style: { margin: 0, fontSize: 16, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6, color: '#0f172a' }, children: [
                                    _jsx(ShieldCheck, { size: 18, style: { color: '#0052cc' } }),
                                    " Student Smart Dossier & ID Pass"
                                ] }),
                                _jsx("span", { style: { fontSize: 11, color: '#64748b', fontWeight: 700 }, children: "Sri Ramakrishna Engineering College \u00B7 Dept of EEE" })
                            ] })
                        ] }),
                        _jsxs("div", { style: { display: 'flex', gap: 8 }, children: [
                            _jsxs("button", { 
                                onClick: handlePrintPass, 
                                style: {
                                    padding: '7px 12px',
                                    borderRadius: 12,
                                    border: '1.5px solid #cbd5e1',
                                    background: '#ffffff',
                                    color: '#334155',
                                    fontSize: 11,
                                    fontWeight: 800,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 5,
                                    cursor: 'pointer'
                                }, 
                                children: [_jsx(Printer, { size: 13 }), " Print Pass"] 
                            }),
                            _jsxs("button", { 
                                onClick: () => setShowEditBioModal(true), 
                                style: {
                                    padding: '7px 14px',
                                    borderRadius: 12,
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #0052cc 0%, #2563eb 100%)',
                                    color: '#ffffff',
                                    fontSize: 11.5,
                                    fontWeight: 800,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 14px rgba(0,82,204,0.3)'
                                }, 
                                children: [_jsx(Edit3, { size: 13 }), " Edit Bio"] 
                            })
                        ] })
                    ] }),

                    // Main Container
                    _jsxs("div", { style: { padding: '18px 16px', maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }, children: [
                        
                        // ── LUXURY INTERACTIVE SUB-TABS ──
                        _jsxs("div", { 
                            className: "profile-subtabs-row",
                            style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: 6,
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(16px)',
                                padding: 5,
                                borderRadius: 16,
                                border: '1px solid rgba(0, 82, 204, 0.12)',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
                            },
                            children: [
                                _jsxs("button", {
                                    onClick: () => setActiveProfileTab('pass'),
                                    style: {
                                        padding: '9px 6px',
                                        borderRadius: 12,
                                        border: 'none',
                                        background: activeProfileTab === 'pass' ? 'linear-gradient(135deg, #0052cc 0%, #1e40af 100%)' : 'transparent',
                                        color: activeProfileTab === 'pass' ? '#ffffff' : '#64748b',
                                        fontSize: 11.5,
                                        fontWeight: 800,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 5,
                                        cursor: 'pointer',
                                        transition: 'all 0.25s ease',
                                        boxShadow: activeProfileTab === 'pass' ? '0 4px 12px rgba(0,82,204,0.3)' : 'none'
                                    },
                                    children: [_jsx(Shield, { size: 13 }), " Smart Pass"]
                                }),
                                _jsxs("button", {
                                    onClick: () => setActiveProfileTab('academic'),
                                    style: {
                                        padding: '9px 6px',
                                        borderRadius: 12,
                                        border: 'none',
                                        background: activeProfileTab === 'academic' ? 'linear-gradient(135deg, #0052cc 0%, #1e40af 100%)' : 'transparent',
                                        color: activeProfileTab === 'academic' ? '#ffffff' : '#64748b',
                                        fontSize: 11.5,
                                        fontWeight: 800,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 5,
                                        cursor: 'pointer',
                                        transition: 'all 0.25s ease',
                                        boxShadow: activeProfileTab === 'academic' ? '0 4px 12px rgba(0,82,204,0.3)' : 'none'
                                    },
                                    children: [_jsx(BookOpen, { size: 13 }), " Academic"]
                                }),
                                _jsxs("button", {
                                    onClick: () => setActiveProfileTab('personal'),
                                    style: {
                                        padding: '9px 6px',
                                        borderRadius: 12,
                                        border: 'none',
                                        background: activeProfileTab === 'personal' ? 'linear-gradient(135deg, #0052cc 0%, #1e40af 100%)' : 'transparent',
                                        color: activeProfileTab === 'personal' ? '#ffffff' : '#64748b',
                                        fontSize: 11.5,
                                        fontWeight: 800,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 5,
                                        cursor: 'pointer',
                                        transition: 'all 0.25s ease',
                                        boxShadow: activeProfileTab === 'personal' ? '0 4px 12px rgba(0,82,204,0.3)' : 'none'
                                    },
                                    children: [_jsx(User, { size: 13 }), " Personal"]
                                }),
                                _jsxs("button", {
                                    onClick: () => setActiveProfileTab('vault'),
                                    style: {
                                        padding: '9px 6px',
                                        borderRadius: 12,
                                        border: 'none',
                                        background: activeProfileTab === 'vault' ? 'linear-gradient(135deg, #0052cc 0%, #1e40af 100%)' : 'transparent',
                                        color: activeProfileTab === 'vault' ? '#ffffff' : '#64748b',
                                        fontSize: 11.5,
                                        fontWeight: 800,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 5,
                                        cursor: 'pointer',
                                        transition: 'all 0.25s ease',
                                        boxShadow: activeProfileTab === 'vault' ? '0 4px 12px rgba(0,82,204,0.3)' : 'none'
                                    },
                                    children: [_jsx(Award, { size: 13 }), " Vault"]
                                })
                            ]
                        }),

                        // ── TAB 1: SMART DIGITAL PASSPORT CARD ──
                        activeProfileTab === 'pass' && (
                            _jsxs("div", { 
                                style: { display: 'flex', flexDirection: 'column', gap: 16, animation: 'pageSlideUpFluid 0.35s cubic-bezier(0.16, 1, 0.3, 1)' },
                                children: [
                                    // The Holographic ID Card
                                    _jsxs("div", { 
                                        style: {
                                            background: 'linear-gradient(135deg, #0a0f1d 0%, #111e3b 40%, #1e3a8a 80%, #0369a1 100%)',
                                            borderRadius: 28,
                                            padding: '24px 22px',
                                            color: '#ffffff',
                                            boxShadow: '0 24px 50px rgba(10, 15, 29, 0.35), 0 0 0 1.5px rgba(255, 255, 255, 0.15)',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        },
                                        children: [
                                            // Shimmer light orb
                                            _jsx("div", { style: { position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)', pointerEvents: 'none' } }),
                                            _jsx("div", { style: { position: 'absolute', bottom: -40, left: -40, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, transparent 70%)', pointerEvents: 'none' } }),

                                            // Institutional Header
                                            _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.16)', paddingBottom: 14, marginBottom: 16 }, children: [
                                                _jsxs("div", { children: [
                                                    _jsx("span", { style: { fontSize: 10, fontWeight: 900, letterSpacing: 1.5, textTransform: 'uppercase', color: '#93c5fd', display: 'block' }, children: "Sri Ramakrishna Engineering College" }),
                                                    _jsx("h3", { style: { fontSize: 13, fontWeight: 900, margin: '2px 0 0 0', color: '#ffffff' }, children: "Department of Electrical & Electronics Engineering" }),
                                                    _jsx("span", { style: { fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }, children: "Autonomous \u00B7 Affiliated to Anna University \u00B7 ISO 9001:2015" })
                                                ] }),
                                                _jsx("span", { style: { padding: '4px 10px', borderRadius: 99, background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', fontSize: 10.5, fontWeight: 900, border: '1px solid rgba(56, 189, 248, 0.4)', textTransform: 'uppercase' }, children: "Student Smart Pass" })
                                            ] }),

                                            // Student Avatar & Details Grid
                                            _jsxs("div", { className: "smart-pass-avatar-grid", style: { display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 16, alignItems: 'center', marginBottom: 18 }, children: [
                                                // Avatar with Metallic Glow
                                                _jsxs("div", { style: { position: 'relative' }, children: [
                                                    _jsx("div", { 
                                                        style: {
                                                            width: 76,
                                                            height: 76,
                                                            borderRadius: '50%',
                                                            background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #db2777 100%)',
                                                            border: '3.5px solid #ffffff',
                                                            boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 20px rgba(245, 158, 11, 0.4)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: 30,
                                                            fontWeight: 900,
                                                            color: '#ffffff'
                                                        }, 
                                                        children: initials 
                                                    }),
                                                    _jsx("div", { style: { position: 'absolute', bottom: 3, right: 3, width: 16, height: 16, borderRadius: '50%', background: '#10b981', border: '2.5px solid #ffffff', boxShadow: '0 0 8px #10b981' } })
                                                ] }),

                                                // Name, Roll and Class
                                                _jsxs("div", { style: { minWidth: 0 }, children: [
                                                    _jsx("h2", { style: { fontSize: 21, fontWeight: 900, margin: '0 0 3px 0', letterSpacing: -0.4, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: displayName }),
                                                    _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: 4 }, children: [
                                                        _jsxs("button", { 
                                                            type: "button",
                                                            onClick: copyRollNumber,
                                                            style: {
                                                                padding: '3px 8px',
                                                                borderRadius: 8,
                                                                background: 'rgba(255,255,255,0.18)',
                                                                border: '1px solid rgba(255,255,255,0.25)',
                                                                fontSize: 11,
                                                                fontWeight: 800,
                                                                color: '#ffffff',
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: 5,
                                                                cursor: 'pointer'
                                                            },
                                                            children: [
                                                                "Roll: ", displayRoll, " ",
                                                                copiedRoll ? _jsx(Check, { size: 12, style: { color: '#4ade80' } }) : _jsx(Copy, { size: 12 })
                                                            ]
                                                        }),
                                                        _jsx("span", { style: { padding: '3px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.18)', fontSize: 11, fontWeight: 800, color: '#e0f2fe' }, children: profileClass || 'II EEE-B' })
                                                    ] }),
                                                    _jsx("p", { style: { margin: '6px 0 0 0', fontSize: 10.5, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }, children: "B.E. Electrical & Electronics \u00B7 Batch 2022\u20132026" })
                                                ] }),

                                                // Interactive QR Verification Badge
                                                _jsxs("div", { 
                                                    style: {
                                                        width: 64,
                                                        height: 64,
                                                        background: '#ffffff',
                                                        borderRadius: 12,
                                                        padding: 5,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                                                        position: 'relative',
                                                        overflow: 'hidden'
                                                    },
                                                    children: [
                                                        _jsx("div", { style: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(56, 189, 248, 0.4) 50%, transparent 60%)', animation: 'specularSweep 2s infinite' } }),
                                                        _jsx(QrCode, { size: 44, color: '#0f172a' }),
                                                        _jsx("span", { style: { fontSize: 7, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }, children: "VERIFIED" })
                                                    ]
                                                })
                                            ] }),

                                            // Security Micro Barcode & Metadata Strip
                                            _jsxs("div", { style: { borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: 'rgba(255,255,255,0.7)' }, children: [
                                                _jsxs("div", { children: [
                                                    _jsx("span", { style: { opacity: 0.7, display: 'block', fontSize: 8.5, textTransform: 'uppercase' }, children: "Security Token" }),
                                                    _jsx("span", { style: { fontFamily: 'monospace', fontWeight: 800, color: '#38bdf8', letterSpacing: 1 }, children: `*SREC-EEE-${displayRoll.slice(-4)}*` })
                                                ] }),
                                                _jsxs("div", { children: [
                                                    _jsx("span", { style: { opacity: 0.7, display: 'block', fontSize: 8.5, textTransform: 'uppercase' }, children: "Blood Group" }),
                                                    _jsx("strong", { style: { color: '#ffffff', fontWeight: 900 }, children: profileBlood || 'O+' })
                                                ] }),
                                                _jsxs("div", { children: [
                                                    _jsx("span", { style: { opacity: 0.7, display: 'block', fontSize: 8.5, textTransform: 'uppercase' }, children: "Pass Valid Thru" }),
                                                    _jsx("strong", { style: { color: '#ffffff', fontWeight: 900 }, children: "JUNE 2026" })
                                                ] })
                                            ] })
                                        ]
                                    }),

                                    // ── 4 LUXURY KPI STATS ──
                                    _jsxs("div", { className: "profile-kpi-grid", style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }, children: [
                                        _jsxs("div", { 
                                            style: {
                                                background: '#ffffff',
                                                borderRadius: 18,
                                                padding: '14px 10px',
                                                textAlign: 'center',
                                                border: '1.5px solid rgba(56, 189, 248, 0.25)',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                                            },
                                            children: [
                                                _jsx("span", { style: { fontSize: 9.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: 2 }, children: "Attendance" }),
                                                _jsx("strong", { style: { fontSize: 18, fontWeight: 900, color: '#0284c7' }, children: "94.5%" }),
                                                _jsx("span", { style: { fontSize: 9, color: '#16a34a', fontWeight: 800, display: 'block', marginTop: 2 }, children: "\u25CF Safe Zone" })
                                            ]
                                        }),
                                        _jsxs("div", { 
                                            style: {
                                                background: '#ffffff',
                                                borderRadius: 18,
                                                padding: '14px 10px',
                                                textAlign: 'center',
                                                border: '1.5px solid rgba(74, 222, 128, 0.25)',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                                            },
                                            children: [
                                                _jsx("span", { style: { fontSize: 9.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: 2 }, children: "CGPA" }),
                                                _jsx("strong", { style: { fontSize: 18, fontWeight: 900, color: '#16a34a' }, children: "8.75" }),
                                                _jsx("span", { style: { fontSize: 9, color: '#059669', fontWeight: 800, display: 'block', marginTop: 2 }, children: "Distinction" })
                                            ]
                                        }),
                                        _jsxs("div", { 
                                            style: {
                                                background: '#ffffff',
                                                borderRadius: 18,
                                                padding: '14px 10px',
                                                textAlign: 'center',
                                                border: '1.5px solid rgba(251, 191, 36, 0.25)',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                                            },
                                            children: [
                                                _jsx("span", { style: { fontSize: 9.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: 2 }, children: "Credits" }),
                                                _jsx("strong", { style: { fontSize: 18, fontWeight: 900, color: '#d97706' }, children: "118/160" }),
                                                _jsx("span", { style: { fontSize: 9, color: '#b45309', fontWeight: 800, display: 'block', marginTop: 2 }, children: "73.7% Done" })
                                            ]
                                        }),
                                        _jsxs("div", { 
                                            style: {
                                                background: '#ffffff',
                                                borderRadius: 18,
                                                padding: '14px 10px',
                                                textAlign: 'center',
                                                border: '1.5px solid rgba(99, 102, 241, 0.25)',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                                            },
                                            children: [
                                                _jsx("span", { style: { fontSize: 9.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: 2 }, children: "Arrears" }),
                                                _jsx("strong", { style: { fontSize: 18, fontWeight: 900, color: '#4f46e5' }, children: "0 Clear" }),
                                                _jsx("span", { style: { fontSize: 9, color: '#16a34a', fontWeight: 800, display: 'block', marginTop: 2 }, children: "All Cleared" })
                                            ]
                                        })
                                    ] }),

                                    // Quick Access Action Bar
                                    _jsxs("div", { 
                                        style: {
                                            background: '#ffffff',
                                            borderRadius: 20,
                                            padding: '16px 20px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            border: '1px solid rgba(0,82,204,0.1)',
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                                        },
                                        children: [
                                            _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: [
                                                _jsx("div", { style: { width: 36, height: 36, borderRadius: 10, background: 'rgba(0,82,204,0.1)', color: '#0052cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(Award, { size: 18 }) }),
                                                _jsxs("div", { children: [
                                                    _jsx("h4", { style: { margin: 0, fontSize: 13, fontWeight: 800, color: '#0f172a' }, children: "Certified Document Vault" }),
                                                    _jsx("p", { style: { margin: 0, fontSize: 11, color: '#64748b' }, children: "View uploaded marksheets, NPTEL and workshop certs" })
                                                ] })
                                            ] }),
                                            _jsxs("button", {
                                                onClick: () => setActiveProfileTab('vault'),
                                                style: {
                                                    padding: '8px 14px',
                                                    borderRadius: 12,
                                                    border: '1.5px solid #0052cc',
                                                    background: 'transparent',
                                                    color: '#0052cc',
                                                    fontSize: 11.5,
                                                    fontWeight: 800,
                                                    cursor: 'pointer'
                                                },
                                                children: ["Open Vault \u2192"]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ),

                        // ── TAB 2: ACADEMIC DOSSIER BENTO ──
                        activeProfileTab === 'academic' && (
                            _jsxs("div", { 
                                style: { display: 'flex', flexDirection: 'column', gap: 14, animation: 'pageSlideUpFluid 0.35s cubic-bezier(0.16, 1, 0.3, 1)' },
                                children: [
                                    _jsxs("div", { style: { background: '#ffffff', borderRadius: 24, padding: 22, border: '1.5px solid rgba(0,82,204,0.12)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }, children: [
                                        _jsxs("h4", { style: { margin: '0 0 16px 0', fontSize: 14, fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }, children: [
                                            _jsx(GraduationCap, { size: 18, color: "#0052cc" }),
                                            " Autonomous Degree Enrollment"
                                        ] }),
                                        _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }, children: [
                                            _jsxs("div", { style: { background: '#f8fafc', padding: '12px 14px', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "Degree & Branch" }),
                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a' }, children: "B.E. Electrical & Electronics" })
                                            ] }),
                                            _jsxs("div", { style: { background: '#f8fafc', padding: '12px 14px', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "Curriculum Regulation" }),
                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a' }, children: "Regulation 2022 (CBCS)" })
                                            ] }),
                                            _jsxs("div", { style: { background: '#f8fafc', padding: '12px 14px', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "Class & Section" }),
                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a' }, children: profileClass || 'II EEE-B' })
                                            ] }),
                                            _jsxs("div", { style: { background: '#f8fafc', padding: '12px 14px', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "Current Semester" }),
                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a' }, children: profileSem || 'Semester III' })
                                            ] }),
                                            _jsxs("div", { style: { background: '#f8fafc', padding: '12px 14px', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "Faculty Tutor / Mentor" }),
                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#0052cc' }, children: "Dr. S. Kavitha (Assoc. Prof)" })
                                            ] }),
                                            _jsxs("div", { style: { background: '#f8fafc', padding: '12px 14px', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "Department Head (HoD)" }),
                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#ea580c' }, children: "Dr. M. Ezhilarasi (Prof & HoD)" })
                                            ] }),
                                            _jsxs("div", { style: { background: '#f8fafc', padding: '12px 14px', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "Practical Laboratory Batch" }),
                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a' }, children: "Batch B1 (Circuits & Machines Lab)" })
                                            ] }),
                                            _jsxs("div", { style: { background: '#f8fafc', padding: '12px 14px', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "NPTEL Swayam Certifications" }),
                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#16a34a' }, children: "2 Active Courses Enrolled" })
                                            ] })
                                        ] })
                                    ] })
                                ]
                            })
                        ),

                        // ── TAB 3: PERSONAL & GUARDIAN BENTO ──
                        activeProfileTab === 'personal' && (
                            _jsxs("div", { 
                                style: { display: 'flex', flexDirection: 'column', gap: 14, animation: 'pageSlideUpFluid 0.35s cubic-bezier(0.16, 1, 0.3, 1)' },
                                children: [
                                    _jsxs("div", { style: { background: '#ffffff', borderRadius: 24, padding: 22, border: '1.5px solid rgba(0,82,204,0.12)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }, children: [
                                        _jsxs("h4", { style: { margin: '0 0 16px 0', fontSize: 14, fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }, children: [
                                            _jsx(User, { size: 18, color: "#059669" }),
                                            " Contact & Biometric Information"
                                        ] }),
                                        _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 11 }, children: [
                                            _jsxs("div", { style: { background: '#f8fafc', padding: '12px 16px', borderRadius: 14, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [
                                                _jsx("span", { style: { fontSize: 11, color: '#64748b', fontWeight: 800 }, children: "Institutional Email" }),
                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#0052cc' }, children: currentUser?.email || currentEmail || 'nithin@srec.ac.in' })
                                            ] }),
                                            _jsxs("div", { style: { background: '#f8fafc', padding: '12px 16px', borderRadius: 14, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [
                                                _jsx("span", { style: { fontSize: 11, color: '#64748b', fontWeight: 800 }, children: "Personal Mobile Phone" }),
                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a' }, children: profilePhone || '+91 98421 55678' })
                                            ] }),
                                            _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }, children: [
                                                _jsxs("div", { style: { background: '#f8fafc', padding: '12px 14px', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                    _jsx("span", { style: { fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "Blood Group" }),
                                                    _jsx("span", { style: { fontSize: 14, fontWeight: 900, color: '#dc2626' }, children: profileBlood || 'O+' })
                                                ] }),
                                                _jsxs("div", { style: { background: '#f8fafc', padding: '12px 14px', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                    _jsx("span", { style: { fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "Date of Birth" }),
                                                    _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#0f172a' }, children: profileDob || '14-07-2004' })
                                                ] })
                                            ] }),
                                            _jsxs("div", { style: { background: '#f8fafc', padding: '12px 14px', borderRadius: 14, border: '1px solid #e2e8f0' }, children: [
                                                _jsx("span", { style: { fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "Permanent Residential Address" }),
                                                _jsx("span", { style: { fontSize: 12.5, fontWeight: 800, color: '#0f172a' }, children: profileAddress || '12, Anna Nagar, Avinashi Road, Peelamedu, Coimbatore - 641004' })
                                            ] })
                                        ] })
                                    ] }),

                                    // Guardian Details Box
                                    _jsxs("div", { style: { background: '#ffffff', borderRadius: 24, padding: 22, border: '1.5px solid rgba(234, 88, 12, 0.2)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }, children: [
                                        _jsxs("h4", { style: { margin: '0 0 16px 0', fontSize: 14, fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }, children: [
                                            _jsx(Phone, { size: 18, color: "#d97706" }),
                                            " Parent / Guardian Emergency Contact"
                                        ] }),
                                        _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }, children: [
                                            _jsxs("div", { style: { background: '#fffbeb', padding: '12px 14px', borderRadius: 14, border: '1px solid #fde68a' }, children: [
                                                _jsx("span", { style: { fontSize: 10, color: '#92400e', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "Guardian Name" }),
                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#78350f' }, children: profileParentName || 'Annamalai K' })
                                            ] }),
                                            _jsxs("div", { style: { background: '#fffbeb', padding: '12px 14px', borderRadius: 14, border: '1px solid #fde68a' }, children: [
                                                _jsx("span", { style: { fontSize: 10, color: '#92400e', fontWeight: 800, textTransform: 'uppercase', display: 'block' }, children: "Emergency Contact" }),
                                                _jsx("span", { style: { fontSize: 13, fontWeight: 900, color: '#78350f' }, children: profileParentPhone || '+91 94432 11223' })
                                            ] })
                                        ] })
                                    ] })
                                ]
                            })
                        ),

                        // ── TAB 4: VAULT SHORTCUT & CERTIFICATES ──
                        activeProfileTab === 'vault' && (
                            _jsxs("div", { 
                                style: { display: 'flex', flexDirection: 'column', gap: 14, animation: 'pageSlideUpFluid 0.35s cubic-bezier(0.16, 1, 0.3, 1)' },
                                children: [
                                    _jsxs("div", { style: { background: '#ffffff', borderRadius: 24, padding: 22, border: '1.5px solid rgba(0,82,204,0.12)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }, children: [
                                        _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, children: [
                                            _jsxs("div", { children: [
                                                _jsx("h4", { style: { fontSize: 15, fontWeight: 900, color: '#0f172a', margin: 0 }, children: "Stored Academic & Skill Credentials" }),
                                                _jsx("p", { style: { fontSize: 11, color: '#64748b', margin: '2px 0 0 0' }, children: "Verified PDF proofs secured in institutional database" })
                                            ] }),
                                            _jsxs("button", { 
                                                onClick: handleOpenUploadModal, 
                                                style: {
                                                    padding: '7px 12px',
                                                    borderRadius: 12,
                                                    border: 'none',
                                                    background: '#0052cc',
                                                    color: '#ffffff',
                                                    fontSize: 11.5,
                                                    fontWeight: 800,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 5,
                                                    cursor: 'pointer'
                                                },
                                                children: [_jsx(Plus, { size: 14 }), " Upload New"]
                                            })
                                        ] }),

                                        docs.length === 0 ? (
                                            _jsxs("div", { style: { textAlign: 'center', padding: '36px 16px', background: '#f8fafc', borderRadius: 16, border: '1.5px dashed #cbd5e1' }, children: [
                                                _jsx(Award, { size: 36, color: "#94a3b8", style: { margin: '0 auto 8px' } }),
                                                _jsx("p", { style: { fontSize: 13, fontWeight: 800, color: '#475569', margin: 0 }, children: "No certificates uploaded yet" }),
                                                _jsx("span", { style: { fontSize: 11, color: '#94a3b8' }, children: "Upload your NPTEL, symposium or marksheet PDFs" })
                                            ] })
                                        ) : (
                                            _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: docs.map(doc => (
                                                _jsxs("div", { 
                                                    key: doc.id,
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: '12px 14px',
                                                        background: '#f8fafc',
                                                        borderRadius: 14,
                                                        border: '1px solid #e2e8f0'
                                                    },
                                                    children: [
                                                        _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: [
                                                            _jsx("div", { style: { width: 32, height: 32, borderRadius: 8, background: '#eff6ff', color: '#0052cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(FileText, { size: 16 }) }),
                                                            _jsxs("div", { children: [
                                                                _jsx("span", { style: { fontSize: 12.5, fontWeight: 800, color: '#0f172a', display: 'block' }, children: getDisplayName(doc.name) }),
                                                                _jsxs("span", { style: { fontSize: 10, color: '#64748b' }, children: [doc.size, " \u00B7 ", doc.uploadedAt] })
                                                            ] })
                                                        ] }),
                                                        _jsxs("div", { style: { display: 'flex', gap: 6 }, children: [
                                                            _jsx("button", { onClick: () => downloadDoc(doc), className: "doc-action-btn", title: "Download", children: _jsx(Download, { size: 14 }) }),
                                                            _jsx("button", { onClick: () => handleDeleteDoc(doc.id), className: "doc-action-btn delete", title: "Delete", children: _jsx(Trash2, { size: 14 }) })
                                                        ] })
                                                    ]
                                                })
                                            )) })
                                        )
                                    ] })
                                ]
                            })
                        )
                    ] }),

                    // Edit Profile Bio Modal
                    showEditBioModal && createPortal(
                        _jsx("div", { 
                            style: {
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                width: '100vw',
                                height: '100vh',
                                background: 'rgba(15, 23, 42, 0.7)',
                                backdropFilter: 'blur(10px)',
                                zIndex: 999999,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '16px'
                            }, 
                            onClick: () => setShowEditBioModal(false), 
                            children: _jsxs("div", { 
                                style: {
                                    width: '100%',
                                    maxWidth: 500,
                                    maxHeight: '90vh',
                                    background: '#ffffff',
                                    borderRadius: 28,
                                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden',
                                    animation: 'modalCardPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                                }, 
                                onClick: e => e.stopPropagation(), 
                                children: [
                                    _jsxs("div", { style: { background: 'linear-gradient(135deg, #0052cc 0%, #1e40af 100%)', padding: '18px 22px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [
                                        _jsxs("div", { children: [
                                            _jsx("h3", { style: { margin: 0, fontSize: 16, fontWeight: 900 }, children: "\u270F\uFE0F Edit Student Bio & Details" }),
                                            _jsx("p", { style: { margin: '2px 0 0 0', fontSize: 11, opacity: 0.85 }, children: "Updates sync with institutional record immediately" })
                                        ] }),
                                        _jsx("button", { onClick: () => setShowEditBioModal(false), style: { background: 'rgba(255,255,255,0.2)', border: 'none', color: '#ffffff', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }, children: _jsx(X, { size: 16 }) })
                                    ] }),
                                    _jsxs("form", { 
                                        onSubmit: async (e) => {
                                            await handleSaveProfile(e);
                                            setShowEditBioModal(false);
                                        }, 
                                        style: { padding: '20px 22px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }, 
                                        children: [
                                            _jsx(ProfileField, { icon: _jsx(User, { size: 14 }), label: "Full Name", type: "text", value: profileName, onChange: setProfileName, placeholder: "e.g. Nithin Annamalai R", required: true }),
                                            _jsx(ProfileField, { icon: _jsx(Hash, { size: 14 }), label: "Roll Number", type: "text", value: profileRollNo, onChange: setProfileRollNo, placeholder: "e.g. 71812503104", required: true }),
                                            _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }, children: [
                                                _jsx(ProfileField, { icon: _jsx(Layers, { size: 14 }), label: "Class & Section", type: "text", value: profileClass, onChange: setProfileClass, placeholder: "e.g. II EEE-B" }),
                                                _jsx(ProfileField, { icon: _jsx(BookOpen, { size: 14 }), label: "Semester", type: "text", value: profileSem, onChange: setProfileSem, placeholder: "e.g. Semester III" })
                                            ] }),
                                            _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }, children: [
                                                _jsx(ProfileField, { icon: _jsx(Phone, { size: 14 }), label: "Mobile Phone", type: "tel", value: profilePhone, onChange: setProfilePhone, placeholder: "e.g. 98421 55678" }),
                                                _jsx(ProfileField, { icon: _jsx(Droplets, { size: 14 }), label: "Blood Group", type: "text", value: profileBlood, onChange: setProfileBlood, placeholder: "e.g. O+, A+, B+" })
                                            ] }),
                                            _jsx(ProfileField, { icon: _jsx(Calendar, { size: 14 }), label: "Date of Birth", type: "date", value: profileDob, onChange: setProfileDob, placeholder: "" }),
                                            _jsx(ProfileField, { icon: _jsx(MapPin, { size: 14 }), label: "Permanent Address", type: "text", value: profileAddress, onChange: setProfileAddress, placeholder: "e.g. 12, Anna Nagar, Coimbatore" }),
                                            _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }, children: [
                                                _jsx(ProfileField, { icon: _jsx(User, { size: 14 }), label: "Parent / Guardian", type: "text", value: profileParentName, onChange: setProfileParentName, placeholder: "e.g. Annamalai K" }),
                                                _jsx(ProfileField, { icon: _jsx(Phone, { size: 14 }), label: "Emergency Phone", type: "tel", value: profileParentPhone, onChange: setProfileParentPhone, placeholder: "e.g. 94432 11223" })
                                            ] }),
                                            _jsxs("div", { style: { display: 'flex', gap: 10, marginTop: 10 }, children: [
                                                _jsx("button", { type: "button", onClick: () => setShowEditBioModal(false), style: { flex: 1, padding: '12px', borderRadius: 14, border: '1.5px solid #cbd5e1', background: '#f1f5f9', color: '#475569', fontWeight: 800, fontSize: 13, cursor: 'pointer' }, children: "Cancel" }),
                                                _jsx("button", { type: "submit", disabled: saving, style: { flex: 1, padding: '12px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #0052cc 0%, #2563eb 100%)', color: '#ffffff', fontWeight: 800, fontSize: 13, cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,82,204,0.3)' }, children: saving ? 'Saving...' : 'Save Profile Changes' })
                                            ] })
                                        ] 
                                    })
                                ] 
                            }) 
                        }), 
                        document.body
                    )
                ] 
            })
        );
    }
    // ─────────────────────────────────────────────────────
    // ── MODE: DOCUMENTS / CERTIFICATES ──────────────────
    // ─────────────────────────────────────────────────────
    return (_jsxs("div", { className: "dedicated-page-view page-slide-enter", style: { background: '#f8fafc', minHeight: '100vh', paddingBottom: 88 }, children: [_jsx("div", { className: "dedicated-page-header", children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: [_jsx("button", { className: "page-back-btn", onClick: selectedStudentEmail ? () => setSelectedStudentEmail(null) : onBack, title: "Go Back", children: _jsx(ArrowLeft, { size: 16 }) }), _jsxs("div", { children: [_jsx("h2", { className: "dedicated-page-title", style: { margin: 0, fontSize: 16, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6 }, children: isAdmin && !selectedStudentEmail
                                        ? (mode === 'certificates' ? '🏆 Certificates Directory' : '👥 Student Database')
                                        : (mode === 'certificates' ? '🏆 Certified Skill Vault' : '📁 Academic Document Vault') }), _jsx("span", { style: { fontSize: 11, color: 'var(--text-muted)' }, children: isAdmin && !selectedStudentEmail ? 'Institution Verification Center' : `Student ID: ${student?.rollNo || '71812503104'}` })] })] }) }), _jsxs("div", { style: { padding: '16px 24px', maxWidth: 1440, width: '100%', margin: '0 auto' }, children: [isAdmin && !selectedStudentEmail && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "form-group", style: { position: 'relative' }, children: [_jsx("input", { type: "text", placeholder: "Search by name or roll number...", value: searchQuery, onChange: e => setSearchQuery(e.target.value), className: "form-input", style: { paddingLeft: '36px' } }), _jsx(Search, { size: 16, style: { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' } })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsx("p", { className: "form-label", style: { margin: 0 }, children: "Select a student:" }), _jsxs("button", { onClick: () => setShowAddModal(true), style: { padding: '4px 10px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, background: 'var(--accent-blue)', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 6, fontWeight: 700 }, children: [_jsx(Plus, { size: 12 }), " Add Student"] })] }), filteredStudents.length === 0 ? (_jsx("p", { style: { textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', padding: '20px 0' }, children: "No students found." })) : (filteredStudents.map(s => (_jsxs("div", { className: "attendance-mark-item", onClick: () => setSelectedStudentEmail(s.email), style: { cursor: 'pointer' }, children: [_jsxs("div", { children: [_jsx("h4", { style: { fontSize: 13, fontWeight: '700' }, children: s.name }), _jsxs("p", { style: { fontSize: 11, color: 'var(--text-muted)' }, children: ["Roll: ", s.rollNo, " | ", s.email] })] }), _jsx(UserCheck, { size: 18, style: { color: 'var(--accent-blue)' } })] }, s.id))))] })] })), (!isAdmin || selectedStudentEmail) && student && (_jsxs(_Fragment, { children: [isAdmin && (_jsxs("div", { style: { background: 'rgba(56, 189, 248, 0.1)', padding: 10, borderRadius: 10, fontSize: 11, border: '1px solid rgba(56,189,248,0.2)', marginBottom: 8 }, children: ["Viewing: ", _jsxs("strong", { children: [student.name, " (", student.rollNo, ")"] })] })), _jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, children: [_jsxs("div", { children: [_jsx("h4", { style: { fontSize: 16, fontWeight: 900, color: 'var(--text-main)', margin: 0, letterSpacing: -0.3 }, children: mode === 'certificates' ? '🏆 Certificates Vault' : '📁 Documents Vault' }), _jsx("p", { style: { fontSize: 11, color: 'var(--text-muted)', margin: '2px 0 0 0' }, children: mode === 'certificates' ? 'NPTEL, Symposia, Workshops & Course Certifications' : 'Academic Proofs, Bonafide, Resume & ID Records' })] }), _jsxs("button", { onClick: handleOpenUploadModal, className: "modern-add-cert-btn", children: [_jsx(Plus, { size: 15 }), _jsx("span", { children: mode === 'certificates' ? 'Add Certificate' : 'Add Document' })] })] }), uploading && (_jsx("div", { style: { padding: 14, background: 'rgba(0,82,204,0.06)', border: '1.5px solid rgba(0,82,204,0.18)', borderRadius: 16, textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)', marginBottom: 12 }, children: "\u23F3 Uploading and securing to encrypted vault..." })), statusMessage && (_jsx("div", { style: { padding: 10, background: '#eff6ff', border: '1px solid rgba(0,82,204,0.18)', borderRadius: 12, fontSize: 11.5, textAlign: 'center', color: 'var(--accent-blue)', fontWeight: 700, marginBottom: 12 }, children: statusMessage })), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 14 }, children: filteredDocs.length === 0 ? (_jsxs("div", { style: { background: '#ffffff', borderRadius: 20, border: '1.5px dashed rgba(0,82,204,0.18)', padding: '36px 20px', textAlign: 'center' }, children: [_jsx("div", { style: { width: 50, height: 50, borderRadius: 16, background: 'rgba(0,82,204,0.08)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }, children: mode === 'certificates' ? _jsx(Award, { size: 26 }) : _jsx(FileText, { size: 26 }) }), _jsx("h4", { style: { fontSize: 14, fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }, children: mode === 'certificates' ? 'No Certificates Stored' : 'No Documents Stored' }), _jsxs("p", { style: { fontSize: 11.5, color: 'var(--text-muted)', margin: 0 }, children: ["Click \"Add ", mode === 'certificates' ? 'Certificate' : 'Document', "\" to upload your PDFs."] })] })) : mode === 'documents' ? (_jsx("div", { style: { background: '#ffffff', border: '1.5px solid rgba(0,82,204,0.12)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }, children: filteredDocs.map((doc, idx) => (_jsxs("div", { style: {
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                    padding: '12px 16px',
                                                    borderBottom: idx < filteredDocs.length - 1 ? '1px solid rgba(0,82,204,0.06)' : 'none',
                                                    background: idx % 2 === 0 ? '#f8fafc' : '#ffffff',
                                                    transition: 'background 0.2s ease'
                                                }, children: [_jsxs("div", { style: { display: 'flex', gap: 12, alignItems: 'center' }, children: [_jsx("div", { style: { width: 34, height: 34, borderRadius: 10, background: 'rgba(0,82,204,0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }, children: _jsx(FileText, { size: 16 }) }), _jsxs("div", { children: [_jsx("span", { style: { fontSize: 13, fontWeight: 800, color: 'var(--text-main)', display: 'block' }, children: getDisplayName(doc.name) }), _jsxs("span", { style: { fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 600 }, children: [doc.size, " \u00B7 Uploaded ", doc.uploadedAt] })] })] }), _jsxs("div", { style: { display: 'flex', gap: 8 }, children: [_jsx("button", { onClick: () => downloadDoc(doc), className: "doc-action-btn", title: "Download", children: _jsx(Download, { size: 15 }) }), _jsx("button", { onClick: () => handleDeleteDoc(doc.id), className: "doc-action-btn delete", title: "Delete", children: _jsx(Trash2, { size: 15 }) })] })] }, doc.id))) })) : (
                                        // Certificates: Grouped by Category with Modern Cards
                                        (() => {
                                            const grouped = {};
                                            filteredDocs.forEach(doc => {
                                                const cat = getDocCategory(doc.name);
                                                if (!grouped[cat])
                                                    grouped[cat] = [];
                                                grouped[cat].push(doc);
                                            });
                                            return Object.keys(grouped).map(cat => (_jsxs("div", { className: "modern-cert-category-card", children: [_jsxs("div", { className: "modern-cert-category-header", children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsx("span", { style: { fontSize: 14 }, children: "\uD83D\uDCC1" }), _jsx("span", { style: { fontSize: 12.5, fontWeight: 900, color: 'var(--text-main)' }, children: cat })] }), _jsxs("span", { className: "modern-cert-count-pill", children: [grouped[cat].length, " ", grouped[cat].length === 1 ? 'Cert' : 'Certs'] })] }), _jsx("div", { style: { padding: 10, display: 'flex', flexDirection: 'column', gap: 8 }, children: grouped[cat].map((doc) => (_jsxs("div", { className: "modern-cert-item-row", children: [_jsxs("div", { style: { display: 'flex', gap: 12, alignItems: 'center', minWidth: 0, flex: 1 }, children: [_jsx("div", { className: "modern-cert-pdf-badge", children: _jsx(Award, { size: 16 }) }), _jsxs("div", { style: { minWidth: 0, flex: 1 }, children: [_jsx("span", { style: { fontSize: 12.5, fontWeight: 800, color: 'var(--text-main)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: getDisplayName(doc.name) }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }, children: [_jsx("span", { style: { fontSize: 10, color: '#16a34a', fontWeight: 800, background: '#dcfce7', padding: '1px 6px', borderRadius: 6 }, children: "\u2713 Verified PDF" }), _jsxs("span", { style: { fontSize: 10, color: 'var(--text-muted)' }, children: [doc.size, " \u00B7 ", doc.uploadedAt] })] })] })] }), _jsxs("div", { style: { display: 'flex', gap: 6, flexShrink: 0 }, children: [_jsx("button", { onClick: () => downloadDoc(doc), className: "modern-cert-action-btn download", title: "Download Certificate", children: _jsx(Download, { size: 14 }) }), _jsx("button", { onClick: () => handleDeleteDoc(doc.id), className: "modern-cert-action-btn delete", title: "Delete Certificate", children: _jsx(Trash2, { size: 14 }) })] })] }, doc.id))) })] }, cat)));
                                        })()) })] })] })), showAddModal && typeof document !== 'undefined' && createPortal(_jsx("div", { className: "modern-cert-modal-backdrop", children: _jsxs("form", { className: "modern-cert-modal-card", onSubmit: handleAddStudentSubmit, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }, children: [_jsx("h3", { style: { fontSize: 16, fontWeight: 900, color: 'var(--text-main)', margin: 0 }, children: "\uD83D\uDC64 Add Student Profile" }), _jsx("button", { type: "button", className: "modern-cert-modal-close", onClick: () => setShowAddModal(false), children: _jsx(X, { size: 16 }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Full Name" }), _jsx("input", { type: "text", value: addName, onChange: e => setAddName(e.target.value), className: "form-input", placeholder: "e.g. John Doe", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Roll Number" }), _jsx("input", { type: "text", value: addRollNo, onChange: e => setAddRollNo(e.target.value), className: "form-input", placeholder: "e.g. 7377221EE100", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Email Address" }), _jsx("input", { type: "email", value: addEmail, onChange: e => setAddEmail(e.target.value), className: "form-input", placeholder: "e.g. student3@eee.com", required: true })] }), _jsx("button", { type: "submit", className: "modern-cert-submit-btn", disabled: saving, children: saving ? 'Creating...' : 'Register Student' })] }) }), document.body), showUploadModal && typeof document !== 'undefined' && createPortal(_jsx("div", { className: "modern-cert-modal-backdrop", children: _jsxs("form", { className: "modern-cert-modal-card", onSubmit: handleActualUpload, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }, children: [_jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }, children: [_jsx("div", { style: { width: 28, height: 28, borderRadius: 8, background: 'rgba(0,82,204,0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: mode === 'certificates' ? _jsx(Award, { size: 16 }) : _jsx(FileText, { size: 16 }) }), _jsx("h3", { style: { fontSize: 16, fontWeight: 900, color: 'var(--text-main)', margin: 0 }, children: mode === 'certificates' ? 'Add Certificate' : 'Add Document' })] }), _jsx("p", { style: { fontSize: 11, color: 'var(--text-muted)', margin: 0 }, children: "Upload your verified PDF to the secure institutional vault" })] }), _jsx("button", { type: "button", className: "modern-cert-modal-close", onClick: () => setShowUploadModal(false), children: _jsx(X, { size: 16 }) })] }), mode === 'certificates' && (_jsxs("div", { className: "form-group", style: { marginBottom: 14, position: 'relative' }, children: [_jsx("label", { className: "form-label", style: { fontSize: 11.5, fontWeight: 800, color: 'var(--text-main)', display: 'block', marginBottom: 6 }, children: "Category / Group" }), _jsxs("div", { className: "custom-dropdown-container", children: [_jsxs("button", { type: "button", className: "custom-dropdown-trigger", onClick: () => setIsDropdownOpen(!isDropdownOpen), children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }, children: [_jsx("span", { style: { fontSize: 16 }, children: CERT_CATEGORY_CONFIG.find(c => c.label === selectedCategory)?.icon || '🎓' }), _jsx("span", { style: { fontWeight: 800, color: 'var(--text-main)', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: selectedCategory || CERT_CATEGORIES[0] })] }), _jsx(ChevronDown, { size: 16, className: `dropdown-chevron ${isDropdownOpen ? 'open' : ''}` })] }), isDropdownOpen && (_jsx("div", { className: "custom-dropdown-menu", children: CERT_CATEGORY_CONFIG.map(cat => (_jsxs("div", { className: `custom-dropdown-option ${selectedCategory === cat.label ? 'active' : ''}`, onClick: () => {
                                                            setSelectedCategory(cat.label);
                                                            setIsDropdownOpen(false);
                                                        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: [_jsx("span", { style: { fontSize: 16 }, children: cat.icon }), _jsx("span", { style: { fontSize: 12.5, fontWeight: selectedCategory === cat.label ? 800 : 600 }, children: cat.label })] }), selectedCategory === cat.label && _jsx(CheckCircle, { size: 15, style: { color: 'var(--accent-blue)', flexShrink: 0 } })] }, cat.label))) }))] })] })), _jsxs("div", { className: "form-group", style: { marginBottom: 14 }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, children: [_jsx("label", { className: "form-label", style: { fontSize: 11.5, fontWeight: 800, color: 'var(--text-main)', margin: 0 }, children: mode === 'certificates' ? 'Certificate Name' : 'Document Name' }), selectedFile && (_jsxs("span", { style: { fontSize: 9.5, background: 'rgba(22, 163, 74, 0.12)', color: '#16a34a', padding: '2px 8px', borderRadius: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4 }, children: [_jsx(Sparkles, { size: 10 }), " Auto-Recognized"] }))] }), _jsx("input", { type: "text", value: customDocName, onChange: e => setCustomDocName(e.target.value), className: "modern-cert-input", placeholder: mode === 'certificates' ? 'e.g. NPTEL Python Programming, EV Workshop 2026...' : 'e.g. Resume, Bonafide Letter, ID Card...', required: true })] }), _jsxs("div", { className: "form-group", style: { marginBottom: 18 }, children: [_jsx("label", { className: "form-label", style: { fontSize: 11.5, fontWeight: 800, color: 'var(--text-main)', display: 'block', marginBottom: 6 }, children: "Attach PDF Document" }), selectedFile ? (_jsxs("div", { className: "modern-attached-file-box", children: [_jsxs("div", { style: { display: 'flex', gap: 12, alignItems: 'center', minWidth: 0, flex: 1 }, children: [_jsx("div", { style: { width: 40, height: 40, borderRadius: 12, background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }, children: _jsx(CheckCircle2, { size: 20 }) }), _jsxs("div", { style: { minWidth: 0, flex: 1 }, children: [_jsx("span", { style: { fontWeight: 800, color: '#166534', fontSize: 12.5, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: selectedFile.name }), _jsxs("span", { style: { color: '#64748b', fontSize: 10.5, fontWeight: 600 }, children: [(selectedFile.size / 1024).toFixed(1), " KB \u00B7 Ready to Save"] })] })] }), _jsxs("label", { className: "modern-change-file-btn", children: ["Change", _jsx("input", { type: "file", accept: "application/pdf", onChange: handleFileUpload, style: { display: 'none' } })] })] })) : (_jsxs("label", { className: "modern-pdf-dropzone", children: [_jsx("div", { style: { width: 48, height: 48, borderRadius: 16, background: 'rgba(0, 82, 204, 0.08)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }, children: _jsx(Upload, { size: 22 }) }), _jsx("span", { style: { fontSize: 13, fontWeight: 800, color: 'var(--accent-blue)' }, children: "Click to select PDF Certificate" }), _jsx("span", { style: { fontSize: 10.5, color: 'var(--text-muted)', marginTop: 3 }, children: "Accepts verified PDF files up to 10MB" }), _jsx("input", { type: "file", accept: "application/pdf", onChange: handleFileUpload, style: { display: 'none' } })] }))] }), _jsxs("div", { style: { display: 'flex', gap: 10 }, children: [_jsxs("button", { type: "submit", className: "modern-cert-submit-btn", disabled: !selectedFile || !customDocName.trim(), children: [_jsx(Award, { size: 15 }), " Upload & Secure Certificate"] }), _jsx("button", { type: "button", onClick: () => setShowUploadModal(false), className: "modern-cert-cancel-btn", children: "Cancel" })] })] }) }), document.body)] })] }));
};
// ── Reusable Profile Field Row ───────────────────────
function ProfileField({ icon, label, type, value, onChange, placeholder, required }) {
    return (_jsxs("div", { children: [_jsx("label", { style: { fontSize: 11, fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 5 }, children: label }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', background: '#f8fafc', borderRadius: 10, border: '1.5px solid #e2e8f0', transition: 'border-color 0.2s' }, onFocus: () => { }, children: [_jsx("span", { style: { color: '#94a3b8', flexShrink: 0, display: 'flex', alignItems: 'center' }, children: icon }), _jsx("input", { type: type, value: value, onChange: e => onChange(e.target.value), placeholder: placeholder, required: required, style: {
                            flex: 1, border: 'none', background: 'transparent', padding: '10px 0',
                            fontSize: 13, fontWeight: 600, color: '#0f172a', outline: 'none'
                        } })] })] }));
}
