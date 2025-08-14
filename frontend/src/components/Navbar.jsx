import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <nav style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 2rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: '#1f2937',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          <img 
            src="/MultiVend Logo.svg" 
            alt="MultiVend" 
            style={{ height: '40px', marginRight: '8px' }}
          />
          MultiVend
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{
            textDecoration: 'none',
            color: '#4b5563',
            fontWeight: '500',
            fontSize: '1rem'
          }}>
            Home
          </Link>
          <Link to="/products" style={{
            textDecoration: 'none',
            color: '#4b5563',
            fontWeight: '500',
            fontSize: '1rem'
          }}>
            Products
          </Link>
          
          {isAuthenticated && (
            <>
              <Link to="/manage-products" style={{
                textDecoration: 'none',
                color: '#4b5563',
                fontWeight: '500',
                fontSize: '1rem'
              }}>
                Manage Products
              </Link>
              <Link to="/orders" style={{
                textDecoration: 'none',
                color: '#4b5563',
                fontWeight: '500',
                fontSize: '1rem'
              }}>
                My Orders
              </Link>
            </>
          )}
          
          <Link to="/about" style={{
            textDecoration: 'none',
            color: '#4b5563',
            fontWeight: '500',
            fontSize: '1rem'
          }}>
            About
          </Link>
          
          {/* Authentication Section */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '8px 12px',
                backgroundColor: '#f3f4f6',
                borderRadius: '6px',
                fontSize: '0.875rem',
                color: '#374151'
              }}>
                <i className="fas fa-user"></i>
                <span>{user?.name}</span>
                <span style={{
                  backgroundColor: user?.role === 'seller' ? '#3b82f6' : '#10b981',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  textTransform: 'capitalize'
                }}>
                  {user?.role}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: 'transparent',
                  color: '#ef4444',
                  border: '1px solid #ef4444',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/login" style={{
                textDecoration: 'none',
                color: '#3b82f6',
                fontWeight: '500',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <i className="fas fa-sign-in-alt"></i>
                Login
              </Link>
              
              <Link to="/register" style={{
                textDecoration: 'none',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <i className="fas fa-user-plus"></i>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
