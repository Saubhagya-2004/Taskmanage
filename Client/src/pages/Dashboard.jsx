import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const STATUS = {
    Pending: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', text: '#fbbf24', dot: '#f59e0b' },
    Completed: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#34d399', dot: '#10b981' },
};

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [filter, setFilter] = useState('All');
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { user, logout } = useContext(AuthContext);

    useEffect(() => { fetchTasks(); }, []);

    const fetchTasks = async () => {
        try { const r = await axios.get('http://localhost:3000/tasks'); setTasks(r.data); }
        catch (e) { console.error(e); }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        setSubmitting(true);
        try {
            const r = await axios.post('http://localhost:3000/tasks', { title, description: desc });
            setTasks(prev => [r.data, ...prev]);
            setTitle(''); setDesc(''); setShowForm(false);
        } catch (e) { console.error(e); }
        finally { setSubmitting(false); }
    };

    const toggle = async (id, cur) => {
        const next = cur === 'Pending' ? 'Completed' : 'Pending';
        try {
            const r = await axios.patch(`http://localhost:3000/tasks/${id}/status`, { status: next });
            setTasks(prev => prev.map(t => t._id === id ? r.data : t));
        } catch (e) { console.error(e); }
    };

    const counts = { All: tasks.length, Pending: tasks.filter(t => t.status === 'Pending').length, Completed: tasks.filter(t => t.status === 'Completed').length };
    const filtered = tasks.filter(t => filter === 'All' || t.status === filter);

    /* ── Inline helpers ── */
    const Icon = ({ path }) => (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={path} /></svg>
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Manrope',sans-serif", background: '#0d1117' }}>

            {/* ─── Sidebar ─── */}
            <aside className="sidebar" style={{ width: '230px', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '24px 14px' }}>

                {/* Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 6px', marginBottom: '32px' }}>
                    <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg,#059669,#34d399)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(16,185,129,0.3)', flexShrink: 0 }}>
                        <svg width="17" height="17" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                    </div>
                    <span style={{ fontWeight: '800', fontSize: '16px', color: '#f1f5f9' }}>TaskPortal</span>
                </div>

                {/* Overview stats */}
                <div style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '12px', padding: '14px 16px', marginBottom: '24px' }}>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Overview</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {[['Total', counts.All, '#64748b'], ['Pending', counts.Pending, '#fbbf24'], ['Done', counts.Completed, '#34d399']].map(([label, val, color]) => (
                            <div key={label} style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '20px', fontWeight: '800', color, margin: 0 }}>{val}</p>
                                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.25)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '6px' }}>View</p>

                {['All', 'Pending', 'Completed'].map(f => {
                    const icons = { All: 'M4 6h16M4 10h16M4 14h16M4 18h16', Pending: 'M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l4 2', Completed: 'M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3' };
                    return (
                        <button key={f} onClick={() => setFilter(f)} className={`nav-item${filter === f ? ' active' : ''}`}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Icon path={icons[f]} />
                                {f}
                            </span>
                            <span style={{ fontSize: '12px', background: filter === f ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)', padding: '1px 8px', borderRadius: '20px', fontWeight: '700' }}>{counts[f]}</span>
                        </button>
                    );
                })}

                {/* User */}
                <div style={{ marginTop: 'auto', borderTop: '1px solid #1f2937', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid #1f2937' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#059669,#34d399)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', color: 'white', flexShrink: 0 }}>
                            {user.username[0].toUpperCase()}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.username}</p>
                            <p style={{ margin: 0, fontSize: '11px', color: '#10b981' }}>● Online</p>
                        </div>
                        <button onClick={logout} title="Logout" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.25)', padding: '2px', display: 'flex', transition: 'color 0.15s' }}
                            onMouseEnter={e => e.target.style.color = '#ef4444'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" /></svg>
                        </button>
                    </div>
                </div>
            </aside>

            {/* ─── Main ─── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

                {/* Topbar */}
                <header style={{ padding: '18px 28px', borderBottom: '1px solid #1f2937', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.01)', flexShrink: 0 }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#f1f5f9' }}>
                            {filter === 'All' ? 'All Tasks' : filter === 'Pending' ? '⏳ Pending' : '✅ Completed'}
                        </h1>
                        <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>{filtered.length} task{filtered.length !== 1 ? 's' : ''}</p>
                    </div>
                    <button onClick={() => setShowForm(v => !v)}
                        style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 18px', background: 'linear-gradient(135deg,#059669,#10b981)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 18px rgba(16,185,129,0.3)', fontFamily: 'inherit', transition: 'box-shadow 0.2s' }}>
                        <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        {showForm ? 'Cancel' : 'New Task'}
                    </button>
                </header>

                <div style={{ padding: '24px 28px', flex: 1 }}>

                    {/* Add task form */}
                    {showForm && (
                        <div style={{ marginBottom: '24px', background: '#111827', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '14px', padding: '22px' }}>
                            <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: 'rgba(255,255,255,0.8)' }}>New Task</h3>
                            <form onSubmit={addTask} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <input type="text" required className="field" placeholder="Task title (required)" value={title} onChange={e => setTitle(e.target.value)} />
                                <input type="text" className="field" placeholder="Description (optional)" value={desc} onChange={e => setDesc(e.target.value)} />
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button type="submit" disabled={submitting}
                                        style={{ padding: '9px 22px', background: 'linear-gradient(135deg,#059669,#10b981)', border: 'none', borderRadius: '9px', color: 'white', fontWeight: '700', fontSize: '14px', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.6 : 1, fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(16,185,129,0.25)' }}>
                                        {submitting ? 'Adding...' : 'Add Task'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Empty state */}
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '70px 20px', border: '1px dashed #1f2937', borderRadius: '16px' }}>
                            <span style={{ fontSize: '42px' }}>📋</span>
                            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '15px', marginTop: '12px' }}>No {filter !== 'All' ? filter.toLowerCase() + ' ' : ''}tasks yet</p>
                            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', marginTop: '4px' }}>Click <strong style={{ color: '#34d399' }}>New Task</strong> to get started</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {filtered.map(task => {
                                const s = STATUS[task.status] || STATUS.Pending;
                                const done = task.status === 'Completed';
                                return (
                                    <div key={task._id} className="task-card">
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '5px' }}>
                                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.dot, flexShrink: 0, boxShadow: `0 0 6px ${s.dot}` }} />
                                                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: done ? 'rgba(255,255,255,0.35)' : '#f1f5f9', textDecoration: done ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {task.title}
                                                </h3>
                                            </div>
                                            {task.description && (
                                                <p style={{ margin: '0 0 8px 17px', fontSize: '13px', color: done ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.45)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.description}</p>
                                            )}
                                            <p style={{ margin: '0 0 0 17px', fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
                                                {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
                                            <span style={{ fontSize: '12px', fontWeight: '700', padding: '3px 11px', borderRadius: '20px', background: s.bg, border: `1px solid ${s.border}`, color: s.text }}>
                                                {task.status}
                                            </span>
                                            <button onClick={() => toggle(task._id, task.status)}
                                                style={{
                                                    fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                                                    background: done ? 'rgba(255,255,255,0.04)' : 'rgba(16,185,129,0.1)',
                                                    border: done ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(16,185,129,0.3)',
                                                    color: done ? 'rgba(255,255,255,0.35)' : '#34d399',
                                                }}>
                                                {done ? 'Mark Pending' : '✓ Complete'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
