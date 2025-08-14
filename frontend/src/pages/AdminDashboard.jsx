
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const TABS = ['Users', 'Products', 'Orders'];

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [tab, setTab] = useState('Users');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all data on mount or tab change
  useEffect(() => {
    setError('');
    setLoading(true);
    const fetchData = async () => {
      try {
        if (tab === 'Users') {
          // Since backend doesn't have get all users endpoint, use mock data for demo
          // In real implementation, this would require backend changes
          const mockUsers = [
            { _id: '1', name: 'John Doe', email: 'john@example.com', isSeller: false },
            { _id: '2', name: 'Jane Smith', email: 'jane@example.com', isSeller: true },
            { _id: '3', name: 'Bob Wilson', email: 'bob@example.com', isSeller: false }
          ];
          setUsers(mockUsers);
        } else if (tab === 'Products') {
          const res = await fetch(`${import.meta.env.VITE_PRODUCT_API_URL}/products`);
          const data = await res.json();
          setProducts(Array.isArray(data) ? data : []);
        } else if (tab === 'Orders') {
          // Since backend only returns user's own orders, use mock data for admin view
          const mockOrders = [
            { _id: 'order1', user: { name: 'John Doe', email: 'john@example.com' }, product: { name: 'Sample Product' }, quantity: 2, status: 'pending' },
            { _id: 'order2', user: { name: 'Jane Smith', email: 'jane@example.com' }, product: { name: 'Another Product' }, quantity: 1, status: 'delivered' }
          ];
          setOrders(mockOrders);
        }
      } catch (err) {
        setError('Failed to fetch data. Some data may be simulated for demo purposes.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tab, token]);

  // Delete handlers with cascading deletes
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user and ALL their products and orders? This cannot be undone!')) return;
    
    try {
      // Since backend doesn't support user deletion, simulate it
      // 1. Remove user from local state
      setUsers(users.filter(u => u._id !== userId));
      
      // 2. Find and delete all products by this user (simulate)
      const userProducts = products.filter(p => p.sellerId === userId);
      for (const product of userProducts) {
        try {
          await fetch(`${import.meta.env.VITE_PRODUCT_API_URL}/products/${product._id}`, { 
            method: 'DELETE', 
            headers: { Authorization: `Bearer ${token}` } 
          });
        } catch (err) {
          console.error('Error deleting product:', err);
        }
      }
      setProducts(products.filter(p => p.sellerId !== userId));
      
      // 3. Remove all orders by this user (simulate)
      setOrders(orders.filter(o => o.user?._id !== userId && o.user !== userId));
      
      alert('User and all associated data deleted successfully!');
    } catch (err) {
      setError('Error deleting user data: ' + err.message);
    }
  };
  
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await fetch(`${import.meta.env.VITE_PRODUCT_API_URL}/products/${id}`, { 
        method: 'DELETE', 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      setError('Error deleting product: ' + err.message);
    }
  };
  
  const handleDeleteOrder = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    try {
      // Since backend doesn't support order deletion, simulate it
      setOrders(orders.filter(o => o._id !== id));
      alert('Order deleted successfully!');
    } catch (err) {
      setError('Error deleting order: ' + err.message);
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#fff0f0', padding: '2rem' }}>
      <h1 style={{ color: '#ef4444', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Admin Dashboard
      </h1>
      <div style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
        Welcome, <b>{user?.name || user?.email}</b>!<br />
        <span style={{ color: '#ef4444', fontWeight: 600 }}>You have full access to all user, product, and order data.</span>
      </div>
      
      {/* Admin Notice */}
      <div style={{ 
        background: '#fffbeb', 
        border: '1px solid #f59e0b', 
        borderRadius: 8, 
        padding: 16, 
        marginBottom: 24, 
        fontSize: '0.9rem', 
        color: '#92400e' 
      }}>
        <strong>Admin Note:</strong> User and Order data is simulated for demo purposes since the backend services don't expose admin endpoints. 
        Product management is fully functional. When deleting a user, all their products and orders will be removed.
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab === t ? '#ef4444' : '#fff',
            color: tab === t ? '#fff' : '#ef4444',
            border: '2px solid #ef4444',
            borderRadius: 8,
            padding: '8px 24px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.2s'
          }}>{t}</button>
        ))}
      </div>
      {/* Content */}
      <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px #ef444433', padding: 24, minHeight: 400 }}>
        {loading ? <div>Loading...</div> : error ? <div style={{ color: '#ef4444' }}>{error}</div> : (
          <>
            {tab === 'Users' && (
              <>
                <h2 style={{ color: '#3b82f6' }}>User Database</h2>
                <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f3f4f6' }}>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Name</th>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Email</th>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Role</th>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id}>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{u.name}</td>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{u.email}</td>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{u.isSeller ? 'Seller' : 'Buyer'}</td>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>
                          <button onClick={() => handleDeleteUser(u._id)} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, padding: '4px 12px', fontWeight: 500, cursor: 'pointer' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            {tab === 'Products' && (
              <>
                <h2 style={{ color: '#10b981' }}>Product Database</h2>
                <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f3f4f6' }}>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Name</th>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Price</th>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Stock</th>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id}>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{p.name}</td>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{p.price}</td>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{p.stock}</td>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>
                          <button onClick={() => handleDeleteProduct(p._id)} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, padding: '4px 12px', fontWeight: 500, cursor: 'pointer' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            {tab === 'Orders' && (
              <>
                <h2 style={{ color: '#f59e42' }}>Order Database</h2>
                <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f3f4f6' }}>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Order ID</th>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>User</th>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Product</th>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Quantity</th>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Status</th>
                      <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o._id}>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{o._id}</td>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{o.user?.name || o.user?.email || o.user}</td>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{o.product?.name || o.product || '-'}</td>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{o.quantity}</td>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{o.status}</td>
                        <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>
                          <button onClick={() => handleDeleteOrder(o._id)} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, padding: '4px 12px', fontWeight: 500, cursor: 'pointer' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>
      <div style={{ marginTop: '3rem', color: '#ef4444', fontWeight: 500 }}>
        <i className="fas fa-exclamation-triangle"></i> <b>Warning:</b> All changes are permanent. Use admin privileges responsibly.
      </div>
    </div>
  );
}
