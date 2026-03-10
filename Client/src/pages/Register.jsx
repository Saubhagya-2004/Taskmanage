import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import taskIllustration from '../assets/task_illustration.png';

const Register = () => {
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
            const res = await axios.post('http://localhost:3000/auth/register', { username, password });
            login(res.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Username may already be taken.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '13px 16px 13px 42px', borderRadius: '9px',
        border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#0f172a',
        background: '#f8fafc', outline: 'none', fontFamily: 'inherit',
        boxSizing: 'border-box', transition: 'border-color 0.2s',
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Manrope', sans-serif", background: '#f0f4ff' }}>

            {/* ── Left : blue illustration panel ── */}
            <div style={{
                flex: 1,
                background: 'linear-gradient(145deg, #1e40af 0%, #2563eb 40%, #38bdf8 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '280px', height: '280px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '-80px', right: '-40px', width: '340px', height: '340px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />

                {/* Text overlay */}
                <div style={{ position: 'absolute', bottom: '48px', left: '48px', right: '48px', zIndex: 2 }}>
                    <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.4px' }}>
                        Start managing your tasks today
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                        Create your free account and stay on top of everything that matters.
                    </p>
                </div>

                <img
                    src={taskIllustration}
                    alt="Task management illustration"
                    style={{ width: '72%', maxWidth: '460px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.3))', marginBottom: '80px' }}
                />
            </div>

            {/* ── Right : white form panel ── */}
            <div style={{
                width: '480px', flexShrink: 0, background: '#fff',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: '60px 52px', boxShadow: '-4px 0 30px rgba(0,0,0,0.06)',
            }}>

                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '44px' }}>
                    <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg,#2563eb,#38bdf8)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                    </div>
                    <span style={{ fontSize: '16px', fontWeight: '800', color: '#1e3a8a', letterSpacing: '-0.3px' }}>TaskPortal</span>
                </div>

                {/* Heading */}
                <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.5px' }}>
                    Create your account
                </h1>
                <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '36px' }}>
                    Join TaskPortal and boost your productivity
                </p>

                {/* Error */}
                {error && (
                    <div style={{ marginBottom: '18px', padding: '11px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '9px', color: '#b91c1c', fontSize: '13px' }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Username */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '7px' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                            </svg>
                            <input type="text" required placeholder="Choose a username" value={username}
                                onChange={e => setUsername(e.target.value)} style={inputStyle}
                                onFocus={e => e.target.style.borderColor = '#2563eb'}
                                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '7px' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                            </svg>
                            <input type="password" required placeholder="Create a strong password" value={password}
                                onChange={e => setPassword(e.target.value)} style={inputStyle}
                                onFocus={e => e.target.style.borderColor = '#2563eb'}
                                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                            />
                        </div>
                    </div>

                    {/* Agree terms */}
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#64748b', cursor: 'pointer' }}>
                        <input type="checkbox" required style={{ accentColor: '#2563eb', marginTop: '2px', width: '14px', height: '14px', flexShrink: 0 }} />
                        I agree to the <span style={{ color: '#2563eb', fontWeight: '600' }}>Terms of Service</span> and <span style={{ color: '#2563eb', fontWeight: '600' }}>Privacy Policy</span>
                    </label>

                    {/* Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px' }}>
                        <button type="submit" disabled={loading}
                            style={{
                                flex: 1, padding: '13px', border: 'none', borderRadius: '9px',
                                background: 'linear-gradient(135deg,#2563eb,#38bdf8)',
                                color: '#fff', fontWeight: '700', fontSize: '15px',
                                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
                                fontFamily: 'inherit', boxShadow: '0 4px 18px rgba(37,99,235,0.35)',
                            }}>
                            {loading ? 'Creating...' : 'Sign Up'}
                        </button>
                        <Link to="/login" style={{
                            flex: 0.6, padding: '13px', borderRadius: '9px', border: '1.5px solid #e2e8f0',
                            color: '#475569', fontWeight: '700', fontSize: '14px', textAlign: 'center',
                            textDecoration: 'none', background: '#fff', display: 'block',
                        }}>
                            Login
                        </Link>
                    </div>
                </form>

                <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '13px', color: '#94a3b8' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>Sign in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
