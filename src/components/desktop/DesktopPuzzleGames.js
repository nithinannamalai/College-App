import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { 
    Gamepad2, Sparkles, Trophy, RotateCcw, Zap, 
    CheckCircle2, Clock, Award
} from 'lucide-react';

const CIRCUIT_SYMBOLS = ['⚡', '💡', '🔋', '🔌', '🧲', '⚙️', '📡', '🕹️'];

export const DesktopPuzzleGames = () => {
    // Memory card puzzle
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);

    const initializeGame = () => {
        const deck = [...CIRCUIT_SYMBOLS, ...CIRCUIT_SYMBOLS]
            .sort(() => Math.random() - 0.5)
            .map((symbol, id) => ({ id, symbol }));
        setCards(deck);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    const handleCardClick = (id) => {
        if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
        const nextFlipped = [...flipped, id];
        setFlipped(nextFlipped);

        if (nextFlipped.length === 2) {
            setMoves(m => m + 1);
            const [firstId, secondId] = nextFlipped;
            if (cards[firstId].symbol === cards[secondId].symbol) {
                setMatched(prev => [...prev, firstId, secondId]);
                setScore(s => s + 50);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 900);
            }
        }
    };

    const isGameWon = cards.length > 0 && matched.length === cards.length;

    return (
        _jsxs("div", {
            className: "desktop-puzzle-games-view",
            style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 20 },
            children: [
                // Top Score & Controls Toolbar
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
                            style: { display: 'flex', alignItems: 'center', gap: 12 },
                            children: [
                                _jsx("div", {
                                    style: { width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' },
                                    children: _jsx(Gamepad2, { size: 20 })
                                }),
                                _jsxs("div", {
                                    children: [
                                        _jsx("h3", { style: { margin: 0, fontSize: 16, fontWeight: 950, color: '#0f172a' }, children: "Circuit Memory & Logic Challenge" }),
                                        _jsx("span", { style: { fontSize: 11.5, color: '#64748b', fontWeight: 600 }, children: "Pair matching electrical & semiconductor symbols" })
                                    ]
                                })
                            ]
                        }),
                        _jsxs("div", {
                            style: { display: 'flex', alignItems: 'center', gap: 16 },
                            children: [
                                _jsxs("div", {
                                    style: { background: '#f8fafc', padding: '6px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12, fontWeight: 800 },
                                    children: ["Moves: ", moves]
                                }),
                                _jsxs("div", {
                                    style: { background: '#eff6ff', padding: '6px 14px', borderRadius: 10, border: '1px solid #bfdbfe', fontSize: 12, fontWeight: 900, color: '#1d4ed8' },
                                    children: ["Score: ", score, " Pts"]
                                }),
                                _jsxs("button", {
                                    onClick: initializeGame,
                                    style: { padding: '8px 16px', borderRadius: 10, border: 'none', background: '#7c3aed', color: '#fff', fontWeight: 800, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 },
                                    children: [_jsx(RotateCcw, { size: 14 }), "New Game"]
                                })
                            ]
                        })
                    ]
                }),

                // Game Board Canvas
                _jsxs("div", {
                    style: { background: '#ffffff', borderRadius: 24, padding: '32px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 },
                    children: [
                        isGameWon && (
                            _jsxs("div", {
                                style: { background: '#ecfdf5', border: '1.5px solid #86efac', padding: '14px 24px', borderRadius: 16, color: '#065f46', fontWeight: 950, fontSize: 16, textAlign: 'center' },
                                children: [
                                    "🎉 Circuit Puzzle Solved in ",
                                    moves,
                                    " moves! Total Score: ",
                                    score,
                                    " Pts"
                                ]
                            })
                        ),
                        _jsx("div", {
                            style: { display: 'grid', gridTemplateColumns: 'repeat(4, 120px)', gap: 16 },
                            children: cards.map(c => {
                                const isFlipped = flipped.includes(c.id) || matched.includes(c.id);
                                const isMatch = matched.includes(c.id);

                                return (
                                    _jsx("button", {
                                        type: "button",
                                        onClick: () => handleCardClick(c.id),
                                        style: {
                                            width: 120,
                                            height: 120,
                                            borderRadius: 18,
                                            border: '2px solid',
                                            borderColor: isMatch ? '#86efac' : isFlipped ? '#7c3aed' : '#cbd5e1',
                                            background: isMatch ? '#f0fdf4' : isFlipped ? '#faf5ff' : '#f8fafc',
                                            fontSize: isFlipped ? 40 : 20,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: isMatch ? 'default' : 'pointer',
                                            transition: 'transform 0.2s, background 0.2s',
                                            boxShadow: isFlipped ? '0 8px 20px rgba(124, 58, 237, 0.15)' : 'none'
                                        },
                                        children: isFlipped ? c.symbol : "⚡"
                                    }, c.id)
                                );
                            })
                        })
                    ]
                })
            ]
        })
    );
};
