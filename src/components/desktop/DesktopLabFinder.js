import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { 
    Compass, Monitor, CheckCircle2, AlertCircle, RefreshCw, 
    Sparkles, Cpu, Search, Check, Filter, Zap
} from 'lucide-react';

const LAB_ROOMS = [
    { id: 'power-sim', name: 'Power Electronics Simulation Lab', room: 'LH-301 (Lab Wing)', capacity: 36, software: 'MATLAB / Simulink, PSIM, LTSpice' },
    { id: 'iot-embedded', name: 'Microcontrollers & IoT Embedded Lab', room: 'LH-302 (North Wing)', capacity: 32, software: 'Keil uVision, STM32CubeIDE, Arduino IDE' },
    { id: 'machines-lab', name: 'Electrical Machines Research Workstations', room: 'Machines Block B', capacity: 24, software: 'LabVIEW, dSPACE Data Acquisition' },
    { id: 'pcb-eda', name: 'PCB Design & VLSI EDA Suite', room: 'EEE Design Center', capacity: 28, software: 'KiCad, Altium Designer, Cadence' },
];

export const DesktopLabFinder = ({ rollNo = '71812503104' }) => {
    const [selectedLab, setSelectedLab] = useState('power-sim');
    const [mySeat, setMySeat] = useState(null);
    const [seats, setSeats] = useState([]);
    const [statusMsg, setStatusMsg] = useState('');

    const activeLab = LAB_ROOMS.find(l => l.id === selectedLab) || LAB_ROOMS[0];

    useEffect(() => {
        // Load or generate seats
        try {
            const savedSeat = localStorage.getItem(`eee_lab_seat_${selectedLab}`);
            if (savedSeat) setMySeat(savedSeat);
            else setMySeat(null);
        } catch (e) {}

        const generated = Array.from({ length: activeLab.capacity }, (_, idx) => {
            const seatNum = idx + 1;
            // Deterministic state
            const isMaint = seatNum === 7 || seatNum === 19;
            const isOcc = !isMaint && (seatNum % 3 === 0 || seatNum % 5 === 0);
            return {
                id: seatNum,
                code: `WS-${String(seatNum).padStart(2, '0')}`,
                status: isMaint ? 'maintenance' : (isOcc ? 'occupied' : 'available'),
                specs: 'Dell Precision i7 · 32GB RAM · Dual Monitor'
            };
        });
        setSeats(generated);
    }, [selectedLab]);

    const handleClaimSeat = (seatCode) => {
        if (mySeat === seatCode) {
            setMySeat(null);
            localStorage.removeItem(`eee_lab_seat_${selectedLab}`);
            setStatusMsg(`Released Workstation ${seatCode}`);
        } else {
            setMySeat(seatCode);
            localStorage.setItem(`eee_lab_seat_${selectedLab}`, seatCode);
            setStatusMsg(`✅ Allocated Workstation ${seatCode} for Roll No: ${rollNo}`);
        }
        setTimeout(() => setStatusMsg(''), 3000);
    };

    const availableCount = seats.filter(s => s.status === 'available').length;
    const occupiedCount = seats.filter(s => s.status === 'occupied').length;

    return (
        _jsxs("div", {
            className: "desktop-lab-finder-view",
            style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 20 },
            children: [
                statusMsg && (
                    _jsx("div", {
                        style: { padding: '12px 18px', background: '#f0fdf4', color: '#166534', border: '1.5px solid #86efac', borderRadius: 14, fontSize: 13, fontWeight: 800, textAlign: 'center' },
                        children: statusMsg
                    })
                ),

                // ── Lab Selector Tabs ──
                _jsx("div", {
                    style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 },
                    children: LAB_ROOMS.map(lab => (
                        _jsxs("div", {
                            onClick: () => setSelectedLab(lab.id),
                            style: {
                                background: selectedLab === lab.id ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' : '#ffffff',
                                borderRadius: 18,
                                padding: '18px 20px',
                                border: '1.5px solid',
                                borderColor: selectedLab === lab.id ? '#0284c7' : '#e2e8f0',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                            },
                            children: [
                                _jsx("div", { style: { fontSize: 13.5, fontWeight: 950, color: '#0f172a' }, children: lab.name }),
                                _jsx("div", { style: { fontSize: 11, color: '#64748b', marginTop: 4 }, children: lab.room }),
                                _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.06)' }, children: [
                                    _jsxs("span", { style: { fontSize: 11, fontWeight: 800, color: '#0284c7' }, children: [lab.capacity, " Workstations"] }),
                                    _jsx("span", { style: { fontSize: 10, fontWeight: 800, background: selectedLab === lab.id ? '#0284c7' : '#f1f5f9', color: selectedLab === lab.id ? '#fff' : '#64748b', padding: '2px 8px', borderRadius: 6 }, children: selectedLab === lab.id ? "ACTIVE" : "SELECT" })
                                ] })
                            ]
                        }, lab.id)
                    ))
                }),

                // ── Active Lab Details Strip ──
                _jsxs("div", {
                    style: {
                        background: '#ffffff',
                        borderRadius: 20,
                        padding: '18px 24px',
                        border: '1.5px solid #e2e8f0',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 14
                    },
                    children: [
                        _jsxs("div", {
                            children: [
                                _jsxs("h3", { style: { margin: 0, fontSize: 15, fontWeight: 950, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }, children: [
                                    _jsx(Cpu, { size: 16, color: "#0284c7" }),
                                    activeLab.name,
                                    " • Live Seat Matrix"
                                ] }),
                                _jsxs("span", { style: { fontSize: 11.5, color: '#64748b', fontWeight: 600 }, children: [
                                    "Preloaded Software Suites: ",
                                    activeLab.software
                                ] })
                            ]
                        }),
                        _jsxs("div", {
                            style: { display: 'flex', gap: 14, alignItems: 'center' },
                            children: [
                                _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: '#16a34a' }, children: [
                                    _jsx("span", { style: { width: 8, height: 8, borderRadius: '50%', background: '#16a34a' } }),
                                    `${availableCount} Available`
                                ] }),
                                _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: '#dc2626' }, children: [
                                    _jsx("span", { style: { width: 8, height: 8, borderRadius: '50%', background: '#dc2626' } }),
                                    `${occupiedCount} Occupied`
                                ] }),
                                mySeat && (
                                    _jsxs("div", { style: { fontSize: 11.5, fontWeight: 900, background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: 99, border: '1px solid #86efac' }, children: [
                                        "My Seat: ",
                                        mySeat
                                    ] })
                                )
                            ]
                        })
                    ]
                }),

                // ── Interactive Workstation Matrix Grid ──
                _jsxs("div", {
                    style: { background: '#ffffff', borderRadius: 22, padding: '24px 26px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
                    children: [
                        _jsx("div", {
                            style: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 },
                            children: seats.map(s => {
                                const isMySeat = mySeat === s.code;
                                const isAvail = s.status === 'available';
                                const isMaint = s.status === 'maintenance';

                                return (
                                    _jsxs("div", {
                                        onClick: () => {
                                            if (isAvail || isMySeat) handleClaimSeat(s.code);
                                        },
                                        style: {
                                            background: isMySeat ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' : isAvail ? '#f8fafc' : isMaint ? '#fef2f2' : '#f1f5f9',
                                            borderRadius: 16,
                                            padding: '16px',
                                            border: '1.5px solid',
                                            borderColor: isMySeat ? '#0284c7' : isAvail ? '#cbd5e1' : isMaint ? '#fecaca' : '#e2e8f0',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 8,
                                            cursor: (isAvail || isMySeat) ? 'pointer' : 'not-allowed',
                                            boxShadow: isMySeat ? '0 4px 14px rgba(2, 132, 199, 0.2)' : 'none',
                                            transition: 'all 0.15s ease'
                                        },
                                        children: [
                                            _jsx(Monitor, { size: 24, style: { color: isMySeat ? '#0284c7' : isAvail ? '#16a34a' : isMaint ? '#dc2626' : '#94a3b8' } }),
                                            _jsx("span", { style: { fontSize: 13, fontWeight: 950, color: '#0f172a' }, children: s.code }),
                                            _jsx("span", {
                                                style: {
                                                    fontSize: 10,
                                                    fontWeight: 800,
                                                    borderRadius: 6,
                                                    padding: '2px 8px',
                                                    background: isMySeat ? '#0284c7' : isAvail ? '#dcfce7' : isMaint ? '#fee2e2' : '#e2e8f0',
                                                    color: isMySeat ? '#ffffff' : isAvail ? '#166534' : isMaint ? '#991b1b' : '#64748b'
                                                },
                                                children: isMySeat ? "RESERVED (YOU)" : isAvail ? "CLAIM SEAT" : isMaint ? "MAINTENANCE" : "OCCUPIED"
                                            })
                                        ]
                                    }, s.id)
                                );
                            })
                        })
                    ]
                })
            ]
        })
    );
};
