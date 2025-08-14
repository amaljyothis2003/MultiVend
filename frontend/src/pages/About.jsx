export default function About() {
  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'white',
        padding: '4rem 1rem',
        textAlign: 'center',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            About MultiVend
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            Empowering sellers and connecting buyers through innovative microservices technology
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            <i className="fas fa-rocket"></i>
            Built with Modern Technology
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem'
          }}>
            {/* Mission */}
            <div style={{
              backgroundColor: 'white',
              padding: '2.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <i className="fas fa-bullseye" style={{ fontSize: '2rem', color: 'white' }}></i>
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Our Mission
              </h2>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                To create a seamless, scalable marketplace that empowers individual sellers 
                and small businesses to reach customers worldwide while providing buyers 
                with diverse, quality products at competitive prices.
              </p>
            </div>

            {/* Vision */}
            <div style={{
              backgroundColor: 'white',
              padding: '2.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <i className="fas fa-eye" style={{ fontSize: '2rem', color: 'white' }}></i>
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Our Vision
              </h2>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                To become the leading multi-vendor platform that democratizes e-commerce, 
                making it accessible for anyone to start their online business with 
                cutting-edge technology and exceptional user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section style={{
        backgroundColor: 'white',
        padding: '4rem 1rem',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Built with Modern Technology
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              MultiVend leverages microservices architecture for scalability, reliability, and maintainability
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {/* Frontend */}
            <div style={{
              padding: '2rem',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#61dafb',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <i className="fab fa-react" style={{ fontSize: '1.5rem', color: 'white' }}></i>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                React Frontend
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Modern React with Vite for fast development and optimal performance
              </p>
            </div>

            {/* Microservices */}
            <div style={{
              padding: '2rem',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#68d391',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <i className="fab fa-node-js" style={{ fontSize: '1.5rem', color: 'white' }}></i>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Node.js Services
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Scalable microservices for user management, products, and orders
              </p>
            </div>

            {/* Database */}
            <div style={{
              padding: '2rem',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#4faa54',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <i className="fas fa-database" style={{ fontSize: '1.5rem', color: 'white' }}></i>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                MongoDB
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                NoSQL database for flexible and scalable data storage
              </p>
            </div>

            {/* Docker */}
            <div style={{
              padding: '2rem',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#2496ed',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <i className="fab fa-docker" style={{ fontSize: '1.5rem', color: 'white' }}></i>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Docker
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Containerized deployment for consistency across environments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Platform Features
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Everything you need to build, manage, and grow your online business
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Multi-Vendor Support */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <i className="fas fa-store" style={{ fontSize: '1rem', color: 'white' }}></i>
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Multi-Vendor Support
                </h3>
              </div>
              <p style={{ color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
                Enable multiple sellers to list and manage their products on a single platform
              </p>
            </div>

            {/* Real-time Inventory */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#10b981',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <i className="fas fa-chart-line" style={{ fontSize: '1rem', color: 'white' }}></i>
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Real-time Inventory
                </h3>
              </div>
              <p style={{ color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
                Automatic stock management with real-time updates across all services
              </p>
            </div>

            {/* Secure Authentication */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#f59e0b',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <i className="fas fa-shield-alt" style={{ fontSize: '1rem', color: 'white' }}></i>
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Secure Authentication
                </h3>
              </div>
              <p style={{ color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
                JWT-based authentication with role-based access control for security
              </p>
            </div>

            {/* Order Management */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#8b5cf6',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <i className="fas fa-shopping-cart" style={{ fontSize: '1rem', color: 'white' }}></i>
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Smart Order Management
                </h3>
              </div>
              <p style={{ color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
                Complete order lifecycle management with automated workflows
              </p>
            </div>

            {/* Responsive Design */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#ef4444',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <i className="fas fa-mobile-alt" style={{ fontSize: '1rem', color: 'white' }}></i>
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Responsive Design
                </h3>
              </div>
              <p style={{ color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
                Optimized experience across all devices and screen sizes
              </p>
            </div>

            {/* Scalable Architecture */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#06b6d4',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <i className="fas fa-expand-arrows-alt" style={{ fontSize: '1rem', color: 'white' }}></i>
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Scalable Architecture
                </h3>
              </div>
              <p style={{ color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
                Microservices architecture designed to scale with your business growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        backgroundColor: '#3b82f6',
        padding: '4rem 1rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1rem'
          }}>
            Ready to Start Selling?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#dbeafe',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Join thousands of sellers who trust MultiVend to power their online business. 
            Start your journey today with our easy-to-use platform.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="/register" 
              style={{
                backgroundColor: 'white',
                color: '#3b82f6',
                padding: '12px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              }}
            >
              <i className="fas fa-rocket"></i>
              Get Started Now
            </a>
            <a 
              href="/products" 
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '10px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <i className="fas fa-shopping-bag"></i>
              Browse Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
