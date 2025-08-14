import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '3rem 2rem 2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <img 
                src="/MultiVend Logo.svg" 
                alt="MultiVend" 
                style={{ height: '32px', marginRight: '8px', filter: 'brightness(0) invert(1)' }}
              />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: 0
              }}>
                MultiVend
              </h3>
            </div>
            <p style={{
              color: '#9ca3af',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              Your trusted marketplace connecting buyers and sellers worldwide. 
              Discover quality products from verified vendors.
            </p>
          </div>

          <div>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'white'
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/products" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Products
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/about" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/contact" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'white'
            }}>
              Support
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Help Center
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Shipping Info
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Returns
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'white'
            }}>
              Connect With Us
            </h4>
            <p style={{
              color: '#9ca3af',
              marginBottom: '1rem'
            }}>
              Stay updated with our latest products and offers
            </p>
            <div style={{
              display: 'flex',
              gap: '1.5rem'
            }}>
              <a href="#" style={{
                color: '#9ca3af',
                fontSize: '1.5rem',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" style={{
                color: '#9ca3af',
                fontSize: '1.5rem',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#1da1f2'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" style={{
                color: '#9ca3af',
                fontSize: '1.5rem',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#e4405f'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" style={{
                color: '#9ca3af',
                fontSize: '1.5rem',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#0077b5'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '2rem',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#9ca3af',
            margin: 0
          }}>
            © 2025 MultiVend. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
