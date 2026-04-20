import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <div className="container mt-4">Loading dashboard...</div>;

  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  
  // High priority or upcoming deadline
  const urgentTasks = tasks.filter(t => t.priority === 'High' && t.status !== 'Completed');

  return (
    <div className="container mt-4">
      <h2 style={{ marginBottom: '20px' }}>Dashboard Overview</h2>
      
      <div className="dashboard-grid">
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(107, 114, 128, 0.2)', padding: '15px', borderRadius: '50%', color: '#9ca3af' }}>
            <Clock size={32} />
          </div>
          <div>
            <h3>{pendingTasks}</h3>
            <p style={{ color: 'var(--text-muted)' }}>Pending Tasks</p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '15px', borderRadius: '50%', color: '#60a5fa' }}>
             <Clock size={32} />
          </div>
          <div>
            <h3>{inProgressTasks}</h3>
            <p style={{ color: 'var(--text-muted)' }}>In Progress</p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '15px', borderRadius: '50%', color: '#34d399' }}>
            <CheckCircle size={32} />
          </div>
          <div>
            <h3>{completedTasks}</h3>
            <p style={{ color: 'var(--text-muted)' }}>Completed Tasks</p>
          </div>
        </div>
      </div>

      <div className="mt-4" style={{ marginTop: '40px' }}>
        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertTriangle color="var(--danger)" /> Urgent Tasks
        </h3>
        {urgentTasks.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No urgent tasks at the moment. Good job!</p>
        ) : (
          <div className="dashboard-grid">
            {urgentTasks.map(task => (
              <div key={task._id} className="glass-panel task-item" style={{ borderLeft: '4px solid var(--danger)' }}>
                <h4>{task.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Subject: {task.subject}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <span className="badge badge-high">High Priority</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
