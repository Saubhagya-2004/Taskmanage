import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import taskIllustration from '../assets/task_illustration.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/auth/login', { username, password });
            login(res.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', fontFamily: "'Manrope', sans-serif", background: '#fff' }}>

            {/* ── Blue right panel (full height, clipped diagonally on left edge) ── */}
            <div style={{
                position: 'absolute', top: 0, right: 0, bottom: 0,
                width: '58%',
                background: 'linear-gradient(145deg, #1e40af 0%, #2563eb 45%, #0ea5e9 100%)',
                clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
            }}>
                {/* Decorative circles */}
                <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '320px', height: '320px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '-60px', left: '10%', width: '260px', height: '260px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />

                {/* Content pushed right to clear the diagonal */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', paddingLeft: '60px', paddingRight: '40px', position: 'relative', zIndex: 1 }}>
                    <img
                        src={taskIllustration}
                        alt="Task illustration"
                        style={{ width: '75%', maxWidth: '360px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
                    />
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', margin: '0 0 8px', letterSpacing: '-0.4px' }}>
                            Manage tasks effortlessly
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
                            Organize, track, and complete what matters most
                        </p>
                    </div>
                </div>
            </div>

            {/* ── White left panel (form) ── */}
            <div style={{
                position: 'relative', zIndex: 2,
                width: '52%', minHeight: '100vh',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: '60px 56px',
            }}>

                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '52px' }}>
                    <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,#2563eb,#0ea5e9)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
                        <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                    </div>
                    <span style={{ fontSize: '17px', fontWeight: '800', color: '#1e3a8a', letterSpacing: '-0.4px' }}>TaskPortal</span>
                </div>

                {/* Heading */}
                <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.6px' }}>
                    Welcome back
                </h1>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 36px' }}>
                    Sign in to continue to your workspace
                </p>

                {/* Error */}
                {error && (
                    <div style={{ marginBottom: '18px', padding: '11px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '9px', color: '#b91c1c', fontSize: '13px' }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '380px' }}>
                    {/* Username */}
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <svg style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                            </svg>
                            <input type="text" required placeholder="Enter your username" value={username}
                                onChange={e => setUsername(e.target.value)}
                                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: '9px', border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#0f172a', background: '#f8fafc', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                                onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <svg style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                            </svg>
                            <input type="password" required placeholder="••••••••" value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: '9px', border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#0f172a', background: '#f8fafc', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                                onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>
                    </div>

                    {/* Remember / Forgot */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px', color: '#64748b', cursor: 'pointer' }}>
                            <input type="checkbox" style={{ accentColor: '#2563eb', width: '13px', height: '13px' }} />
                            Remember me
                        </label>
                        <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: '600', cursor: 'pointer' }}>Forgot Password?</span>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                        <button type="submit" disabled={loading}
                            style={{ flex: 1, padding: '13px', border: 'none', borderRadius: '9px', background: 'linear-gradient(135deg,#2563eb,#0ea5e9)', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(37,99,235,0.35)' }}>
                            {loading ? 'Signing in...' : 'Login'}
                        </button>
                        <Link to="/register" style={{ flex: 0.5, padding: '13px', borderRadius: '9px', border: '1.5px solid #e2e8f0', color: '#475569', fontWeight: '700', fontSize: '14px', textAlign: 'center', textDecoration: 'none', background: '#fff' }}>
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
