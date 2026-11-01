import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { 
    Bell, Plus, Trash2, Calendar, AlertCircle, Sparkles, 
    CheckCircle2, Megaphone, Clock, Tag, ExternalLink, X
} from 'lucide-react';

export const DesktopAnnouncements = ({
    announcements = [],
    isAdmin = false,
    onAddAnnouncement,
    onDeleteAnnouncement
}) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Academic');
    const [isImportant, setIsImportant] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        const newAnnouncement = {
            id: `ann-${Date.now()}`,
            title: title.trim(),
            content: content.trim(),
            category,
            important: isImportant,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        };
        if (onAddAnnouncement) onAddAnnouncement(newAnnouncement);
        setTitle('');
        setContent('');
        setIsImportant(false);
        setShowAddModal(false);
    };

    return (
        _jsxs("div", {
            className: "desktop-announcements-view",
            style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 20 },
            children: [
                // Top Toolbar
                _jsxs("div", {
                    style: {
                        background: '#ffffff',
                        borderRadius: 20,
                        padding: '16px 22px',
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
                            children: [
                                _jsx("h3", { style: { margin: 0, fontSize: 16, fontWeight: 950, color: '#0f172a' }, children: "Department Notice Board & Official Circulars" }),
                                _jsx("span", { style: { fontSize: 12, color: '#64748b', fontWeight: 600 }, children: "Sri Ramakrishna Engineering College · Autonomous Notifications" })
                            ]
                        }),
                        isAdmin && (
                            _jsxs("button", {
                                type: "button",
                                onClick: () => setShowAddModal(true),
                                style: { padding: '9px 18px', borderRadius: 12, border: 'none', background: '#0284c7', color: '#fff', fontWeight: 900, fontSize: 12.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)' },
                                children: [_jsx(Plus, { size: 15 }), "Publish New Circular"]
                            })
                        )
                    ]
                }),

                // Announcements Feed Grid
                _jsx("div", {
                    style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 16 },
                    children: announcements.map(item => (
                        _jsxs("div", {
                            style: {
                                background: '#ffffff',
                                borderRadius: 20,
                                padding: '22px',
                                border: '1.5px solid',
                                borderColor: item.important ? '#fed7aa' : '#e2e8f0',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: 14,
                                position: 'relative'
                            },
                            children: [
                                _jsxs("div", {
                                    children: [
                                        _jsxs("div", {
                                            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
                                            children: [
                                                _jsxs("span", {
                                                    style: {
                                                        fontSize: 10.5,
                                                        fontWeight: 900,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: 0.5,
                                                        padding: '3px 8px',
                                                        borderRadius: 6,
                                                        background: item.important ? '#fef3c7' : '#eff6ff',
                                                        color: item.important ? '#b45309' : '#1d4ed8'
                                                    },
                                                    children: [item.important ? "URGENT • " : "", item.category || 'Official']
                                                }),
                                                _jsx("span", { style: { fontSize: 11, color: '#94a3b8', fontWeight: 700 }, children: item.date })
                                            ]
                                        }),
                                        _jsx("h4", { style: { fontSize: 15, fontWeight: 950, color: '#0f172a', margin: '0 0 8px 0', lineHeight: 1.3 }, children: item.title }),
                                        _jsx("p", { style: { fontSize: 12.5, color: '#475569', lineHeight: 1.55, margin: 0 }, children: item.content })
                                    ]
                                }),

                                _jsxs("div", {
                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #f1f5f9' },
                                    children: [
                                        _jsx("span", { style: { fontSize: 11, color: '#0284c7', fontWeight: 800 }, children: "HOD Office · SREC EEE" }),
                                        isAdmin && (
                                            _jsx("button", {
                                                onClick: () => onDeleteAnnouncement && onDeleteAnnouncement(item.id),
                                                style: { padding: '5px 10px', borderRadius: 8, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', cursor: 'pointer' },
                                                children: _jsx(Trash2, { size: 13 })
                                            })
                                        )
                                    ]
                                })
                            ]
                        }, item.id)
                    ))
                }),

                // Add Circular Modal
                showAddModal && (
                    _jsx("div", {
                        style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
                        children: _jsxs("div", {
                            style: { background: '#ffffff', borderRadius: 20, padding: 24, maxWidth: 460, width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' },
                            children: [
                                _jsxs("div", {
                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
                                    children: [
                                        _jsx("h3", { style: { margin: 0, fontSize: 16, fontWeight: 950 }, children: "Publish Department Notice" }),
                                        _jsx("button", { onClick: () => setShowAddModal(false), style: { background: 'none', border: 'none', cursor: 'pointer' }, children: _jsx(X, { size: 18 }) })
                                    ]
                                }),
                                _jsxs("form", {
                                    onSubmit: handleSubmit,
                                    style: { display: 'flex', flexDirection: 'column', gap: 12 },
                                    children: [
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Notice Title" }),
                                                _jsx("input", { type: "text", required: true, value: title, onChange: e => setTitle(e.target.value), placeholder: "e.g. CAT-2 Circuit Theory Test Schedule", style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Notice Category" }),
                                                _jsxs("select", { value: category, onChange: e => setCategory(e.target.value), style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, boxSizing: 'border-box' }, children: [
                                                    _jsx("option", { value: "Academic", children: "Academic / Exam" }),
                                                    _jsx("option", { value: "Symposium", children: "Symposium / Workshop" }),
                                                    _jsx("option", { value: "Placement", children: "Placement Drive" }),
                                                    _jsx("option", { value: "General", children: "General Circular" })
                                                ] })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            children: [
                                                _jsx("label", { style: { fontSize: 11, fontWeight: 800, color: '#64748b', display: 'block', marginBottom: 4 }, children: "Content" }),
                                                _jsx("textarea", { required: true, rows: 4, value: content, onChange: e => setContent(e.target.value), placeholder: "Enter official circular announcement text...", style: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box', fontFamily: 'inherit' } })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'flex', alignItems: 'center', gap: 8 },
                                            children: [
                                                _jsx("input", { type: "checkbox", id: "urgent-cb", checked: isImportant, onChange: e => setIsImportant(e.target.checked) }),
                                                _jsx("label", { htmlFor: "urgent-cb", style: { fontSize: 12, fontWeight: 700, color: '#b45309', cursor: 'pointer' }, children: "Mark as Urgent / Priority Alert" })
                                            ]
                                        }),
                                        _jsxs("div", {
                                            style: { display: 'flex', gap: 8, marginTop: 10 },
                                            children: [
                                                _jsx("button", { type: "submit", style: { flex: 1, padding: '10px', borderRadius: 10, background: '#0284c7', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer' }, children: "Publish Notice" }),
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
