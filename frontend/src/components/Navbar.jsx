import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, CheckSquare, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!user) return null; // Don't show navbar if not logged in

  return (
    <nav className="glass-panel" style={{ margin: '20px 20px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="flex items-center gap-4">
        <h2 style={{ color: 'var(--accent)', margin: 0 }}>TaskMaster</h2>
        <div className="flex gap-4" style={{ marginLeft: '2rem' }}>
          <Link to="/" className="flex items-center gap-2" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/tasks" className="flex items-center gap-2" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>
            <CheckSquare size={18} /> My Tasks
          </Link>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span style={{ color: 'var(--text-muted)' }}>Hello, {user.name}</span>
        <button className="btn btn-danger flex items-center gap-2" onClick={handleLogout} style={{ padding: '8px 16px' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
