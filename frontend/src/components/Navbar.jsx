import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserProfileModal from './UserProfileModal';

export default function Navbar() {
  const { user, logout, isAuthenticated, role } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    setProfileOpen(true);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };

  return (
    <nav style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 2rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      width: '100%'
    }}>
      <div style={{
        width: '100%',
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
          

          {/* Seller and Admin can manage products; all logged-in users can see orders */}
          {isAuthenticated && role !== 'admin' && (
            <>
              {role === 'seller' && (
                <Link to="/manage-products" style={{
                  textDecoration: 'none',
                  color: '#4b5563',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}>
                  Manage Products
                </Link>
              )}
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

          {/* Admin Dashboard link for admin only */}
          {isAuthenticated && role === 'admin' && (
            <Link to="/admin" style={{
              textDecoration: 'none',
              color: '#ef4444',
              fontWeight: '700',
              fontSize: '1rem',
              border: '2px solid #ef4444',
              borderRadius: '6px',
              padding: '6px 14px',
              background: '#fff0f0'
            }}>
              Admin Dashboard
            </Link>
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '8px 12px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: '#374151',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
                onClick={handleProfileClick}
                title="Edit Profile"
              >
                <i className="fas fa-user"></i>
                <span>{user?.name}</span>
                <span style={{
                  backgroundColor: role === 'admin' ? '#ef4444' : (role === 'seller' ? '#3b82f6' : '#10b981'),
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  textTransform: 'capitalize',
                  fontWeight: 600
                }}>
                  {role}
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
              {/* User Profile Modal */}
              <UserProfileModal open={profileOpen} onClose={handleProfileClose} />
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
