import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function UserProfileModal({ open, onClose }) {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    isSeller: user?.isSeller || false,
  });
  const [message, setMessage] = useState('');

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ ...user, ...form, role: form.isSeller ? 'seller' : 'buyer' });
    setMessage('Profile updated!');
    setTimeout(() => setMessage(''), 2000);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'white', borderRadius: 12, padding: 32, minWidth: 320, boxShadow: '0 2px 16px #0002',
        display: 'flex', flexDirection: 'column', gap: 16
      }}>
        <h2 style={{ marginBottom: 8 }}>Edit Profile</h2>
        <label>Name
          <input name="name" value={form.name} onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </label>
        <label>Email
          <input name="email" value={form.email} disabled style={{ width: '100%', padding: 8, marginTop: 4, background: '#f3f4f6' }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" name="isSeller" checked={form.isSeller} onChange={handleChange} />
          Become a Seller
        </label>
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 500, cursor: 'pointer' }}>Save</button>
          <button type="button" onClick={onClose} style={{ background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
        </div>
        {message && <div style={{ color: '#10b981', marginTop: 8 }}>{message}</div>}
      </form>
    </div>
  );
}
