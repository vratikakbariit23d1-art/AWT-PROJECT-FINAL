import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, Plus, Trash2, Edit2 } from 'lucide-react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', sort: 'createdAt' });
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [formData, setFormData] = useState({ title: '', description: '', subject: '', deadline: '', priority: 'Medium', status: 'Pending' });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { search, status, priority, sort } = filters;
      let query = `?sort=${sort}`;
      if (search) query += `&search=${search}`;
      if (status) query += `&status=${status}`;
      if (priority) query += `&priority=${priority}`;

      const res = await api.get(`/tasks${query}`);
      setTasks(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, formData);
      } else {
        await api.post('/tasks', formData);
      }
      setShowModal(false);
      setEditingTask(null);
      setFormData({ title: '', description: '', subject: '', deadline: '', priority: 'Medium', status: 'Pending' });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error saving task');
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      subject: task.subject,
      deadline: new Date(task.deadline).toISOString().split('T')[0],
      priority: task.priority,
      status: task.status
    });
    setShowModal(true);
  };

  const deleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getPriorityColor = (p) => p === 'High' ? 'badge-high' : p === 'Medium' ? 'badge-medium' : 'badge-low';
  const getStatusColor = (s) => s === 'Completed' ? 'badge-completed' : s === 'In Progress' ? 'badge-progress' : 'badge-pending';

  return (
    <div className="container mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2>My Tasks</h2>
        <button className="btn btn-primary" onClick={() => { setEditingTask(null); setShowModal(true); setFormData({ title: '', description: '', subject: '', deadline: '', priority: 'Medium', status: 'Pending' }); }}>
          <Plus size={18} style={{ marginRight: '5px' }} /> Add Task
        </button>
      </div>

      <div className="glass-panel mb-4" style={{ padding: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <div className="flex items-center" style={{ flex: 1, minWidth: '200px', background: 'rgba(15,23,42,0.6)', padding: '0 10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <Search size={18} color="var(--text-muted)" />
          <input type="text" name="search" placeholder="Search tasks..." value={filters.search} onChange={handleFilterChange} style={{ border: 'none', boxShadow: 'none', background: 'transparent' }} />
        </div>
        <select name="status" value={filters.status} onChange={handleFilterChange} style={{ flex: 1, minWidth: '150px' }}>
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select name="priority" value={filters.priority} onChange={handleFilterChange} style={{ flex: 1, minWidth: '150px' }}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select name="sort" value={filters.sort} onChange={handleFilterChange} style={{ flex: 1, minWidth: '150px' }}>
          <option value="createdAt">Newest First</option>
          <option value="deadlineAsc">Deadline (Soonest)</option>
          <option value="deadlineDesc">Deadline (Latest)</option>
        </select>
      </div>

      {loading ? <p>Loading tasks...</p> : (
        <div className="dashboard-grid">
          {tasks.map(task => (
            <div key={task._id} className="glass-panel task-item" style={{ position: 'relative' }}>
              <div className="task-header">
                <span className={`badge ${getStatusColor(task.status)}`}>{task.status}</span>
                <span className={`badge ${getPriorityColor(task.priority)}`}>{task.priority}</span>
              </div>
              <h3 style={{ marginTop: '10px' }}>{task.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', flex: 1 }}>{task.subject}</p>
              <p style={{ fontSize: '0.85rem', marginBottom: '10px', color: '#cbd5e1' }}>{task.description}</p>
              
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(task)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--accent)' }}><Edit2 size={16}/></button>
                  <button onClick={() => deleteTask(task._id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          ))}
          {tasks.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No tasks found matching criteria.</p>}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '30px', background: '#0f172a' }}>
            <h3 className="mb-4">{editingTask ? 'Edit Task' : 'New Task'}</h3>
            <form onSubmit={handleCreateOrUpdate} className="flex-col gap-4" style={{ display: 'flex' }}>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Task Title" />
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Subject / Course" />
              <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Description" rows="3"></textarea>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
              
              <div className="flex gap-4">
                <select name="priority" value={formData.priority} onChange={handleChange} style={{ flex: 1 }}>
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
                <select name="status" value={formData.status} onChange={handleChange} style={{ flex: 1 }}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-between mt-4">
                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)' }}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingTask ? 'Update Task' : 'Create Task'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
