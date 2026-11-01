import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { 
    UserCheck, Search, Plus, X, Trash2, Edit3, User, 
    CheckCircle2, AlertCircle, ChevronRight, Save, Filter, Award, Shield
} from 'lucide-react';

export const DesktopStudentManager = ({ isAdmin = true, currentUser }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClass, setSelectedClass] = useState('all');
    const [selectedArrears, setSelectedArrears] = useState('all');

    // Selected Student for View / Edit
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState('bio');
    const [saving, setSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);

    // Edit fields
    const [editName, setEditName] = useState('');
    const [editRollNo, setEditRollNo] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editClass, setEditClass] = useState('');
    const [editYear, setEditYear] = useState('');
    const [editSem, setEditSem] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editDob, setEditDob] = useState('');
    const [editBlood, setEditBlood] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editParentName, setEditParentName] = useState('');
    const [editParentPhone, setEditParentPhone] = useState('');
    const [editArrears, setEditArrears] = useState('0');
    const [editCgpa, setEditCgpa] = useState({});

    // Add Student Modal
    const [showAddModal, setShowAddModal] = useState(false);
    const [addName, setAddName] = useState('');
    const [addRollNo, setAddRollNo] = useState('');
    const [addEmail, setAddEmail] = useState('');
    const [addClassName, setAddClassName] = useState('II EEE-B');
    const [addPhone, setAddPhone] = useState('');

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        setLoading(true);
        try {
            const list = await dbService.fetchAllStudents();
            setStudents(list || []);
        } catch (err) {
            console.error('Failed to load students:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setIsEditMode(false);
        setActiveTab('bio');
        setEditName(student.name || '');
        setEditRollNo(student.rollNo || '');
        setEditEmail(student.email || '');
        setEditClass(student.className || 'II EEE-B');
        setEditYear(student.yearOfStudy || '2nd Year');
        setEditSem(student.semester || 'Semester IV');
        setEditPhone(student.phone || '');
        setEditDob(student.dob || '2004-05-14');
        setEditBlood(student.bloodGroup || 'O+');
        setEditAddress(student.address || '');
        setEditParentName(student.parentName || '');
        setEditParentPhone(student.parentPhone || '');
        setEditArrears(String(student.arrears || 0));
        setEditCgpa(student.cgpa || {});
    };

    const handleSaveStudent = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const updated = {
                ...selectedStudent,
                name: editName.trim(),
                rollNo: editRollNo.trim().toUpperCase(),
                className: editClass,
                yearOfStudy: editYear,
                semester: editSem,
                phone: editPhone.trim(),
                dob: editDob,
                bloodGroup: editBlood,
                address: editAddress.trim(),
                parentName: editParentName.trim(),
                parentPhone: editParentPhone.trim(),
                arrears: parseInt(editArrears) || 0,
                cgpa: editCgpa
            };
            await dbService.updateStudentProfile(updated);
            setSelectedStudent(updated);
            setIsEditMode(false);
            loadStudents();
            setStatusMessage({ text: `Student dossier for ${updated.name} updated!`, type: 'success' });
            setTimeout(() => setStatusMessage(null), 3500);
        } catch (err) {
            console.error(err);
            setStatusMessage({ text: 'Failed to update student profile.', type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleCreateStudent = async (e) => {
        e.preventDefault();
        if (!addName.trim() || !addRollNo.trim() || !addEmail.trim()) return;
        setSaving(true);
        try {
            const newStudent = {
                id: addEmail.trim().toLowerCase(),
                name: addName.trim(),
                rollNo: addRollNo.trim().toUpperCase(),
                email: addEmail.trim().toLowerCase(),
                className: addClassName,
                yearOfStudy: '2nd Year',
                semester: 'Semester IV',
                department: 'Dept of EEE',
                phone: addPhone.trim() || '+91 98421 55678',
                dob: '2004-05-14',
                bloodGroup: 'O+',
                address: 'Coimbatore, Tamil Nadu',
                parentName: 'Parent Guardian',
                parentPhone: '+91 94432 11223',
                arrears: 0,
                nptelExams: [],
                documents: [],
                cgpa: {
                    1: { internal1: 85, internal2: 86, semMarks: 85, gpa: 8.5 },
                    2: { internal1: 84, internal2: 85, semMarks: 84, gpa: 8.4 },
                    3: { internal1: 86, internal2: 87, semMarks: 86, gpa: 8.6 },
                    4: { internal1: 85, internal2: 86, semMarks: 85, gpa: 8.5 }
                }
            };
            await dbService.createStudentProfile(newStudent);
            setShowAddModal(false);
            setAddName('');
            setAddRollNo('');
            setAddEmail('');
            setAddPhone('');
            loadStudents();
            setStatusMessage({ text: `Student ${newStudent.name} added to database!`, type: 'success' });
            setTimeout(() => setStatusMessage(null), 4000);
        } catch (err) {
            console.error(err);
            alert(err.message || 'Failed to create student profile');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteStudent = async (email, name) => {
        if (!window.confirm(`Are you sure you want to delete ${name} from the database?`)) return;
        try {
            await dbService.deleteStudentProfile(email);
            setSelectedStudent(null);
            loadStudents();
            setStatusMessage({ text: `Student record deleted.`, type: 'success' });
            setTimeout(() => setStatusMessage(null), 3000);
        } catch (err) {
            alert('Failed to delete student');
        }
    };

    const filteredStudents = students.filter(s => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
        const matchesClass = selectedClass === 'all' || s.className === selectedClass;
        const matchesArrears = selectedArrears === 'all' 
            ? true 
            : selectedArrears === 'clear' 
                ? (s.arrears || 0) === 0 
                : (s.arrears || 0) > 0;
        return matchesSearch && matchesClass && matchesArrears;
    });

    const calculateCgpa = (cgpaRecord) => {
        const sems = Object.values(cgpaRecord || {}).filter(s => s?.gpa && s.gpa > 0);
        if (sems.length === 0) return '8.50';
        const sum = sems.reduce((acc, curr) => acc + (curr.gpa || 0), 0);
        return (sum / sems.length).toFixed(2);
    };

    return (
        _jsxs("div", {
            className: "desktop-student-manager-view",
            style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 20 },
            children: [
                statusMessage && (
                    _jsxs("div", {
                        style: {
                            padding: '12px 18px',
                            borderRadius: 14,
                            fontSize: 13,
                            fontWeight: 800,
                            background: statusMessage.type === 'success' ? '#ecfdf5' : '#fef2f2',
                            color: statusMessage.type === 'success' ? '#065f46' : '#991b1b',
                            border: `1.5px solid ${statusMessage.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        },
                        children: [
                            statusMessage.type === 'success' ? _jsx(CheckCircle2, { size: 16 }) : _jsx(AlertCircle, { size: 16 }),
                            _jsx("span", { children: statusMessage.text })
                        ]
                    })
                ),

                // ── KPI Summary Cards ──
                _jsxs("div", {
                    style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 },
                    children: [
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 20, padding: '18px 22px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
                            children: [
                                _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }, children: "Total Enrolled" }),
                                _jsx("h3", { style: { margin: '4px 0 0', fontSize: 26, fontWeight: 950, color: '#0052cc' }, children: students.length })
                            ]
                        }),
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 20, padding: '18px 22px', border: '1.5px solid #bbf7d0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
                            children: [
                                _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }, children: "All-Clear (0 Arrears)" }),
                                _jsx("h3", { style: { margin: '4px 0 0', fontSize: 26, fontWeight: 950, color: '#16a34a' }, children: students.filter(s => (s.arrears || 0) === 0).length })
                            ]
                        }),
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 20, padding: '18px 22px', border: '1.5px solid #fecaca', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
                            children: [
                                _jsx("span", { style: { fontSize: 11, fontWeight: 800, color: '#dc2626', textTransform: 'uppercase' }, children: "Standing Arrears" }),
                                _jsx("h3", { style: { margin: '4px 0 0', fontSize: 26, fontWeight: 950, color: '#dc2626' }, children: students.filter(s => (s.arrears || 0) > 0).length })
                            ]
                        }),
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 20, padding: '18px 22px', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' },
                            children: [
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => setShowAddModal(true),
                                    style: {
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: 14,
                                        border: 'none',
                                        background: '#0284c7',
                                        color: '#ffffff',
                                        fontWeight: 900,
                                        fontSize: 13,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 8,
                                        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)'
                                    },
                                    children: [_jsx(Plus, { size: 16 }), "Add New Student Record"]
                                })
                            ]
                        })
                    ]
                }),

                // ── Main Layout: Table / Grid and Details Panel ──
                _jsxs("div", {
                    style: { display: 'grid', gridTemplateColumns: selectedStudent ? '1fr 520px' : '1fr', gap: 22, alignItems: 'start' },
                    children: [
                        // Left / Main Student List
                        _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 22, padding: '24px 26px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap', gap: 12 },
                                    children: [
                                        _jsxs("div", {
                                            style: { position: 'relative', flex: 1, minWidth: 260 },
                                            children: [
                                                _jsx(Search, { size: 15, style: { position: 'absolute', left: 12, top: 12, color: '#94a3b8' } }),
                                                _jsx("input", {
                                                    type: "text",
                                                    placeholder: "Search by student name, roll number, or email...",
                                                    value: searchQuery,
                                                    onChange: e => setSearchQuery(e.target.value),
                                                    style: { width: '100%', padding: '9px 12px 9px 36px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 12.5, outline: 'none', boxSizing: 'border-box' }
                                                })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'flex', gap: 10 },
                                            children: [
                                                _jsxs("select", {
                                                    value: selectedClass,
                                                    onChange: e => setSelectedClass(e.target.value),
                                                    style: { padding: '9px 12px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 12, background: '#f8fafc', fontWeight: 700 },
                                                    children: [
                                                        _jsx("option", { value: "all", children: "All Sections" }),
                                                        _jsx("option", { value: "II EEE-A", children: "II EEE-A" }),
                                                        _jsx("option", { value: "II EEE-B", children: "II EEE-B" })
                                                    ]
                                                }),
                                                _jsxs("select", {
                                                    value: selectedArrears,
                                                    onChange: e => setSelectedArrears(e.target.value),
                                                    style: { padding: '9px 12px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 12, background: '#f8fafc', fontWeight: 700 },
                                                    children: [
                                                        _jsx("option", { value: "all", children: "All Academic Standing" }),
                                                        _jsx("option", { value: "clear", children: "All Clear (0 Arrears)" }),
                                                        _jsx("option", { value: "with_arrears", children: "Standing Arrears" })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),

                                loading ? (
                                    _jsx("div", { style: { padding: 40, textAlign: 'center', color: '#64748b', fontSize: 13 }, children: "Loading student records..." })
                                ) : filteredStudents.length === 0 ? (
                                    _jsxs("div", {
                                        style: { padding: '40px 20px', textAlign: 'center', color: '#94a3b8' },
                                        children: [
                                            _jsx(User, { size: 36, style: { opacity: 0.3, margin: '0 auto 8px' } }),
                                            _jsx("p", { style: { margin: 0, fontSize: 13, fontWeight: 700 }, children: "No students matching search filter." })
                                        ]
                                    })
                                ) : (
                                    _jsx("div", {
                                        style: { display: 'grid', gridTemplateColumns: selectedStudent ? '1fr' : 'repeat(2, 1fr)', gap: 12 },
                                        children: filteredStudents.map(student => {
                                            const studentCgpa = calculateCgpa(student.cgpa || {});
                                            const isSelected = selectedStudent?.email === student.email;

                                            return (
                                                _jsxs("div", {
                                                    onClick: () => handleSelectStudent(student),
                                                    style: {
                                                        background: isSelected ? '#eff6ff' : '#f8fafc',
                                                        borderRadius: 16,
                                                        padding: '14px 18px',
                                                        border: '1.5px solid',
                                                        borderColor: isSelected ? '#0284c7' : '#e2e8f0',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.15s ease'
                                                    },
                                                    children: [
                                                        _jsxs("div", {
                                                            style: { display: 'flex', alignItems: 'center', gap: 12 },
                                                            children: [
                                                                _jsx("div", {
                                                                    style: {
                                                                        width: 42,
                                                                        height: 42,
                                                                        borderRadius: 12,
                                                                        background: 'linear-gradient(135deg, #0052cc 0%, #1e40af 100%)',
                                                                        color: '#ffffff',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontWeight: 950,
                                                                        fontSize: 15,
                                                                        flexShrink: 0
                                                                    },
                                                                    children: student.name.charAt(0)
                                                                }),
                                                                _jsxs("div", {
                                                                    children: [
                                                                        _jsx("div", { style: { fontSize: 13.5, fontWeight: 950, color: '#0f172a' }, children: student.name }),
                                                                        _jsxs("div", { style: { fontSize: 11, color: '#64748b', marginTop: 2 }, children: ["Roll: ", student.rollNo, " • ", student.className || 'II EEE-B'] })
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        _jsxs("div", {
                                                            style: { textAlign: 'right' },
                                                            children: [
                                                                _jsxs("span", { style: { fontSize: 12.5, fontWeight: 950, color: '#0052cc' }, children: [studentCgpa, " CGPA"] }),
                                                                _jsx("div", {
                                                                    style: { fontSize: 10, fontWeight: 800, color: (student.arrears || 0) === 0 ? '#16a34a' : '#dc2626', marginTop: 2 },
                                                                    children: (student.arrears || 0) === 0 ? "0 Arrears" : `${student.arrears} Arrear(s)`
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }, student.email)
                                            );
                                        })
                                    })
                                )
                            ]
                        }),

                        // Right: Selected Student Dossier & Edit Console
                        selectedStudent && (
                            _jsxs("div", {
                                style: { background: '#ffffff', borderRadius: 22, padding: '24px 26px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: 16 },
                                children: [
                                    _jsxs("div", {
                                        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, borderBottom: '1px solid #f1f5f9' },
                                        children: [
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("h3", { style: { margin: 0, fontSize: 16, fontWeight: 950, color: '#0f172a' }, children: selectedStudent.name }),
                                                    _jsxs("div", { style: { fontSize: 11, color: '#64748b' }, children: ["Roll: ", selectedStudent.rollNo, " • ", selectedStudent.email] })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                style: { display: 'flex', gap: 8 },
                                                children: [
                                                    _jsxs("button", {
                                                        type: "button",
                                                        onClick: () => setIsEditMode(!isEditMode),
                                                        style: { padding: '6px 12px', borderRadius: 8, border: 'none', background: isEditMode ? '#10b981' : '#0284c7', color: '#fff', fontWeight: 800, fontSize: 11.5, cursor: 'pointer' },
                                                        children: [isEditMode ? "Done" : "Edit"]
                                                    }),
                                                    _jsx("button", {
                                                        type: "button",
                                                        onClick: () => handleDeleteStudent(selectedStudent.email, selectedStudent.name),
                                                        style: { padding: '6px 10px', borderRadius: 8, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', cursor: 'pointer' },
                                                        children: _jsx(Trash2, { size: 14 })
                                                    }),
                                                    _jsx("button", {
                                                        type: "button",
                                                        onClick: () => setSelectedStudent(null),
                                                        style: { background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' },
                                                        children: _jsx(X, { size: 18 })
                                                    })
                                                ]
                                            })
                                        ]
                                    }),

                                    _jsxs("form", {
                                        onSubmit: handleSaveStudent,
                                        style: { display: 'flex', flexDirection: 'column', gap: 12 },
                                        children: [
                                            _jsxs("div", {
                                                style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
                                                children: [
                                                    _jsxs("div", {
                                                        children: [
                                                            _jsx("label", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Full Name" }),
                                                            _jsx("input", { type: "text", disabled: !isEditMode, value: editName, onChange: e => setEditName(e.target.value), style: { width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, background: isEditMode ? '#fff' : '#f8fafc', boxSizing: 'border-box' } })
                                                        ]
                                                    }),
                                                    _jsxs("div", {
                                                        children: [
                                                            _jsx("label", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Roll Number" }),
                                                            _jsx("input", { type: "text", disabled: !isEditMode, value: editRollNo, onChange: e => setEditRollNo(e.target.value), style: { width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, background: isEditMode ? '#fff' : '#f8fafc', boxSizing: 'border-box' } })
                                                        ]
                                                    }),
                                                    _jsxs("div", {
                                                        children: [
                                                            _jsx("label", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Class / Section" }),
                                                            _jsx("input", { type: "text", disabled: !isEditMode, value: editClass, onChange: e => setEditClass(e.target.value), style: { width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, background: isEditMode ? '#fff' : '#f8fafc', boxSizing: 'border-box' } })
                                                        ]
                                                    }),
                                                    _jsxs("div", {
                                                        children: [
                                                            _jsx("label", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Standing Arrears" }),
                                                            _jsx("input", { type: "number", disabled: !isEditMode, value: editArrears, onChange: e => setEditArrears(e.target.value), style: { width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, background: isEditMode ? '#fff' : '#f8fafc', boxSizing: 'border-box' } })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                children: [
                                                    _jsx("label", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Residential Address" }),
                                                    _jsx("input", { type: "text", disabled: !isEditMode, value: editAddress, onChange: e => setEditAddress(e.target.value), style: { width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, background: isEditMode ? '#fff' : '#f8fafc', boxSizing: 'border-box' } })
                                                ]
                                            }),
                                            _jsxs("div", {
                                                style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
                                                children: [
                                                    _jsxs("div", {
                                                        children: [
                                                            _jsx("label", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Parent Name" }),
                                                            _jsx("input", { type: "text", disabled: !isEditMode, value: editParentName, onChange: e => setEditParentName(e.target.value), style: { width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, background: isEditMode ? '#fff' : '#f8fafc', boxSizing: 'border-box' } })
                                                        ]
                                                    }),
                                                    _jsxs("div", {
                                                        children: [
                                                            _jsx("label", { style: { fontSize: 10.5, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 2 }, children: "Parent Phone" }),
                                                            _jsx("input", { type: "text", disabled: !isEditMode, value: editParentPhone, onChange: e => setEditParentPhone(e.target.value), style: { width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, background: isEditMode ? '#fff' : '#f8fafc', boxSizing: 'border-box' } })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            isEditMode && (
                                                _jsx("button", {
                                                    type: "submit",
                                                    disabled: saving,
                                                    style: { width: '100%', padding: '10px', borderRadius: 10, border: 'none', background: '#0284c7', color: '#fff', fontWeight: 900, fontSize: 12.5, cursor: 'pointer', marginTop: 10 },
                                                    children: saving ? "Saving to Database..." : "Save Student Dossier"
                                                })
                                            )
                                        ]
                                    })
                                ]
                            })
                        )
                    ]
                }),

                // Add Student Modal
                showAddModal && (
                    _jsx("div", {
                        style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
                        children: _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 20, padding: 24, maxWidth: 440, width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' },
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
                                    children: [
                                        _jsx("h3", { style: { margin: 0, fontSize: 16, fontWeight: 950 }, children: "Add New Student Record" }),
                                        _jsx("button", { onClick: () => setShowAddModal(false), style: { background: 'none', border: 'none', cursor: 'pointer' }, children: _jsx(X, { size: 18 }) })
                                    ]
                                }),
                                _jsxs("form", {
                                    onSubmit: handleCreateStudent,
                                    style: { display: 'flex', flexDirection: 'column', gap: 12 },
                                    children: [
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Full Name" }),
                                                _jsx("input", { type: "text", required: true, value: addName, onChange: e => setAddName(e.target.value), placeholder: "e.g. S. Dharshan", style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Roll Number" }),
                                                _jsx("input", { type: "text", required: true, value: addRollNo, onChange: e => setAddRollNo(e.target.value), placeholder: "71812503115", style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Email Address" }),
                                                _jsx("input", { type: "email", required: true, value: addEmail, onChange: e => setAddEmail(e.target.value), placeholder: "student@eee.com", style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'flex', gap: 8, marginTop: 10 },
                                            children: [
                                                _jsx("button", { type: "submit", disabled: saving, style: { flex: 1, padding: '10px', borderRadius: 10, background: '#0284c7', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer' }, children: "Create Student" }),
                                                _jsx("button", { type: "button", onClick: () => setShowAddModal(false), style: { padding: '10px 16px', borderRadius: 10, background: '#f8fafc', color: '#475569', fontWeight: 700, border: '1px solid #cbd5e1', cursor: 'pointer' }, children: "Cancel" })
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
